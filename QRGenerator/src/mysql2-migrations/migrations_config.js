// mysql2-migrations/migrations/1667598634512_create_user_table.js
module.exports = {
    name: 'Create User Table',
    up: (conn, cb) => {
        const query = `
            CREATE TABLE IF NOT EXISTS user (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255), 
                surname VARCHAR(255),
                phone VARCHAR(255),
                role VARCHAR(255),
                email VARCHAR(255),
                tcNumber VARCHAR(255),
                bornDate DATE,
                img LONGTEXT,
                targetUrl LONGTEXT,
                shortUrl LONGTEXT,
                qrPath MEDIUMTEXT
            );
        `;
        conn.query(query, (error, results) => {
            if (error) {
                console.error('Error creating user table:', error);
            }
            cb(error, results);
        });
    },
    down: (conn, cb) => {
        const query = 'DROP TABLE IF EXISTS user;';
        conn.query(query, (error, results) => {
            if (error) {
                console.error('Error dropping user table:', error);
            }
            cb(error, results);
        });
    }
};
