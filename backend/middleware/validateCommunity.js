const pool = require("../db/postgreDB");

// Checks if the communityName exists in the DB
module.exports = async (req, res, next) => {
  console.log("at valiadate")
  try {
    // Query into the db for communityName
    const { communityName } = req.body;
    const communityQuery = await pool.query(`SELECT * FROM all_communities WHERE community_name = $1`, [communityName]);
    console.log(communityQuery)
    // If it doesn't exist then return an error
    if (communityQuery.rowCount == 0) {
      return res.status(500).json(`Community ${communityName} does not exist.`);
    }

    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Sever error at validateCommunity.")
  }
}