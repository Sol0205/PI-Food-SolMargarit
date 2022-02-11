const { Router } = require("express");
const router = Router();
const { dietsTypes } = require("./Diets.controller")

router.get("/types", dietsTypes);

module.exports = router;