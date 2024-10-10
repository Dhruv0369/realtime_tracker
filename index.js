const http = require('http');
const app = require('./app'); // Import app configurations from app.js
const socketio = require('socket.io');

const server = http.createServer(app); // Create HTTP server with Express app
const io = socketio(server); // Setup socket.io with the HTTP server

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('send-location', (data) => {
        io.emit('recevie-location', { id: socket.id, ...data });
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        io.emit('user-disconnected', socket.id);
    });
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server running on port 3000');
});
