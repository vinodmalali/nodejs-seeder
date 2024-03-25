const jwt = require("jsonwebtoken");
require('dotenv').config();

/**
 * Middleware function to verify JWT token.
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next function
 */
const verifyToken = async (req, res, next) => {
    // Extract token from request headers, query parameters, or request body
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        // If token is not provided, return 403 Forbidden status
        return res.status(403).send("A token is required for authentication");
    }

    try {
        // Verify the token using the secret key (TOKEN_KEY) stored in environment variable
        const decoded = await jwt.verify(token, process.env.TOKEN_KEY);

        // Attach decoded user information to request object for further processing
        req.user = decoded;

    } catch (err) {
        // If token is invalid, return 401 Unauthorized status
        return res.status(401).send("Invalid Token");
    }

    // Call next middleware in the chain
    return next();
};

module.exports = verifyToken;
