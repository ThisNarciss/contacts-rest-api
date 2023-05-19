const Contact = require("./contact");

const getContacts = async () => {
  try {
    const data = await Contact.find({}, "-createdAt -updatedAt");
    return data;
  } catch (error) {
    return error;
  }
};

const getContactById = async (id) => {
  try {
    const contact = await Contact.findById(id, "-createdAt -updatedAt");
    return contact;
  } catch (error) {
    return error;
  }
};

const removeContact = async (id) => {
  try {
    const result = await Contact.findByIdAndRemove({
      _id: id,
    });
    return result;
  } catch (error) {
    return error;
  }
};

const addContact = async (body) => {
  try {
    const result = await Contact.create(body);
    return result;
  } catch (error) {
    return error;
  }
};

const updateContact = async (id, body) => {
  try {
    const result = await Contact.findByIdAndUpdate({ _id: id }, body, {
      new: true,
    });
    return result;
  } catch (error) {
    return error;
  }
};

const updateStatusContact = async (id, body) => {
  try {
    const result = await Contact.findByIdAndUpdate({ _id: id }, body, {
      new: true,
      select: "favorite",
    });
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
