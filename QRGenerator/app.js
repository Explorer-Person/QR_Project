require("module-alias/register");
require("dotenv").config();

const path = require('path');
const express = require("express");
const app = express();

const {helmet, cors} = require('@middlewares')
const { routes } = require("@routes");

const PORT = process.env.PORT || 3000;

app.use(cors);
app.use(helmet);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'clients/UserInfoPanel/dist')));
app.use(express.static(path.join(__dirname, 'clients/AdminPanel/dist')));


app.use("/api", routes);

// Serve the React app on the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'clients/UserInfoPanel/dist', 'index.html'));
});
// Serve the React app on the root URL
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'clients/AdminPanel/dist', 'index.html'));
});

// Global error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace for debugging
    const statusCode = err.status || 500;
    res.status(statusCode).json({
      success: false,
      message: err.message || "An unexpected error occurred.",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Show stack trace only in development mode
    });
});
  

app.listen(PORT, () => console.log(`App is listening to Port: ${PORT}`));
