const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const csrf = require('csurf');

// Importing perf_hooks
const { PerformanceObserver, performance } = require('perf_hooks');

// Loading environment variables from a .env file
require('dotenv').config();

// Importing the routes for the API endpoints
const routes = require('./routes/endpoints');

// Importing messages
const messages = require('./common/messages');

// Importing constants
const { CSRF_PROTECTED_ENDPOINTS } = require('./common/constants');

// Creating an instance of the Express application
const app = express();

// Total requests completed since server start
let requestCount = 0;

// Total response time since server start
let totalResponseTime = 0;

// Handling unhandled promise rejections
process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at:', p, 'reason:', reason);
});

// Handling uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

// Middleware to calculate response time using perf_hooks
app.use((req, res, next) => {
    const start = performance.now(); // Using performance.now() instead of Date.now()

    res.on('finish', () => {
        const end = performance.now(); // Using performance.now() instead of Date.now()
        const responseTime = end - start;
        totalResponseTime += responseTime;
        requestCount++;
    });

    next();
});

// Parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Parsing JSON bodies
app.use(bodyParser.json());

// CORS Middleware
app.use(cors({
    origin: '*', // Allowing requests from any origin
    methods: 'POST, GET, OPTIONS, DELETE', // Allowing specific HTTP methods
    credentials: false // Disabling credentials for CORS
}));

// XSS Protection Middleware
app.use(helmet.crossOriginEmbedderPolicy());

// CSRF Protection Middleware for authorized endpoints
app.use(CSRF_PROTECTED_ENDPOINTS, csrf({ cookie: true }));

// Mounting the routes for API endpoints
app.use('/api', routes);

// Heartbeat endpoint
app.get('/heartbeat', async (req, res) => {
    try {
        const averageResponseTime = requestCount > 0 ? totalResponseTime / requestCount : 0;
        const serverTimestamp = new Date().toISOString();

        res.status(200).json({
            'server-status': messages.SERVER_UP,
            'requests-completed': requestCount,
            'average-response-time': averageResponseTime.toFixed(2), // Limit to 2 decimal places
            'server-timestamp': serverTimestamp
        });
    } catch (err) {
        console.error('Error occurred while processing heartbeat:', err);
        res.status(500).send({ 'server-status': messages.SERVER_CHECK_FAIL });
    }
});

// Defining the port for the server to listen on
const port = process.env.PORT || 3000;

// Starting the server and listening on the specified port
app.listen(port, (err) => {
    if (err) {
        console.error('Error in running the server:', err);
        process.exit(1); // Exiting process on error
    }
    console.log(`Server is running on port: ${port}`);
});

// Create a PerformanceObserver to reset metrics every hour
const obs = new PerformanceObserver((items) => {
    requestCount = 0;
    totalResponseTime = 0;
});

obs.observe({ entryTypes: ['measure'] });
