const express = require("express");
const cors = require("cors"); // read up on this
const path = require("path");
// const { createServer } = require("http");
// const { Server } = require("socket.io");

const jwtAuth = require("./routes/jwtAuth");
// const dashboard = require("./routes/dashboard");
// const communityModal = require("./routes/communityModal");
const userCommunityAPIs = require("./routes/userCommunityAPIs");
const generalCommunityAPIs = require("./routes/generalCommunityAPIs");
const postAPIs = require("./routes/post");
const chatAPIs = require("./routes/chat");
const utils = require("./utils/utils");

// const mongooseConnection = require("./db/mongoDB");
const pool = require("./db/postgreDB");
const mongoDBPool = require("./db/mongoDB");

const app = express();
const port = 9000;

// /* Initalize socket.io server  */
// const socketPort = 3000;
// // const httpServer = createServer(app);
// const io = new Server(socketPort, { cors: { origin: "*" } });

require("dotenv").config();

// app.set('socketio', io);
// app.use((req, res, next) => {
//   req.io = io;
//   return next();
// });

/* Middleware */
app.use(express.json()); // read up on this
app.use(cors({origin: "*"}));
app.use(express.static('public'))

app.use('/utils', utils);

/* Routes */
// Register and Login routes
app.use("/auth", jwtAuth);

// Dashboard route
app.use("/user", userCommunityAPIs);
app.use("/all", generalCommunityAPIs);
app.use("/post", postAPIs);
app.use("/chat", chatAPIs);


/* Listening */
app.listen(port, () => {
  console.log(`server is up, listening on port ${port}`);
});