const express = require("express");
const route = express.Router();
const path = require("path");
const fs = require("node:fs");

const {
  userController: { getUser, getFile },
} = require("@controllers");

route.get("/getOne/:id", getUser);
route.get("/getFile/:filePath", getFile);

module.exports = route;
