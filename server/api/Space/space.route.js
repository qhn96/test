const express = require("express");
const router = express.Router();
const spaceCtl = require("./space.controller");

router.route("/synchronize").get(spaceCtl.synchronize);
router.route("/search").get(spaceCtl.search);

module.exports = router;
