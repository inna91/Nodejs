const Contact = require('./schemas/contact');

const listContacts = async (
  userId,
  { sortBy, sortByDesc, filter, limit = '20', offset = '0', page = '1', sub },
) => {
  try {
    const queryBySubscription = sub
      ? { owner: userId, subscription: sub }
      : { owner: userId };

    const results = await Contact.paginate(queryBySubscription, {
      limit,
      offset,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
      },
      select: filter ? filter.split('|').join(' ') : '',
      populate: {
        path: 'owner',
        select: 'email subscription -_id',
      },
    });
    const { docs: contacts, totalDocs: total } = results;
    return { total: total.toString(), limit, offset, page, contacts };
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (id, userId) => {
  try {
    const result = await Contact.findOne({ _id: id, owner: userId }).populate({
      path: 'owner',
      select: 'email subscription -_id',
    });
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

const updateContact = async (id, body, userId) => {
  try {
    const result = await Contact.findOneAndUpdate(
      { _id: id, owner: userId },
      { ...body },
      { new: true },
    );
    return result;
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (id, userId) => {
  try {
    const result = await Contact.findOneAndRemove({
      _id: id,
      owner: userId,
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
