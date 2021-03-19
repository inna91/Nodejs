const express = require('express');
const router = express.Router();
const contactsControllers = require('../../../controllers/contacts');
// const validateId = require('./validationId');
const guard = require('../../../helpers/guard');

const { createContact, updateContact } = require('./validation');

router.get('/', guard, contactsControllers.get);

router.get('/:id', guard, contactsControllers.getById);

router.post('/', guard, createContact, contactsControllers.create);

router.delete('/:id', guard, contactsControllers.remove);

router.patch('/:id', guard, updateContact, contactsControllers.update);

module.exports = router;
