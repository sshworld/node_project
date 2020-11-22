const express = require('express');

const userRoute = require('./users')
const mainRoute = require('./main')

const router = express.Router();

router.use("/user", userRoute)
router.use("/main", mainRoute)

module.exports = router;