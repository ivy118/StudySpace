const jwt = require("jsonwebtoken");
require("dotenv").config();

// Validates the jwtToken of the current user
module.exports = async (req, res, next) => {
  try {
    // Get the jwtToken
    const jwtToken = req.header("token");

    // Check if the jwtToken exists
    if (!jwtToken) {
      return res.status(403).json("Not Authorized");
    }

    // Verify the jwtToken
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    req.user = payload.user;

    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Not Authorize");
  }
};
