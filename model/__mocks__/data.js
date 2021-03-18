const contacts = [
  {
    _id: '604dea100c3cdb1fccbe8387',
    subscription: 'pro',
    name: 'Ann',
    phone: '(992) 914-3792',
    email: 'ann@mail.com',
    owner: '604b0dabc08afe0af0f3777b',
  },
  {
    _id: '604dea360c3cdb1fccbe8388',
    subscription: 'free',
    name: 'Max',
    phone: '(990) 910-3792',
    email: 'max@mail.com',
    owner: '604b0dabc08afe0af0f3777d',
  },
];

const newContact = {
  name: 'Peter',
  phone: '(990) 911-3792',
  email: 'peter@mail.com',
  subscription: 'premium',
};

const User = {
  _id: '604b0dabc08afe0af0f3777b',
  subscription: 'pro',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNGIwZGFiYzA4YWZlMGFmMGYzNzc3YiIsImlhdCI6MTYxNTcxODE1MiwiZXhwIjoxNjE1ODA0NTUyfQ.D3aG_480_2RACat5x6owy9xKqDa5R22IBtN5OasBQFU',
  email: 'example@example.com',
  password: '$2a$08$8xliMsRbQ4CxlZRoEdsJZOJjD3oUV0xBgHerh2Nh8E3K1HTcZixJS',
  avatarURL: '6051bf9ecd41801d707c99bf\\1616006205360-20191212_152488.jpg',
};

const users = [];
users[0] = User;

const newUser = {
  email: 'test@test.com',
  password: '987654',
};

module.exports = { contacts, newContact, User, users, newUser };
