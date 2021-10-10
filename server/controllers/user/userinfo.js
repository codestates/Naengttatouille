const { User } = require('../../models');
const {
  isAuthorized,
  generateAccessToken,
  sendAccessToken,
  clearAccessToken,
} = require('../tokenFunctions');

module.exports = {
  patch: async (req, res) => {
    const userinfo = isAuthorized(req);
    if (!userinfo) {
      clearAccessToken(res);
      return res.status(401).send('invalid access token');
    }
    const email = req.params.email;
    const { password, name } = req.body;
    await User.update(
      {
        password,
        name,
      },
      { where: { email } }
    ).catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
    await User.findOne({ where: { email } })
      .then((data) => {
        clearAccessToken(res);
        const userinfo = data.dataValues;
        const { admin, name, createdAt, updatedAt } = userinfo;
        const payload = { email, admin, name, createdAt, updatedAt };
        const token = generateAccessToken(payload);
        sendAccessToken(res, token);
        res.status(200).send(payload);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Internal Server Error');
      });
  },
  delete: async (req, res) => {
    // delete시 user 테이블 뿐만 아니라 관련된 조인 테이블도 삭제
    const userinfo = isAuthorized(req);
    if (!userinfo) {
      clearAccessToken(res);
      return res.status(401).send('invalid access token');
    }
    const email = req.params.email;
    await User.destroy({ where: { email } }).catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
    clearAccessToken(res);
    return res.status(205).send(userinfo);
  },
};
