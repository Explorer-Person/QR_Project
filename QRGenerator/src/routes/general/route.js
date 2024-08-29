const express = require("express");
const route = express.Router();
const path = require("path");
const fs = require("node:fs");

const {
  userController: { getUser, getFile },
  authController: { loginAdmin }
} = require("@controllers");
const {validateLogin, checkValidation} = require('@validator');


route.get("/getOne/:id", getUser);
route.get("/getFile/:filePath", getFile);
route.post("/login", validateLogin, checkValidation, loginAdmin);


module.exports = route;
