const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Nitin@123",
    database:"ProjectUnion",
    dateStrings:true
})

console.log("Database Connected Successfully");

module.exports = connection;