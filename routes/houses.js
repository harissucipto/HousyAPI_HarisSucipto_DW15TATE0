const express = require("express");
const router = express.Router();
const { get } = require("../controllers/houses");

router.get("/", get);

module.exports = router;
