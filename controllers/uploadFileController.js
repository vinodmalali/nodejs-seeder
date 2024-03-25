const { uploadFileService } = require('../services/uploadFileService');
const messages = require('../common/messages');

// Controller function to handle file upload request
async function uploadFile(req, res) {
    try {
        // Call the upload file service to handle file upload logic
        const { success, message } = await uploadFileService(req);

        // Send response indicating successful or failed upload
        if (success) {
            res.status(201).json({ success, 'upload-status': message });
        } else {
            res.status(500).json({ success, 'upload-status': message });
        }
    } catch (err) {
        // Catch and handle errors
        res.status(500).json({ success: false, 'upload-status': messages.UPLOAD_FAIL });
    }
}

module.exports = { uploadFile };
