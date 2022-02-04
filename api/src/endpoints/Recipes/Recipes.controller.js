const { Recipe, Diet } = require("../../db");
const provider = require('./Recipes.service') 

const getAll = async (req, res) => {
  try {
    const { name } = req.query;
    const recipes = await provider.getAll();

    if (name) {
      let recipeTitle = recipes.filter((recipe) =>
        recipe.title
          .toLowerCase()
          .split(" ")
          .join("")
          .includes(name.toLowerCase().split(" ").join(""))
      );

      recipeTitle.length != 0
        ? res.status(200).json(recipeTitle)
        : res.status(404).send("Recipe does not exist");
    } else res.status(200).json(recipes);
  } catch (err) {
    res.json({ err });
  }
};

const create = async (req, res) => {
  const {
    title,
    summary,
    aggregateLikes,
    healthScore,
    analyzedInstructions,
    image,
    diets,
  } = req.body;

  try {
    if (!title || !summary) {
      return res.json(
        "You must enter a title and a summary to create a recipe"
      );
    }
    const recipeCreated = await Recipe.create({
      title,
      summary,
      aggregateLikes,
      healthScore,
      analyzedInstructions,
      image,
    });

    const dietDb = await Diet.findAll({ where: { name: diets } });
    await recipeCreated.addDiet(dietDb);

    res.send("Recipe created successfully");
  } catch (err) {
    res.json({ err });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  let infoOfOneRecipe = await provider.getById(id);

  try {
    if (id) {
      Boolean(infoOfOneRecipe)
        ? res.status(200).json(infoOfOneRecipe)
        : res.status(404).send("Recipe not found");
    }
  } catch (err) {
    res.json({ err });
  }
};

module.exports = { getAll, getById, create };
