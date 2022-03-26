const router = require("express").Router();

const excelToJson = require("convert-excel-to-json");

const model = require("../models/DialysisCenters");

router.get("/", (req, res) => {
  res.render("test", { layout: "clinic-panel/layouts/panel" });
});

router.post("/uploadfile", (req, res) => {
  const result = excelToJson({
    sourceFile: "C:/Projects/dialysing-server/public/uploads/test.xlsx",
    header: {
      rows: 1,
    },
    columnToKey: {
      "*": "{{columnHeader}}",
    },
  });


  const dialysisCenter = {
    number: result.deneme[5].number,
    companyInformation: {
      companyName: result.deneme[5].companyName,
      bio: result.deneme[5].bio,
      photo: result.deneme[5].photo,
    },
    adress: {
      country: result.deneme[5].country,
      city: result.deneme[5].city,
      district: result.deneme[5].district,
      adressDetailText: result.deneme[5].adressDetailText,
      zipCode: result.deneme[5].zipCode,
    },
    contactInformation: {
      email: result.deneme[5].email,
      phone: result.deneme[5].phone,
    },
    centerDetails: {
      centerType: result.deneme[5].centerType,
    },
  };

  new model(dialysisCenter).save().then(() => {
    console.log("success");
    res.redirect("/test");
  }).catch(err => {
    console.log("Hata Çıktı :",err);
  })

  console.log("dialysisCenter", dialysisCenter);
});

module.exports = router;
