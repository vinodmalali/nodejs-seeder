const pool = require('../config/databaseConfig');
const bcrypt = require('bcryptjs');
const messages = require('../common/messages');

// Function to handle user signup logic
async function signupService(email, password) {
    // Query to check if email or username already used or not
    const sql = ``;

    // Add email or username or any other query params here
    const queryParams = [];

    return new Promise((resolve, reject) => {
        // Execute query
        pool.query(sql, queryParams, (err, result) => {
            if (err) {
                reject(err);
            } else if (result.length) {
                // If email or username already exists
                reject(messages.USERNAME_EXISTS);
            } else {
                // Generate salt for password hashing
                const salt = bcrypt.genSaltSync(10);

                // Generate a hashed password
                const hash = bcrypt.hashSync(password, salt);

                // Create query to register the user
                const registerUserQuery = ``;

                // Add email or username, password, and other query params here
                const registerUserQueryParams = [];

                // Execute query to register the user
                pool.query(registerUserQuery, registerUserQueryParams, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    // User registered successfully
                    resolve(messages.SIGNUP_SUCCESS);
                });
            }
        });
    });
}

module.exports = { signupService };
