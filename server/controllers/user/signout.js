const { clearAccessToken } = require('../tokenFunctions');

module.exports = {
  post: (req, res) => {
    clearAccessToken(res);
    return res.status(205).send(/*데이타 수정*/);
  },
};
