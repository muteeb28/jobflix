const { Router } = require("express");
const { submitApplication } = require("../controllers/apply.controller");

const router = Router();

router.post("/", submitApplication);

module.exports = router;
