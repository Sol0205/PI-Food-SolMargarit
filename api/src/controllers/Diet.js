const axios = require("axios");
const { Diet, YOUR_API_KEY } = require("../db");
const responseAPI = require('../../response.json')

const dietsTypes = async (req, res) => {
  // const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=1`);
  const result = await responseAPI

  try{
    //Si el código que está dentro del try falla, se ejecuta el catch y el programa se sigue ejecutando.
    const types = await result.data.results.map((type) => type.diets);
    const diets = types.flat();
    const TypeDiet = [...new Set(diets)];
    
    TypeDiet.forEach((diet) => {
      Diet.findOrCreate({
        where: { name: diet },
      })
    })
    
    const allDiets = await Diet.findAll();
    res.status(200).json(allDiets);
  }catch(error){
    console.log(error);
  }
};

module.exports = { dietsTypes };  