const Users = require('../models').Users;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const asyncRedis = require("async-redis");
const redis = asyncRedis.createClient();

const signup = async (req, res) => {
  try{
    const {nickname, email, password} = req.body;
    if( !nickname || !email || !password) {
      return res.status(400).end('Bad Request');
    }
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    const user = new Users({
      nickname,
      email,
      password: hashPass,
    });
    await user.save();
    
    const secretKey = process.env.TOKEN_KEY;
    const options = { expiresIn : '30m' };
    const rfOptions = { expiresIn : '14d' };  
    const access_token = await jwt.sign({ id : user._id, email }, secretKey, options);
    const refresh_token = await jwt.sign({ refresh: true }, secretKey, rfOptions);
    await redis.set(refresh_token, JSON.stringify({email, id: user._id}));
    await redis.expire(refresh_token, 8640 * 14);
    const userinfo = { email: user.email, nickname: user.nickname };
    res.status(201).json({
      userinfo, 
      access_token, 
      refresh_token,
    });
  }
  catch(err){
    if(err.keyPattern.nickname){
      return res.status(409).end('이미 사용하고 있는 닉네임 입니다');
    }
    res.status(409).end('Already user');
  }
};

module.exports = signup;
