const express = require('express');
const helmet = require('helmet');
const middleware = express();

middleware.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "trusted-cdn.com"], // Allow scripts from self and trusted CDNs
      "img-src": [
        "'self'", 
        "data:", 
        "trusted-cdn.com", 
        process.env.CLIENT_ADMIN,  // Allow images from the admin client domain
        process.env.CLIENT_USER,   // Allow images from the user client domain
        `${process.env.VITE_ENV_SERVER_URL}/api/user/getFile`  // Allow images from your API endpoint
      ],
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
