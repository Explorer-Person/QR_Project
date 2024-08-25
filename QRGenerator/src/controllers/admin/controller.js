const { sendResponse } = require("../../handlers/response");
const { AdminQuery } = require("@queries");
const { qrCreator, dataFormatter } = require("@utils");
const path = require("path");
const fs = require("node:fs");


// module.exports = dataFormatter;
exports.addUser = async (req, res, next) => {
  try {
    const { body } = await req;
    console.log(body, req.file);
    const file = req.file ? JSON.stringify(req.file && { filePath: req.file.path, fileName: req.file.filename }) : null;
    const jsonData = req.file ? JSON.parse(body.data) : body.data; // Parse the JSON data from the body
        
    const data = {
            ...jsonData,
            file: file
        };

    console.log(data.info.targetUrl);

    if (!data.info.targetUrl) {
      return sendResponse(
        res,
        { error: "Please input target URL" },
        "addOne",
        false,
        400
      );
    }

    const qrPath = await qrCreator(data.info.targetUrl, data.info.name);
    if (!qrPath) {
      return sendResponse(
        res,
        { error: "QR code creation failed" },
        "addOne",
        false,
        500
      );
    }

    const queries = new AdminQuery();
    const response = await queries.addOne(qrPath, data);
    console.log(qrPath, "response");
    const formattedData = dataFormatter(response);

    // Send JSON response with a link to the QR code file
    sendResponse(res, formattedData, "addOne", true, 201);
  } catch (error) {
    console.error("Error in addUser:", error);
    return sendResponse(
      res,
      { error: "Internal server error" },
      "addOne",
      false,
      500
    );
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { info, id } = req.body;

    if (!info.targetUrl) {
      return sendResponse(
        res,
        { error: "Please input target URL" },
        "addOne",
        false,
        400
      );
    }

    const qrPath = await qrCreator(info.targetUrl, info.name);
    if (!qrPath) {
      return sendResponse(
        res,
        { error: "QR code creation failed" },
        "addOne",
        false,
        500
      );
    }

    const queries = new AdminQuery();
    const response = await queries.updateOne(id, qrPath, info);
    console.log(qrPath, "response");
    const formattedData = dataFormatter(response);

    // Send JSON response with a link to the QR code file
    sendResponse(res, formattedData, "updateOne", true, 201);
  } catch (error) {
    console.error("Error in addUser:", error);
    return sendResponse(
      res,
      { error: "Internal server error" },
      "addOne",
      false,
      500
    );
  }
};

exports.getUsers = async (req, res, next) => {
  const queries = new AdminQuery();
  const response = await queries.getAll();
  const formattedData = await dataFormatter(response);
  return sendResponse(res, formattedData, "getAll", true, 200);
};




exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const queries = new AdminQuery();
  const response = await queries.deleteOne(id);
  const formattedData = dataFormatter(response);
  return sendResponse(res, formattedData, "deleteOne", true, 201);
};

exports.downloadQR = (req, res, next) => {
  // Construct the full path
  const qrPath = req.params.filename;
  const qrPathArray = qrPath.split("\\");
  const fileName = qrPathArray[qrPathArray.length - 1];
  console.log(qrPath, "qr code");

  // Check if the file exists
  fs.stat(qrPath, (err, stat) => {
    if (err || !stat.isFile()) {
      console.error("File does not exist:", qrPath);
      return res.status(404).send("File not found");
    }

    // Set headers for the file download
    res.setHeader("Content-Length", stat.size);
    res.setHeader("Content-Type", "image/png"); // Change to "image/jpeg" if JPEG format is used
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    // Stream the file to the response
    const fileStream = fs.createReadStream(qrPath);
    fileStream.pipe(res);

    fileStream.on("error", (err) => {
      console.error("Error reading the file:", err);
      res.status(500).send("Error reading the file");
    });
  });
};
