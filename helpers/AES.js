const crypto = require('crypto');
const messages = require('../common/messages');
require('dotenv').config();

module.exports = {
    /**
     * Encrypts the given data using AES-256-CBC algorithm.
     * @param {string} data - The data to be encrypted.
     * @returns {string} - The encrypted data.
     * @throws {Error} - If encryption fails.
     */
    encrypt: function (data) {
        try {
            const cipher = crypto.createCipheriv('aes-256-cbc', process.env.SECRET_KEY, process.env.SECRET_IV);
            let encrypted = Buffer.concat([cipher.update(data.toString(), 'utf8'), cipher.final()]);
            return encrypted.toString('base64');
        } catch (error) {
            console.error('Encryption error:', error.message);
            throw new Error(messages.ENCRYPTION_ERROR_MESSAGE);
        }
    },

    /**
     * Decrypts the given data using AES-256-CBC algorithm.
     * @param {string} data - The data to be decrypted.
     * @returns {string} - The decrypted data.
     * @throws {Error} - If decryption fails.
     */
    decrypt: function (data) {
        try {
            const bData = Buffer.from(data, 'base64');
            const decipher = crypto.createDecipheriv('aes-256-cbc', process.env.SECRET_KEY, process.env.SECRET_IV);
            var decrypted = decipher.update(bData, 'binary', 'utf8') + decipher.final('utf8');
            return decrypted;
        } catch (error) {
            console.error('Decryption error:', error.message);
            throw new Error(messages.DECRYPTION_ERROR_MESSAGE);
        }
    }
};
