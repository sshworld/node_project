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
        req.session.user_sort = userInfo[0].user_sort

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

    //장바구니 생성
    async createBasket(req, res, next){
        try 
        {
           
            let basketData = await db("SELECT * FROM baskets WHERE user_id = ? ", [req.session.user_id])
            
            if (basketData == ""){
                await db("INSERT INTO baskets SET ?", {
                    basket_num : req.body.basket_num,
                    user_id : req.session.user_id
                
                    
                })
                let readBasketData = await db("SELECT * FROM baskets WHERE user_id = ?", [req.session.user_id])
                req.body.readBasketData = readBasketData
            }
            else{
                req.body.readBasketData = basketData
    
            }
            
            let recipeInfoData = await db("INSERT INTO basket_detail SET ?",{
                baseket_num : req.body.readBasketData[0].basket_num,
                recipe_num : req.body.req.params.recipe_num,
                basket_sum : 1
            
            })
    
            if (recipeInfoData.errno == 1062) {
                await db("UPDATE basketinfo SET basket_sum = basket_sum + 1 WHERE basket_num = ? AND recipe_num = ?", [req.body.readBasketData[0].basket_num, req.params.recipe_num])
            }
            
            const basketInfo = {
                basketData : basketData,
                recipeInfoData : recipeInfoData,
                readBasketData : readBasketData
            }

            req.basketInfo = basketInfo

            next();
        } catch (error) {
            console.log(error);
        }
    }

    

    //주문 삭제
    async deleteOrder (req, res, next) {
        let deleteorder = await db(`DELETE FROM orders WHERE place_num = "${req.params.order_num}"`)

        next();
    }
    //마이페이지 보여주기
    async myPageInfo (req, res, next) {
        let userName = await db("SELECT * FROM users WHERE user_id = ? ",[req.session.user_id])
        let readCardData = await db("SELECT * FROM cards WHERE user_id =?", [req.session.user_id])
        let readAddrData = await db("SELECT * FROM places WHERE user_id =?", [req.session.user_id])
        let orderReviewData = await db("SELECT u.user_name as chef_name, re.recipe_name, r.review_title, r.review_content, i.image_path, r.review_score FROM review r, orderinfo oi, recipe re, users u, image i WHERE r.order_num = oi.order_num AND r.recipe_num = oi.recipe_num AND re.recipe_num = oi.recipe_num AND re.user_id = u.user_id AND re.recipe_num = i.recipe_num AND i.image_seq = 1 AND r.user_id = ?", [req.session.user_id])
        let orderData = await db("SELECT i.image_path, u.user_name as chef_name, re.recipe_name, o.order_date, o.order_num, o.order_max, oi.order_sum, o.order_state FROM image i, users u, orders o, orderinfo oi, recipe re WHERE o.order_num = oi.order_num AND re.recipe_num = oi.recipe_num AND re.recipe_num = i.recipe_num AND re.user_id = u.user_id AND i.image_seq = 1 AND o.user_id = ?", [req.session.user_id])
        let basketData = await db("SELECT i.image_path, u.user_name as chef_name, re.recipe_name, re.recipe_money , bi.basket_sum FROM image i, recipe re, baskets b, users u, basketinfo bi WHERE i.recipe_num = re.recipe_num AND u.user_id = re.user_id AND b.basket_num = bi.basket_num AND  bi.recipe_num = re.recipe_num AND i.image_seq = 1 AND b.user_id = ? ", [req.session.user_id])
        
        
        const myPageInfo = {
            userName : userName,
            readCardData : readCardData,
            readAddrData : readAddrData,
            orderData : orderData,
            orderReviewData : orderReviewData,
            basketData : basketData 
        }

        req.myPageInfo = myPageInfo

        next();
    }

    //주문 내역 조회
    async orderInfo (req, res, next) {
        let userName = await db("SELECT * FROM users WHERE user_id = ? ",[req.session.user_id])
        let orderData = await db("SELECT re.recipe_num, i.image_path, u.user_name as chef_name, re.recipe_name, o.order_date, o.order_num, o.order_max, oi.order_sum, o.order_state FROM image i, users u, orders o, orderinfo oi, recipe re WHERE o.order_num = oi.order_num AND re.recipe_num = oi.recipe_num AND re.recipe_num = i.recipe_num AND re.user_id = u.user_id AND i.image_seq = 1 AND o.user_id = ?", [req.session.user_id])

       
        const myPageInfo = {
            userName : userName,
            orderData : orderData
        }
        
        req.myPageInfo = myPageInfo
       
        next();
    }
        
            

    // 장바구니 조회
    async myBasketInfo (req, res, next) {
        let userName = await db("SELECT * FROM users WHERE user_id = ? ",[req.session.user_id])
        let basketData = await db("SELECT re.recipe_num i.image_path, u.user_name as chef_name, re.recipe_name, re.recipe_money , bi.basket_sum FROM image i, recipe re, baskets b, users u, basketinfo bi WHERE i.recipe_num = re.recipe_num AND u.user_id = re.user_id AND b.basket_num = bi.basket_num AND  bi.recipe_num = re.recipe_num AND i.image_seq = 1 AND b.user_id = ? ", [req.session.user_id])
        const myPageInfo = {
            userName : userName,
            basketData : basketData
        }

        req.myPageInfo = myPageInfo

        next();
    }

    // 구매 후기 
    async orderReviewInfo (req, res, next) {
        let userName = await db("SELECT * FROM users WHERE user_id = ? ",[req.session.user_id])
        let orderReviewData = await db("SELECT re.recipe_num, u.user_name as chef_name, re.recipe_name, r.review_title, r.review_content, i.image_path, r.review_score FROM review r, orderinfo oi, recipe re, users u, image i WHERE r.order_num = oi.order_num AND r.recipe_num = oi.recipe_num AND re.recipe_num = oi.recipe_num AND re.user_id = u.user_id AND re.recipe_num = i.recipe_num AND i.image_seq = 1 AND r.user_id = ?", [req.session.user_id])
        
        const myPageInfo = {
            userName : userName,
            orderReviewData : orderReviewData
        }

        req.myPageInfo = myPageInfo

        next();
    }

    // 카드 내역
    async myCardInfo (req, res, next) {
        let userName = await db("SELECT * FROM users WHERE user_id = ? ",[req.session.user_id])
        let readCardData = await db("SELECT * FROM cards WHERE user_id =?", [req.session.user_id])

        

        const myPageInfo = {
            userName : userName,
            readCardData : readCardData
        }

        req.myPageInfo = myPageInfo

        

        next();
    }

    // 배송지 내역
    async myAddrInfo (req, res, next) {
        let userName = await db("SELECT * FROM users WHERE user_id = ? ",[req.session.user_id])
        let readAddrData = await db("SELECT * FROM places WHERE user_id =?", [req.session.user_id])
        
        const myPageInfo = {
            userName : userName,
            readAddrData : readAddrData
        }

        req.myPageInfo = myPageInfo

      
        next();
    }

}
  
module.exports = userController;