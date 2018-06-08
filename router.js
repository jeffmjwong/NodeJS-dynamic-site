const Profile = require('./profile.js');
const renderer = require('./renderer.js')
const querystring = require('querystring');

const commonHeaders = { 'Content-Type': 'text/html' }

// Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  if (request.url === '/') {
    if (request.method.toLowerCase() === 'get') {
      response.writeHead(200, commonHeaders);
      renderer.view('header', {}, response);
      renderer.view('search', {}, response);
      renderer.view('footer', {}, response);
      response.end();
    } else {
      // if url === '/' and POST
      // get the POST data from body
      request.on('data', function(postBody) {
        // extract the username
        const query = querystring.parse(postBody.toString());
        // redirect to /:username
        response.writeHeader(303, { 'Location': `/${query.username}` });
        response.end();
      });
    }
  }
}

// Handle HTTP route GET /:username i.e. /chalkers
function user(request, response) {
  const username = request.url.replace('/', '');
  if (username.length > 0) {
    response.writeHead(200, commonHeaders);
    renderer.view('header', {}, response);

    // get json from treehouse
    const studentProfile = new Profile(username);

    // on "end"
    studentProfile.on("end", function(profileJSON) {
      // show profile

      // store the values which we need
      const values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      };
      renderer.view('profile', values, response);
      renderer.view('footer', {}, response);
      response.end();
    });

    // on "error"
    studentProfile.on("error", function(error) {
      // show error
      renderer.view('error', { errorMessage: error.message }, response);
      renderer.view('search', {}, response);
      renderer.view('footer', {}, response);
      response.end();
    });
  }
}

module.exports.home = home;
module.exports.user = user;
