const express = require("express");
const router = express.Router();
const { remove } = require("../controllers/user");

router.delete("/:id", remove);

module.exports = router;
