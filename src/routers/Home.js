const router = require("express").Router();
const validate = require("../middlewares/validator");
const { authenticate, currentUser } = require("../middlewares/authentication");
const { createValidator, updateValidator, loginValidator } = require("../validations/Users");

// const idChecker = require("../middlewares/idChecker");

const Controller = require("../controllers/Home");

router.get("/", authenticate, Controller.index);

//* CLINIC PANEL INDEX
router.get("/clinic", Controller.clinicMain);

//* CLINIC LIST - CLINIC PAGE - APPOINTMENT PAGES
router.get("/clinic/clinic-list", Controller.clinicList);
router.get("/clinic/all", Controller.allView);
router.get("/clinic/clinic-appointment", Controller.clinicAppointment);
router.post("/clinic/clinic-appointment", Controller.viewAppointment);
router.post("/clinic/new-clinic-appointment", Controller.createAppointment);
router.get("/clinic/:id", Controller.singleClinic);

//* BLOG LIST - BLOG PAGE
router.get("/blogs", Controller.allBlogs);
router.get("/blogs/:id", Controller.singleBlog);

//! TODO BURASI KLİNİK PANEL İÇİN
//! router.get("/clinic/clinic-login", Controller.clinicLogin);
//! router.get("/clinic/address-correction", Controller.addressCorrection);

router.get("/gfr-calculator", Controller.gfrCalculator);

//* Authentication - USER
router.get("/user", authenticate, Controller.user);
router.post("/user/update", authenticate, validate(updateValidator), Controller.userProfileUpdate);
router.get("/register", currentUser, Controller.registerView);
router.post("/register", validate(createValidator), Controller.register);
router.post("/login", currentUser, validate(loginValidator), Controller.login);
router.get("/logout", authenticate, Controller.logout);
router.get("/verify/:token", Controller.verify);

module.exports = router;
