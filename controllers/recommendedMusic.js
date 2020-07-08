const Musics = require('../models').Musics;
const errorHandling = require('../errorHandling');
const recommended = require('../recommended');
const recommendedMusic = async (req, res) => {
  const user_id = await errorHandling(req, res);
  if(!user_id) return;
  const musics = await Musics.find();
  const musiclist = recommended(musics, user_id); 
  res.status(200).json(musiclist);
};
  
module.exports = recommendedMusic;