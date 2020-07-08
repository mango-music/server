const Musics = require('../models').Musics;
const errorHandling = require('../errorHandling');
const delRatingMusic = async (req, res) => {
  const { videoid } = req.body;
  if(!videoid) {
    return res.status(400).end('Bad Request');
  }
  const user_id = await errorHandling(req, res);
  if(!user_id) return;
  await Musics.remove({videoid, user_id});
  res.status(200).send('ok');
};
  
module.exports = delRatingMusic;