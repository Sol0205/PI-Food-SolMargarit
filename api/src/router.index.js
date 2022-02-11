const { Router } = require('express');
const dietsRouter = require('./endpoints/Diets')
const recipesRouter = require('./endpoints/Recipes')
const router = Router();

router.use('/Diets', dietsRouter);
router.use('/Recipes', recipesRouter);

module.exports = router;