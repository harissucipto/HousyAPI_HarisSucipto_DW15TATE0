const express = require("express");
const router = express.Router();
const { remove, get } = require("../controllers/user");

router.get("/:id", get);
router.delete("/:id", remove);

module.exports = router;
