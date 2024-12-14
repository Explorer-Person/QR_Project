module.exports = {
  server: {
    port: 5050,
    host: '0.0.0.0'
  },
  database: {
    host: 'localhost',
    user: 'root',
    password: 'mysql1905',
    name: 'qr_db'
  },
  security: {
    sessionSecret: 'dkfjdslfjdlskfjsd',
    sessionMaxAge: 86400000,
    secureCookie: true,
    sameSite: 'none'
  },
  logging: {
    level: 'info',
    directory: '/var/log/express-app'
  },
  features: {
    enableFeatureX: true
  },
  clients: {
    admin: 'http://localhost:5189',
    user: 'http://localhost:5186'
  },
  api: {
    baseUrl: 'http://localhost:5050',
    timeout: 5000
  },
  pm2: {
    apps: [
      {
        name: 'my-app',
        script: './app.js',
        watch: true,
        env: {
          NODE_ENV: 'production'
        }
      }
    ]
  }
};
