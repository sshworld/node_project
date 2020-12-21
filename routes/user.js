const express = require('express');
const router = express.Router();
var session = require('express-session');
const UserController = require("../controller/user");
const user = new UserController();

//로그인
router.get('/login', (req, res) => {
  if(req.session.user_id) {
    res.send('<script type="text/javascript">alert("이미 로그인 되었습니다.");location.href="/";</script>');
  }else {
    res.render('index.ejs', {pages: './login.ejs'})
  }
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


//로그아웃
router.get('/logout',(req, res, next) => {
  sess = req.session;
  if (sess) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.send('<script type="text/javascript">alert("로그아웃 되었습니다.");location.href="/";</script>');
      }
    })
  }
})





// ------------------카드------------------
//카드 등록
router.get('/addCard', (req, res) => {
  res.render('index.ejs', {pages: './addCard.ejs'});
})

router.post('/addCard', user.insertCard, (req, res, next) => {
  res.send('<script type="text/javascript">alert("카드가 등록 되었습니다.");location.href="/user/myPage";</script>');
})


// 카드 삭제
router.get('/deleteCard/:card_num', user.deleteCard, (req, res, next) => {
  res.send('<script type="text/javascript">alert("카드가 삭제 되었습니다.");location.href="/user/myPage";</script>');
})


//-------------------배송지--------------------
//배송지 등록
router.get('/addAddr', (req, res) => {
  res.render('index.ejs', {pages: './addAddr.ejs'});
})

router.post('/addAddr', user.insertPlace, (req, res, next) => {
  res.send('<script type="text/javascript">alert("배송지가 등록 되었습니다.");location.href="/user/myPage";</script>');
})


//배송지 수정
router.get('/updatePlace/:place_id', (req, res) => {
  res.render('index.ejs', {pages: './'})
})

router.post('/updatePlace/:place_id', user.updatePlace, (req, res) => {
  res.send('<script type="text/javascript">alert("배송지가 수정 되었습니다.");location.href="/user/mypage";</script>');
})


//배송지 삭제
router.get('/deletePlace/:place_id', user.deletePlace, (req, res, next) => {
  res.send('<script type="text/javascript">alert("배송지가 삭제 되었습니다.");location.href="/user/mypage";</script>');
})


//-------------------주문--------------------
//주문내역
router.get('/orderList', user.orderInfo, (req, res) => {
  res.render('mypage.ejs', {pageCount : 1 , myPageInfo : req.myPageInfo})
})

//주문삭제
router.get('/order/delete/:order_num/:recipe_num', user.deleteOrder, (req, res) => {
  res.send('<script type="text/javascript">alert("주문이 삭제 되었습니다.");location.href="/user/orderList";</script>');
})
// 장바구니 삭제
router.get('/basket/delete/:basket_num/:recipe_num', user.deleteBasket, (req, res) => {
  res.send('<script type="text/javascript">alert(" 삭제 되었습니다.");location.href="/user/basketList";</script>');
})

//장바구니 수량 업
router.get('/basket/countUp/:basket_num/:recipe_num', user.countUp, (req, res) => {
  res.send('<script type="text/javascript">alert("수량이 증가 되었습니다..");location.href="/user/basketList";</script>');
})

//장바구니 수량 다운
router.get('/basket/countDown/:basket_num/:recipe_num', user.countDown, (req, res) => {
  res.send('<script type="text/javascript">alert("수량이 감소 되었습니다..");location.href="/user/basketList";</script>');
})

//장바구니 담기
router.get('/basket/:recipe_num/:order_count', user.createBasket, (req, res) =>{
  res.send('<script type="text/javascript">alert("장바구니에 추가 되었습니다.");location.href="/";</script>');
})

//장바구니 개별 주문 
router.get('/basket/order/:basket_num/:recipe_num', user.selectRecipe, (req, res) => {
  res.render('index.ejs', { pages: './order.ejs', recipe: req.recipe, card: req.card, place: req.place, amount:req.selectBasketInfo[0].basket_sum })
})

//장바구니 통합 주문 
router.post('/basketOrder/:basket_num', user.basketOrder, (req, res, next) => {
  res.send('<script type="text/javascript">alert("장바구니 통합 주문이 완료되었습니다.");location.href="/";</script>');
})

//장바구니 통합페이지로 넘어가기
router.get('/allOrder/:basket_num', user.allBasket, (req, res) => {
  res.render('index.ejs', { pages: './basketOrder.ejs', card: req.card, place: req.place, recipe:req.selectBasketInfo})
} )

// 마이페이지 
router.get('/mypage', user.myPageInfo, (req, res) => {
  res.render('mypage.ejs', {pageCount : 0 , myPageInfo : req.myPageInfo})
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
