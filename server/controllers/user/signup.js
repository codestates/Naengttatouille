module.exports = {
  post: async (req, res) => {
    const { email, password, name } = req.body;
    if (!email && !password && !name) { 
      res.status(422).send('insufficient parameters supplied');
    }
    else if (!email || !password || !name) { 
      res.status(400).send('Bad Request');
    }
    await user.findOrCreate({
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
        res.cookie('accessToken', token);
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