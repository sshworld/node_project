const db = require("../middleware/db")

class mainController {
    async selectMain (req, res, next) {

        const searchInfo = await db(`SELECT * FROM recipe WHERE recipe_name LIKE "%${req.session.recipe_name}%"`)

        //const scoreInfo = await db(`SELECT * FROM recipe WHERE `)

        req.body.searchInfo = searchInfo;
    }
    
}
  
module.exports = mainController;
  