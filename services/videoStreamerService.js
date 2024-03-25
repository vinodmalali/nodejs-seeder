const fs = require("fs");

// Function to handle video streaming logic
function videoStreamerService(req, videoPath) {
    return new Promise((resolve, reject) => {
        try {
            // Ensure there is a range given for the video
            const range = req.headers.range;

            /* For further use stream to serve multiple video stream, 
               map each video path with a unique id and send to the client
               the client sends id along with range, then serve that video
            */
            // Get video stats
            const videoSize = fs.statSync(videoPath).size;

            if (!range) {
                // If no range is specified, serve the entire video
                resolve({ range: null, videoPath, videoSize });
            } else {
                // Chunk size for partial content delivery
                const CHUNK_SIZE = (10 ** 6) * 1; // 1MB

                // Parse Range
                // Example: "bytes=32324-" -> 32324
                const start = Number(range.replace(/\D/g, ""));

                const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

                // Calculate content length to be delivered
                const contentLength = end - start + 1;

                // Create headers
                const headers = {
                    "Content-Type": "video/mp4",
                    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": contentLength,
                };

                // Resolve with necessary data for partial content delivery
                resolve({ range, headers, videoPath, start, end });
            }
        } catch (err) {
            // Reject with error if any occurs
            reject(err);
        }
    });
}

module.exports = { videoStreamerService };
