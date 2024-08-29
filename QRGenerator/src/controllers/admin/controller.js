const { sendResponse } = require("@handlers");
const { AdminQueries } = require("@queries");
const { dataFormatter } = require("@utils");

// module.exports = dataFormatter;
exports.addAdmin = async (req, res, next) => {
  try {
    const { data } = await req.body;

    const queries = new AdminQueries();
    const response = await queries.addOne(data);
    const formattedData = dataFormatter(response);

    if (typeof response === "string") {
      return sendResponse(res, response, "addOne", false, 400);
    }
    // Send JSON response with a link to the QR code file
    sendResponse(res, formattedData, "addOne", true, 201);
  } catch (error) {
    console.error("Error in addAdmin:", error);
    return sendResponse(
      res,
      { error: "Internal server error" },
      "addOne",
      false,
      500
    );
  }
};

exports.updateAdmin = async (req, res, next) => {
  try {
    const { data } = await req.body;

    const queries = new AdminQueries();
    const response = await queries.updateOne(data);
    const formattedData = dataFormatter(response);

    // Send JSON response with a link to the QR code file
    sendResponse(res, formattedData, "updateOne", true, 201);
  } catch (error) {
    console.error("Error in addAdmin:", error);
    return sendResponse(
      res,
      { error: "Internal server error" },
      "updateOne",
      false,
      500
    );
  }
};

exports.getAdmins = async (req, res, next) => {
  try {
    const queries = new AdminQueries();
    const response = await queries.getAll();
    const formattedData = await dataFormatter(response);
    return sendResponse(res, formattedData, "getAll", true, 200);
  } catch (error) {
    console.error("Error in getting admins:", error);
    return sendResponse(
      res,
      { error: "Internal server error" },
      "getAll",
      false,
      500
    );
  }
};

exports.deleteAdmin = async (req, res, next) => {
  try{
    const id = req.params.id;
    const queries = new AdminQueries();
    const response = await queries.deleteOne(id);
    if (typeof response === "string") {
      return sendResponse(res, response, "deleteOne", false, 400);
    }
    const formattedData = dataFormatter(response);
    return sendResponse(res, formattedData, "deleteOne", true, 201);      
  } catch (error) {
    console.error("Error in deleting admin:", error);
    return sendResponse(
      res,
      { error: "Internal server error" },
      "deleteOne",
      false,
      500
    );
  }
};
