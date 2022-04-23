const router = require("express").Router();
require("express-router-group");
const { clinicAuthenticate, clinicCurrentUser } = require("../middlewares/authentication");
// const idChecker = require("../middlewares/idChecker");

const multerConfig = require("../scripts/utils/multerConfig");

//! TODO ADMIN KONTROLÜ YAPILACAK....

const Controller = require("../controllers/ClinicPanel");

router.get("/", clinicAuthenticate, Controller.index);

// AUTHENTICATION
router.get("/login", clinicCurrentUser, Controller.loginView);
router.post("/login", clinicCurrentUser, Controller.login);
router.get("/logout", clinicAuthenticate, Controller.logout);
router.get("/register", clinicCurrentUser, Controller.registerView);
router.post("/register", clinicCurrentUser, Controller.register);
router.get("/activation", clinicCurrentUser, Controller.activation);

//PANEL
router.group("/", clinicAuthenticate, (router) => {
  router.get("/choose-personel", Controller.choosePersonel);

  router.get("/choose-center-view", Controller.chooseCenterView);
  router.post("/choose-center", Controller.chooseCenter);
  router.post("/choose-center-get-clinic-list", Controller.getClinicList);

  router.get("/company-information", Controller.companyInformationView);
  router.post("/company-information", Controller.companyInformation);

  router.get("/choose-address", Controller.chooseAddressView);
  router.post("/choose-address", Controller.chooseAddress);

  router.get("/address-correction", Controller.addressCorrectionView);
  router.post("/address-correction", Controller.addressCorrection);

  router.get("/clinic-detail", Controller.clinicDetail);
  router.post("/clinic-services", Controller.clinicServices);
  router.post("/payment-option", Controller.paymentOption);
  router.post("/doctors", Controller.doctors);
  router.post("/clinic-summary", Controller.clinicSummary);
  router.get("/clinic-summary", Controller.clinicSummaryView);
  router.get("/clinic-save", Controller.clinicSave);

  router.get("/analysis", Controller.analysis);

  router.get("/answer-waiting-rezervations", Controller.answerWaitingRezervations);
  router.get("/accept-appointment/:id", Controller.acceptAppointment);
  router.get("/oncoming-rezervations", Controller.oncomingRezervations);
  router.get("/completed-rezervations", Controller.completedRezervations);
  router.get("/canceled-rezervations", Controller.canceledRezervations);

  router.get("/calender", Controller.calender);

  router.get("/change-password", Controller.changePasswordView);
  router.post("/change-password", Controller.changePassword);
  router.get("/contact", Controller.contact);
  router.post("/contact", Controller.saveContact);
  router.get("/add-new-clinic", Controller.addNewClinic);
  router.get("/add-user", Controller.addUser);

  router.get("/clinic-point", Controller.clinicPoint);
  router.get("/competition", Controller.competition);
  router.get("/message-options", Controller.messageOptions);
  router.get("/payment-options", Controller.paymentOptions);

  router.get("/promotions", Controller.promotions);
  router.get("/buy-promotions/:id", Controller.buyPromotions);

  router.get("/properties-and-services", Controller.propertiesAndServices);
  router.get("/questions-new", Controller.questionsNew);

  router.get("/rezervation-messages", Controller.rezervationMessages);
  router.get("/messages", Controller.messages);
  router.get("/questions-answered", Controller.questionsAnswered);
  router.get("/evaluation", Controller.evaluation);

  router.get("/update-user", Controller.updateUser);
  router.get("/upload-image", Controller.uploadImageView);
  router.post("/upload-image", multerConfig.single("image"), Controller.uploadImage);

  router.get("/visibility", Controller.visibility);

  router.get("/what-closest", Controller.whatClosest);
});

module.exports = router;
