// mysql2-migrations/migrations/1667598634512_create_user_table.js
// db/db.js
const migration = require('mysql-migrations');
const mysql = require('mysql2');
require('dotenv').config();


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});

migration.init(pool, __dirname);

