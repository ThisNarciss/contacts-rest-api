const { regValid, HttpError } = require("../../utils");
const { usersService } = require("../../models");

const registration = async (req, res, next) => {
  regValid(req.body);
  console.log(req.body);
  const { email, password, name } = req.body;
  const user = await usersService.findUser(email);
  console.log(user);
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const newUser = await usersService.regUser(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    data: newUser,
  });
};

module.exports = registration;
