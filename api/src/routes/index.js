const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const dietsRouter = require('./Diets')
const recipesRouter = require('./Recipes')

const router = Router();

router.use('/Diets', dietsRouter);
router.use('/Recipes', recipesRouter);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
module.exports = router;