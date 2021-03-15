const express = require('express');
const router = express.Router();
const contactsControllers = require('../../../controllers/contacts');
const validateId = require('./validationId');
const guard = require('../../../helpers/guard');

const { createContact, updateContact } = require('./validation');

router.get('/', guard, contactsControllers.get);

router.get('/:contactId', guard, validateId, contactsControllers.getById);

router.post('/', guard, createContact, contactsControllers.create);

router.delete('/:contactId', guard, validateId, contactsControllers.remove);

router.patch(
  '/:contactId',
  guard,
  validateId,
  updateContact,
  contactsControllers.update,
);

module.exports = router;
