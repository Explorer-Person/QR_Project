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



// Serve static files for AdminPanel
app.use('/', express.static(path.join(__dirname, 'clients/AdminPanel/dist')));
// Serve static files for UserInfoPanel
app.use('/user/', express.static(path.join(__dirname, 'clients/UserInfoPanel/dist')));

// Serve the UserInfoPanel app on the root URL
app.get('/user/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'clients/UserInfoPanel/dist', 'index.html'));
});

// Serve the AdminPanel app on the /admin URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'clients/AdminPanel/dist', 'index.html'));
});

// API routes
app.use("/api", routes);



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
