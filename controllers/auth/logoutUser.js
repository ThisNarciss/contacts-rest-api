const { usersService } = require("../../service");

const logout = async (req, res, next) => {
  const { _id } = req.user;
  usersService.updateToken(_id, "");
  res.status(204).end();
};

module.exports = logout;
