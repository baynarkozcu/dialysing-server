const router = require("express").Router();
const validate = require("../middlewares/validator");
const { authenticate, currentUser } = require("../middlewares/authentication");
const { createValidator, updateValidator, loginValidator } = require("../validations/Users");

const idChecker = require("../middlewares/idChecker");

const Controller = require("../controllers/Home");

router.get("/", Controller.index);

//* CLINIC PANEL INDEX
router.get("/clinic", Controller.clinicMain);

//* CLINIC LIST - CLINIC PAGE - APPOINTMENT PAGES
router.get("/clinic/clinic-list", Controller.clinicList);
router.post("/clinic/clinic-list", Controller.filterClinicList);
router.get("/clinic/all", Controller.allView);
// router.get("/clinic/appointment", authenticate, Controller.clinicAppointment);
router.post("/clinic/clinic-appointment",  Controller.viewAppointment);
router.post("/clinic/request-appointment",  Controller.requestAppointment);
router.post("/clinic/new-clinic-appointment", authenticate, Controller.createAppointment);
router.get("/clinic/:id", Controller.singleClinic);

//* BLOG LIST - BLOG PAGE
router.get("/blogs", Controller.allBlogs);
router.get("/blogs/:id", Controller.singleBlog);

router.get("/gfr-calculator", Controller.gfrCalculator);

//* Authentication - USER
router.get("/user", Controller.user);
router.get("/user/verify", Controller.verify);
// router.post("/user/update", authenticate, validate(updateValidator), Controller.userProfileUpdate);
router.post("/user/update", authenticate, Controller.userProfileUpdate);
router.get("/register", currentUser, Controller.registerView);
router.post("/register", validate(createValidator), Controller.register);
router.post("/login", currentUser, validate(loginValidator), Controller.login);
router.get("/logout", authenticate, Controller.logout);

module.exports = router;


//TODO Sıralama Tuşları
//TODO Register RePassword Kontrolu
//TODO Aktivasyon Mail İçeriği