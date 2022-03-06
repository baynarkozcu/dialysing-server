const router = require("express").Router();
const validate = require("../middlewares/validator");
const { createValidator, loginValidator } = require("../validations/Users");
const { authenticate, currentUser } = require("../middlewares/authentication");

const Controller = require("../controllers/Auth");


router.get("/register", currentUser, Controller.registerView);
router.post("/register",  validate(createValidator), Controller.register);
router.post("/login", currentUser, validate(loginValidator), Controller.login);
router.get("/logout", authenticate, Controller.logout);
router.get("/verify/:token", Controller.verify);


module.exports = router;
