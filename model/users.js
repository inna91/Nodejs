const User = require('./schemas/user');

const findByEmail = async email => {
  return await User.findOne({ email });
};

const findById = async id => {
  return await User.findOne({ _id: id });
};

const findByVerificationToken = async verificationToken => {
  return await User.findOne({ verificationToken });
};

const create = async ({
  email,
  password,
  subscription,
  verify,
  verificationToken,
}) => {
  const user = new User({
    email,
    password,
    subscription,
    verify,
    verificationToken,
  });
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateVerificationToken = async (id, verify, verificationToken) => {
  return await User.updateOne({ _id: id }, { verify, verificationToken });
};

const updateAvatar = async (id, avatarURL) => {
  return await User.findOneAndUpdate({ _id: id }, { avatarURL });
};

const updateSubscription = async (id, subscription) => {
  return await User.updateOne({ _id: id }, { subscription });
};

module.exports = {
  findByEmail,
  create,
  findById,
  updateToken,
  updateSubscription,
  updateAvatar,
  updateVerificationToken,
  findByVerificationToken,
};
