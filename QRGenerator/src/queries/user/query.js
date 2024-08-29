const { executeQuery } = require("@db");
const { v4: uuidv4 } = require("uuid");
const { userModel } = require("@models");
const { qrCreator } = require("@utils");
const { json } = require("express");


class UserQueries {
  getAll = async () => {
    await userModel();
    const query = "SELECT * FROM users";
    return executeQuery(query);
  };
  getOne = async (id) => {
    await userModel();
    const query = "SELECT * FROM users WHERE id=?";
    const params = [id];
    return executeQuery(query, params);
  };
  addOne = async (userInfo) => {
    await userModel(); // Ensure this is an async function
    const id = uuidv4();
    const formattedUrl = `${userInfo.info.targetUrl}/${id}`
    const qrPath = await qrCreator(formattedUrl, userInfo.info.name);
    if (!qrPath) {
      return sendResponse(
        res,
        { error: "QR code creation failed" },
        "addOne",
        false,
        500
      );
    }

    
    const query = `INSERT INTO users 
      (name, surname, phone, role, email, 
      tcNumber, bornDate, img, targetUrl, shortUrl, qrPath, id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
      userInfo.info.name,
      userInfo.info.surname,
      userInfo.info.phone,
      userInfo.info.role,
      userInfo.info.email,
      userInfo.info.tcNumber,
      userInfo.info.bornDate,
      userInfo.file,
      formattedUrl,
      userInfo.info.shortUrl,
      qrPath,
      id,
    ];

    await executeQuery(query, params);

    return await this.getAll(); // Ensure `this.getAll()` is accessible
  };

  deleteAll = async () => {
    const query = "DELETE FROM users";
    const result = await executeQuery(query);

    return result;
  };
  deleteOne = async (id) => {
    const query = "DELETE FROM users WHERE id=?";
    const params = [id];

    await executeQuery(query, params);

    return await this.getAll(); // Ensure `this.getAll()` is accessible
  };
  updateOne = async (userInfo) => {
    const dateData = userInfo.info.bornDate.split('T')[0]

    const query = `UPDATE users SET
           name=?,
           surname=?, 
           phone=?, 
           role=?, 
           email=?, 
           tcNumber=?, 
           bornDate=?,
           img=?, 
           targetUrl=?, 
           shortUrl=?, 
           qrPath=?
           WHERE id=?`;

    const params = [
      userInfo.info.name,
      userInfo.info.surname,
      userInfo.info.phone,
      userInfo.info.role,
      userInfo.info.email,
      userInfo.info.tcNumber,
      dateData,
      userInfo.file,
      userInfo.info.targetUrl,
      userInfo.info.shortUrl,
      userInfo.info.qrPath,
      userInfo.id,
    ];

    await executeQuery(query, params);

    return this.getAll();

  };
}

module.exports = UserQueries;
