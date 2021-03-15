const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Subscription } = require('../../helpers/constants');

const { Schema, model, SchemaTypes } = mongoose;

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
      enum: [Subscription.FREE, Subscription.PRO, Subscription.PREMIUM],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

contactSchema.plugin(mongoosePaginate);
const Contact = model('contact', contactSchema);

module.exports = Contact;
