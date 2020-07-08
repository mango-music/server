const Musiclists = require('../models').Musiclists;
const errorHandling = require('../errorHandling');
const getMusiclist = async (req, res) => {
  const user_id = await errorHandling(req, res);
  if(!user_id) return;
  const musiclists = await Musiclists.find({user_id});
  res.status(200).json(musiclists);
};

module.exports = getMusiclist;