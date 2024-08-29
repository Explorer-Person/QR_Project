const express = require("express");
const route = express.Router();

const {multer, jimp} = require('@middlewares')
const {validateUser, checkValidation} = require('@validator');

const {
  userController: { addUser, getUsers, downloadQR, deleteUser, updateUser, getUser, getFile },
  authController: { logoutAdmin }

} = require("@controllers");

route.post("/addOne",multer, jimp, validateUser, checkValidation, addUser);
route.put("/updateOne", multer, jimp, validateUser, checkValidation, updateUser);
// Endpoint to download QR code
route.get("/download/:filename", downloadQR);
route.get("/getAll", getUsers);
route.delete("/deleteOne/:id", deleteUser);
route.post("/logout", logoutAdmin)

module.exports = route;
