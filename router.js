const Profile = require("./profile.js");

// Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  if (request.url === '/') {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Header\n');
    response.write('Search\n');
    response.end('Footer\n');
  }
}
  // if url === '/' and POST
    // redirect to /:username

// Handle HTTP route GET /:username i.e. /chalkers
function user(request, response) {
  const username = request.url.replace('/', '');
  if (username.length > 0) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Header\n');

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
      response.write(values.username + ' has ' + values.badges + ' badges\n');
      response.end('Footer\n');
    });

    // on "error"
    studentProfile.on("error", function(error) {
      // show error
      response.write(error.message + '\n');
      response.end('Footer\n');
    });
  }
  // if url === '/...'
}

module.exports.home = home;
module.exports.user = user;
