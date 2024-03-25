const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const messages = require('../common/messages');

// Import any other necessary modules

// Function to handle user sign-in logic
async function signinService(email, password) {
    // SQL query to get the details of user using email or username
    const sql = ``;

    // Query parameters to be used in the SQL query
    const queryParams = [];

    return new Promise((resolve, reject) => {
        // Execute the SQL query
        pool.query(sql, queryParams, (err, result) => {
            if (err) {
                reject(err);
            } else if (!result.length) {
                // If user does not exist
                reject(messages.EMAIL_OR_PASS_INCORRECT);
            } else {
                // Access the password of the user from the query result
                const passFromDb = ''; // e.g., result[0]['passwordSalt'];
                bcrypt.compare(password, passFromDb, (bErr, bResult) => {
                    if (bErr) {
                        // Error in bcrypt comparison
                        reject(messages.EMAIL_OR_PASS_INCORRECT);
                    } else if (bResult) {
                        // Passwords match, generate JWT for user
                        const userDetailsForJWT = {
                            id: result[0].id,
                            emailId: result[0].emailId,
                            role: result[0].roleId
                        };

                        // Generate new JWT for user along with their details
                        const token = jwt.sign(userDetailsForJWT, process.env.TOKEN_KEY, { expiresIn: '24h' });

                        /* 
                        Add data in the `userDetails` object
                        e.g.,
                            userDetails.id = encrypt(result[0].id);
                            userDetails.fName = result[0].fName;
                            userDetails.lName = result[0].lname;
                            userDetails.emailId = result[0].emailId;
                        */
                        const userDetails = {}; // Placeholder for user details

                        resolve({ token, userDetails });
                    } else {
                        // Passwords don't match
                        reject('Username or password is incorrect!');
                    }
                });
            }
        });
    });
}

module.exports = { signinService };
