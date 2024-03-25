const { signinService } = require('../services/signinService');
const messages = require('../common/messages');

// Controller function to handle user sign-in request
async function signin(req, res, next) {
    try {
        // Get email or username as per requirement
        const emailId = ''; // e.g., req.body.emailId;
        const password = req.body.password;

        // Call the signin service to handle sign-in logic
        const { token, userDetails } = await signinService(emailId, password);

        // Send response with token and user details
        res.status(200).send({
            msg: 'Logged in!',
            token,
            user: userDetails
        });
    } catch (err) {
        // Catch and handle errors
        if (err === messages.EMAIL_OR_PASS_INCORRECT) {
            res.status(400).send({ msg: err });
        } else {
            res.status(500).send({
                'internal-server-error': messages.INTERNAL_ERR,
                'error-msg': err.message || err,
            });
        }
    }
}

module.exports = { signin };
