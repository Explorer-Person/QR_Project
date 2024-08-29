module.exports = {
    up: async function (conn) {
      await conn.query(`
        CREATE TABLE IF NOT EXISTS admins (
          id VARCHAR(255) PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          role VARCHAR(255) NOT NULL
        );
      `);
    },
    down: async function (conn) {
      await conn.query(`DROP TABLE IF EXISTS admins;`);
    },
  };