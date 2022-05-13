const router = require("express").Router();

const excelToJson = require("convert-excel-to-json");

const model = require("../models/DialysisCenters");
const PromotionService = require("../models/Promotions");
const Permissions = require("../models/Permissions");
const Admin = require("../models/Admin");
const SeoSettings = require("../models/SeoSettings");

const { randMovie, randCountry, randNumber, randMusicGenre } = require("@ngneat/falso");
const { convertToSlug } = require("../scripts/utils/slugConverter");

router.get("/", (req, res) => {
  res.render("test", { layout: "clinic-panel/layouts/deneme" });
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

  for (let index = 0; index < 25; index++) {
    var randomCount = Math.floor(Math.random() * 100);

    const dialysisCenter = {
      companyInformation: {
        companyName: result.deneme[randomCount].companyName,
        bio: result.deneme[randomCount].bio,
        photo: result.deneme[randomCount].photo,
      },
      address: {
        country: result.deneme[randomCount].country,
        city: result.deneme[randomCount].city,
        district: result.deneme[randomCount].district,
        addressDetailText: result.deneme[randomCount].adressDetailText,
        zipCode: result.deneme[randomCount].zipCode,
      },
      contactInformation: {
        email: result.deneme[randomCount].email,
        phone: result.deneme[randomCount].phone,
      },
      centerDetails: {
        centerType: result.deneme[randomCount].centerType,
      },
      seflink: convertToSlug(result.deneme[randomCount].companyName) + "-" + new Date().valueOf(),
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

router.get("/save-promotions", (req, res) => {
  for (let index = 0; index < 20; index++) {
    const promotion = {
      title: randMovie(),
      viewer: "250 - 500 Kişi",
      token: 10,
      area: randCountry(),
      dateRange: "10 Ağustos - 28 Ağustos",
    };
    new PromotionService(promotion)
      .save()
      .then(() => {})
      .catch((err) => {
        console.log("Hata Çıktı :", err);
      });
  }
});

// router.get("/save-permission", (req, res) => {
//   for (let index = 0; index < 20; index++) {
//     const promotion = {
//       title: randMusicGenre(),
//     };
//     new Permissions(promotion)
//       .save()
//       .then(() => {
//         console.log("success");
//       })
//       .catch((err) => {
//         console.log("Hata Çıktı :", err);
//       });
//   }
// });

router.get("/save-admin", (req, res) => {
  const admins = {
    nameSurname: "Admin",
    email: "deneme@dneme.com",
    password: "123456",
    phone: "05555555555",
  };
  Admin.create(admins)
    .then((admin) => {
      console.log("admin :", admin);
    })
    .catch((err) => {
      console.log("Hata Çıktı :", err);
    });
});

router.get("/save-permission", (req, res) => {
  Admin.findByIdAndUpdate("627c20bb0453dcab3801bade", { permissions: [{ permission: "627c1f928af68c29423ea513", allow: true }] })
    .then((deneme) => {
      console.log("Kayıt Başarılı", deneme);
    })
    .catch((err) => {
      console.log("Hata Çıktı :", err);
    });
  // Admin.updateOne({ nameSurname: "Admin" }, { permissions: [{ permission: "627c1f928af68c29423ea513", allow: true }] });
});

router.get("/save-seo-settings", (req, res) => {
  const seoSettings = [
    {
      title: "Home Sayfasi Başlık",
      description: "Home Sayfasi Açıklama",
      page: "HomePage",
    },
    {
      title: "Klinik Listeleme Sayfasi Başlık",
      description: "Klinik Listeleme Sayfasi Açıklama",
      page: "ClinicListPage",
    },
    {
      title: "Klinik Ana Sayfasi Başlık",
      description: "Klinik Ana Sayfasi Açıklama",
      page: "ClinicMainPage",
    },
  ];
  SeoSettings.insertMany(seoSettings).then(() => {
    console.log("success");
  }).catch(err => console.log(err));
});

module.exports = router;
