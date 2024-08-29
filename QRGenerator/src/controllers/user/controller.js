const { sendResponse } = require("@handlers");
const { UserQueries } = require("@queries");
const { dataFormatter } = require("@utils");
const fs = require("node:fs");
const path = require("path");

// module.exports = dataFormatter;
exports.addUser = async (req, res, next) => {
  try {
    const { body } = await req;
    const file = req.file
      ? JSON.stringify(
          req.file && { filePath: req.file.path, fileName: req.file.filename }
        )
      : null;
    const jsonData = body.data; // Parse the JSON data from the body

    const data = {
      ...jsonData,
      file: file,
    };
    console.log(data, "dataaaaaaaaaaa");

    if (!data.info.targetUrl) {
      return sendResponse(
        res,
        { error: "Please input target URL" },
        "addOne",
        false,
        400
      );
    }

    const queries = new UserQueries();
    const response = await queries.addOne(data);
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
    const { body } = await req;
    const file = req.file
      ? JSON.stringify(
          req.file && { filePath: req.file.path, fileName: req.file.filename }
        )
      : JSON.stringify(
          body.data.info.img && {
            filePath: body.data.info.img.filePath,
            fileName: body.data.info.img.fileName,
          }
        );
    const jsonData = body.data; // Parse the JSON data from the body

    const data = {
      ...jsonData,
      file: file,
    };

    if (!data.info.targetUrl) {
      return sendResponse(
        res,
        { error: "Please input target URL" },
        "updateOne",
        false,
        400
      );
    }

    const queries = new UserQueries();
    const response = await queries.updateOne(data);

    const formattedData = dataFormatter(response);

    // Send JSON response with a link to the QR code file
    sendResponse(res, formattedData, "updateOne", true, 201);
  } catch (error) {
    console.error("Error in addUser:", error);
    return sendResponse(
      res,
      { error: "Internal server error" },
      "updateOne",
      false,
      500
    );
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const queries = new UserQueries();
    const response = await queries.getAll();
    const formattedData = await dataFormatter(response);
    return sendResponse(res, formattedData, "getAll", true, 200);
  } catch (error) {
    console.error("Error in getting users:", error);
    return sendResponse(
      res,
      { error: "Internal server error" },
      "getAll",
      false,
      500
    );
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const queries = new UserQueries();
    const response = await queries.deleteOne(id);
    const formattedData = dataFormatter(response);
    return sendResponse(res, formattedData, "deleteOne", true, 201);
  } catch (error) {
    console.error("Error in deleting users:", error);
    return sendResponse(
      res,
      { error: "Internal server error" },
      "deleteOne",
      false,
      500
    );
  }
};

exports.downloadQR = async (req, res, next) => {
  try {
    // Construct the full path
    const qrPath = req.params.filename;
    const qrPathArray = qrPath.split("\\");
    const fileName = qrPathArray[qrPathArray.length - 1];

    // Check if the file exists
    fs.stat(qrPath, (err, stat) => {
      if (err || !stat.isFile()) {
        console.error("File does not exist:", qrPath);
        return res.status(404).send("File not found");
      }

      // Set headers for the file download
      res.setHeader("Content-Length", stat.size);
      res.setHeader("Content-Type", "image/png"); // Change to "image/jpeg" if JPEG format is used
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${fileName}"`
      );

      // Stream the file to the response
      const fileStream = fs.createReadStream(qrPath);
      fileStream.pipe(res);

      // Handle errors during file reading
      fileStream.on("error", (err) => {
        console.error("Error reading the file:", err);
        // Ensure that only one response is sent
        if (!res.headersSent) {
          res.status(500).send("Error while reading file!!");
        }
      });

      // Handle successful file transmission
      res.on("finish", () => {
        // Only send a success response if not already sent
        if (!res.headersSent) {
          sendResponse(
            res,
            "File downloaded successfully",
            "download",
            true,
            200
          );
        }
      });
    });
  } catch (error) {
    console.error("Error in downloading qr:", error);
    return sendResponse(
      res,
      { error: "Internal server error" },
      "download",
      false,
      500
    );
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const queries = new UserQueries();
    const response = await queries.getOne(id);
    const formattedData = dataFormatter(response);
    return sendResponse(res, formattedData, "getOne", true, 200);
  } catch (error) {
    console.error("Error in getting user:", error);
    return sendResponse(
      res,
      { error: "Internal server error" },
      "getOne",
      false,
      500
    );
  }
};

exports.getFile = async (req, res, next) => {
  try {
    // Decode and sanitize the file path
    const filePath = decodeURIComponent(req.params.filePath);

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
  } catch (error) {
    console.error("Error in getting user:", error);
    return sendResponse(
      res,
      { error: "Internal server error" },
      "getOne",
      false,
      500
    );
  }
};
