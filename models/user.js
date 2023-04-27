const { model, Schema } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const validSubscription = ['starter', 'pro', 'business'];

const userShema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Password is required'],
    },
    subscription: {
      type: String,
      enum: validSubscription,
      default: 'starter',
    },
    token: {
      type: String,
      default: '',
    },
    avatarUrl: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userShema.post('save', handleMongooseError);

const User = model('user', userShema);

const registerSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const upDateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...validSubscription)
    .required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  upDateSubscriptionSchema,
};

module.exports = {
  User,
  schemas,
};