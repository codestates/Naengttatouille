const { User } = require('../../models');

module.exports = {
  post: (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).send('Bad Request');
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
          return res.status(409).send('email exists');
        }
        const { email, name, admin, createdAt, updatedAt } = result.dataValues;
        const data = { email, name, admin, createdAt, updatedAt };
        return res.status(201).send(data);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send('Internal Server Error');
      });
  },
};
