const multer = require('multer')

const db = require("../middleware/db")
let moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/productImage/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({
  storage: storage
})

module.exports.send = (req, res, next) => {
  upload.array('recipe')(req, res, () => {

    console.log('사진 들어왔나???');
    console.log(req.files[0].filename);
    for(var i =0; i<req.files.length; i++){
      console.log(req.files[i].filename, '   '+i+'번사진');
    }
    
    next();
  })
}