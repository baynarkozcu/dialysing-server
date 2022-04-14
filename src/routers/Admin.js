const router = require("express").Router();
const validate = require("../middlewares/validator");
const { authenticate, currentUser } = require("../middlewares/authentication");
// const { createValidator, updateValidator, loginValidator } = require("../validations/Users");

const idChecker = require("../middlewares/idChecker");

const Controller = require("../controllers/Admin");

router.get("/login", Controller.login);
router.get("/register", Controller.register);
router.get("/forgot-password", Controller.forgotPassword);
router.get("/lock-screen", Controller.lockScreen);
router.get("/reset-password", Controller.resetPassword);
router.get("/error", Controller.error);
router.get("/blogs", Controller.blogs);
router.get("/add-blog", Controller.addBlog);
router.get("/datatable", Controller.datatable);
router.get("/confirm-clinic", Controller.confirmClinic);
router.get("/appointments", Controller.appointments);
router.get("/center-list", Controller.centerList);

module.exports = router;
