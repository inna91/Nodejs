const { contacts } = require('./data');
const listContacts = jest.fn(
  (
    userId,
    { sortBy, sortByDesc, filter, limit = '20', offset = '0', page = '1', sub },
  ) => {
    return { contacts, total: contacts.length, page, limit, offset };
  },
);

const getContactById = jest.fn((id, userId) => {
  const [contact] = contacts.filter(el => String(el._id) === String(id));
  return contact;
});

const addContact = jest.fn(body => {
  const newCat = { ...body, _id: '604dea360c3cdb1fccbe8386' };
  contacts.push(newCat);
  return newCat;
});

const updateContact = jest.fn((id, body, userId) => {
  const [contact] = contacts.filter(el => String(el._id) === String(id));
  if (contact) {
    contact = { ...contact, body };
  }
});

const removeContact = jest.fn((id, userId) => {
  const index = contacts.findIndex(el => String(el._id) === String(id));
  if (index === -1) {
    return null;
  }
  const [contact] = contacts.splice(index, 1);
  return contact;
});

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
