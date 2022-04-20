const router = require("express").Router();
const pool = require("../db/db");
const authorization = require("../middleware/authorization");


router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

/*
  /getUsersCommunities - Get all personal communities
  Frontend: posts request, req.body = email
  Backend: array[String] all communities this user is in, sort them alphabetically
 */
router.get("/getUsersCommunities", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_communities FROM users WHERE user_id = $1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

/*
  /getAllCommunities - Get all communities
  Frontend: get request
  Backend: array[String] of all communities
 */
router.get("/getAllCommunities", authorization, async (req, res) => {

});

/*
  /addCommunity - Add communities for the user
  Frontend: a post request, req.body: [email, communityToAdd]
  Backend: posts them into the database
 */
router.post("/addCommunity", authorization, async (req, res) => {

});

module.exports = router;
