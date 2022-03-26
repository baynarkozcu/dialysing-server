const DialysisCenterService = require("../services/DialysisCenters");

class HomeController {
  loginView(req, res) {
    res.render("clinic-panel/pages/clinic-login", { layout: "clinic-panel/layouts/index" });
  }

  choosePersonel(req, res) {
    res.render("clinic-panel/pages/add-clinic/choose-personel", { layout: "clinic-panel/layouts/index" });
  }

  chooseCenter(req, res) {
    console.log("choose center", req.body);
    res.render("clinic-panel/pages/add-clinic/choose-center", { layout: "clinic-panel/layouts/index" });
  }

  companyInformation(req, res) {
    res.render("clinic-panel/pages/add-clinic/company-information", { layout: "clinic-panel/layouts/index" });
  }

  chooseAddress(req, res) {
    res.render("clinic-panel/pages/add-clinic/choose-address", { layout: "clinic-panel/layouts/index" });
  }

  addressCorrection(req, res) {
    res.render("clinic-panel/pages/add-clinic/address-correction", { layout: "clinic-panel/layouts/index" });
  }

  clinicDetail(req, res) {
    res.render("clinic-panel/pages/add-clinic/clinic-detail", { layout: "clinic-panel/layouts/index" });
  }

  clinicServices(req, res) {
    res.render("clinic-panel/pages/add-clinic/clinic-services", { layout: "clinic-panel/layouts/index" });
  }

  paymentOption(req, res) {
    res.render("clinic-panel/pages/add-clinic/payment-option", { layout: "clinic-panel/layouts/index" });
  }

  doctors(req, res) {
    res.render("clinic-panel/pages/add-clinic/doctors", { layout: "clinic-panel/layouts/index" });
  }

  clinicSummary(req, res) {
    res.render("clinic-panel/pages/add-clinic/clinic-summary", { layout: "clinic-panel/layouts/index" });
  }
  // index(req, res, next) {
  //   res.render("clinic-panel/pages/add-clinic/index", { layout: "clinic-panel/layouts/main" });
  // }

  // createDialysisCenter(req, res, next) {
  //   DialysisCenterService.create(req.body).then(data => {
  //     res.redirect("panel");
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // }

  addNewClinic(req, res, next) {
    res.render("clinic-panel/pages/panel/add-new-clinic", { layout: "clinic-panel/layouts/panel" });
  }

  addUser(req, res, next) {
    res.render("clinic-panel/pages/panel/add-user", { layout: "clinic-panel/layouts/panel" });
  }

  analysis(req, res, next) {
    res.render("clinic-panel/pages/panel/analysis", { layout: "clinic-panel/layouts/panel" });
  }

  answerWaitingRezervations(req, res, next) {
    res.render("clinic-panel/pages/panel/answer-waiting-rezervations", { layout: "clinic-panel/layouts/panel" });
  }

  calender(req, res, next) {
    res.render("clinic-panel/pages/panel/calender", { layout: "clinic-panel/layouts/panel" });
  }

  canceledRezervations(req, res, next) {
    res.render("clinic-panel/pages/panel/canceled-rezervations", { layout: "clinic-panel/layouts/panel" });
  }

  changePassword(req, res, next) {
    res.render("clinic-panel/pages/panel/change-password", { layout: "clinic-panel/layouts/panel" });
  }

  clinicPoint(req, res, next) {
    res.render("clinic-panel/pages/panel/clinic-point", { layout: "clinic-panel/layouts/panel" });
  }

  competition(req, res, next) {
    res.render("clinic-panel/pages/panel/competition", { layout: "clinic-panel/layouts/panel" });
  }

  completedRezervations(req, res, next) {
    res.render("clinic-panel/pages/panel/completed-rezervations", { layout: "clinic-panel/layouts/panel" });
  }

  contact(req, res, next) {
    res.render("clinic-panel/pages/panel/contact", { layout: "clinic-panel/layouts/panel" });
  }

  messages(req, res, next) {
    res.render("clinic-panel/pages/panel/messages", { layout: "clinic-panel/layouts/panel" });
  }

  evaluation(req, res, next) {
    res.render("clinic-panel/pages/panel/evaluation", { layout: "clinic-panel/layouts/panel" });
  }

  index(req, res, next) {
    res.render("clinic-panel/pages/panel/index", { layout: "clinic-panel/layouts/panel" });
  }

  messageOptions(req, res, next) {
    res.render("clinic-panel/pages/panel/message-options", { layout: "clinic-panel/layouts/panel" });
  }

  oncomingRezervations(req, res, next) {
    res.render("clinic-panel/pages/panel/oncoming-rezervations", { layout: "clinic-panel/layouts/panel" });
  }

  paymentOptions(req, res, next) {
    res.render("clinic-panel/pages/panel/payment-options", { layout: "clinic-panel/layouts/panel" });
  }

  promotions(req, res, next) {
    res.render("clinic-panel/pages/panel/promotions", { layout: "clinic-panel/layouts/panel" });
  }

  propertiesAndServices(req, res, next) {
    res.render("clinic-panel/pages/panel/properties-and-services", { layout: "clinic-panel/layouts/panel" });
  }

  questionsAnswered(req, res, next) {
    res.render("clinic-panel/pages/panel/questions-answered", { layout: "clinic-panel/layouts/panel" });
  }

  questionsNew(req, res, next) {
    res.render("clinic-panel/pages/panel/questions-new", { layout: "clinic-panel/layouts/panel" });
  }

  rezervationMessages(req, res, next) {
    res.render("clinic-panel/pages/panel/rezervation-messages", { layout: "clinic-panel/layouts/panel" });
  }

  updateUser(req, res, next) {
    res.render("clinic-panel/pages/panel/update-user", { layout: "clinic-panel/layouts/panel" });
  }

  uploadImage(req, res, next) {
    res.render("clinic-panel/pages/panel/upload-image", { layout: "clinic-panel/layouts/panel" });
  }

  visibility(req, res, next) {
    res.render("clinic-panel/pages/panel/visibility", { layout: "clinic-panel/layouts/panel" });
  }

  whatClosest(req, res, next) {
    res.render("clinic-panel/pages/panel/what-closest", { layout: "clinic-panel/layouts/panel" });
  }
}

module.exports = new HomeController();
