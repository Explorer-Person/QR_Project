const express = require('express');
const routes = express.Router();

const adminRoutes = require('./admin');
const userRoutes = require('./user');

routes.use('/admin', adminRoutes);
routes.use('/user', userRoutes);


// (next) => {
//     console.log("request caught");
//     next();
//   }

module.exports = routes;