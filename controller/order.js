const { NetworkAuthenticationRequire } = require("http-errors");
const db = require("../middleware/db")
const moment = require('moment');

class orderController {

    //주문 페이지
    async selectRecipe(req, res, next) {
        if (req.session.user_id) {

            console.log("에러1");
            const recipe = await db(`SELECT * FROM recipe WHERE recipe_num = "${req.params.recipe_num}"`)
            console.log("에러2");
            const card = await db(`SELECT * FROM cards WHERE user_id = "${req.session.user_id}"`)
            console.log("에러3");
            const place = await db(`SELECT * FROM places WHERE user_id = "${req.session.user_id}"`)

            req.recipe = recipe[0];
            req.card = card;
            req.place = place;

            console.log(recipe[0]);
            console.log(card);
            console.log(place);
            next();

        } else {
            res.send('<script type="text/javascript">alert("로그인이 필요합니다.");history.back();</script>');
        }
    }


    //주문
    async order (req, res, next) {
        console.log("에러1");
        const card = await db(`SELECT * FROM cards WHERE card_num = "${req.body.card_num}"`)
        console.log(card[0]);

        console.log("에러2");
        const place = await db(`SELECT * FROM places WHERE place_id = "${req.body.place_id}"`)
        console.log(place[0]);

        console.log("에러3");
        const recipe = await db(`SELECT * FROM recipe WHERE recipe_num = "${req.params.recipe_num}"`)
        console.log(recipe[0]);

        console.log("에러4");
        const order = await db(`INSERT INTO orders(?,?,?,?,?,?,?,?,?,?,?) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,)
        const val = [moment().format('YYYY-MM-DD'), req.body.price, card[0].card_num, card[0].card_date, card[0].kind, place[0].place_num, place[0].placee_addr, place[0].place_addrinfo, "주문완료", moment().format('YYYY-MM-DD'), req.session.user_id]
        
        console.log("에러5");
        const selectNum = await db(`SELECT last_insert_id() as order_num`)
        
        console.log("에러6");
        const orderinfo = await db(`INSERT INTO orderinfo(?,?,?) VALUES (?,?,?)`, val2)
        const val2 = [selectNum[0].order_num, req.params.recipe_num, count]

        next();
    }
}

module.exports = orderController;