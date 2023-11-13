const { Socket } = require("dgram");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const { setInterval } = require("timers");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files (client-side)
app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("a new user is connected");

//   setInterval(() => {
//     socket.emit("server", "This message is from server");
//   }, 3000);

socket.on('msg_send', (data)=>{

    console.log(data);
    io.emit('msg_received', data);

})

  socket.on('disconnect', ()=>{
    console.log("user disconnected")
  })
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
