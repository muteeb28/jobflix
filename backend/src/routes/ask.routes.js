const { Router } = require("express");
const { askMentor } = require("../controllers/ask.controller");

const router = Router();

router.post("/", askMentor);

module.exports = router;
