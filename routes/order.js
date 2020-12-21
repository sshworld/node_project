const express = require('express');
const router = express.Router();
var session = require('express-session');
const OrderController = require("../controller/order");
const order = new OrderController();


router.get('/order/:recipe_num/:order_count', order.selectRecipe, (req, res) => {
  res.render('index.ejs', { pages: './order.ejs', recipe: req.recipe, card: req.card, place: req.place, amount:req.amount, sess:req.session })
})

router.post('/order/:recipe_num/:order_count', order.order, (req, res, next) => {
  res.send('<script type="text/javascript">alert("주문이 완료되었습니다.");location.href="/";</script>');
})

module.exports = router;
