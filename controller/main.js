const db = require("../middleware/db")

class mainController {
    async selectMain (req, res, next) {

        const searchInfo = await db(`SELECT * FROM recipe WHERE recipe_name LIKE "%${req.session.recipe_name}%"`)

        const scoreInfo = await db(`SELECT * FROM recipe ORDER BY recipe_score DESC limit 3`)

        const Info = {
            searchInfo : searchInfo,
            scoreInfo : scoreInfo
        }

        req.body.Info = Info;
    }
    
}
  
module.exports = mainController;