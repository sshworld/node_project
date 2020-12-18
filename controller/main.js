const { NetworkAuthenticationRequire } = require("http-errors");
const db = require("../middleware/db")

class mainController {
    // 베스트 3개 가져오기
    async selectMain (req, res, next) {

        const searchInfo = await db(`SELECT * FROM recipe WHERE recipe_name LIKE "%${req.session.recipe_name}%"`)

        const scoreInfo = await db(`SELECT COUNT(o.order_num) as count, r.*, COUNT(v.review_num) as review FROM orders as o, recipe as r, orderinfo as i
        LEFT OUTER JOIN review as v ON i.recipe_num = v.recipe_num AND i.order_num = v.order_num WHERE o.order_num = i.order_num AND i.recipe_num = r.recipe_num GROUP BY r.recipe_num limit 3`)

        // 주문수, 리뷰수, 평점
        //const orderCount = await db (`SELECT COUNT(o.order_num) FROM orders as o, recipe as r, orderinfo as i WHERE o.order_num = i.order_num AND i.recipe_num = r.recipe_num ORDER BY r.recipe_score DESC limit 3`)

        // const Info = {
        //     searchInfo : searchInfo,
        //     scoreInfo : scoreInfo
        // }

        req.searchInfo = searchInfo;
        req.scoreInfo = scoreInfo;
        console.log(req.searchInfo);
        console.log(req.scoreInfo);
        next();
    }
    

    // 분류 페이지 - 전체 출력
    async selectList (req, res, next){
        const selectList = await db(`SELECT * FROM recipe`)

        req.selectList = selectList
        console.log(selectList);

        next();
    }

    
    // 분류 페이지 - 한식
    async selectKo (req, res, next) {
        const selectList = await db(`SELECT * FROM category as c, recipe as r WHERE c.category_num = r.category_num AND r.category_num = 1`)

        req.selectList = selectList
        console.log(selectList);

        next();
    }


    // 분류 페이지 - 중식
    async selectCh (req, res, next) {
        const selectList = await db(`SELECT * FROM category as c, recipe as r WHERE c.category_num = r.category_num AND r.category_num = 2`)

        req.selectList = selectList
        console.log(selectList);

        next();
    }


    // 분류 페이지 - 일식
    async selectJa (req, res, next) {
        const selectList = await db(`SELECT * FROM category as c, recipe as r WHERE c.category_num = r.category_num AND r.category_num = 3`)

        req.selectList = selectList
        console.log(selectList);

        next();
    }


    // 분류 페이지 - 양식
    async selectUs (req, res, next) {
        const selectList = await db(`SELECT * FROM category as c, recipe as r WHERE c.category_num = r.category_num AND r.category_num = 4`)

        req.selectList = selectList
        console.log(selectList);

        next();
    }

    // 레시피 상세
    async recipeDetail (req, res, next) {
        const sql = await db(`SELECT * FROM recipe WHERE recipe_num = "${req.params.recipe_num}"`)
        const review = await db(`SELECT * FROM review WHERE recipe_num = "${req.params.recipe_num}" ORDER BY review_date DESC`)
        const reviewCount = await db(`SELECT COUNT(review_num) as count FROM review WHERE recipe_num = "${req.params.recipe_num}"`)

        const Detail = {
            DetailInfo : sql[0],
            Review : review,
            Count : reviewCount[0]
        }

        console.log(Detail.Count);
        req.body.Detail = Detail;
        console.log(Detail);
        next();
    }
}
  
module.exports = mainController;