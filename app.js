const express = require('express')
const app = express()
const http = require('node:http');
const path = require('node:path');
const socketio = require("socket.io") // socketio run in only http server
const server = http.createServer(app); // create a server
const io = socketio(server); // like a server ||| socketio server



app.set("view engine", "ejs"); // view engine setup
app.use(express.static(path.join(__dirname, "public"))); // static file setup

io.on("connection", function (socket) {
    console.log(`User connected: ${socket.id}`);

    socket.on("send-location", function (data) {
        io.emit("recevie-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", function () {
        console.log(`User disconnected: ${socket.id}`);
        io.emit("user-disconnected", socket.id);
    });
});



app.get('/', function (req, res) {
    res.render("index")
})


server.listen(3000, () => {
    console.log("Server is running on port 3000");
});