const db = require("../middleware/db")

class userController {
    //로그인
    async login (req, res, next) {

        const val = [req.body.user_id, req.body.user_pw];

        let userInfo = await db('SELECT * FROM users WHERE user_id = ? AND user_pw = ?', val);
        
        if(userInfo.length < 0) {
            res.send('');
        }

        req.session.user_id = userInfo[0].user_id

        //const mainObj = {
        //    userId : userID
        //}

        //req.body.mainObj = mainObj

        next()
    }
    

    //회원가입
    async signUp (req, res, next) {
        const val = [req.body.user_id, req.body.user_pw, req.body.user_name, req.body.user_num, req.body.user_email, "회원"]

        console.log("에러");
        let signupInfo = await db(`INSERT INTO users VALUES(?,?,?,?,?,?)`, val)

        req.body.signupInfo = signupInfo

        next();
    }


    //카드 등록
    async insertCard (req, res, next) {
        const val = [req.body.card_num, req.body.date, req.body.cvc, req.body.card_kind, req.session.user_id, req.session.user_id]

        let cardInfo = await db(`INSERT INTO cards VALUES (?,?,?,?,?)`, val)

        next();
    }


    //카드 삭제
    async deleteCard (req, res, next) {
        let deletecard = await db(`DELETE FROM cards WHERE card_num = "${req.params.card_num}"`)

        next();
    }


    //배송지 등록
    async insertPlace (req, res, next) {
        const val = [req.body.place_num, req.body.place_addr, req.body.place_addrinfo, req.session.user_id]

        let placeInfo = await db(`INSERT INTO places(?,?,?,?) VALUES (?,?,?,?)`, val)

        next();
    }


    //배송지 수정
    async updatePlace (req, res, next) {
        const val = [req.body.place_num, req.body.place_addr, req.body.place_addrinfo]

        let updateplace = await db(`UPDATE places SET place_num = ?, place_addr = ?, place_addrinfo = ? WHERE place_id = "${req.params.place_id}"`)

        next();
    }


    //배송지 삭제
    async deletePlace (req, res, next) {
        let deletepalce = await db(`DELETE FROM places WHERE place_num = "${req.params.place_num}"`)

        next();
    }


    //주문내역 가져오기
    async orderInfo (req, res, next) {
        let readOrder = await db(`SELECT * FROM orders WHERE user_id = "${req.session.user_id}"`)

        req.body.orderInfo = readOrder;
    }


    //배송지 삭제
    async deleteOrder (req, res, next) {
        let deleteorder = await db(`DELETE FROM orders WHERE place_num = "${req.params.order_num}"`)

        next();
    }
    //마이페이지 보여주기
    async myPageInfo (req, res, next) {
        let userName = await db("SELECT * FROM users WHERE user_id = ? ",[req.session.user_id])

        const myPageInfo = {
            userName : userName
        }

        req.myPageInfo = myPageInfo

        next();
    }


    // 장바구니 조회
    async myBasketInfo (req, res, next) {
        let userName = await db("SELECT * FROM users WHERE user_id = ? ",[req.session.user_id])

        const myPageInfo = {
            userName : userName
        }

        req.myPageInfo = myPageInfo

        const myBasketInfo = {
            
        }

        req.myBasketInfo = myBasketInfo

        next();
    }
    // 구매 후기 
    async orderReviewInfo (req, res, next) {
        let userName = await db("SELECT * FROM users WHERE user_id = ? ",[req.session.user_id])

        const myPageInfo = {
            userName : userName
        }

        req.myPageInfo = myPageInfo

        const orderReviewInfo = {
            
        }

        req.orderRviewInfo = orderReviewInfo

        next();
    }
    // 카드 내역
    async myCardInfo (req, res, next) {
        let userName = await db("SELECT * FROM users WHERE user_id = ? ",[req.session.user_id])
        let readCardData = await db("SELECT * FROM cards WHERE user_id =?", [req.session.user_id])

        const myPageInfo = {
            userName : userName
        }

        req.myPageInfo = myPageInfo

        const myCardInfo = {
            readCardData : readCardData
        }

        req.myCardInfo = myCardInfo

        next();
    }

    // 배송지 내역
    async myAddrInfo (req, res, next) {
        let userName = await db("SELECT * FROM users WHERE user_id = ? ",[req.session.user_id])
        let readAddrData = await db("SELECT * FROM places WHERE user_id =?", [req.session.user_id])
        
        const myPageInfo = {
            userName : userName
        }

        req.myPageInfo = myPageInfo

        const myAddrInfo = {
            readAddrData : readAddrData
        }

        req.myAddrInfo = myAddrInfo

        next();
    }

}
  
module.exports = userController;