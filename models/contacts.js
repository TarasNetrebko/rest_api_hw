const { Schema, model } = require("mongoose");
const saveErrorHandler = require("../helpers/handleSaveErrors");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { varsionKey: false, timestamps: true }
);

contactSchema.post("save", saveErrorHandler);

const Contact = model("contact", contactSchema);

const joiSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "'name' should be a type of 'string'",
    "any.required": "'name' is a required field",
  }),
  email: Joi.string().required().messages({
    "string.base": "'email' should be a type of 'string'",
    "any.required": "'email' is a required field",
  }),
  phone: Joi.string().required().messages({
    "string.base": "'phone' should be a type of 'string'",
    "any.required": "'phone' is a required field",
  }),
  favorite: Joi.boolean().messages({
    "boolean.base": "'favorite' should be a type of 'boolean'",
  }),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "boolean.base": "'favorite' should be a type of 'boolean'",
    "any.required": "missing field favorite",
  }),
});

const schemas = {
  joiSchema,
  updateFavoriteSchema,
};

module.exports = {
  Contact,
  schemas,
};
