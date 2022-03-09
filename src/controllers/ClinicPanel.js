class HomeController {
  index(req, res, next) {
    res.render("clinic-panel/pages/index", { layout: "clinic-panel/layouts/main" });
  }

}

module.exports = new HomeController();
