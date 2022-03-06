const router = require("express").Router();
const validate = require("../middlewares/validator");
const { authenticate, currentUser } = require("../middlewares/authentication");

const Controller = require("../controllers/Blogs");

router.get("/", Controller.index);

module.exports = router;
