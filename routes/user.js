const express = require('express');
const router = express.Router();
var session = require('express-session');
const UserController = require("../controller/user");
const user = new UserController();

//로그인
router.get('/login', (req, res) => {
  res.render('index.ejs', {pages: './login.ejs'})
})

router.post('/login', user.login, (req, res, next) => {
  res.send('<script type="text/javascript">alert("로그인 되었습니다.");location.href="/";</script>');
})


//회원가입
router.get('/signUp', (req, res) => {
  res.render('index.ejs', {pages: './signUp.ejs'});
})

router.post('/signUp', user.signUp, (req, res, next) => {
  res.send('<script type="text/javascript">alert("회원가입 되었습니다.");location.href="/";</script>');
})



// ------------------카드------------------
//카드 등록
router.get('/insertCard', (req, res) => {
  res.render('index.ejs', {pages: './'});
})

router.post('/insertCard', user.insertCard, (req, res, next) => {
  res.send('<script type="text/javascript">alert("카드가 등록 되었습니다.");location.href="/user/myPage";</script>');
})


// 카드 삭제
router.get('/deleteCard/:card_num', user.deleteCard, (req, res, next) => {
  res.send('<script type="text/javascript">alert("카드가 삭제 되었습니다.");location.href="/user/myPage";</script>');
})


//-------------------배송지--------------------
//배송지 등록
router.get('/insertPlace', (req, res) => {
  res.render('index.ejs', {pages: './'});
})

router.post('/insertPlace', user.insertPlace, (req, res, next) => {
  res.send('<script type="text/javascript">alert("배송지가 등록 되었습니다.");location.href="/user/myPage";</script>');
})


//배송지 수정
router.get('/updatePlace/:place_id', (req, res) => {
  res.render('index.ejs', {pages: './'})
})

router.post('/updatePlace/:place_id', user.updatePlace, (req, res) => {
  res.send('<script type="text/javascript">alert("배송지가 수정 되었습니다.");location.href="/user/myPage";</script>');
})


//배송지 삭제
router.get('/deletePlace/:place_id', user.deletePlace, (req, res, next) => {
  res.send('<script type="text/javascript">alert("배송지가 삭제 되었습니다.");location.href="/user/myPage";</script>');
})


//-------------------주문--------------------
//주문내역
router.get('/orderList', user.orderInfo, (req, res) => {
  res.render('mypage.ejs', {pageCount : 1 , myPageInfo : req.myPageInfo})
})

router.get('/deleteMyOrder/:order_num', user.deleteOrder, (req, res) => {
  res.send('<script type="text/javascript">alert("주문이 삭제 되었습니다.");location.href="/user/myOrderList";</script>');
})


// 마이페이지 
router.get('/mypage', user.myPageInfo, (req, res) => {
  res.render('mypage.ejs', {pageCount : 0, myPageInfo : req.myPageInfo})
})
// 장바구니 조회
router.get('/basketList', user.myBasketInfo, (req, res) => {
  res.render('mypage.ejs', {pageCount : 2 , myPageInfo : req.myPageInfo})
})


// 구매 후기
router.get('/orderReview', user.orderReviewInfo, (req, res) => {
  res.render('mypage.ejs', {pageCount : 3, myPageInfo : req.myPageInfo})
})

// 카드 내역
router.get('/mycard', user.myCardInfo, (req, res) => {
  res.render('mypage.ejs', {pageCount : 4, myPageInfo : req.myPageInfo})
})

// 배송지 내역 
router.get('/myaddr', user.myAddrInfo, (req, res) => {
  res.render('mypage.ejs', {pageCount : 5, myPageInfo : req.myPageInfo})
})


module.exports = router;
