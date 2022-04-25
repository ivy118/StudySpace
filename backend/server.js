const express = require("express");
const cors = require("cors"); // read up on this
const path = require("path");

const jwtAuth = require("./routes/jwtAuth");
// const dashboard = require("./routes/dashboard");
// const communityModal = require("./routes/communityModal");
const userCommunityAPIs = require("./routes/userCommunityAPIs");
const generalCommunityAPIs = require("./routes/generalCommunityAPIs");
const postAPIs = require("./routes/post");
const populateCommunities = require("./utils/populateCommunities");

const app = express();
const port = 9000;

require("dotenv").config();

/* Middleware */
app.use(express.json()); // read up on this
app.use(cors());
app.use(express.static('public'))

app.use('/utils', populateCommunities);

/* Routes */
// Register and Login routes
app.use("/auth", jwtAuth);

// Dashboard route
app.use("/user", userCommunityAPIs);
app.use("/", generalCommunityAPIs);
app.use("/post", postAPIs);


/* Listening */
app.listen(port, () => {
  console.log(`server is up, listening on port ${port}`);
});
