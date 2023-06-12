const verifyUserEmail = require("./verifyUserEmail");
const repeatedVerify = require("./repeatedVerify");
const { ctrlWrapper } = require("../../utils");

module.exports = {
  verifyUserEmail: ctrlWrapper(verifyUserEmail),
  repeatedVerify: ctrlWrapper(repeatedVerify),
};
