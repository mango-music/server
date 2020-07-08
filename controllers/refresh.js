const asyncRedis = require("async-redis");
const redis = asyncRedis.createClient();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const refresh = async (req, res) => {
  try {
    const refresh_token = req.headers.authorization.slice(7); 
    const blacklist_token = await redis.get(`blacklist_${refresh_token}`);
    if(blacklist_token) {
      return res.status(401).end('권한이 없습니다');
    }
    const secretKey = process.env.TOKEN_KEY;
    await jwt.verify(refresh_token, secretKey);
    let userinfo = JSON.parse(await redis.get(refresh_token));
    const access_token = await jwt.sign(userinfo, secretKey, {expiresIn:'30m'});
    res.status(200).json({access_token});
  }
  catch (err) {
    if(err.name === 'TokenExpiredError') {
      return res.status(419).json({
        code:419,
        message:'토큰이 만료되었습니다'
      });
    }
    return res.status(500).end('Server error');
  }
};

module.exports = refresh;