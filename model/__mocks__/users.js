const { users } = require('./data');
const bcrypt = require('bcryptjs');

const findByEmail = jest.fn(email => {
  const [user] = users.filter(el => String(el.email) === String(email));
  return user;
});

const findById = jest.fn(id => {
  const [user] = users.filter(el => String(el._id) === String(id));
  return user;
});

const create = jest.fn(({ email, password, subscription = 'free' }) => {
  const pass = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  const newUser = {
    email,
    password: pass,
    subscription,
    _id: '604b0dabc08afe0af0f3777a',
    validPassword: function (pass) {
      return bcrypt.compareSync(pass, this.password);
    },
  };
  users.push(newUser);
  return newUser;
});

const updateToken = jest.fn((id, token) => {
  return {};
});

const updateAvatar = jest.fn((id, avatarURL) => {
  const [user] = users.filter(el => String(el._id) === String(id));
  if (user) {
    user.avatarURL = avatarURL;
  }
  return user.avatarURL;
});

const updateSubscription = jest.fn((id, subscription) => {
  return {};
});

module.exports = {
  findByEmail,
  create,
  findById,
  updateToken,
  updateSubscription,
  updateAvatar,
};
