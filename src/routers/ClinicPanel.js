const router = require('express').Router();
const { authenticate, currentUser } = require("../middlewares/authentication");
// const idChecker = require("../middlewares/idChecker");

const Controller = require('../controllers/ClinicPanel');

router.get("/", authenticate, Controller.index);
// router.get("/new-dialysis-center", authenticate, Controller.createDialysisCenter);
router.post("/new-dialysis-center", authenticate, Controller.createDialysisCenter);
// router.get("/clinic", Controller.clinicMain);
// router.get("/clinic/clinic-list", Controller.clinicList);
// router.get("/clinic/clinic-login", Controller.clinicLogin);
// router.get("/clinic/address-correction", Controller.addressCorrection);
// router.get("/clinic/clinic-appointment", Controller.clinicAppointment);
// router.get("/clinic/:id", Controller.singleClinic);
// router.get("/gfr-calculator", Controller.gfrCalculator);


module.exports = router;
