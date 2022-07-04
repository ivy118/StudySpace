const pg = require("pg");

require("dotenv").config();

const pgUser = process.env.PG_USER;
const pgPassword = process.env.PG_PASSWORD;
const pgHost = process.env.PG_HOST;
const pgPort = process.env.PG_PORT;
const pgDatabase = process.env.PG_DATABASE;

const pool = new pg.Pool({
  user: pgUser,
  password: pgPassword,
  host: pgHost,
  port: pgPort,
  database: pgDatabase,
});

module.exports = pool;


