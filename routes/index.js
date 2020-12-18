const express = require('express');

const mainRoute = require('./main')
const userRoute = require('./user')
const orderRoute = require('./order')


const router = express.Router();

router.use("/", mainRoute)
router.use("/user", userRoute)
router.use("/order", orderRoute)



module.exports = router;