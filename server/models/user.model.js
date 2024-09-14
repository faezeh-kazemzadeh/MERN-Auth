import mongoose from "mongoose";
import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
import jwt from "jsonwebtoken";

const { sign } = jwt;

const joiPassword = Joi.extend(joiPasswordExtendCore);
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      minlength: 12,
      maxlength: 250,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      minlength: 3,
      maxlength: 150,
    },
    lastname: {
      type: String,
      minlength: 3,
      maxlength: 150,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      minlength: 5,
      maxlength: 100,
      trim: true,
      required: true,
    },
    roles: {
      type: [String],
      enum: ['admin', 'user', 'moderator', 'guest'],
      default: "user",
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  },
  { timestamps: true }
);

const validate = (user) => {
  const schema = Joi.object({
    firstname: Joi.string().min(3).max(150),
    lastname: Joi.string().min(3).max(150),
    phone: Joi.string(),
    email: Joi.string().min(12).max(250).required().email(),
    roles:Joi.array().items(Joi.string().valid('admin', 'user', 'moderator', 'guest')),
    avatar: Joi.string(),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(2)
      .noWhiteSpaces()
      .onlyLatinCharacters()
      .required()
      .messages({
        "password.minOfUppercase":
          "{#label} should contain at least {#min} uppercase character",
        "password.minOfSpecialCharacters":
          "{#label} should contain at least {#min} special character",
        "password.minOfLowercase":
          "{#label} should contain at least {#min} lowercase character",
        "password.minOfNumeric":
          "{#label} should contain at least {#min} numeric character",
        "password.noWhiteSpaces": "{#label} should not contain white spaces",
        "password.onlyLatinCharacters":
          "{#label} should contain only latin characters",
      }),
      confirmPassword: Joi.string()
      .valid(Joi.ref('password')) // Ensure it matches the password field
      .required()
      .messages({
        "any.only": "Passwords do not match",
      })
  });
  return schema.validate(user, { abortEarly: false });
};

const User = mongoose.model("User", userSchema);

export { validate, User };
