const { sendResponse } = require("../../handlers/response");
const { AdminQuery } = require("@queries");
const { dataFormatter } = require("@utils");
const path = require('path');
const fs = require('node:fs')

exports.getUser = async (req, res, next) => {
  const id = req.params.id;
  const queries = new AdminQuery();
  const response = await queries.getOne(id);
  const formattedData = dataFormatter(response);
  return sendResponse(res, formattedData, "getOne", true, 200);
};

exports.getFile = async (req, res, next) => {
  // Decode and sanitize the file path
  const filePath = decodeURIComponent(req.params.filePath.replace(/\\/g, '/'));

  if (filePath) {
    // Assuming you're using Express.js
    let file = path.resolve(filePath);

    if (!file) {
      res.status(404).send("File not found");
    } else {
      try {
        const stats = fs.statSync(file);

        if (!stats.isFile()) {
          res.status(400).send("Invalid file path");
        } else {
          // Send the file as the response
          res.sendFile(file);
        }
      } catch (error) {
        console.error("Error while trying to get the file stats:", error);
        res.status(500).send("Internal Server Errorrrr");
      }
    }
  } else {
    res.status(400).send("File path is required");
  }
};


