const Profile = require('./profile.js');
const renderer = require('./renderer.js')

// Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  if (request.url === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    renderer.view('header', {}, response);
    renderer.view('search', {}, response);
    renderer.view('footer', {}, response);
    response.end();
  }
}
  // if url === '/' and POST
    // redirect to /:username

// Handle HTTP route GET /:username i.e. /chalkers
function user(request, response) {
  const username = request.url.replace('/', '');
  if (username.length > 0) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
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
