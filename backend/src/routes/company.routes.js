const { Router } = require("express");
const { getCompany } = require("../controllers/company.controller");

const router = Router();

router.get("/", getCompany);

module.exports = router;
