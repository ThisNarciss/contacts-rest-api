const { service } = require("../../models");

const { HttpError, addContactValid } = require("../../utils");

const add = async (req, res) => {
  addContactValid(req.body);
  const result = await service.addContact(req.body);
  if (result.status === 400) {
    throw HttpError(400, "missing required name field");
  }
  res.status(201).json({
    status: "success",
    code: 201,
    data: result,
  });
};

module.exports = add;
