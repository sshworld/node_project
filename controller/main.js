const { LoopDetected } = require("http-errors");
const db = require("../middleware/db")

class mainController {
    // 베스트 3개 가져오기
    async selectMain (req, res, next) {

        const searchInfo = await db(`SELECT * FROM recipe WHERE recipe_name LIKE "%${req.session.recipe_name}%"`)

        const scoreInfo = await db(`SELECT * FROM recipe ORDER BY recipe_score DESC limit 3`)

        const Info = {
            searchInfo : searchInfo,
            scoreInfo : scoreInfo
        }

        req.body.Info = Info;

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


}
  
module.exports = mainController;