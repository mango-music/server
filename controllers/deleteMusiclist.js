const Musiclists = require('../models').Musiclists;
const errorHandling = require('../errorHandling');
const deleteMusicList = async (req, res) => {
  const { listname } = req.body;
  if(!listname) return res.status(400).end('Bad Request');
  const user_id = await errorHandling(req, res);
  if(!user_id) return;
  let {deletedCount} =await Musiclists.remove({listname, user_id});
  deletedCount ?
    res.status(200).send('ok') :
    res.status(404).end('리스트가 존재하지 않습니다');
};

module.exports = deleteMusicList;