const mysql = require("mysql2/promise");
const logger = require("../middlewares/logger");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createPool({
  host: "localhost",
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBNAME,
  dateStrings: true,
});

logger.info("Database Connected Successfully");

module.exports = connection;
