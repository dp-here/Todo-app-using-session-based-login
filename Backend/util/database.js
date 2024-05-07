const mysql = require('mysql2');
const config = require('../config/config.json');

const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database: ', err.message);
    } else {
        console.log('Connected to the database.');
        connection.release();
    }
});

const promisePool = pool.promise();

module.exports = promisePool;
