const DialysisCenterService = require("../services/DialysisCenters");

class HomeController {
  loginView(req, res) {
    res.render("clinic-panel/pages/clinic-login", { layout: "clinic-panel/layouts/index" });
  }

  registerView(req, res) {
    res.render("clinic-panel/pages/clinic-register", { layout: "clinic-panel/layouts/index" });
  }

  activationView(req, res) {
    res.render("clinic-panel/pages/clinic-activation", { layout: "clinic-panel/layouts/index" });
  }

  choosePersonel(req, res) {
    res.render("clinic-panel/pages/add-clinic/choose-personel", { layout: "clinic-panel/layouts/index" });
  }

  chooseCenter(req, res) {
    const dialysingCenter = req.cookies.selectedDialysingCenter;
    if (dialysingCenter != undefined) {
      res.clearCookie("selectedDialysingCenter");

      dialysingCenter.personalInformation.nameSurname = req.body.nameSurname;
      dialysingCenter.personalInformation.email = req.body.email;
      dialysingCenter.personalInformation.phone = req.body.phone;
      dialysingCenter.personalInformation.job = req.body.job;
      res.cookie("selectedDialysingCenter", dialysingCenter);
    }
    res.render("clinic-panel/pages/add-clinic/choose-center", { layout: "clinic-panel/layouts/index", list: undefined });
  }

  chooseCenterView(req, res) {
    res.render("clinic-panel/pages/add-clinic/choose-center", { layout: "clinic-panel/layouts/index", list: undefined, center: req.cookies.selectedDialysingCenter });
  }

  getClinicList(req, res) {
    DialysisCenterService.index({ "companyInformation.companyName": { $regex: req.body.companyName, $options: "i" } })
      .then((centers) => {
        console.log("centers :", centers);
        res.render("clinic-panel/pages/add-clinic/choose-center", { layout: "clinic-panel/layouts/index", list: centers || [] });
      })
      .catch((err) => {
        console.log("Hata Çıktı :", err);
      });
  }

  companyInformationView(req, res) {
    res.render("clinic-panel/pages/add-clinic/company-information", { layout: "clinic-panel/layouts/index", center: req.cookies.selectedDialysingCenter });
  }

  companyInformation(req, res) {
    DialysisCenterService.findById(req.body.companyId)
      .then((center) => {
        if (center) {
          res.cookie("selectedDialysingCenter", center);
          res.render("clinic-panel/pages/add-clinic/company-information", { layout: "clinic-panel/layouts/index", center });
        } else {
          res.render("clinic-panel/pages/add-clinic/company-information", { layout: "clinic-panel/layouts/index" });
        }
      })
      .catch((err) => {
        console.log("Hata Çıktı :", err);
      });
  }

  chooseAddressView(req, res) {
    res.render("clinic-panel/pages/add-clinic/choose-address", { layout: "clinic-panel/layouts/index", center: req.cookies.selectedDialysingCenter });
  }

  chooseAddress(req, res) {
    const dialysingCenter = req.cookies.selectedDialysingCenter;
    res.clearCookie("selectedDialysingCenter");

    dialysingCenter.companyInformation.companyName = req.body.companyName;
    dialysingCenter.adress.addressDetailText = req.body.addressDetailText;
    dialysingCenter.companyInformation.taxNumber = req.body.taxNumber;
    dialysingCenter.companyInformation.taxOffice = req.body.taxOffice;

    res.cookie("selectedDialysingCenter", dialysingCenter);

    if (req.cookies.selectedDialysingCenter) {
      res.render("clinic-panel/pages/add-clinic/choose-address", { layout: "clinic-panel/layouts/index", center: req.cookies.selectedDialysingCenter });
    } else {
      res.render("clinic-panel/pages/add-clinic/choose-address", { layout: "clinic-panel/layouts/index" });
    }
  }

  addressCorrectionView(req, res) {
    res.render("clinic-panel/pages/add-clinic/address-correction", { layout: "clinic-panel/layouts/index" });
  }

  addressCorrection(req, res) {
    const dialysingCenter = req.cookies.selectedDialysingCenter;
    res.clearCookie("selectedDialysingCenter");

    dialysingCenter.adress.country = req.body.country;
    dialysingCenter.adress.city = req.body.city;
    dialysingCenter.adress.addressDetailText = req.body.addressDetailText;
    dialysingCenter.adress.zipCode = req.body.zipCode;

    dialysingCenter.contactInformation.phone = req.body.phone;
    dialysingCenter.contactInformation.whatsapp = req.body.whatsapp;
    dialysingCenter.contactInformation.website = req.body.website;
    dialysingCenter.companyInformation.bio = req.body.bio;

    res.cookie("selectedDialysingCenter", dialysingCenter);

    res.render("clinic-panel/pages/add-clinic/address-correction", { layout: "clinic-panel/layouts/index" });
  }

  clinicDetail(req, res) {
    res.render("clinic-panel/pages/add-clinic/clinic-detail", { layout: "clinic-panel/layouts/index" });
  }

  clinicServices(req, res) {
    const dialysingCenter = req.cookies.selectedDialysingCenter;
    res.clearCookie("selectedDialysingCenter");

    dialysingCenter.centerDetails.buildType = req.body.buildType;
    dialysingCenter.centerDetails.centerType = req.body.centerType;
    dialysingCenter.centerDetails.parkingType = req.body.parkingType;
    dialysingCenter.centerDetails.centerServices = req.body.centerServices;

    res.cookie("selectedDialysingCenter", dialysingCenter);

    res.render("clinic-panel/pages/add-clinic/clinic-services", { layout: "clinic-panel/layouts/index" });
  }

  paymentOption(req, res) {
    const dialysingCenter = req.cookies.selectedDialysingCenter;
    res.clearCookie("selectedDialysingCenter");

    dialysingCenter.services.dialysisType = req.body.dialysisType;
    dialysingCenter.services.inSessionService = req.body.inSessionService;
    dialysingCenter.services.languages = req.body.languages;
    dialysingCenter.services.interpreterPrice = req.body.interpreterPrice;

    res.cookie("selectedDialysingCenter", dialysingCenter);

    res.render("clinic-panel/pages/add-clinic/payment-option", { layout: "clinic-panel/layouts/index" });
  }

  doctors(req, res) {
    const dialysingCenter = req.cookies.selectedDialysingCenter;
    //res.clearCookie("selectedDialysingCenter");

    dialysingCenter.Payment.paymentTypes = req.body.paymentTypes;
    dialysingCenter.Payment.abroadPatientPaymentTypes = req.body.abroadPatientPaymentTypes;

    res.cookie("selectedDialysingCenter", dialysingCenter);

    res.render("clinic-panel/pages/add-clinic/doctors", { layout: "clinic-panel/layouts/index" });
  }

  clinicSummary(req, res) {
    res.render("clinic-panel/pages/add-clinic/clinic-summary", { layout: "clinic-panel/layouts/index" });
  }

  clinicSave(req, res) {
    const dialysingCenter = req.cookies.selectedDialysingCenter;
    DialysisCenterService.update(dialysingCenter._id, dialysingCenter)
      .then((center) => {
        res.clearCookie("selectedDialysingCenter");
        res.redirect("/");
      })
      .catch((err) => {
        console.log("Hata Çıktı :", err);
      });
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
