const router = require("express").Router();
const pool = require("../db/db");

/*
  /getAllCommunities - Get all communities
  Frotend: get request
  Backend: array[String] of all communities
 */
router.get("/getAllCommunities", async (req, res) => {
  try {
    const communitiesQuery = await pool.query(`SELECT community_name FROM all_communities;`);
    const communities = communitiesQuery.rows.map((obj) => obj.community_name).sort();
    res.json(communities);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Sever Error");
  }
});

module.exports = router;