const Joi = require("joi");
const HttpError = require("./HttpError");

const addContactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  email: Joi.string(),
  phone: Joi.string(),
});

const addContactValid = (body) => {
  const { error } = addContactSchema.validate(body);
  if (error) {
    throw HttpError(400, "missing required name field");
  }
};

const updateContactValid = (body) => {
  const bodyLength = Object.keys(body).length;
  const { error } = updateContactSchema.validate(body);
  if (error || !bodyLength) {
    throw HttpError(400, "missing fields");
  }
};

module.exports = {
  addContactValid,
  updateContactValid,
};
