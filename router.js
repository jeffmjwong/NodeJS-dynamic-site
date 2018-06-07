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
    response.write(username + '\n');
    response.end('Footer\n');
  }
  // if url === '/...'
  // get json from treehouse
  // on "end"
  // show profile
  // on "error"
  // show error
}

module.exports.home = home;
module.exports.user = user;
