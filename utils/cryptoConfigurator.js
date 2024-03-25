const crypto = require('crypto');

/**
 * Generates a random string of specified length.
 * @param {number} length - The length of the random string.
 * @returns {string} - The generated random string.
 */
function generateRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') // Convert to hexadecimal format
        .slice(0, length); // Trim to desired length
}

// Generate a secret key of length 32
const secretKey = generateRandomString(32);

console.log("SECRET_KEY =", `"${secretKey}"`);

// Define the length of the initialization vector (IV) in bytes
const ivLengthInBytes = 8;

// Generate a random IV of specified length
const iv = crypto.randomBytes(ivLengthInBytes).toString('hex');

console.log("SECRET_IV =", `"${iv}"`);
