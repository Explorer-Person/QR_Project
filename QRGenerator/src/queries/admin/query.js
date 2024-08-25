const { executeQuery } = require("@db");
const { v4: uuidv4 } = require("uuid");
const { dbResponseHandler } = require("@handlers");
const { adminModel, userModel } = require("@models");

class AdminQuery {
  getAll = async () => {
    await userModel();
    const query = "SELECT * FROM user";
    return executeQuery(query);
  };
  getOne = async (id) => {
    await userModel();
    const query = "SELECT * FROM user WHERE id=?";
    const params = [id];
    return executeQuery(query, params);
  };
  addOne = async (qrPath, userInfo) => {
    await userModel(); // Ensure this is an async function
    const id = uuidv4();
    const formattedUrl = decodeURI(userInfo.info.targetUrl)
      .split(" ")
      .join(`\${id}`);
    console.log(formattedUrl);
    const query = `INSERT INTO user 
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
    const query = "DELETE FROM skills";
    const result = await executeQuery(query);

    return result;
  };
  deleteOne = async (id) => {
    const query = "DELETE FROM user WHERE id=?";
    const params = [id];

    await executeQuery(query, params);

    return await this.getAll(); // Ensure `this.getAll()` is accessible
  };
  updateOne = async (id, userInfo) => {
    const query = `UPDATE skills SET
           name,
           surname, 
           phone, 
           role, 
           email, 
           tcNumber, 
           bornDate,
           img, 
           targetUrl, 
           shortUrl, 
           qrPath
           WHERE id=?`;
    const params = [
      userInfo.name,
      userInfo.surname,
      userInfo.phone,
      userInfo.role,
      userInfo.email,
      userInfo.tcNumber,
      userInfo.bornDate,
      userInfo.img,
      formattedUrl,
      userInfo.shortUrl,
      qrPath,
      id,
    ];

    const response = await dbResponseHandler(
      null,
      201,
      "update",
      query,
      params,
      skillsModel()
    );
    if (response.status) {
      return this.getAll();
    }
    return response;
  };
}

module.exports = AdminQuery;
