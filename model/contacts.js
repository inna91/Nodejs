const Contact = require('./schemas/contact');

const listContacts = async (
  userId,
  { sortBy, sortByDesc, filter, limit = '20', offset = '0', page = '1', sub },
) => {
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
};

const getContactById = async (id, userId) => {
  const result = await Contact.findOne({ _id: id, owner: userId }).populate({
    path: 'owner',
    select: 'email subscription -_id',
  });
  return result;
};

const addContact = async body => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (id, body, userId) => {
  const result = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true },
  );
  return result;
};

const removeContact = async (id, userId) => {
  const result = await Contact.findOneAndRemove({
    _id: id,
    owner: userId,
  });
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
