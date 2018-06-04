// Problem: We need a simple way to look at a user's badge count and JavaScript points from a web browser

// Solution: Use NodeJS to perform the profile look ups and serve our templates via HTTP

// 1. Create a web server

const http = require('http');
// const url = require('url');

const server = http.createServer((request, response) => {

  response.writeHead(200, { 'Content-Type': 'text/plain' });
  setInterval(() => {
    response.write(`${new Date()}\n`);
  }, 1000);
  // response.write('This is before hello world!\n')

  // response.end();
});

server.listen(4321);
console.log('Server listening at localhost:4321');

// 2. Handle HTTP route GET / and POST / i.e. Home
  // if url === '/' and GET
    // show search field
  // if url === '/' and POST
    // redirect to /:username

// 3. Handle HTTP route GET /:username i.e. /chalkers
  // if url === '/...'
    // get json from treehouse
      // on "end"
        // show profile
      // on "error"
        // show error

// 4. Function that handles the reading of files and merge in value
  // read from file and get a string
    // merge values into string
