// index.js
const express = require("express");
const { createServer: createHttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const morgan = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./Routes/ServiceEngineerRoutes/ServiceEnggRoute");
const clientRoutes = require("./Routes/ClientRoutes/ClientRoutes");
const AdminRoutes = require("./Routes/AdminRoutes/AdminRoute");
const chatRoute = require("./Routes/ChatRoute/ChatRoute");
const { watchNotifications } = require("./Notification/notification");

const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// ------ Routes ------
// ---------service engg routes---------
app.use("/api/serviceEngg", router);

// -------------client routes----------
app.use("/api/client", clientRoutes);

// ---------------AdminRoutes-----------
app.use("/api/admin", AdminRoutes);

// ------------chatRoute-------------
app.use("/api/chat", chatRoute);

app.use("/api/document/:foldername/:filename",(req,res)=>{
  const filename = req.params.filename
  const foldername = req.params.foldername
  const filepath = path.join(__dirname,`public/${foldername}`,filename)
  res.sendFile(filepath)
});

main().catch((err) => console.log(err));

async function connectDB() {
  await mongoose.connect(process.env.MONGO_DB_URL);
  console.log("Database connected successfully");
}

async function main() {
  await connectDB();
  await watchNotifications(io);
}

// Create HTTP server for Express app
const httpServer = createHttpServer(app);

// Listen on separate ports for HTTP and Socket.IO
const httpPort = process.env.PORT || 3000;
const socketPort = process.env.SOCKET_PORT || 4000;

const io = new SocketServer(httpServer, {
  cors: {
    origin: ["*"],
    credentials: true,
  },
  allowEIO3: true,
});

// Listen for new connections
io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  socket.on("aloo", (recivedMessaege) => {
    console.log("message si recives", recivedMessaege)
    io.emit('messagerecieved', recivedMessaege)
  });

  socket.on('newEnggmessage', (messageRecives) => {
    console.log("pankaj side", messageRecives);
    io.emit("EnggNewMessage", messageRecives)
  })
});

httpServer.listen(socketPort, () => {
  console.log(`Socket.IO server listening on port ${socketPort}`);
});

app.listen(httpPort, () => {
  console.log(`HTTP server listening on port ${httpPort}`);
});

