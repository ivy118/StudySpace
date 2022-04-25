const express = require("express");
const cors = require("cors"); // read up on this
const path = require("path");
const { createServer } = require("http");
const socketIO = require("socket.io");

const jwtAuth = require("./routes/jwtAuth");
// const dashboard = require("./routes/dashboard");
// const communityModal = require("./routes/communityModal");
const userCommunityAPIs = require("./routes/userCommunityAPIs");
const generalCommunityAPIs = require("./routes/generalCommunityAPIs");
const postAPIs = require("./routes/post");
const chatRoom = require("./routes/chatRoom");
const populateCommunities = require("./utils/populateCommunities");

const app = express();
const httpServer = createServer(app);
const io = new socketIO(httpServer, { cors: { origin: "*" } });
const port = 9000;

require("dotenv").config();

app.set('socketio', io);
// app.use((req, res, next) => {
//   req.io = io;
//   return next();
// });

/* Middleware */
app.use(express.json()); // read up on this
app.use(cors({origin: "*"}));
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/utils', populateCommunities);

/* Routes */
// Register and Login routes
app.use("/auth", jwtAuth);

// Dashboard route
app.use("/user", userCommunityAPIs);
app.use("/generalCommunity", generalCommunityAPIs);
app.use("/post", postAPIs);


/* Listening */
app.listen(port, () => {
  console.log(`server is up, listening on port ${port}`);
});
