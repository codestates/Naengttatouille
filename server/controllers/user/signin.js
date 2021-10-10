const { User } = require('../../models');

module.exports = {
  post: async (req, res) => {
    const { email, password } = req.body;
    await User.findOne({
      where: {
        email : email,
        password: password,
      },
      attributes: { exclude: ['password'] }
    })
    .then(data => {
      if (!data) {
        return res.status(204).send('password/email is wrong or need to register')
      } else if(data) {
        const accessToken = generateAccessToken(data.dataValues);
        sendAccessToken(res, accessToken);
        const { email, name, admin } = accessToken;
        res.status(200).send({ email: email, name: name, admin: Boolean(admin) });
      } else {
        res.status(404).send('Not Found')
      }
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
  },
};
