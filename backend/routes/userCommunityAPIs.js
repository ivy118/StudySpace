const router = require("express").Router();
const pool = require("../db/db");
const authorization = require("../middleware/authorization");


router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query(`SELECT user_name FROM users WHERE user_id = ${req.user}`);
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
    const { email } = req.body;
    const user = await pool.query(`SELECT user_communities FROM users WHERE user_email = '${email}'`);
    const userCommunities = user.rows[0];
    res.json(userCommunities);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error at getUsersCommunities route in userCommuntyAPIs.js.");
  }
});

/*
  /addCommunity - Add communities for the user
  Frontend: a post request, req.body: [email, communityToAdd]
  Backend: posts them into the database
 */
router.post("/addCommunity", authorization, async (req, res) => {
  try {
    const { communityToAdd, email } = req.body;
    await pool.query(`UPDATE users SET user_communities = array_append(user_communities, ${communityToAdd}) WHERE user_email = ${email}`);
    res.json("Successfully added the community.");
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error at addCommunity route in userCommunityAPIs.js.");
  }
});

module.exports = router;
