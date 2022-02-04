const { Router } = require("express");
const router = Router();

const {dietsTypes} = require("../controllers/Diet")

router.get("/types", dietsTypes);

module.exports = router;
