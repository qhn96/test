const express = require("express");
const { route } = require(".");
const spaceRoutes = require("./server/api/Space/space.route");

const router = express.Router();

router.use("/spaces", spaceRoutes);

module.exports = router;
