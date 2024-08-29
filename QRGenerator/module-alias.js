
// module-alias.js
const moduleAlias = require('module-alias');
const path = require('path');

moduleAlias.addAliases({
  '@db': path.resolve(__dirname, 'src/db'),
  '@middlewares': path.resolve(__dirname, 'src/middlewares'),
  '@controllers': path.resolve(__dirname, 'src/controllers'),
  '@models': path.resolve(__dirname, 'src/models'),
  '@routes': path.resolve(__dirname, 'src/routes'),
  '@queries': path.resolve(__dirname, 'src/queries'),
  '@utils': path.resolve(__dirname, 'src/utils'),
  '@validator': path.resolve(__dirname, 'src/validator'),
  '@handlers': path.resolve(__dirname, 'src/handlers'),
});