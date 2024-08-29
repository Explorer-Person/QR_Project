const express = require("express");
const route = express.Router();

const {
  adminController: { addAdmin, getAdmins, downloadQR, deleteAdmin, updateAdmin },
  authController: { loginAdmin }
} = require("@controllers");

const {validateAdmin, checkValidation} = require('@validator');

route.post("/addOne", validateAdmin, checkValidation, addAdmin);
route.put("/updateOne", validateAdmin, checkValidation, updateAdmin);
route.get("/getAll", getAdmins);
route.delete("/deleteOne/:id", deleteAdmin);



module.exports = route;
