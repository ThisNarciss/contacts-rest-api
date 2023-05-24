const bcrypt = require("bcrypt");
const { authValid, HttpError } = require("../../utils");
const { usersService } = require("../../service");

const registration = async (req, res) => {
  authValid(req.body);
  const { email, password } = req.body;
  const user = await usersService.findUser(email);
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await usersService.regUser({ email, password: hashPassword });
  if (newUser.status === 400) {
    throw HttpError(400, newUser.message);
  }

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: { email: newUser.email, subscription: newUser.subscription },
    },
  });
};

module.exports = registration;
