const pool = require("../db/db");
/** Checks if the subject is in the database */
module.exports = async (req, res, next) => {
  try {
    const { subjectTitle } = req.body;
    const subject = await pool.query(
      "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = $1",
      [subjectTitle]
    );
    req.subject = subject;
    next();
  } catch (err) {
    console.err(err.message);
    res.status(500).json("Database Error");
  }
};
