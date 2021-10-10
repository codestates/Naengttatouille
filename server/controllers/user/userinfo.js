const { user } = require('../../models');
const { isAuthorized, generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = {
  patch: async (req, res) => {
    const accessToken = isAuthorized(req);
    const id = req.params.id; // 사용자의 원래 정보를 가져오기 위함
    const { password, name } = req.body;

    if (!accessToken) {
      return res.status(401).send('invalid access token')
    }
    
    await user.update({
      password: password,
      name: name,
    }, {
      where: {id: id}
    })
      .then(data => {
        if (!data) {
          return res.status(404).send('failed to modify')
        }
        const { email, name, admin } = data.dataValues;
        const newAccessToken = generateAccessToken(data);
        sendAccessToken(res, newAccessToken);
        return res.status(200).send({email: email, name: name, admin: Boolean(admin)})
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('Internal Server Error')
    })
  },
  delete: async (req, res) => {
    const accessToken = isAuthorized(req);
    const { id } = req.params.id;
    
    if (!accessToken) {
      return res.status(401).send('invalid access token')
    }
    await user.destroy({
      where: {
        id,
      }
    })
      .then(data => {
        if (!data) {
        return res.status(204).send('회원탈퇴에 실패하였습니다. 로그인 후 다시 시도해보세요.')
        }
        const { email, name, admin } = data.dataValues;
        return res.status(205).send({email:email, name: name, admin:Boolean(admin)})
    })
      .catch(err => {
        console.log(err);
        res.status(500).send('Internal Server Error')
    })
  },
};
