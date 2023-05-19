const { logValid, HttpError } = require("../../utils");

const login = async (req, res, next) => {
  logValid(req.body);
  const { email, password } = req.body;
};

module.exports = login;
