const express = require("express");
const router = express.Router();
const { get } = require("../controllers/users");

router.get("/", get);

module.exports = router;
