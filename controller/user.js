const db = require("../middleware/db")

class userController {
    async login (req, res, next) {

        const val = [req.body.user_id, req.body.user_pw];

        let userInfo = await db('SELECT * FROM users WHERE user_id = ? AND user_pw = ?', val)

        let bestRecipe
        
        if(userInfo.length < 0) {
            res.send('')
        }


        const mainObj = {
            
        }

        req.body.mainObj = mainObj

        next()
    }
    
}
  
module.exports = userController;