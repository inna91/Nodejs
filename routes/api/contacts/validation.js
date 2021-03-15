const Joi = require('joi');
const { HttpCode } = require('../../../helpers/constants');

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().min(5).max(50).required(),
  phone: Joi.string().min(3).max(30).required(),
  subscription: Joi.string().valid('free', 'pro', 'premium').optional(),
  // password: Joi.string().optional(),
  // token: Joi.string().optional().allow(''),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().min(5).max(50).optional(),
  phone: Joi.string().min(3).max(30).optional(),
  subscription: Joi.string().valid('free', 'pro', 'premium').optional(),
  // password: Joi.string().optional(),
  // token: Joi.string().optional().allow(''),
}).min(1);

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);

  if (error) {
    const [{ message }] = error.details;
    return next({
      status: HttpCode.BAD_REQUEST,
      message: `Filed: ${message.replace(/"/g, '')}`,
    });
  }
  next();
};

module.exports.createContact = (req, _res, next) => {
  return validate(schemaCreateContact, req.body, next);
};

module.exports.updateContact = (req, _res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
