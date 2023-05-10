const { nanoid } = require("nanoid");
const contacts = require("../models/contacts");
const {
  HttpError,
  addContactValid,
  updateContactValid,
  ctrlWrapper,
} = require("../utils");

const getAll = async (_, res) => {
  const result = await contacts.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const getById = async (req, res) => {
  const result = await contacts.getContactById(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

const add = async (req, res) => {
  console.log(req.body);

  addContactValid(req.body);
  const newContact = { id: nanoid(), ...req.body };
  const result = await contacts.addContact(newContact);
  res.json({
    status: "success",
    code: 201,
    data: result,
  });
};

const del = async (req, res) => {
  const result = await contacts.removeContact(req.params.contactId);
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
  const result = await contacts.updateContact(req.params.contactId, req.body);
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
};
