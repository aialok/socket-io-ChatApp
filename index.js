const connect = require('./config/database.js')
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const { setInterval } = require("timers");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("a new user is connected");


socket.on('msg_send', (data)=>{

    console.log(data);
    io.emit('msg_received', data);

})

  socket.on('disconnect', ()=>{
    console.log("user disconnected")
  })
});

app.set('view engine', 'ejs');

app.get('/chat/:roomId', (req,res)=>{
    res.render('index', {
        username : "Alok Gupta",
        id : req.params.roomId
    });
})

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT,async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connect();
});
