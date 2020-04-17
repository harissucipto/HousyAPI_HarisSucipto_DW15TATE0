const express = require("express");
const router = express.Router();
const { authenticated } = require("../middlewares/auth");
const {
  detail,
  add,
  edit,
  remove,
} = require("../controllers/house");

router.get("/:id", detail);
router.patch("/:id", authenticated, edit);
router.post("/", authenticated, add);
router.delete("/:id", authenticated, remove);

module.exports = router;
