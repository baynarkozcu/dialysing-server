const router = require("express").Router();

const excelToJson = require("convert-excel-to-json");

const model = require("../models/DialysisCenters");

router.get("/", (req, res) => {
  
    console.log("Sayı :", Math.floor(Math.random() * 100));

  res.render("test", { layout: "clinic-panel/layouts/panel" });
});

router.post("/uploadfile", (req, res) => {
  const result = excelToJson({
    sourceFile: "C:/Projects/dialysing-server/public/uploads/test2.xlsx",
    header: {
      rows: 1,
    },
    columnToKey: {
      "*": "{{columnHeader}}",
    },
  });


  for (let index = 0; index < 10; index++) {
    var randomCount = Math.floor(Math.random() * 22);

    const dialysisCenter = {
      number: result.deneme[randomCount].number,
      companyInformation: {
        companyName: result.deneme[randomCount].companyName,
        //bio: result.deneme[randomCount].bio,
        photo: result.deneme[randomCount].photo,
      },
      adress: {
        country: result.deneme[randomCount].country,
        city: result.deneme[randomCount].city,
        //district: result.deneme[randomCount].district,
        adressDetailText: result.deneme[randomCount].adressDetailText,
        //zipCode: result.deneme[randomCount].zipCode,
      },
      contactInformation: {
        email: result.deneme[randomCount].email,
        phone: result.deneme[randomCount].phone,
      },
      centerDetails: {
        //centerType: result.deneme[randomCount].centerType,
      },
    };

    new model(dialysisCenter)
      .save()
      .then(() => {
        console.log("success");
        res.redirect("/test");
      })
      .catch((err) => {
        console.log("Hata Çıktı :", err);
      });
  }
});

module.exports = router;
