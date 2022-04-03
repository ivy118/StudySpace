const express = require("express");
const cors = require("cors"); // read up on this
const path = require("path");

const jwtAuth = require("./routes/jwtAuth");
const dashboard = require("./routes/dashboard");

const app = express();
const port = 9000;

/* Middleware */
app.use(express.json()); // read up on this
app.use(cors());
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.send('hello world')
})

/* Routes */
// Register and Login routes
app.use("/auth", jwtAuth);

// Dashboard route
app.use("/dashboard", dashboard);

/* Listening */
app.listen(port, () => {
  console.log(`server is up, listening on port ${port}`);
});
