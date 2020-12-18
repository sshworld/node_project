const express = require('express');
const router = express.Router();
var session = require('express-session');
const MainController = require("../controller/main");
const main = new MainController();

//메인
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

router.get('/chef', (req, res) => {
  res.render('index.ejs', {pages:'./chef.ejs'})
})

router.get('/chefDetail', (req, res) => {
  res.render('index.ejs', {pages:'./chefDetail.ejs'})
})

router.get('/mypage', (req, res) => {
  res.render('mypage.ejs')
})

router.get('/product', (req, res) => {
  res.render('index.ejs', {pages:'./product.ejs'})
})

module.exports = router;
