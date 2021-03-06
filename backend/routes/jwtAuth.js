const router = require("express").Router();
const pool = require("../db/postgreDB");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

/* Registering */
router.post("/signup", validInfo, async (req, res) => {
  try {
    // 1. Destructure the req.body
    const { username, firstname, lastname, email, password } = req.body;

    // 2. Check if user exist (if user exist then throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_name = $1 OR user_email = $2", [
      username, email, 
    ]);

    // If user already exists in database
    if (user.rows.length !== 0) {
      res.status(200).send(`This ${user.rows[0].user_name === username ? "username" : "email address"} is already in use.`);
    }

    // 3. Bcrypt the user password
    const saltRound = 10; 
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // 4. Enter the new user inside our database
    const newUser = await pool.query(
      "INSERT INTO users (user_name, first_name, last_name, user_email, user_password, user_communities) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [username, firstname, lastname, email, bcryptPassword, []]
    );

    // 5. generating our JWT token
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/* Login */

router.post("/login", validInfo, async (req, res) => {
  try {
    // 1. Destructure the req.body
    const { email, password } = req.body;

    // 2. Check if user doesn't exist (if not hten we throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(200).json("Password or email is incorrect.");
    }

    // 3. Check if incoming password is the same the database password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    if (!validPassword) {
      return res.status(200).json("Password or Email is incorrect");
    }

    // 4. Give the JWT Token
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error at jwtGenerator, jwtAuth, line 75");
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.log("rrr",err.message);
    res.status(500).send("Server Error in is-verify");
  }
});

module.exports = router;
