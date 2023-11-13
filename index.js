const connect = require("./config/database.js");
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const socketIO = require("socket.io");
const { setInterval } = require("timers");
const Chat = require("./models/chat.js");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

io.on("connection", (socket) => {
  console.log("a new user is connected");

  socket.on("join_room", async (data) => {
    console.log(data.roomId);
    socket.join(data.roomId);
  });

  socket.on("msg_send", async (data) => {
    const chat = await Chat.create({
      user: data.username,
      roomId: data.roomId,
      content: data.msg,
    });

    io.to(data.roomId).emit("msg_received", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    const count = io.engine.clientsCount;
    io.emit("active_user", count);
  });

  const count = io.engine.clientsCount;
  io.emit("active_user", count);
});

app.set("view engine", "ejs");

app.get("/chat", async (req, res) => {
  const chats = await Chat.find({ roomId: req.query.roomId });

  res.render("index", {
    id: req.query.roomId,
    chats,
    username: req.query.username,
  });
});

app.get("/", (req, res) => {
  res.render("Home");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connect();
});
