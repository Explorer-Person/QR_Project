const QRCode = require("qrcode");
const fs = require("node:fs");
const path = require("path");


const qrCreator = (url, name) => {
    const qrDir = path.join(__dirname, '../', "qrs");
    const qrPath = path.join(qrDir, `${name}.png`)
    if (!fs.existsSync(qrDir)) {
      fs.mkdirSync(qrDir, { recursive: true });
    }
    console.log(qrPath);
    QRCode.toFile(qrPath, [{ data: url, mode: "byte" }], (err,res) => {
      if (err) {
          console.error("Error creating QR code:", err);
      } else {
          console.log("QR code created successfully at", qrPath);
      } 
    });
    return qrPath;
  };

  module.exports = {qrCreator}