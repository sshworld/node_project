const express = require('express');
const router = express.Router();
var session = require('express-session');
const MainController = require("../controller/main");
const productImage = require("../controller/productImage");

const main = new MainController();



router.get('/', main.selectMain, (req, res) => {
  res.render('index.ejs', {pages: './main.ejs', scoreInfo:req.scoreInfo, sess:req.session})
})


// 분류
router.get('/list', main.selectList, (req, res) => {
  var cc = 0;
  res.render('index.ejs', {pages: './list.ejs', cc:cc, selectList:req.selectList, sess:req.session})
})


// 한식
router.get('/ko', main.selectKo, (req, res) => {
  var cc = 1;
  res.render('index.ejs', {pages: './list.ejs', cc:cc, selectList:req.selectList, sess:req.session})
})


// 중식
router.get('/ch', main.selectCh, (req, res) => {
  var cc = 2;
  res.render('index.ejs', {pages: './list.ejs', cc:cc, selectList:req.selectList, sess:req.session})
})


// 일식
router.get('/ja', main.selectJa, (req, res) => {
  var cc = 3;
  res.render('index.ejs', {pages: './list.ejs', cc:cc, selectList:req.selectList, sess:req.session})
})


// 양식
router.get('/us', main.selectUs, (req, res) => {
  var cc = 4;
  res.render('index.ejs', {pages: './list.ejs', cc:cc, selectList:req.selectList, sess:req.session})
})


//레시피 상세
router.get('/list/detail/:recipe_num', main.recipeDetail, (req, res) => {
  res.render('index.ejs', {pages: './listDetail.ejs', Detail:req.body.Detail, sess:req.session})
})


// 후기   
router.get('/review', main.selectReview, (req, res) => {
  console.log(req.review);
  res.render('index.ejs', {pages:'./review.ejs', review: req.review, sess:req.session})
})


// 랭킹
router.get('/ranking', main.selectRanking, (req, res) => {
  res.render('index.ejs', {pages:'./ranking.ejs', ranking:req.ranking, sess:req.session})
})


// 상품 등록
router.get('/product', main.category, (req, res) => {
  res.render('index.ejs', {pages:'./product.ejs', category:req.category, sess:req.session})
})

router.post('/product', productImage.send, main.insertProduct, (req, res, next) => {
  res.send('<script type="text/javascript">alert("상품이 등록 되었습니다.");location.href="/";</script>');
})


// 쉐프 페이지 - 쉐프정보 불러오기
router.get('/chef', main.chefInfo, (req, res) => {  
  res.render('index.ejs', {pages:'./chef.ejs', Info:req.Info, sess:req.session})
})

// 쉐프 페이지 - 쉐프 상세 불러오기
router.get('/chefDetail/:user_id', main.chefDetailInfo, (req,res) => {
  res.render('index.ejs', {pages:'./chefDetail.ejs', chefDetailInfo:req.chefDetailInfo, sess:req.session });
})


router.get('/addAddr', (req, res) => {
  res.render('index.ejs', {pages:'./addAddr', sess:req.session})
})


//리뷰 작성
router.get('/addReview/:order_num/:recipe_num', main.review, (req, res) => {
  res.render('index.ejs', {pages:'./addReview.ejs', sess:req.session})
})


//리뷰 작성
router.post('/addReview/:order_num/:recipe_num', main.addReview, (req, res) => {
  res.send('<script type="text/javascript">alert("후기가 등록 되었습니다.");location.href="/";</script>');
})

module.exports = router;
