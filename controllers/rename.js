const Users = require('../models').Users;
const errorHandling = require('../errorHandling');
const rename = async (req, res) => {
  try {
    const { nickname } = req.body;
    if(!nickname) return res.status(400).end('Bad Request');
    const _id = await errorHandling(req, res);
    if(!_id) return;
    const user = await Users.findOne({_id});
    if(user) {
      user.nickname = nickname;
      console.log(user);
      await user.save();
      return res.status(201).json({_id, nickname, email: user.email});  
    }
    res.status(404).json("유저가 존재하지 않습니다");
  }
  catch (err){
    if(err.keyPattern.nickname){
      return res.status(409).end('이미 사용하고 있는 닉네임 입니다');
    }
    console.log(err);
    res.status(500).end('server error');
  }  
};
  
module.exports = rename;