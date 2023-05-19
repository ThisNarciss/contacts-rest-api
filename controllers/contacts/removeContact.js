const { contactsService } = require("../../models");

const { HttpError } = require("../../utils");

const del = async (req, res) => {
  const result = await contactsService.removeContact(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
  });
};

module.exports = del;
