const { signupService } = require('../services/signupService');
const messages = require('../common/messages');

// Controller function to handle user signup request
async function signup(req, res, next) {
    try {
        // Get email or username as per requirement
        const emailId = ''; // e.g., req.body.emailId;
        const password = req.body.password;

        // Call the signup service to handle signup logic
        const signupMessage = await signupService(emailId, password);

        // Send response indicating successful signup
        res.status(201).send({ msg: signupMessage });
    } catch (err) {
        // Catch and handle errors
        if (err === messages.USERNAME_EXISTS) {
            res.status(409).send({ msg: err });
        } else {
            res.status(500).send({
                'internal-server-error': messages.INTERNAL_ERR,
                'error-msg': err.message || err,
            });
        }
    }
}

module.exports = { signup };
