const auth = require('./auth');
const multer = require('./multer');
const helmet = require('./helmet');
const cors = require('./cors');
const jimp = require('./jimp');

module.exports = { auth, jimp, multer, cors, helmet};