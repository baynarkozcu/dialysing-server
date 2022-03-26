const router = require("express").Router();

var mongoXlsx = require("mongo-xlsx");
const model = require("../models/DialysisCenters");

router.get("/", (req, res) => {
  res.render("test", { layout: "clinic-panel/layouts/panel" });
});

router.post("/uploadfile", (req, res) => {
  var xlsx = "C:/Projects/dialysing-server/public/uploads/test.xlsx";

  mongoXlsx.xlsx2MongoData(xlsx, model, function (err, data) {
    console.log("Hata ", err);
    console.log(data);
  });
});

module.exports = router;
