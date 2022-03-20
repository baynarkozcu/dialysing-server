// const router = require('express').Router();
// const validate = require("../middlewares/validator");
// // const authorization = require("../middlewares/authenticator");
// const idChecker = require("../middlewares/idChecker");
// const { createValidator, loginValidator } = require("../validations/Users");

// const Controller = require('../controllers/Users');

// router.get("/", Controller.index);
// router.get("/:id", idChecker(), Controller.findById);
// // router.post("/reset-password", Controller.find);
// router.post("/", validate(createValidator), Controller.create);
// // router.patch("/:id", idChecker(), validate(updateValidator), authorization, Controller.update);
// // router.delete("/:id", idChecker(), Controller.softDelete);
// // router.post("/restore/:id", idChecker(), authorization, Controller.restore);
// router.post("/login", validate(loginValidator), Controller.login);

// module.exports = router;
