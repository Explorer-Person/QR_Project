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

const { sendResponse } = require("@handlers");

middleware.use((req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
       if (err.code === 'LIMIT_FILE_SIZE') {
        return sendResponse(
          res,
          'File size can not be above 15MB...',
          "error",
          false,
          400
        );
       }
       return sendResponse(
        res,
        {fileError: err},
        "error",
        false,
        400
      );
    } else {
      if(!req.file && !req.body.data.info.img){
        return sendResponse(
          res,
          'File is required!',
          "error",
          false,
          400
        );
      }

      req.body.data = req.file ? JSON.parse(req.body.data) : req.body.data;
      next();
    }
  });
});


module.exports = middleware;