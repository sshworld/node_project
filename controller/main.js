const { NetworkAuthenticationRequire } = require("http-errors");
const db = require("../middleware/db")

class mainController {
    // 베스트 3개 가져오기
    async selectMain (req, res, next) {

        const searchInfo = await db(`SELECT * FROM recipe WHERE recipe_name LIKE "%${req.session.recipe_name}%"`)

        const scoreInfo = await db(`SELECT * FROM recipe ORDER BY recipe_score DESC limit 3`)

        // 주문수, 리뷰수, 평점
        //const orderCount = await db (`SELECT COUNT(order_num) as orders, COUNT(reveiw_num) as review FROM orders as o, recipe as r, orderinfo as i ORDER BY recipe_score DESC limit 3 `)

        const Info = {
            searchInfo : searchInfo,
            scoreInfo : scoreInfo
        }

        req.body.Info = Info;
        console.log(req.body.Info);
        next();
    }
    

    // 분류 페이지 - 전체 출력
    async selectList (req, res, next){
        const selectList = await db(`SELECT * FROM category as c, recipe as r WHERE c.category_num = r.category_num`)

        req.body.listInfo = selectList

        next();
    }

    
    // 분류 페이지 - 카테고리 선택해서 출력
    async selectListDetail (req, res, next) {
        const detail = await db(`SELECT * FROM category as c, recipe as r WHERE c.category_num = r.category_num AND r.category_num = "${req.params.category_num}"`)

        req.body.detail = detail

        next();
    }

    // 레시피 상세
    async recipeDetail (req, res, next) {
        const sql = await db(`SELECT * FROM recipe WHERE recipe_num = "${req.params.recipe_num}"`)
        const review = await db(`SELECT * FROM review WHERE recipe_num = "${req.params.recipe_num}" ORDER BY review_date DESC`)
        const reviewCount = await db(`SELECT COUNT(review_num) FROM review WHERE recipe_num = "${req.params.recipe_num}"`)

        const Detail = {
            DetailInfo : sql[0],
            Review : review,
            Count : reviewCount[0]
        }

        req.body.Detail = Detail;
        console.log(Detail);
        next();
    }
}
  
module.exports = mainController;