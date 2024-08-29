const { sendResponse } = require("@handlers");
const { AdminQueries } = require("@queries");
const { dataFormatter } = require("@utils");

exports.loginAdmin = async (req, res, next) => {
  try {
    const { data } = await req.body;

    const queries = new AdminQueries();
    const response = await queries.login(data);
    console.log(response);
    if (typeof response === "string") {
      return sendResponse(res, response, "login", false, 400);
    }
    const formattedData = dataFormatter(response);

    req.session.isAuth = true;
    req.session.adminId = formattedData.id;
    return req.session.save((err) => {
      if (err) {
        return sendResponse(
          res,
          err,
          'login',
          false,
          401,
        );
      }

      sendResponse(
        res,
        'Successfully loged in...',
        'login',
        true,
        200
      );
    });
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

exports.logoutAdmin = async (req, res, next) => {
  try {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        return sendResponse(
          res,
          "Failed to log out",
          "logout",
          false,
          500
        );
      }
      
      sendResponse(
        res,
        "Successfully logged out",
        "logout",
        true,
        200
      );
    });
  } catch (error) {
    console.error("Error in logoutAdmin:", error);
    return sendResponse(
      res,
      { error: "Internal server error" },
      "logout",
      false,
      500
    );
  }
};
