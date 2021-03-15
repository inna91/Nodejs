const rateLimit = require('express-rate-limit');
const { HttpCode } = require('../helpers/constants');

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 2,
  handler: (req, res, next) => {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      data: 'Bad request',
      message:
        'Too many registrations from one IP per hour, please try again later.',
    });
  },
});

module.exports = { createAccountLimiter };
