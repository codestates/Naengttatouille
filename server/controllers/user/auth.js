const { isAuthorized, clearAccessToken } = require('../tokenFunctions');

module.exports = {
  get: (req, res) => {
    // 토큰 생성일, 만료일도 반환됨
    const userinfo = isAuthorized(req);
    if (!userinfo) {
      clearAccessToken(res);
      return res.status(401).send('invalid accesstoken');
    }

    const { user_id, email, admin, name, createdAt, updatedAt } = userinfo;
    const data = { user_id, email, admin, name, createdAt, updatedAt };
    return res.status(200).send(data);
  },
};
