const { NetworkAuthenticationRequire } = require("http-errors");

const db = require("../middleware/db");
const moment = require("moment");


class orderController {
    //주문 페이지
    async selectRecipe(req, res, next) {
        if (req.session.user_id) {

            const recipe = await db(
                `SELECT * FROM recipe as r, image as i WHERE r.recipe_num = "${req.params.recipe_num}" AND i.image_seq = 1 AND r.recipe_num = i.recipe_num`
            );

            const card = await db(
                `SELECT * FROM cards WHERE user_id = "${req.session.user_id}"`
            );

            const place = await db(
                `SELECT * FROM places WHERE user_id = "${req.session.user_id}"`
            );

            if (card == "" || place == "") {
                res.send(
                    '<script type="text/javascript">alert("등록된 카드나 배송지가 없습니다.");history.back();</script>'
                );
            } else {
                req.recipe = recipe[0];
                req.card = card;
                req.place = place;
                req.amount = req.params.order_count;

                next();
            }
        } else {
            res.send(
                '<script type="text/javascript">alert("로그인이 필요합니다.");history.back();</script>'
            );
        }
    }

    //주문

    async order(req, res, next) {

        const val = [
            moment().format("YYYY-MM-DD"),
            req.body.price,
            req.body.card_num,
            req.body.card_date,
            req.body.card_type,
            req.body.place_num,
            req.body.place_addr,
            req.body.place_addrinfo,
            "주문완료",
            moment().format("YYYY-MM-DD"),
            req.session.user_id,
        ];
        const order = await db(
            `INSERT INTO orders(order_date, order_max, card_num, card_date, card_kind, place_num, place_addr, place_addrinfo, order_state, update_date, user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
            val
        );

        const selectNum = await db(
            `SELECT max(order_num) as order_num FROM orders WHERE user_id = "${req.session.user_id}"`
        );

        const val2 = [selectNum[0].order_num, req.params.recipe_num, req.body.amount]
        const orderinfo = await db(`INSERT INTO orderinfo VALUES (?,?,?)`, val2)

        if(req.session.basket) {
            const basketNum = await db("SELECT basket_num FROM baskets WHERE user_id =?", [req.session.user_id])

            await db("DELETE FROM basketinfo WHERE recipe_num =? AND basket_num=?", [req.params.recipe_num, basketNum[0].basket_num])

            req.session.basket = false;
        }

        next();
    }
}

module.exports = orderController;
