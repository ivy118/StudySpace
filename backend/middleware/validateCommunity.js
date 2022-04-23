const pool = require("../db/db");

module.exports = async (req, res, next) => {
  try {
    const {communityName} = req.body;
    const communityQuery = await pool.query(`SELECT * FROM all_communities WHERE community_name = '${communityName}'`);

    if (communityQuery.rowCount == 0) {
      return res.status(500).json(`Community ${communityName} does not exist.`);
    }

    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Sever error at validateCommunity.")
  }
}