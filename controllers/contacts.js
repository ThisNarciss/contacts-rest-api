const service = require("../models/service");

const {
  HttpError,
  addContactValid,
  updateContactValid,
  ctrlWrapper,
  updateFavoriteValid,
} = require("../utils");

const getAll = async (_, res) => {
  const result = await service.getContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

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

const del = async (req, res) => {
  const result = await service.removeContact(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
  });
};

const update = async (req, res) => {
  updateContactValid(req.body);
  const result = await service.updateContact(req.params.contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

const updateFavorite = async (req, res) => {
  updateFavoriteValid(req.body);
  const result = await service.updateFavoriteStatus(
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

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  del: ctrlWrapper(del),
  update: ctrlWrapper(update),
  updateFavorite: ctrlWrapper(updateFavorite),
};
