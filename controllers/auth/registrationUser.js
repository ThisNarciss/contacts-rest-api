const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const {
  authValid,
  HttpError,
  sendEmail,
  getVerifyData,
} = require("../../utils");
const { usersService } = require("../../service");

const registration = async (req, res) => {
  authValid(req.body);
  const { email, password } = req.body;
  const user = await usersService.findUser(email);
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const verificationToken = nanoid();
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);
  const newUserData = {
    email,
    password: hashPassword,
    avatarUrl,
    verificationToken,
  };
  const newUser = await usersService.regUser(newUserData);
  const verifyEmail = getVerifyData({
    email,
    verificationToken,
  });

  await sendEmail(verifyEmail);

  if (newUser.status === 400) {
    throw HttpError(400, newUser.message);
  }

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    },
  });
};

module.exports = registration;
