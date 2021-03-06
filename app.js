const router = require('./router.js');

// Problem: We need a simple way to look at a user's badge count and JavaScript points from a web browser

// Solution: Use NodeJS to perform the profile look ups and serve our templates via HTTP

// Create a web server

const http = require('http');
// const url = require('url');

const server = http.createServer((request, response) => {
  router.home(request, response);
  router.user(request, response);
});

server.listen(4321);
console.log('Server listening at localhost:4321');
