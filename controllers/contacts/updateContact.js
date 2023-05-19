const { contactsService } = require("../../models");

const { HttpError, updateContactValid } = require("../../utils");

const update = async (req, res) => {
  updateContactValid(req.body);
  const result = await contactsService.updateContact(
    req.params.contactId,
    req.body
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

module.exports = update;
