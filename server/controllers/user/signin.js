const { User } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = {
  post: (req, res) => {
    const [reqEmail, reqPassword] = [req.body.email, req.body.password];
    if (!reqEmail || !reqPassword) {
      return res.status(400).send('Bad Request');
    }
    User.findOne({ where: { email: reqEmail } }).then((data) => {
      if (!data) {
        return res.status(404).send('Not exist');
      }

      const { email, password, name, admin, createdAt, updatedAt } =
        data.dataValues;
      if (reqPassword !== password) {
        return res.status(422).send('failed to login');
      }

      const userinfo = { email, name, admin, createdAt, updatedAt };
      const token = generateAccessToken(userinfo);
      sendAccessToken(res, token);
      return res.status(200).send(userinfo);
    });
  },
};
