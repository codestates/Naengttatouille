const { clearAccessToken, isAuthorized } = require('../tokenFunctions');

module.exports = {
  post: (req, res) => {
    const userinfo = isAuthorized(req);
    clearAccessToken(res);
    const { user_id, email, name, admin, createdAt, updatedAt } = userinfo;
    const data = { user_id, email, name, admin, createdAt, updatedAt };
    return res.status(205).send(data);
  },
};
