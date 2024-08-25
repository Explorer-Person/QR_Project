const express = require('express');
const multer = require('multer');
const path = require('path');

const middleware = express();

// Set storage engine
const storage = multer.diskStorage({
  destination: './src/uploads/', // Folder to save images
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('file'); // 'image' is the name of the form field

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/; // Allowed extensions
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Route to handle file upload
middleware.use((req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err });
    } else {
      if (req.file == undefined) {
        res.status(400).send({ message: 'No file selected!' });
      } else {
        next();
      }
    }
  });
});

module.exports = middleware;