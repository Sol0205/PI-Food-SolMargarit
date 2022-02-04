const { Router } = require("express");
const router = Router();

const recipeController = require("./Recipes.controller");

router.get("/", recipeController.getAll);

router.get("/:id", recipeController.getById);

router.post("/new", recipeController.create); 

module.exports = router;