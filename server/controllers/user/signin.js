const { User } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    const { email, password } = req.body;
    await User.findOne({
      where: {
        email : email,
        // password: password,
      },
      // attributes: { exclude: ['password'] }
    })
      .then(data => {
        //이메일 없는 경우 => 가입해라 
        if (!data) {
          return res.status(401).send('가입하지 않은 유저입니다. 회원가입을 진행해주세요.')
        }
        // 이메일 있는 경우 => 비번이 맞는 지 확인
        if (data.dataValues.password !== password) {
          return res.status(401).send('비밀번호가 틀렸습니다.')
        }
        else {
          const accessToken = generateAccessToken(data.dataValues);
          sendAccessToken(res, accessToken);
          const { email, name, admin } = accessToken;
          res.status(200).send({ email: email, name: name, admin: Boolean(admin) });
        }
      })

    /*
      if (!data) {
        return res.status(204).send('password/email is wrong or need to register')
      }
      const accessToken = generateAccessToken(data.dataValues);
        sendAccessToken(res, accessToken);
        const { email, name, admin } = accessToken;
        res.status(200).send({ email: email, name: name, admin: Boolean(admin) });
    })
    */
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
  },
};
