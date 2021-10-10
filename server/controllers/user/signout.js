const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    const id = req.params.id;
    const accessToken = isAuthorized(req);

    if (!accessToken) {
      return res.status(401).send('invalid access token')
    }
    await user.findOne({
      where: {
        id,
      }
    })
      .then(data => {
        if (!data) {
          return res.status(204).send('로그아웃에 실패했습니다. 다시 시도해주세요.')
        }
        const { email, name, admin } = data.dataValues;
        return res.status(205).send({ email: email, name: name, admin: Boolean(admin) })
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('Internal Server Error')
      });
  },
};
