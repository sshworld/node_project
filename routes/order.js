const express = require('express');
const router = express.Router();
var session = require('express-session');
const OrderController = require("../controller/order");
const order = new OrderController();


router.get('/', (req, res) => {
    res.render('index.ejs', {pages:'./order.ejs'})
  })
  
module.exports = router;
