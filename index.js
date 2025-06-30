
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: '*' }
});

io.on('connection', socket => {
  console.log('New connection:', socket.id);
  
  socket.on('join', ({ gender, peerId }) => {
    socket.join('room_' + peerId);
    socket.to('room_' + peerId).emit('matched', { peerId: socket.id });
  });

  socket.on('signal', data => {
    socket.to('room_' + data.room).emit('signal', data);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log('Server running on port', PORT));
