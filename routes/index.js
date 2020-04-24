const express = require("express");
const router = express.Router();

router.use("/signin", require("./signin"));
router.use("/signup", require("./signup"));
router.use("/house", require("./house"));
router.use("/houses", require("./houses"));
router.use("/order", require("./order"));
router.use("/orders", require("./orders"));
router.use("/user", require("./user"));
router.use("/users", require("./users"));
router.use("/profile", require("./profile"));

module.exports = router;
