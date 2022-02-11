const axios = require("axios");
const { Recipe, Diet, YOUR_API_KEY } = require("../db");

const getApiInfo = async () => {
  const apiInfo = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=50`
  );

  return apiInfo?.data?.results.map((data) => ({
    id: data.id,
    title: data.title,
    diets: data.diets[0],
    summary: data.summary,
    aggregateLikes: data.aggregateLikes,
    healthScore: data.healthScore,
    weightWatcherSmartPoints: data.weightWatcherSmartPoints,
    analyzedInstructions: data.analyzedInstructions,
    image: data.image,
  }));
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const allInfoApiDb = async () => {
  let datosApi = await getApiInfo();
  let datosDb = await getDbInfo();
  console.log('datosDb: ', datosDb);
  let allInfo = datosApi.concat(datosDb);
  return allInfo;
};

const getRecipeById = async () => {
  let datosApi = await getRecipeByIdFromProvider();
  let datosDb = await getDbInfo();
  console.log('datosDb: ', datosDb);
  let allInfo = datosApi.concat(datosDb);
  return allInfo;
};

const recipes = async (req, res) => {
  try {
    const { name } = req.query;
    const allData = await allInfoApiDb();

    if (name) {
      let recipeTitle = await allData.filter((recipe) =>
        recipe.title
          .toLowerCase()
          .split(" ")
          .join("")
          .includes(name.toLowerCase().split(" ").join(""))
      );

      recipeTitle.length != 0
        ? res.status(200).json(recipeTitle)
        : res.status(404).send("Recipe does not exist");
    } else res.status(200).json(allData);
  } catch (err) {
    res.json({ err });
  }
};

const newRecipe = async (req, res) => {
  let {
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
    let recipeCreated = await Recipe.create({
      title,
      summary,
      aggregateLikes,
      healthScore,
      analyzedInstructions,
      image,
    });

    let dietDb = await Diet.findAll({ where: { name: diets } });
    await recipeCreated.addDiet(dietDb);

    res.send("Recipe created successfully");
  } catch (err) {
    res.json({ err });
  }
};

const recipesById = async (req, res) => {
  const { id } = req.params;
  let allInfo = await getRecipeById(id);

  try {
    if (id) {
      let infoFilter = await allInfo.filter((recipe) => recipe.id == id);
      infoFilter.length != 0
        ? res.status(200).json(infoFilter)
        : res.status(404).send("Recipe not found");
    }
  } catch (err) {
    res.json({ err });
  }
};

module.exports = { recipes, recipesById, newRecipe };
