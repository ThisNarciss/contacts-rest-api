const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const contacts = require("../../models/contacts.js");
const utils = require("../../utils");

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const result = await contacts.getContactById(req.params.contactId);
    if (!result) {
      throw utils.HttpError(404, "Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  console.log(req.body);
  try {
    utils.addContactValid(req.body);
    const newContact = { id: nanoid(), ...req.body };
    const result = await contacts.addContact(newContact);
    res.json({
      status: "success",
      code: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await contacts.removeContact(req.params.contactId);
    if (!result) {
      throw utils.HttpError(404, "Not found");
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    utils.updateContactValid(req.body);
    const result = await contacts.updateContact(req.params.contactId, req.body);
    if (!result) {
      throw utils.HttpError(404, "Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
