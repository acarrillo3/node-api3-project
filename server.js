const express = require('express');
const postRoutes = require('./posts/postRouter.js');
const userRoutes = require('./users/userRouter');
const server = express();

server.use(express.json());
server.use(logger);
server.use('/api/posts', postRoutes);
server.use('/api/users', userRoutes);

server.get('/', (req, res) => {
  res.json(`Welcome to posts api`);
});

//custom middleware

// logger logs to the console the following information about each request method, request url, and a timestamp
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}

module.exports = server;
