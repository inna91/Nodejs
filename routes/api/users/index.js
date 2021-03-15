const express = require('express');
const router = express.Router();
const usersControllers = require('../../../controllers/users');
const guard = require('../../../helpers/guard');
const { createUser, validateUser } = require('./validation');
const { createAccountLimiter } = require('../../../helpers/rate-limit-reg');

router.post(
  '/auth/register',
  createAccountLimiter,
  createUser,
  usersControllers.reg,
);
router.post('/auth/login', validateUser, usersControllers.login);
router.post('/auth/logout', guard, usersControllers.logout);
router.get('/current', guard, usersControllers.currentUser);
router.patch('/', guard, usersControllers.updateSubscription);

module.exports = router;
