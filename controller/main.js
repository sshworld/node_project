
const { LoopDetected } = require("http-errors");

const { NetworkAuthenticationRequire } = require("http-errors");

const db = require("../middleware/db")

class mainController {
    // 베스트 3개 가져오기
    async selectMain (req, res, next) {

        const searchInfo = await db(`SELECT * FROM recipe WHERE recipe_name LIKE "%${req.session.recipe_name}%"`)

        const scoreInfo = await db(`SELECT COUNT(o.order_num) as count, r.*, COUNT(v.review_num) as review, m.image_path FROM orders as o, recipe as r, image as m, orderinfo as i
        LEFT OUTER JOIN review as v ON i.recipe_num = v.recipe_num AND i.order_num = v.order_num WHERE o.order_num = i.order_num AND i.recipe_num = r.recipe_num AND m.recipe_num = r.recipe_num GROUP BY r.recipe_num, m.image_num ORDER BY count DESC limit 3`)

        req.searchInfo = searchInfo;
        req.scoreInfo = scoreInfo;

        next();
    }
    

    // 분류 페이지 - 전체 출력
    async selectList (req, res, next){
        const selectList = await db(`SELECT * FROM recipe as r, image as i WHERE i.recipe_num = r.recipe_num AND i.image_seq = 1`)

        req.selectList = selectList
        next();
    }

    
    // 분류 페이지 - 한식
    async selectKo (req, res, next) {
        const selectList = await db(`SELECT * FROM category as c, recipe as r, image as i WHERE c.category_num = r.category_num AND r.category_num = 1 AND i.recipe_num = r.recipe_num AND i.image_seq = 1`)

        req.selectList = selectList

        next();
    }


    // 분류 페이지 - 중식
    async selectCh (req, res, next) {
        const selectList = await db(`SELECT * FROM category as c, recipe as r, image as i WHERE c.category_num = r.category_num AND r.category_num = 2 AND i.recipe_num = r.recipe_num AND i.image_seq = 1`)

        req.selectList = selectList

        next();
    }


    // 분류 페이지 - 일식
    async selectJa (req, res, next) {
        const selectList = await db(`SELECT * FROM category as c, recipe as r, image as i WHERE c.category_num = r.category_num AND r.category_num = 3 AND i.recipe_num = r.recipe_num AND i.image_seq = 1`)

        req.selectList = selectList

        next();
    }


    // 분류 페이지 - 양식
    async selectUs (req, res, next) {
        const selectList = await db(`SELECT * FROM category as c, recipe as r, image as i WHERE c.category_num = r.category_num AND r.category_num = 4 AND i.recipe_num = r.recipe_num AND i.image_seq = 1`)

        req.selectList = selectList
        console.log(selectList);

        next();
    }

    // 쉐프 페이지 - 쉐프정보 불러오기
    async chefInfo (req, res, next) {
        // let Info = await db("SELECT distinct user_name , category_name FROM users as u, recipe as r, category as c WHERE u.user_id = r.user_id AND r.category_num = c.category_num ORDER BY user_name")


        let Info = await db("SELECT distinct user_id AS chef_id, user_name as chef_name, (SELECT avg(recipe_score) FROM recipe WHERE user_id = chef_id) AS score FROM users WHERE user_sort = ?", ["요리사"])

        let categoryInfo = []

        for(var i = 0; i < Info.length; i++) {
           categoryInfo[i] = await db("SELECT distinct c.category_name FROM category c, users u, recipe r WHERE u.user_id = r.user_id AND r.category_num = c.category_num AND u.user_id = ? ", [Info[i].chef_id])
        }

        const chefInfo ={
            Info : Info,
            categoryInfo : categoryInfo 
        }
        req.Info = chefInfo


        next();
    }

      // 쉐프 페이지 - 쉐프 상세 정보 불러오기
      async chefDetailInfo (req, res, next) {

        let chefName = await db("SELECT user_name FROM users WHERE user_sort =? AND user_id =? " , ["요리사", req.params.user_id])

        let recipeInfo = await db("SELECT r.recipe_num, r.recipe_name, i.image_path FROM recipe r, image i WHERE r.recipe_num = i.recipe_num AND i.image_seq = 1 AND r.user_id=? ", [req.params.user_id])
        let recipeScore = await db("SELECT recipe_score FROM recipe  WHERE recipe_num = ?", [req.body.recipe_num])
        
        console.log(recipeInfo);

        const chefDetailInfo = {
            chefName : chefName,
            recipeInfo : recipeInfo,
            recipeScore : recipeScore
        }
        
        req.chefDetailInfo = chefDetailInfo

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

        req.body.Detail = Detail;
        next();
    }


