const { executeQuery } = require('@db');

async function userModel() {
    try {
        console.log("Creating table if not exists...");
        const query = `
            CREATE TABLE IF NOT EXISTS users (
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
        await executeQuery(query);
        console.log('Table created successfully or already exists!');
    } catch (err) {
        console.error('Error creating table:', err);
        throw err;  // Re-throw the error to see if it is causing issues
    }
}

module.exports = userModel;
