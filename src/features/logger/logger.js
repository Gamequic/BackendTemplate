const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

// Get date
const date = new Date().toISOString().split('T')[0];

// Format for the logs
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
    level: 'info', // (ex. 'debug', 'info', 'warn', 'error')
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console(), // See logs on the console
        new transports.File({ filename: `./logs/${date}.log` }) // Safe logs on a file
    ],
});

module.exports = logger;
