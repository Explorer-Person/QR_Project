const express = require('express');
const routes = express.Router();

const adminRoutes = require('./admin');
const userRoutes = require('./user');
const generalRoutes = require('./general');
const {auth} = require('@middlewares')


routes.use('/authorized/admin', auth.check.rootAdminCheck, adminRoutes);
routes.use('/authorized/user', auth.check.adminCheck, userRoutes);
routes.use('/public', generalRoutes);


module.exports = routes;
