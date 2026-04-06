const { Router } = require("express");
const { getPrepareData } = require("../controllers/prepare.controller");

const router = Router();

router.get("/", getPrepareData);

module.exports = router;
