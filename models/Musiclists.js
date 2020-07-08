const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const musiclistsSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  listname: {type: String, required: true},
  musics: Array,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {
  versionKey: false
});
musiclistsSchema.plugin(findOrCreate);
module.exports = mongoose.model('Musiclist', musiclistsSchema);