const express = require("express");
const router = express.Router();
const { authenticated } = require("../middlewares/auth");
const { get, edit, add } = require("../controllers/order");

router.post("/", authenticated, add);
router.get("/:id", authenticated, get);
router.patch("/:id", authenticated, edit);

module.exports = router;
