const { Router } = require("express");
const router = Router();

const { recipes, recipesById, newRecipe} = require("../controllers/Recipe.js");

router.get("/", recipes);
router.get("/:id", recipesById);
router.post("/new", newRecipe); 

module.exports = router;