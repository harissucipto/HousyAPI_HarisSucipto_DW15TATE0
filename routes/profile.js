const express = require("express");
const router = express.Router();
const { authenticated } = require("../middlewares/auth");
const { get } = require("../controllers/profile");

router.get("/", authenticated, get);

module.exports = router;
