const { service } = require("../../models");

const { HttpError } = require("../../utils");

const getById = async (req, res) => {
  const result = await service.getContactById(req.params.contactId);
  if (result) {
    res.json({
      status: "success",
      code: 200,
      data: result,
    });
  } else {
    throw HttpError(404, "Not found");
  }
};

module.exports = getById;
