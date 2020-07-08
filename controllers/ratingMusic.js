const Musics = require('../models').Musics;
const errorHandling = require('../errorHandling');
const ratingMusic = async (req, res) => {
  const {thumbnail, videoid, title, rating} = req.body;
  if(!thumbnail || !videoid || !title || !rating) {
    return res.status(400).end('Bad Request');
  }
  const user_id = await errorHandling(req, res);
  if(!user_id) return;
  await Musics.findOneAndUpdate({videoid, user_id},{
    thumbnail, 
    videoid, 
    title,
    rating,
    user_id 
  }, {upsert: true});
  res.status(200).json({thumbnail, videoid, title, rating});
};
  
module.exports = ratingMusic;