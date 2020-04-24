const express = require("express");
const router = express.Router();
const { authenticated } = require("../middlewares/auth");
const { listAs } = require("../middlewares/listAs");
const { mustTenant } = require("../middlewares/mustRole");

const { get, edit, add } = require("../controllers/order");

router.post("/", authenticated, mustTenant, listAs, add);
router.get("/:id", authenticated, listAs, get);
router.patch("/:id", authenticated, listAs, edit);

module.exports = router;
