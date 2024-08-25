const middleware = require("express")();
const jimp = require('jimp')

middleware.use(async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const filePath = req.file.path;
  try {
    const media = await jimp.read(filePath);

    // Set the target dimensions for image resizing
    const width = 1000; // Change this to your desired width
    const height = 1200; // Change this to your desired height

    await media.resize(width, height).writeAsync(filePath);

    console.log("Image processing completed");
    return next();
  } catch (err) {
    console.error("Error while processing the image:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = middleware;