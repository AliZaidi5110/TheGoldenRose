const winston = require('winston');
const path = require('path');

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// Tell winston that you want to link the colors
winston.addColors(colors);

// Define which logs to print based on environment
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

// Define format for logs
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// Define transports
const transports = [
  // Console transport
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }),
  
  // File transport for errors
  new winston.transports.File({
    filename: path.join(__dirname, '../logs/error.log'),
    level: 'error',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    )
  }),
  
  // File transport for all logs
  new winston.transports.File({
    filename: path.join(__dirname, '../logs/combined.log'),
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    )
  }),
];

// Create logger
const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
  exitOnError: false,
});

// Create logs directory if it doesn't exist
const fs = require('fs');
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Add request logging middleware
logger.requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const message = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;
    
    if (res.statusCode >= 400) {
      logger.error(message);
    } else {
      logger.http(message);
    }
  });
  
  next();
};

// Add error logging helper
logger.logError = (error, req = null) => {
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
  };
  
  if (req) {
    errorInfo.request = {
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    };
  }
  
  logger.error(JSON.stringify(errorInfo, null, 2));
};

// Add authentication logging
logger.logAuth = (action, userId, email, ip, userAgent, success = true, error = null) => {
  const authLog = {
    action,
    userId,
    email,
    ip,
    userAgent,
    success,
    timestamp: new Date().toISOString(),
  };
  
  if (error) {
    authLog.error = error.message;
  }
  
  if (success) {
    logger.info(`AUTH SUCCESS: ${JSON.stringify(authLog)}`);
  } else {
    logger.warn(`AUTH FAILURE: ${JSON.stringify(authLog)}`);
  }
};

// Add payment logging
logger.logPayment = (action, orderId, amount, paymentMethod, status, transactionId = null, error = null) => {
  const paymentLog = {
    action,
    orderId,
    amount,
    paymentMethod,
    status,
    transactionId,
    timestamp: new Date().toISOString(),
  };
  
  if (error) {
    paymentLog.error = error.message;
  }
  
  if (status === 'success') {
    logger.info(`PAYMENT SUCCESS: ${JSON.stringify(paymentLog)}`);
  } else {
    logger.error(`PAYMENT FAILURE: ${JSON.stringify(paymentLog)}`);
  }
};

// Add order logging
logger.logOrder = (action, orderId, userId, status, amount = null) => {
  const orderLog = {
    action,
    orderId,
    userId,
    status,
    amount,
    timestamp: new Date().toISOString(),
  };
  
  logger.info(`ORDER: ${JSON.stringify(orderLog)}`);
};

// Add admin action logging
logger.logAdminAction = (adminId, action, targetType, targetId, changes = {}) => {
  const adminLog = {
    adminId,
    action,
    targetType,
    targetId,
    changes,
    timestamp: new Date().toISOString(),
  };
  
  logger.info(`ADMIN ACTION: ${JSON.stringify(adminLog)}`);
};

module.exports = logger;