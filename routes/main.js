const express = require('express');
const router = express.Router();
var session = require('express-session');
const MainController = require("../controller/main");
const main = new MainController();



router.get('/', main.selectMain, (req, res) => {
  console.log("로그", req.scoreInfo);
  res.render('index.ejs', {pages: './main.ejs', scoreInfo:req.scoreInfo})
})


// 분류
router.get('/list', main.selectList, (req, res) => {
  res.render('index.ejs', {pages: './list.ejs', selectList:req.selectList})
})


// 한식
router.get('/ko', main.selectKo, (req, res) => {
  res.render('index.ejs', {pages: './list.ejs', selectList:req.selectList})
})


// 중식
router.get('/ch', main.selectCh, (req, res) => {
  res.render('index.ejs', {pages: './list.ejs', selectList:req.selectList})
})


// 일식
router.get('/ja', main.selectJa, (req, res) => {
  res.render('index.ejs', {pages: './list.ejs', selectList:req.selectList})
})


// 양식
router.get('/us', main.selectUs, (req, res) => {
  res.render('index.ejs', {pages: './list.ejs', selectList:req.selectList})
})


//레시피 상세
router.get('/list/detail/:recipe_num', main.recipeDetail, (req, res) => {
  res.render('index.ejs', {pages: './listDetail.ejs', Detail:req.body.Detail})
})


// 후기   
router.get('/review', main.selectReview, (req, res) => {
  console.log(req.review);
  res.render('index.ejs', {pages:'./review.ejs', review: req.review})
})


// 랭킹
router.get('/ranking', main.selectRanking, (req, res) => {
  res.render('index.ejs', {pages:'./ranking.ejs', ranking:req.ranking})
})

// router.get('/chef', (req, res) => {
//   res.render('index.ejs', {pages:'./chef.ejs'})
// })

// router.get('/chefDetail', (req, res) => {
//   res.render('index.ejs', {pages:'./chefDetail.ejs'})
// })


// // 상품 등록
// router.get('/product', (req, res) => {
//   res.render('index.ejs', {pages:'./product.ejs'})
// })

// router.post('/product', main.insertProduct, (req, res, next) => {
//   res.send('<script type="text/javascript">alert("상품이 등록 되었습니다.");location.href="/";</script>');
// })

// 쉐프 페이지 - 쉐프정보 불러오기
router.get('/chef', main.chefInfo, (req, res, next) => {
  
  res.render('index.ejs', {pages:'./chef.ejs', Info:req.Info})
})

// 쉐프 페이지 - 쉐프 상세 불러오기
router.get('/chefDetail/:user_id', main.chefDetailInfo, (req,res) => {
 
 
  res.render('index.ejs', {pages:'./chefDetail.ejs', chefDetailInfo:req.chefDetailInfo });
})

router.get('/addAddr', (req, res) => {
  res.render('index.ejs', {pages:'./addAddr'})
})
module.exports = router;
