const express = require("express");
const router = express.Router();
const { authenticated } = require("../middlewares/auth");
const { detail, add, edit } = require("../controllers/house");

router.get("/:id", detail);
router.patch("/:id", authenticated, edit);
router.post("/", authenticated, add);

module.exports = router;
