const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const googleSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: [true, 'Please provide google id'],
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
    default: 'user',
  },
});

googleSchema.plugin(findOrCreate);

const GoogleUser = mongoose.model('GoogleUser', googleSchema, 'users');

module.exports = GoogleUser;
