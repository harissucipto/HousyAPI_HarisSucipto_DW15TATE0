const express = require("express");
const router = express.Router();
const { get } = require("../controllers/orders");
const { listAs } = require("../middlewares/listAs");
const { authenticated } = require("../middlewares/auth");

/*


*/
router.get("/", authenticated, listAs, get);

module.exports = router;
