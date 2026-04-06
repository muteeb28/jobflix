const { Router } = require("express");
const { getHackathons } = require("../controllers/hackathons.controller");

const router = Router();

router.get("/", getHackathons);

module.exports = router;
