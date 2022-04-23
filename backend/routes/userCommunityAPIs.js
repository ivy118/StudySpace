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
      "SELECT user_communities FROM users WHERE user_email = $1",
      [req.email]
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

/*
  /addCommunity - Add communities for the user
  Frontend: a post request, req.body: [email, communityToAdd]
  Backend: posts them into the database
 */
router.post("/addCommunity", authorization, async (req, res) => {
  try {
    await pool.query(`UPDATE users SET user_communities = array_append(user_communities, ${req.communityToAdd}) WHERE user_email = ${req.email}`);
    res.json("Successfully added the community.");
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
