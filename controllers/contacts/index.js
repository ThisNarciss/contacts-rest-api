const add = require("./addContact");
const getAll = require("./getAllContacts");
const getById = require("./getContactById");
const del = require("./removeContact");
const update = require("./updateContact");
const updateFavorite = require("./updateFavoriteStatus");

const { ctrlWrapper } = require("../../utils");

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  del: ctrlWrapper(del),
  update: ctrlWrapper(update),
  updateFavorite: ctrlWrapper(updateFavorite),
};