    //리뷰가져오기
    async selectReview (req, res, next) {
        const review = await db(`SELECT * FROM review ORDER BY review_date DESC`)

        req.review = review;
        next();
    }


    //랭킹 가져오기
    async selectRanking (req, res, next) {
        const ranking = await db(`SELECT COUNT(o.order_num) as count, r.*, COUNT(v.review_num) as review FROM orders as o, recipe as r, orderinfo as i
        LEFT OUTER JOIN review as v ON i.recipe_num = v.recipe_num AND i.order_num = v.order_num WHERE o.order_num = i.order_num AND i.recipe_num = r.recipe_num GROUP BY r.recipe_num ORDER BY count DESC`)
        
        req.ranking = ranking;
        next();
    }


    //카테고리 가져오기
    async category (req, res, next) {

        if (req.session.user_sort == "요리사") {
            const sql = await db(`SELECT * FROM category`)

            req.category = sql
            
            next();
        } else {
            res.send('<script type="text/javascript">alert("요리사 회원이 아닙니다.");location.href="/";</script>');
        }
        
    }

    //레시피 등록
    async insertProduct (req, res, next) {
        console.log(req.body);

        if (req.body.category == "한식"){
            req.session.category = 1
        } else if (req.body.category == "중식"){
            req.session.category = 2
        } else if (req.body.category == "일식"){
            req.session.category = 3
        } else if (req.body.category == "양식"){
            req.session.category = 4
        }

        console.log("에러1");
        const val = [req.body.recipe_title, req.body.recipe_content, 0, req.body.recipe_price, "Y", req.session.category, req.session.user_id]
        const insert = await db (`INSERT INTO recipe(recipe_name, recipe_content, recipe_score, recipe_money, recipe_yn, category_num, user_id) VALUES (?,?,?,?,?,?,?)`, val)

        console.log("에러2");
        const num = await db(`SELECT max(recipe_num) as num FROM recipe WHERE user_id = "${req.session.user_id}"`)
        console.log(num);

        const ingredient = req.body.ingredient
        const count = req.body.count

        if(Array.isArray(ingredient)) {
            console.log("응 배열이야")

            for(var i=0; i<ingredient.length; i++) {
                console.log("에러3");
                let val2 = [1, num[0].num, count[i], ingredient[i]]
                let ing = await db(`INSERT INTO ingredient_recipe(in_num, recipe_num, in_re_sum, in_name) VALUES (?,?,?,?)`, val2)
    
            }
        } else {
            console.log("에러4");
            let val4 = [1, num[0].num, count, ingredient]
            let ing2 = await db(`INSERT INTO ingredient_recipe(in_num, recipe_num, in_re_sum,in_name) VALUES (?,?,?,?)`, val4)
        }

        console.log("나왔니?");
        const recipe = req.body.recipe
        const step = req.body.step
        console.log(step);
        var sum = 0;

        if(Array.isArray(step)) {
            console.log("응 배열이야22")

            for(var j=0; j<req.files.length; j++) {
                console.log("에러5");
                let val3 = [req.files[j].filename, step[j], num[0].num, j+1]
                console.log("넣는값",val3);
                let rec = await db(`INSERT INTO image(image_path, image_content, recipe_num, image_seq) VALUES (?,?,?,?)`, val3)
                sum ++;
                if(sum == step.length) {
                    console.log("에러6");
                    next();
                }
            }
        } else {
            let val5 = [req.files[0].filename, step, num[0].num, 1]
            let rec = await db(`INSERT INTO image(image_path, image_content, recipe_num, image_seq) VALUES (?,?,?,?)`, val5)
            
                next();
            
        }

        // for(var j=0; j<req.files.length; j++) {
        //     console.log("에러5");
        //     let val3 = [req.files[j].filename, step[j], num[0].num, j+1]
        //     let rec = await db(`INSERT INTO image(image_path, image_content, recipe_num, image_seq) VALUES (?,?,?,?)`, val3)
        //     sum ++;
        //     if(sum == recipe.length) {
        //         console.log("에러6");
        //         next();
        //     }
        // }
        
    }


}
  
module.exports = mainController;