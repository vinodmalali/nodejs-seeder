const { createPool } = require("mysql");
const util = require('util');
require('dotenv').config();
const messages = require('../common/messages');

// Create a MySQL connection pool
const pool = createPool({
    port: process.env.MYSQL_PORT,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME
});

// Handle errors and connections in the pool
pool.getConnection((err, connection) => {
    if (err) {
        // Handle connection errors
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error(messages.PROTOCOL_CONNECTION_LOST);
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error(messages.ER_CON_COUNT_ERROR);
        }
        if (err.code === 'ECONNREFUSED') {
            console.error(messages.ECONNREFUSED);
        }
    }
    if (connection) {
        // Release the connection if it's available
        connection.release();
    }
    return;
});

// Promisify the query method for Node.js async/await.
pool.query = util.promisify(pool.query);

module.exports = pool;
