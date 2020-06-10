const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  nickname: String,
}, {
  versionKey: false
});

module.exports = mongoose.model('User', userSchema);