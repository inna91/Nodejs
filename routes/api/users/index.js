const express = require('express');
const router = express.Router();
const usersControllers = require('../../../controllers/users');
const guard = require('../../../helpers/guard');
const upload = require('../../../helpers/upload');
const { validateUploadAvatar } = require('./validationAvatar');
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
router.patch(
  '/avatars',
  [guard, upload.single('avatar'), validateUploadAvatar],
  usersControllers.avatars,
);

router.get('/auth/verify/:verificationToken', usersControllers.verify);
module.exports = router;
