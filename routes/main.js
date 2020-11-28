const express = require('express');
const router = express.Router();
var session = require('express-session');
const MainController = require("../controller/main");
const user = new MainController();

router.get('/', (req, res) => {
  res.render('index.ejs', {pages: './main.ejs'})
})


router.get('/list', (req, res) => {
  res.render('index.ejs', {pages: './list.ejs'})
})

router.get('/list/detail', (req, res) => {
  res.render('index.ejs', {pages: './listDetail.ejs'})
})

// router.post('/', (req, res, next) => {
//   req.session.recipe_name = req.body.session;
//   console.log(req.session.recipe_name);
//   res.redirect('/');
// })

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

module.exports = router;
