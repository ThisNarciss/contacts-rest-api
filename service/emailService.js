const { User } = require("../models");

const findUserByVerificationToken = async (verificationToken) => {
  try {
    const result = await User.findOne({ verificationToken });
    return result;
  } catch (error) {
    return error;
  }
};

const updateVerify = async (id, { verify, verificationToken }) => {
  try {
    const result = await User.findByIdAndUpdate(
      id,
      { verify, verificationToken },
      { new: true }
    );
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  findUserByVerificationToken,

  updateVerify,
};
