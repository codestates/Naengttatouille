const { User } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) { 
      return res.status(400).send('Bad Request');
    }
    await User.findOrCreate({
      where: { email: email },
      defaults: { 
        email: email,
        password: password,
        name: name,
        admin: 0,
      }
    })
    .then(([result, created]) => {
      if (!created) {
        res.status(409).send('email exists');
      } else { 
        const token = generateAccessToken(result.dataValues);
        sendAccessToken(res, token);
        const { email, name, admin } = token;
        res.status(201).send({ email: email, name: name, admin: Boolean(admin)})
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send();
    })
  },
};