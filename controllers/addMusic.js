const Musiclists = require('../models').Musiclists;
const errorHandling = require('../errorHandling');
const addMusic = async (req, res) => {
  const {thumbnail, videoid, title, listname} = req.body;
  if(!thumbnail || !videoid || !title || !listname) {
    return res.status(400).end('Bad Request');
  }
  const user_id = await errorHandling(req, res);
  if(!user_id) return;
  const {nModified} = await Musiclists.update({listname, user_id},{$addToSet: {musics: {
    videoid, 
    title, 
    thumbnail
  }}});
  nModified ?
    res.status(200).json({thumbnail, videoid, title, listname}) :
    res.status(409).end('리스트에 이미 존재하는 노래입니다.');
};

module.exports = addMusic;