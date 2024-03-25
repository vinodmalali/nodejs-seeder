const fs = require("fs");
const multiparty = require("multiparty");
const path = require("path");
const messages = require('../common/messages');

// Function to handle file upload logic
function uploadFileService(req) {
    return new Promise((resolve, reject) => {
        try {
            // Create a new instance of multiparty form
            const form = new multiparty.Form();

            // Event listener for each part of the form
            form.on('part', (part) => {
                if (part.filename != '', part.byteCount != 0) {
                    console.log(part);
                    // Define the upload directory
                    const uploadDir = path.join(__dirname, '..', 'uploads');

                    // Define the file path
                    const filePath = path.join(uploadDir, part.filename);

                    // Pipe the file to create a write stream
                    part.pipe(fs.createWriteStream(filePath));

                    // Event listener for the end of the part
                    part.on('end', () => {
                        resolve({ success: true, message: messages.UPLOAD_SUCCESS });
                    });
                }
                else{
                    reject({FAILED_UPLOAD: "File can't be null"});
                }
            });

            // Parse the incoming request form
            form.parse(req);
        } catch (err) {
            reject({ success: false, message: messages.UPLOAD_FAIL });
        }
    });
}

module.exports = { uploadFileService };
