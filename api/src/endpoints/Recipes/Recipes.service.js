const axios = require("axios");
const { Recipe, Diet, YOUR_API_KEY } = require("../../db");

  const getRecipeByIdFromProvider = async (id) => {
    const result = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=1`
    );
    return result.data
  };

  const getById = async (id) => {
    //  let recibeFoundInDB = await findByIdInDB(id);
    //  if (!recibeFoundInDB) {
        const recipeFound = await getRecipeByIdFromProvider(id);
        // await pushDataOfRecipe(id);
        // let recibeFoundInDB = await findByIdInDB(id);
    //  }      
    return recipeFound;
  };

  const urlProvider = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=50`;
  const getAllRecipesFromProvider = async () => {
    const { data } = await axios.get(urlProvider);
    return data.results;
  };

  const getAllRecipesFromDB = async () => {
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
  const getAll = async () => {
    const allRecipesFromProvider = await getAllRecipesFromProvider();
    // console.log('allRecipesFromProvider: ', allRecipesFromProvider);
    const allRecipesFromProviderDB = await getAllRecipesFromDB();

    const allInfo = allRecipesFromProvider.concat(allRecipesFromProviderDB);
    console.log('allInfo: ', allInfo);
    return allInfo;
  };

  module.exports = {
    getAll,
    getById,
  }