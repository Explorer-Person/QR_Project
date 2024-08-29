const { sendResponse } = require("@handlers");
const { executeQuery } = require("@db");
const { v4: uuidv4 } = require("uuid");
const { adminModel } = require("@models");
const bcryptjs = require("bcryptjs");

class AdminQuery {
  getAll = async () => {
    await adminModel();
    const query = "SELECT * FROM admins";
    return executeQuery(query);
  };
  getOne = async (id) => {
    await adminModel();
    const query = "SELECT * FROM admins WHERE id=?";
    const params = [id];
    return executeQuery(query, params);
  };
  addOne = async (adminInfo) => {
    await adminModel();

    const id = uuidv4();

    const query = `INSERT INTO admins 
      (username, password, email, role, id)
      VALUES (?, ?, ?, ?, ?)`;

    const hashedPassword = bcryptjs.hashSync(adminInfo.info.username, 12);
    const params = [
      adminInfo.info.username,
      hashedPassword,
      adminInfo.info.email,
      adminInfo.info.role,
      id,
    ];

    if (adminInfo.info.role) {
      const existingAdmin = await this.getAll();
      const rootAdmin = existingAdmin.find((admin) => admin.role === "root");
      console.log(rootAdmin);
      if (rootAdmin.role === adminInfo.info.role) {
        return "Root User Already Exists...";
      }
    }

    await executeQuery(query, params);
    return await this.getAll(); // Ensure `this.getAll()` is accessible
  };

  deleteAll = async () => {
    const query = "DELETE FROM skills";
    const result = await executeQuery(query);

    return result;
  };
  deleteOne = async (id) => {
    const existingAdmin = await this.getOne(id);
    console.log(existingAdmin);
    const existingRole = existingAdmin[0].role;
    if (existingRole === "root") {
      return "Root User Cant Removable...";
    }
    const query = "DELETE FROM admins WHERE id=?";
    const params = [id];

    await executeQuery(query, params);

    return await this.getAll(); // Ensure `this.getAll()` is accessible
  };

  login = async (loginInfo) => {
    const existingAdmins = await this.getAll();
    console.log(existingAdmins);
    const foundedAdmin = existingAdmins.find(
      (admin) => admin.username === loginInfo.username
    );
    if (!foundedAdmin) {
      return "Admin not found !";
    }
    const isEqual = bcryptjs.compareSync(
      loginInfo.password,
      foundedAdmin.password
    );

    if (!isEqual) {
      return "Incorrect password !";
    }

    return foundedAdmin; // Ensure `this.getAll()` is accessible
  };
  updateOne = async (adminInfo) => {
    const passwordQueryPart = adminInfo.info.password ? "password=?," : "";
    const query = `UPDATE admins SET
           username=?,
           ${passwordQueryPart}
           email=?,
           role=?
           WHERE id=?`;

    const existingUser = await this.getOne(adminInfo.id);
    const existingPassword = existingUser[0].password;
    // Determine if the password has changed
    let updatedPassword = null;
    if (adminInfo.info.password) {
      const isEqual = bcryptjs.compareSync(
        adminInfo.info.password,
        existingPassword
      );
      updatedPassword = isEqual
        ? existingPassword
        : bcryptjs.hashSync(adminInfo.info.password, 12);
    }

    // Prepare the parameters for the query
    const params = [
      adminInfo.info.username,
      ...(adminInfo.info.password ? [updatedPassword] : []),
      adminInfo.info.email,
      adminInfo.info.role,
      adminInfo.id,
    ];

    await executeQuery(query, params);

    return this.getAll();
  };
}

module.exports = AdminQuery;
