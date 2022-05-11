const router = require("express").Router();
const validate = require("../middlewares/validator");
const { authenticate, currentUser } = require("../middlewares/authentication");
// const { createValidator, updateValidator, loginValidator } = require("../validations/Users");

const idChecker = require("../middlewares/idChecker");

const Controller = require("../controllers/Admin");

router.get("/login", Controller.loginView);
router.post("/login", Controller.login);
router.get("/register", Controller.register);
router.get("/forgot-password", Controller.forgotPassword);
router.get("/lock-screen", Controller.lockScreen);
router.get("/reset-password", Controller.resetPassword);
router.get("/error", Controller.error);
router.get("/blogs", Controller.blogs);
router.get("/add-blog", Controller.addViewBlog);
router.post("/add-blog", Controller.addBlog);
router.get("/delete-blog", Controller.deleteBlog);
router.get("/datatable", Controller.datatable);
router.get("/user-edit", Controller.userEdit);
router.get("/delete-user/:id", Controller.deleteUser);
router.get("/confirm-clinic", Controller.confirmClinicView);
router.get("/confirm-clinic/:id", idChecker(),  Controller.confirmClinic);
router.get("/appointments", Controller.appointments);
router.get("/center-list", Controller.centerList);
router.get("/home-management", Controller.homeManagementView);
router.post("/home-management", Controller.homeManagement);
router.get("/clinic-home-management", Controller.clinicHomeManagementView);
router.post("/clinic-home-management", Controller.clinicHomeManagement);
router.get("/clinic-management", Controller.clinicManagementView);
router.post("/clinic-management", Controller.clinicManagement);

router.get("/invoice-list", Controller.invoiceList);
router.get("/center-invoice-detail", Controller.centerInvoiceDetail);

router.get("/center-spend", Controller.centerSpend);
// router.get("/debtor", Controller.spendDebtor);

router.get("/premium-center", Controller.premiumCenter);
router.get("/delete-center/:id", Controller.deleteCenter);
router.get("/make-premium/:id", Controller.makePremium);
router.get("/delete-premium/:id", Controller.deletePremium);

router.get("/profile-auth", Controller.profileAuth);
router.get("/faq", Controller.faqSubmit);


router.get("/deneme/:lang", Controller.deneme);

module.exports = router;
