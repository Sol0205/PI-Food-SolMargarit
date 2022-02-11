const axios = require("axios");
const { Diet, YOUR_API_KEY } = require("../../db");
const responseAPI = require('../../../response.json')

const dietsTypes = async (req, res) => {
  const result = await responseAPI

  try{
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
  } catch(error){
    console.log(error);
  }
};

module.exports = { dietsTypes };  