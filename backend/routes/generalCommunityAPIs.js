const router = require("express").Router();
const pool = require("../db/db");

/*
  /getAllCommunities - Get all communities
  Frotend: get request
  Backend: array[String] of all communities
 */
router.get("/getAllCommunities", async (req, res) => {
  res.send("Hits");
});

module.exports = router;