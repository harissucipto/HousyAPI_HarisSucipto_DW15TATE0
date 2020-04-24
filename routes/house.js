const express = require("express");
const router = express.Router();
const { authenticated } = require("../middlewares/auth");
const { mustOwner } = require("../middlewares/mustRole");
const {
  detail,
  add,
  edit,
  remove,
} = require("../controllers/house");

router.get("/:id", detail);
router.patch("/:id", authenticated, mustOwner, edit);
router.post("/", authenticated, mustOwner, add);
router.delete("/:id", authenticated, mustOwner, remove);

module.exports = router;
