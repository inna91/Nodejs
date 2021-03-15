const express = require('express');
const router = express.Router();
const usersControllers = require('../../../controllers/users');
const guard = require('../../../helpers/guard');
const { createUser, validateUser } = require('./validation');
const { createAccountLimiter } = require('../../../helpers/rate-limit-reg');

router.post(
  '/registration',
  createAccountLimiter,
  createUser,
  usersControllers.reg,
);
router.post('/login', validateUser, usersControllers.login);
router.post('/logout', guard, usersControllers.logout);
router.get('/current', guard, usersControllers.currentUser);
router.post('/current', guard, usersControllers.updateSubscription);

module.exports = router;
