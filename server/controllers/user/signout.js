const { clearAccessToken, isAuthorized } = require('../tokenFunctions');

module.exports = {
  post: (req, res) => {
    const userinfo = isAuthorized(req);
    clearAccessToken(res);
    return res.status(205).send(userinfo);
  },
};
