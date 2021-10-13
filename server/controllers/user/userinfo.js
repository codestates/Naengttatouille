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
      return res.status(401).send('Invalid access token');
    }
    const { user_id } = req.params;
    const { password, name } = req.body;
    if (!password || !name) {
      return res.status(400).send('Check password and name');
    }

    await User.update(
      {
        password,
        name,
      },
      { where: { user_id } }
    )
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send('Internal Server Error');
      });

    await User.findOne({ where: { user_id } })
      .then((data) => {
        clearAccessToken(res);
        const { user_id, email, admin, name, createdAt, updatedAt } = data;
        const payload = { user_id, email, admin, name, createdAt, updatedAt };
        const token = generateAccessToken(payload);
        sendAccessToken(res, token);
        return res.status(200).send(payload);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send('Internal Server Error');
      });
  },
  delete: async (req, res) => {
    // delete시 user 테이블 뿐만 아니라 관련된 조인 테이블도 삭제
    const userinfo = isAuthorized(req);
    if (!userinfo) {
      clearAccessToken(res);
      return res.status(401).send('Invalid access token');
    }
    const { user_id } = req.params;
    await User.destroy({ where: { user_id } })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Internal Server Error');
      });
    clearAccessToken(res);
    return res.status(205).send(userinfo);
  },
};
