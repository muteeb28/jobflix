const { Router } = require("express");
const { getActiveUsers } = require("../controllers/activeUsers.controller");

const router = Router();

router.get("/", getActiveUsers);

module.exports = router;
