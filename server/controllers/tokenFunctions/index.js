require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    // 토큰 생성
    return sign(data, AWS.ACCESS_SECRET, { expiresIn: '300s' });
  },
  sendAccessToken: (res, accessToken) => {
    //토큰 전달
    res.cookie('accessToken', accessToken, { httpOnly: true });
  },
  isAuthorized: (req) => {
    // 토큰 검증
    const accessToken = req.cookies.accessToken;

    if (accessToken) {
      try {
        return verify(accessToken, AWS.ACCESS_SECRET);
      } catch (err) {
        return null;
      }
    } else {
      return null;
    }
  },
  clearAccessToken: (res) => {
    res.clearCookie('accessToken');
  },
};
