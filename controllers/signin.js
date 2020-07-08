const Users = require('../models').Users;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const asyncRedis = require("async-redis");
const redis = asyncRedis.createClient();
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if( !email || !password) {
      return res.status(400).end('Bad Request');
    }
    const user = await Users.findOne({email});
    if(!user) {
      return res.status(404).end('아이디가 틀렸습니다');
    }
    const judge = await bcrypt.compare(password, user.password);
    if(judge) {
      const userInfo = { id: user._id, email : user.email };
      const secretKey = process.env.TOKEN_KEY;
      const options = { expiresIn: '30m'};
      const access_token = await jwt.sign(userInfo, secretKey, options);
      const refresh_token = await jwt.sign({ refresh: true }, secretKey, {expiresIn:'14d'});
      await redis.set(refresh_token, JSON.stringify({email, id : user._id}));
      await redis.expire(refresh_token, 8640 * 14);
      const userinfo = {email: user.email, nickname: user.nickname};
      return res.status(200).json({
        userinfo,
        access_token,
        refresh_token
      });
    }
    return res.status(404).end('비밀번호가 틀렸습니다');
  }
  catch(err) {
    res.status(500).end('Server error');
  }
};

module.exports = signin;