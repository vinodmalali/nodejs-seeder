const fs = require("fs");
const { videoStreamerService } = require('../services/videoStreamerService');
const path = require('path');

// Controller function to handle video streaming request
async function videoStreamer(req, res) {
    try {

        // Used sample video for streaming, Add correct video path which you want to play
        const videoPath_ = path.resolve(__dirname, '..', 'uploads', '2.mp4');

        // Call the video streamer service to handle video streaming logic
        const { range, headers, videoPath, start, end, videoSize } = await videoStreamerService(req, videoPath_);

        if (!range) {
            // If no range is specified, serve the entire video
            res.writeHead(200, {
                'Content-Type': 'video/mp4'
            });
            // Stream the entire video file to the client
            fs.createReadStream(videoPath).pipe(res);
        } else {
            // HTTP Status 206 for Partial Content delivery
            res.writeHead(206, headers);

            // Create video read stream for this particular chunk
            const videoStream = fs.createReadStream(videoPath, { start, end });

            // Stream the video chunk to the client by piping chunk to res object
            videoStream.pipe(res);
        }
    } catch (err) {
        // Catch and handle errors
        res.status(500).send({ error: err.message || err });
    }
}

module.exports = { videoStreamer };
