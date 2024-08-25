const express = require("express");
const route = express.Router();

const {
  adminController: { addUser, getUsers, downloadQR, deleteUser },
} = require("@controllers");
const {multer, jimp} = require('@middlewares')

route.post("/user/addOne", multer, jimp, addUser);
// Endpoint to download QR code
route.get("/qr/download/:filename", downloadQR);
route.get("/user/getAll", getUsers);
route.delete("/user/deleteOne/:id", deleteUser);

module.exports = route;
