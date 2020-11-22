const express = require('express');

const mainRoute = require('./main')
const userRoute = require('./user')

const router = express.Router();

router.use("/", mainRoute)
router.use("/user", userRoute)


module.exports = router;