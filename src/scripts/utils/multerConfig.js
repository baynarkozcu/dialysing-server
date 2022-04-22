const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../../../public/uploads/images"));
  },

  filename: (req, file, callback) => {
    // const currentDate = new Date();
    // // callback(null, currentDate.getUTCMilliseconds() + "_" + path.extname(file.originalname));
    // callback(null, currentDate.getTime()+"-"+file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, callback) => {
  var ext = path.extname(file.originalname);
  if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg") {
    return callback(null, false);
  } else {
    callback(null, true);
  }
};

const uploadFile = multer({ storage: storage, fileFilter: fileFilter });

module.exports = uploadFile;
