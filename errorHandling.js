const jwt = require('jsonwebtoken');
const asyncRedis = require("async-redis");
const redis = asyncRedis.createClient();
const errorHandling = async (req, res) => {
  try{
    const access_token = req.headers.authorization.slice(7);
    const blacklist_token = await redis.get(`blacklist_${access_token}`);
    if(blacklist_token) {
      res.status(401).end('권한이 없습니다');
    }else {
      const secretKey = process.env.TOKEN_KEY;
      const userinfo = await jwt.verify(access_token, secretKey);
      if(userinfo.id) {
        return userinfo.id;
      }
      res.status(404).end('잘못된 토큰입니다');
    }
  }
  catch(err) {
    if(err.name === 'TokenExpiredError') {
      res.status(419).json({
        code:419,
        message:'토큰이 만료되었습니다'
      });
    }else {
      res.status(500).end('Server error');
    }
  }
};

module.exports = errorHandling;