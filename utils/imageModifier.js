const Jimp = require("jimp");

const imageModifier = async (path) => {
  try {
    const result = await Jimp.read(path);
    result
      .resize(250, 250)
      .quality(90) //
      .write(path);
  } catch (error) {
    console.error(error);
  }
};

module.exports = imageModifier;
