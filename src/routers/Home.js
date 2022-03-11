const router = require('express').Router();
const { authenticate, currentUser } = require("../middlewares/authentication");
// const idChecker = require("../middlewares/idChecker");

const Controller = require('../controllers/Home');

router.get("/", authenticate, Controller.index);
router.get("/clinic", Controller.clinicMain);
router.get("/clinic/clinic-list", Controller.clinicList);
router.get("/clinic/clinic-login", Controller.clinicLogin);
router.get("/clinic/address-correction", Controller.addressCorrection);
router.get("/clinic/clinic-appointment", Controller.clinicAppointment);
router.post("/clinic/clinic-appointment", Controller.viewAppointment);
router.post("/clinic/new-clinic-appointment", Controller.createAppointment);
router.get("/clinic/:id", Controller.singleClinic);
router.get("/gfr-calculator", Controller.gfrCalculator);

// router.get("/:id", idChecker(), Controller.findById);
// // router.post("/reset-password", Controller.find);
// router.post("/", validate(createValidator), Controller.create);
// // router.patch("/:id", idChecker(), validate(updateValidator), authorization, Controller.update);
// // router.delete("/:id", idChecker(), Controller.softDelete);
// // router.post("/restore/:id", idChecker(), authorization, Controller.restore);
// router.post("/login", validate(loginValidator), Controller.login);

module.exports = router;
