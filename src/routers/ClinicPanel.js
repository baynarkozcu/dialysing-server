const router = require('express').Router();
const { authenticate, currentUser } = require("../middlewares/authentication");
// const idChecker = require("../middlewares/idChecker");

const Controller = require('../controllers/ClinicPanel');

router.get("/login", Controller.loginView);
router.get("/choose-personel", Controller.choosePersonel);
router.get("/choose-center", Controller.chooseCenter);
router.get("/company-information", Controller.companyInformation);
router.get("/choose-address", Controller.chooseAddress);
router.get("/address-correction", Controller.addressCorrection);
router.get("/clinic-detail", Controller.clinicDetail);
router.get("/clinic-services", Controller.clinicServices);
router.get("/payment-option", Controller.paymentOption);
router.get("/doctors", Controller.doctors);
router.get("/clinic-summary", Controller.clinicSummary);

//PANEL
router.get("/add-new-clinic", Controller.addNewClinic);
router.get("/add-user", Controller.addUser);
router.get("/analysis", Controller.analysis);
router.get("/answer-waiting-rezervations", Controller.answerWaitingRezervations);
router.get("/calender", Controller.calender);
router.get("/canceled-rezervations", Controller.canceledRezervations);
router.get("/change-password", Controller.changePassword);
router.get("/clinic-point", Controller.clinicPoint);
router.get("/competition", Controller.competition);
router.get("/completed-rezervations", Controller.completedRezervations);
router.get("/contact", Controller.contact);
router.get("/messages", Controller.messages);
router.get("/evaluation", Controller.evaluation);
router.get("/index", Controller.index);
router.get("/message-options", Controller.messageOptions);
router.get("/oncoming-rezervations", Controller.oncomingRezervations);
router.get("/payment-options", Controller.paymentOptions);
router.get("/promotions", Controller.promotions);
router.get("/properties-and-services", Controller.propertiesAndServices);
router.get("/questions-answered", Controller.questionsAnswered);
router.get("/questions-new", Controller.questionsNew);
router.get("/rezervation-messages", Controller.rezervationMessages);
router.get("/update-user", Controller.updateUser);
router.get("/upload-image", Controller.uploadImage);
router.get("/visibility", Controller.visibility);
router.get("/what-closest", Controller.whatClosest);



module.exports = router;
