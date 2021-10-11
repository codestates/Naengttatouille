const { isAuthorized, clearAccessToken } = require('../tokenFunctions');

module.exports = {
  get: (req, res) => {
    const userinfo = isAuthorized(req);
    if (!userinfo) {
      clearAccessToken(res);
      return res.status(401).send('invalid accesstoken');
    }
    return res.status(200).send(userinfo);
  },
};
