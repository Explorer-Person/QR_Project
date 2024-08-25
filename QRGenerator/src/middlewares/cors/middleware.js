require("dotenv").config();
const express = require('express');
const cors = require('cors');
const middleware = express();

const corsOptions = {
  origin: [
    `${process.env.CLIENT_ADMIN}`, 
    `${process.env.CLIENT_USER}`,
  ], // Only allow these origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow credentials like cookies
  optionsSuccessStatus: 204 // Response status for successful OPTIONS requests
};

middleware.use(cors(corsOptions));


module.exports = middleware;
