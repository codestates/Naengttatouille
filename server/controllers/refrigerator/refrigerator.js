const { isAuthorized, clearAccessToken } = require('../tokenFunctions');
const { User, Ingredient, User_ingredient } = require('../../models');

const getIngredient = async (req) => {
  const { ingredient_name } = req.params;
  let ingredient;
  await Ingredient.findOne({ where: { ingredient_name } })
    .then((data) => {
      const { id, keep_method } = data.dataValues;
      ingredient = { ingredient_id: id, ingredient_name, keep_method };
    })
    .catch((err) => {
      console.log(err);
      ingredient = null;
    });
  console.log(ingredient);
  return ingredient;
};

module.exports = {
  get: (req, res) => {
    const userinfo = isAuthorized(req);
    if (!userinfo) {
      clearAccessToken(res);
      res.status(401).send('invalid accesstoken');
    }

    const { id } = userinfo;
    User.findAll({ where: { id }, include: Ingredient })
      .then((data) => {
        const ingredients = data[0].Ingredients.map((ingredient) => {
          const { ingredient_name, keep_method } = ingredient;
          return { ingredient_name, keep_method };
        });
        res.status(200).send(ingredients);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Internal Server Error');
      });
  },
  post: async (req, res) => {
    const userinfo = isAuthorized(req);
    if (!userinfo) {
      clearAccessToken(res);
      res.status(401).send('invalid accesstoken');
    }

    const user_id = userinfo.id;
    const { ingredient_id, ingredient_name, keep_method } = await getIngredient(
      req
    );
    if (!ingredient_id || !ingredient_name || !keep_method) {
      return res.status(500).send('Internal Server Error');
    }

    await User_ingredient.findOrCreate({
      where: { user_id, ingredient_id },
      defaults: { user_id, ingredient_id },
    })
      .then(([result, created]) => {
        if (!created) {
          return res.status(409).send('ingredient exists');
        }
        const resData = { ingredient_name, keep_method };
        return res.status(201).send(resData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send('Internal Server Error');
      });
  },
  delete: async (req, res) => {
    const userinfo = isAuthorized(req);
    if (!userinfo) {
      clearAccessToken(res);
      res.status(401).send('invalid accesstoken');
    }

    const user_id = userinfo.id;
    const { ingredient_id, ingredient_name, keep_method } = await getIngredient(
      req
    );
    if (!ingredient_id || !ingredient_name || !keep_method) {
      return res.status(500).send('Internal Server Error');
    }

    await User_ingredient.destroy({ where: { user_id, ingredient_id } })
      .then((data) => {
        const resData = { ingredient_name, keep_method };
        res.status(205).send(resData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Internal Server Error');
      });
  },
};
