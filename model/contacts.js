const Contact = require('./schemas/contact');

const listContacts = async () => {
  try {
    const results = await Contact.find({});
    return results;
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async id => {
  try {
    const result = await Contact.findOne({ _id: id });
    return result;
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async body => {
  try {
    const result = await Contact.create(body);
    return result;
  } catch (err) {
    console.log(err.message);
  }
};

const updateContact = async (id, body) => {
  try {
    const result = await Contact.findOneAndUpdate(
      { _id: id },
      { ...body },
      { new: true },
    );
    return result;
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async id => {
  try {
    const result = await Contact.findOneAndRemove({
      _id: id,
    });
    return result;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
