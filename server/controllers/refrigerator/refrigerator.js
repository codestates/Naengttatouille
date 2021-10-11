const { isAuthorized, clearAccessToken } = require('../tokenFunctions');
const { User, Ingredient, User_ingredient } = require('../../models');

const getIngredient = async (ingredient_id) => {
  let ingredient;
  await Ingredient.findOne({ where: { ingredient_id } })
    .then((data) => {
      ingredient = data;
    })
    .catch((err) => {
      console.log(err);
      ingredient = null;
    });
  return ingredient;
};

module.exports = {
  get: (req, res) => {
    const userinfo = isAuthorized(req);
    if (!userinfo) {
      clearAccessToken(res);
      return res.status(401).send('invalid accesstoken');
    }

    const { user_id } = userinfo;
    User.findAll({
      where: { user_id },
      include: Ingredient,
    })
      .then((data) => {
        const ingredients = data[0].Ingredients.map((ingredient) => {
          const { ingredient_id, name, keep_method } = ingredient;
          return { ingredient_id, name, keep_method };
        });
        return res.status(200).send(ingredients);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send('Internal Server Error');
      });
  },
  post: async (req, res) => {
    const userinfo = isAuthorized(req);
    if (!userinfo) {
      clearAccessToken(res);
      return res.status(401).send('invalid accesstoken');
    }

    const { user_id } = userinfo;
    const { ingredient_id } = req.params;
    const ingredient = await getIngredient(ingredient_id);
    if (!ingredient) {
      return res.status(404).send('No Exist Ingredient');
    }

    await User_ingredient.findOrCreate({
      where: { user_id, ingredient_id },
      defaults: { user_id, ingredient_id },
    })
      .then(([result, created]) => {
        if (!created) {
          return res.status(409).send('ingredient exists in refrigerator');
        }
        return res.status(201).send(ingredient);
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
      return res.status(401).send('invalid accesstoken');
    }

    const { user_id } = userinfo;
    const { ingredient_id } = req.params;
    const ingredient = await getIngredient(ingredient_id);

    await User_ingredient.findOne({ where: { user_id, ingredient_id } }).then(
      (data) => {
        if (!data) {
          return res.status(404).send('No Exist Ingredient in refrigerator');
        }
      }
    );

    await User_ingredient.destroy({ where: { user_id, ingredient_id } })
      .then((data) => {
        return res.status(205).send(ingredient);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send('Internal Server Error');
      });
  },
};
