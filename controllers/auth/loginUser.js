const bcrypt = require("bcrypt");
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

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  usersService.updateToken(user._id, token);

  res.json({
    status: "success",
    code: 200,
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
