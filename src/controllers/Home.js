class HomeController {
    index(req, res, next) {
        res.render("user/pages/index", { layout: "user/layouts/main" });
    }
}

module.exports = new HomeController();
