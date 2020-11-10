const express = require('express');

const userRoute = require('./users')

const router = express.Router();

router.use("/", userRoute)

module.exports = router;
