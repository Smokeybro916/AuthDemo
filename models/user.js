const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    requireed: [true, 'Username cannot be blank']
  },
  password: {
    type: String,
    required: [true, 'Password cannot be blank']
  }
})

module.exprts = mongoose.model('User', userSchema);
