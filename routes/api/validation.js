const Joi = require('joi')

const schemaCreateContact = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email()
    .min(5)
    .max(30)
    .required(),
  number: Joi.string()
    .min(3)
    .max(30)
    .required(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .optional(),
  email: Joi.string()
    .email()
    .min(5)
    .max(30)
    .optional(),
  number: Joi.string()
    .min(3)
    .max(30)
    .optional(),
})

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj)

  if (error) {
    const [{ message }] = error.details
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, '')}`
    })
  }
  next()
}

module.exports.createContact = (req, res, next) => {
  return validate(schemaCreateContact, req.body, next)
}

module.exports.updateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next)
}
