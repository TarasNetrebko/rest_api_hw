const { Schema, model } = require("mongoose");
const Joi = require("joi");

const saveErrorHandler = require("../helpers/handleSaveErrors");
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: emailRegex,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", saveErrorHandler);
const User = model("user", userSchema);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().pattern(emailRegex),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
});
const loginSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegex),
  password: Joi.string().min(6).required(),
});
const subUpdateSchema = Joi.object({
  subscription: Joi.string().required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegex),
});

const schemas = {
  registerSchema,
  loginSchema,
  subUpdateSchema,
  verifyEmailSchema,
};

module.exports = {
  schemas,
  User,
};
