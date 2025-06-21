const mysql2 = require('mysql2')
// require('dotenv').config()


const dbConnection = mysql2.createPool({
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})


module.exports = dbConnection.promise()