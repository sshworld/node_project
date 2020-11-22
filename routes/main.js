const express = require('express');
const router = express.Router();
var session = require('express-session');
const MainController = require("../controller/main");
const user = new MainController();

router.get('/', (req, res) => {
  res.render('index.ejs', {pages: './main.ejs'})
})


module.exports = router;
