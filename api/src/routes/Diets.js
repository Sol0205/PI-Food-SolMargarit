const { Router } = require("express");
const router = Router();
const {dietsTypes} = require("../controllers/Diet")

router.get("/controllers/Diet", dietsTypes);

module.exports = router;
