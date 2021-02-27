const express = require('express');
const router = express.Router();
const contactsControllers = require('../../controllers/contacts');
const validateId = require('./validationId');

const { createContact, updateContact } = require('./validation');

router.get('/', contactsControllers.get);

router.get('/:contactId', validateId, contactsControllers.getById);

router.post('/', createContact, contactsControllers.create);

router.delete('/:contactId', validateId, contactsControllers.remove);

router.patch(
  '/:contactId',
  validateId,
  updateContact,
  contactsControllers.update,
);

module.exports = router;
