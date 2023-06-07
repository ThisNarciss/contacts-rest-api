const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authValid, HttpError } = require("../../utils");
const { usersService } = require("../../service");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  authValid(req.body);
  const { email, password } = req.body;
  const user = await usersService.findUser(email);
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email not verify");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  usersService.updateToken(user._id, token);

  res.json({
    status: "success",
    code: res.statusCode,
    data: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = login;
