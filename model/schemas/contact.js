const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set contact name'],
      unique: true,
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Set contact email'],
    },
    phone: {
      type: String,
      required: [true, 'Set contact phone'],
    },
    subscription: {
      type: String,
      default: 'free',
    },
    password: {
      type: String,
      default: 'password',
    },
    token: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true },
);

const Contact = model('contact', contactSchema);

module.exports = Contact;
