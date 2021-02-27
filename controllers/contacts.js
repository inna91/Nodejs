const Contacts = require('../model/contacts');

const get = async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params);
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found',
      });
    }
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact,
      },
    });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params);
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        message: 'contact deleted',
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found',
      });
    }
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params, req.body);
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found',
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
