const { Ingredient } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  get: (req, res) => { // 전체 식재료 가져오기
    Ingredient.findAll()
      .then(data => {
        if (!data) {
          return res.status(404).send('No contents')
        }
        const ingredient = [...data];
        res.status(200).send(ingredient);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('Internal Server Error')
      });
  },
  post: (req, res) => { // 관리자모드, 식재료 추가(동일한 식재료 추가 X)
    const userinfo = isAuthorized(req);
    if (!userinfo.admin) {
      return res.status(403).send('Not authorized. Only admin available to edit')
    }
    const { ingredient_name, keep_method } = req.body;
    Ingredient.findOrCreate({
      where: {
        ingredient_name,
      },
      defaults: {
        ingredient_name,
        keep_method,
      },
    })
      .then(([result, created]) => {
        if (!created) {
          return res.status(409).send('resource exists')
        }
        const ingredient = result.dataValues;
        res.status(201).send(ingredient);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('Internal Server Error');
    })
  },
  delete: (req, res) => { // 관리자모드, 식재료 삭제
    const userinfo = isAuthorized(req);
    if (!userinfo.admin) {
      return res.status(403).send('Not authorized. Only admin available to edit')
    }
    const { ingredient_name } = req.body; // 클라이언트 확인
    Ingredient.destroy({ where: { ingredient_name } })
      .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
    return res.status(205).send(req.body);
  },
};
