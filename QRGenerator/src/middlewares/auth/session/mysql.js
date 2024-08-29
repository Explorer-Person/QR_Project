module.exports = {
    development: {
      client: 'mysql2',
      connection: {
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.PASSWORD,
        database: process.env.DB_NAME
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'mysql_migrations'
      }
    },
    production: {
      client: 'mysql2',
      connection: {
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.PASSWORD,
        database: process.env.DB_NAME
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'mysql_migrations'
      }
    }
  };
  