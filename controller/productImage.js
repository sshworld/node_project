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

    next();
  })
}