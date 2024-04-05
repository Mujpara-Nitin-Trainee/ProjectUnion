const mysql = require('mysql2/promise');
const logger = require('../middlewares/logger');

const connection = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Nitin@123",
    database:"ProjectUnion",
    dateStrings:true
})

logger.info("Database Connected Successfully");

module.exports = connection;