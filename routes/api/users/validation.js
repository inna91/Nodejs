const Joi = require('joi');
const { HttpCode, Subscription } = require('../../../helpers/constants');

const schemaCreateUser = Joi.object({
  email: Joi.string()
    .email({
      tlds: { allow: ['com', 'net', 'ru'] },
    })
    .min(5)
    .max(50)
    .required(),
  subscription: Joi.string()
    .valid(Subscription.FREE, Subscription.PRO, Subscription.PREMIUM)
    .optional(),
  password: Joi.string().required(),
});

const schemaValidateUser = Joi.object({
  email: Joi.string()
    .email({
      tlds: { allow: ['com', 'net', 'ru'] },
    })
    .min(5)
    .max(50)
    .optional(),
  password: Joi.string().required(),
}).min(1);

const schemaUpdateSubscription = Joi.object({
  subscription: Joi.string()
    .valid(Subscription.FREE, Subscription.PRO, Subscription.PREMIUM)
    .required(),
});

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

module.exports.createUser = (req, _res, next) => {
  return validate(schemaCreateUser, req.body, next);
};

module.exports.validateUser = (req, _res, next) => {
  return validate(schemaValidateUser, req.body, next);
};

module.exports.validateUpdateSubscription = (req, _res, next) => {
  return validate(schemaUpdateSubscription, req.body, next);
};
