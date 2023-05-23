const login = require("./loginUser");
const registration = require("./registrationUser");
const getCurrent = require("./getCurrentUser");
const logout = require("./logoutUser");
const updateSub = require("./updateSub");

const { ctrlWrapper } = require("../../utils");

module.exports = {
  login: ctrlWrapper(login),
  registration: ctrlWrapper(registration),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSub: ctrlWrapper(updateSub),
};
