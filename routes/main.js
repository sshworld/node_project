const express = require('express');
const router = express.Router();
var session = require('express-session');
const MainController = require("../controller/main");
const userController = require('../controller/user');
const main = new MainController();



router.get('/', main.selectMain, (req, res) => {
  res.render('index.ejs', {pages: './main.ejs', Info:req.body.Info})
})


router.get('/list', (req, res) => {
  res.render('index.ejs', {pages: './list.ejs'})
})

router.get('/list/detail/:recipe_num', main.recipeDetail, (req, res) => {
  res.render('index.ejs', {pages: './listDetail.ejs', Detail:req.body.Detail})
})

// router.post('/', (req, res, next) => {
//   req.session.recipe_name = req.body.session;
//   console.log(req.session.recipe_name);
//   res.redirect('/');
// })

//<%=categoryInfo[i].category_num%>
router.get('/list/:category_num', (req, res, next) => {
  res.render('index.ejs', {pages: './list.ejs'})
})
  
router.get('/review', (req, res) => {
  res.render('index.ejs', {pages:'./review.ejs'})
})

router.get('/ranking', (req, res) => {
  res.render('index.ejs', {pages:'./ranking.ejs'})
})

// router.get('/chef', (req, res) => {
//   res.render('index.ejs', {pages:'./chef.ejs'})
// })

// router.get('/chefDetail', (req, res) => {
//   res.render('index.ejs', {pages:'./chefDetail.ejs'})
// })



router.get('/product', (req, res) => {
  res.render('index.ejs', {pages:'./product.ejs'})
})

// 쉐프 페이지 - 쉐프정보 불러오기
router.get('/chef', main.chefInfo, (req, res, next) => {
  
  res.render('index.ejs', {pages:'./chef.ejs', Info:req.body.Info})
})

// 쉐프 페이지 - 쉐프 상세 불러오기
router.get('/chefDetail/:user_id', main.chefDetailInfo, (req,res) => {
 
 
  res.render('index.ejs', {pages:'./chefDetail.ejs', chefDetailInfo:req.chefDetailInfo });
})
module.exports = router;
