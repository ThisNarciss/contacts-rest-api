const { service } = require("../../models");

const { HttpError, updateFavoriteValid } = require("../../utils");

const updateFavorite = async (req, res) => {
  updateFavoriteValid(req.body);
  const result = await service.updateStatusContact(
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

module.exports = updateFavorite;
