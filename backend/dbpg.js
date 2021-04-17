require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.LOCAL_IP,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  post: 8090,
});

module.exports = pool;
