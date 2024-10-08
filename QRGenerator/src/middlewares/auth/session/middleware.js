const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const { v4: genuuid } = require('uuid');
const mysql = require('mysql2/promise');

// Create the MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Session store configuration
const store = new MySQLStore({}, pool);

const middleware = express();


let sess = {
  genid: function (req) {
    return genuuid();
  },
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: store
};

if(process.env.NODE_ENV === 'production' ){
  middleware.set('trust proxy', 1); // trust first proxy
}

middleware.use(session(sess));

module.exports = middleware;
