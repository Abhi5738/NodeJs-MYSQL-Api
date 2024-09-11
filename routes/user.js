const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");

router.post("/user/signup", controller.signUp);
router.post("/user/login", controller.login);

module.exports = router;
