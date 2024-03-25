// Import file upload form
const { UPLOAD_COMP } = require('../views/uploadComponent');

module.exports.uploadComp = async function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(UPLOAD_COMP);
};
