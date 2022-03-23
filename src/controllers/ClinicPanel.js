const DialysisCenterService = require("../services/DialysisCenters");

class HomeController {
  loginView(req, res) {
    res.render("clinic-panel/pages/clinic-login", { layout: "clinic-panel/layouts/index" });
  }

  choosePersonel(req, res) {
    res.render("clinic-panel/pages/choose-personel", { layout: "clinic-panel/layouts/index" });
  }

  chooseCenter(req, res) {
    console.log("choose center", req.body);
    res.render("clinic-panel/pages/choose-center", { layout: "clinic-panel/layouts/index" });
  }

  companyInformation(req, res) {
    res.render("clinic-panel/pages/company-information", { layout: "clinic-panel/layouts/index" });
  }

  chooseAddress(req, res) {
    res.render("clinic-panel/pages/choose-address", { layout: "clinic-panel/layouts/index" });
  }

  addressCorrection(req, res) {
    res.render("clinic-panel/pages/address-correction", { layout: "clinic-panel/layouts/index" });
  }

  clinicDetail(req, res) {
    res.render("clinic-panel/pages/clinic-detail", { layout: "clinic-panel/layouts/index" });
  }

  clinicServices(req, res) {
    res.render("clinic-panel/pages/clinic-services", { layout: "clinic-panel/layouts/index" });
  }

  paymentOption(req, res) {
    res.render("clinic-panel/pages/payment-option", { layout: "clinic-panel/layouts/index" });
  }

  doctors(req, res) {
    res.render("clinic-panel/pages/doctors", { layout: "clinic-panel/layouts/index" });
  }

  clinicSummary(req, res) {
    res.render("clinic-panel/pages/clinic-summary", { layout: "clinic-panel/layouts/index" });
  }
  // index(req, res, next) {
  //   res.render("clinic-panel/pages/index", { layout: "clinic-panel/layouts/main" });
  // }

  // createDialysisCenter(req, res, next) {
  //   DialysisCenterService.create(req.body).then(data => {
  //     res.redirect("panel");
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // }
}

module.exports = new HomeController();
