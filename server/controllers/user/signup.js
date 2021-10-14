const { User } = require('../../models');

module.exports = {
  post: (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).send('Check password and name');
    }
    User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        email,
        password,
        name,
        admin: false,
      },
    })
      .then(([result, created]) => {
        if (!created) {
          return res.status(409).send('Email exists');
        }
        const { user_id, email, name, admin, createdAt, updatedAt } = result;
        const userinfo = { user_id, email, name, admin, createdAt, updatedAt };
        return res.status(201).send(userinfo);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send('Internal Server Error');
      });
  },
};
