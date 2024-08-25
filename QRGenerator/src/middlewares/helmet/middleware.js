const express = require('express');
const helmet = require('helmet');
const middleware = express();

middleware.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "trusted-cdn.com"], // Only allow scripts from self and trusted CDNs
      "img-src": ["'self'", "data:", "trusted-cdn.com"], // Allow images from self, data URLs, and trusted CDNs
      "style-src": ["'self'", "'unsafe-inline'", "trusted-cdn.com"], // Allow inline styles and styles from trusted CDNs
      "connect-src": ["'self'", process.env.CLIENT_ADMIN, process.env.CLIENT_USER], // Allow connections only to specific origins
    },
  },
  referrerPolicy: { policy: "no-referrer" }, // No referrer information is sent
  frameguard: { action: "deny" }, // Prevent clickjacking by denying framing
  xssFilter: true, // Enable XSS filter
  noSniff: true, // Prevent MIME type sniffing
  hidePoweredBy: true, // Hide "X-Powered-By" header
}));

module.exports = middleware;
