const { usersService } = require("../../service");
const { sendEmail, HttpError, getVerifyData } = require("../../utils");
const { repeatedVerifyValid } = require("../../utils/validations");

const repeatedVerify = async (req, res) => {
  repeatedVerifyValid(req.body);
  const { email } = req.body;
  const user = await usersService.findUser(email);
  if (!user) {
    throw HttpError(401, "Email not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const verifyEmail = getVerifyData({
    email,
    verificationToken: user.verificationToken,
  });

  await sendEmail(verifyEmail);
  res.json({
    status: "success",
    code: 200,
    data: { message: "Verification email sent" },
  });
};
module.exports = repeatedVerify;
