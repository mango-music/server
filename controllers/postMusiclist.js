const Musiclists = require('../models').Musiclists;
const errorHandling = require('../errorHandling');
const postMusiclist = async (req, res) => {
  const user_id = await errorHandling(req, res);
  if(!user_id) return;
  const { listname } = req.body; 
  if(!listname)  return res.status(400).end('Bad Request');
  const {doc, created} = await Musiclists.findOrCreate({
    listname,
    user_id
  });
  created ? 
    res.status(201).json(doc) : 
    res.status(409).end('이미 존재하는 리스트 입니다');
};

module.exports = postMusiclist;