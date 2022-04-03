const pg = require("pg");
//postgres://cgpagjtj:xnWP_fT9RxbfqgUKKjeZRB2ggoGMeI0z@castor.db.elephantsql.com/cgpagjtj
//cgpagjtj@castor.db.elephantsql.com
//psql -h castor.db.elephantsql.com -p 5432 -d cgpagjtj -U cgpagjtj -W

const pool = new pg.Pool({
  user: "cgpagjtj",
  password: "xnWP_fT9RxbfqgUKKjeZRB2ggoGMeI0z",
  host: "castor.db.elephantsql.com",
  port: 5432,
  database: "cgpagjtj",
});

module.exports = pool;


