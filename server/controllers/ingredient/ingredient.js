const { Ingredient } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  get: (req, res) => {
    Ingredient.findAll()
      .then((data) => {
        if (!data) {
          return res.status(404).send('No contents');
        }
        const ingredient = [...data];
        return res.status(200).send(ingredient);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send('Internal Server Error');
      });
  },
  post: (req, res) => {
    const userinfo = isAuthorized(req);
    if (!userinfo) {
      return res.status(401).send('invalid accesstoken');
    }
    if (!userinfo.admin) {
      return res
        .status(403)
        .send('Not authorized. Only admin available to edit');
    }
    const { name, keep_method } = req.body;
    Ingredient.findOrCreate({
      where: {
        name,
      },
      defaults: {
        name,
        keep_method,
      },
    })
      .then(([result, created]) => {
        if (!created) {
          return res.status(409).send('resource exists');
        }
        return res.status(201).send(result);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send('Internal Server Error');
      });
  },
  delete: async (req, res) => {
    const userinfo = isAuthorized(req);
    if (!userinfo) {
      return res.status(401).send('invalid accesstoken');
    }
    if (!userinfo.admin) {
      return res
        .status(403)
        .send('Not authorized. Only admin available to edit');
    }

    const { ingredient_id } = req.params;
    let ingredient;
    await Ingredient.findOne({ where: { ingredient_id } })
      .then((data) => {
        ingredient = data;
      })
      .catch((err) => {
        console.log(err);
        return res.status(404).send('No Exists');
      });

    await Ingredient.destroy({ where: { ingredient_id } })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send('Internal Server Error');
      });

    return res.status(205).send(ingredient);
  },
};
