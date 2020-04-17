const express = require("express");
const router = express.Router();
const { get } = require("../controllers/orders");

router.get("/", get);

module.exports = router;
