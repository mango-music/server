const Users = require('../models').Users;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const asyncRedis = require("async-redis");
const redis = asyncRedis.createClient();

const signup = async (req, res) => {
  const {nickname, email, password} = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);
  
  try{
    const user = new Users({
      nickname,
      email,
      password: hashPass,
    });
    await user.save();
    
    const secretKey = process.env.TOKEN_KEY;
    const options = { expiresIn : '30m' };
    const rfOptions = { expiresIn : '14d' };  
    const access_token = await jwt.sign({ id : user.id }, secretKey, options);
    const refresh_token = await jwt.sign({ id : user.id }, secretKey, rfOptions);
    await redis.set(refresh_token, JSON.stringify({email, id:user._id}));
    const userinfo = { email: user.email, nickname: user.nickname };
    res.status(201).json({ 
      access_token, 
      refresh_token,
      userinfo });
  }
  catch(err){
    res.status(409).end('Alredy user');
  }
};

module.exports = signup;

// const userInfo = { id : user.id};
// const secretKey = process.env.TOKEN_KEY;
// const options = { expiresIn: '1d' };
// const token = await jwt.sign(userInfo, secretKey, options);
// const refreshtoken = createRefreshToken();

// createRefreshToken() = () => {
// let salt = bcrypt.genSaltSync(10);
// bcrypt.hashSync(config.tokenSecret, salt);
// }
// res.cookie('access-token', token, { httpOnly : true });
// res.cookie('refresh-token', token, { httpOnly : true});