const Musics = require('../models').Musics;
const errorHandling = require('../errorHandling');
const getRatingMusiclist = async (req, res) => {
  const user_id = await errorHandling(req, res);
  if(!user_id) return;
  const musicList = await Musics.find({user_id});
  res.status(200).json(musicList);
};
  
module.exports = getRatingMusiclist;