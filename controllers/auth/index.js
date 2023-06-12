const login = require("./loginUser");
const registration = require("./registrationUser");
const getCurrent = require("./getCurrentUser");
const logout = require("./logoutUser");
const updateSub = require("./updateSub");
const updateUserAvatar = require("./updateUserAvatar");
const verifyUserEmail = require("../email/verifyUserEmail");
const repeatedVerify = require("../email/repeatedVerify");
const { ctrlWrapper } = require("../../utils");

module.exports = {
  login: ctrlWrapper(login),
  registration: ctrlWrapper(registration),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSub: ctrlWrapper(updateSub),
  updateUserAvatar: ctrlWrapper(updateUserAvatar),
  verifyUserEmail: ctrlWrapper(verifyUserEmail),
  repeatedVerify: ctrlWrapper(repeatedVerify),
};
