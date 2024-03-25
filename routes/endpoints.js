const router = require('express').Router();

// Stream video to client
const { videoStreamer } = require('../controllers/videoStreamController');

// Upload file from client
const { uploadFile } = require('../controllers/uploadFileController');

// Upload component
const { uploadComp } = require('../controllers/uploadComponentController');

// User signup
const { signup } = require('../controllers/signupController');

// User signin
const { signin } = require('../controllers/signinController');


// Routes for streaming video, uploading files, user signup, and signin
router.get('/streamvideo', videoStreamer); // Uncomment and customize if video streamer is needed
router.post('/upload', uploadFile);        // Uncomment and customize if file upload is needed
router.get('/uploadfile', uploadComp);     // Mock component, returns HTML form to upload file (NOT RECOMMENDED)
router.post('/signup', signup);            // Uncomment and customize to start using signup functionality
router.post('/signin', signin);            // Uncomment and customize to start using signin functionality


/* NOTE: Create additional services in '../controllers/' and import here to serve */
/* Additional routes go here... */

module.exports = router;
