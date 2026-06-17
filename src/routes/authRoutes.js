const express = require("express");
const router = express.Router();
const { login, checkout } = require("../controllers/authController");

router.post("/login", login);
router.post("/checkout", checkout);

module.exports = router;