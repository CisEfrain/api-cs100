const multer = require("multer");
const uuid = require("uuid/v4");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/images");
  },
  filename: function(req, file, cb) {
/*     console.log('add middleware >>>' ,file)
    console.log('add middleware >>>' ,req.files) */
    cb(null, uuid());
  }
});

var upload = multer({ storage });
module.exports = upload;
