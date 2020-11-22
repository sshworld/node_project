const express = require('express');
const router = express.Router();
var session = require('express-session');
const UserController = require("../controller/user");
const user = new UserController();

router.get('/login', (req, res) => {
  res.render('index.ejs', {pages: './login.ejs'})
})

router.post('/login', user.login, (req, res, next) => {
    res.send('<script type="text/javascript">alert("로그인 되었습니다.");location.href="/";</script>');
})


module.exports = router;
