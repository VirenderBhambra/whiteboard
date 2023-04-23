const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('Client connected');
  
    socket.on('client-connected', () => {
      console.log('Client is ready to receive canvas data');
      socket.emit('server-ready');
    });
  
    socket.on('canvas-data', (data) => {
      console.log('Data received from client:', data);
      socket.broadcast.emit('canvas-data', data);
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

server.listen(3000, () => {
  console.log('Server started on port 3000');
});
