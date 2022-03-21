const router = require('express').Router();
const { authenticate, currentUser } = require("../middlewares/authentication");
// const idChecker = require("../middlewares/idChecker");

const Controller = require('../controllers/ClinicPanel');

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
// router.get("/new-dialysis-center", authenticate, Controller.createDialysisCenter);
// router.post("/new-dialysis-center", authenticate, Controller.createDialysisCenter);
// router.get("/clinic", Controller.clinicMain);
// router.get("/clinic/clinic-list", Controller.clinicList);
// router.get("/clinic/clinic-login", Controller.clinicLogin);
// router.get("/clinic/address-correction", Controller.addressCorrection);
// router.get("/clinic/clinic-appointment", Controller.clinicAppointment);
// router.get("/clinic/:id", Controller.singleClinic);
// router.get("/gfr-calculator", Controller.gfrCalculator);


module.exports = router;
