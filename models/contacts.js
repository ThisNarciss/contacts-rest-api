const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId);
    return contact || null;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactIdx = contacts.findIndex(({ id }) => id === contactId);
    if (contactIdx === -1) {
      return null;
    }
    const [result] = contacts.splice(contactIdx, 1);
    console.log(result);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    contacts.push(body);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return body;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contactIdx = contacts.findIndex(({ id }) => id === contactId);
    if (contactIdx === -1) {
      return null;
    }
    const contact = contacts.find(({ id }) => id === contactId);
    const updateContact = { ...contact, ...body };
    contacts.splice(contactIdx, 1, updateContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return updateContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
