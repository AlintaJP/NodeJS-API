const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const googleUserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: [true, 'Please provide google id'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
});

googleUserSchema.plugin(findOrCreate);

const googleUser = mongoose.model('googleUser', googleUserSchema, 'users');

module.exports = googleUser;
