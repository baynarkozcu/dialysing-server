class HomeController {
  index(req, res, next) {
    res.render("user/pages/index", { layout: "user/layouts/main" });
  }
  clinicMain(req, res, next) {
    res.render("user/pages/clinic/clinic-main", { layout: "user/layouts/clinic" });
  }

  singleClinic(req, res, next) {
    res.render("user/pages/clinic/clinic", { layout: "user/layouts/clinic" });
  }

  addressCorrection(req, res, next) {
    res.render("user/pages/clinic/clinic-address-correction", { layout: "user/layouts/clinic" });
  }

  clinicAppointment(req, res, next) {
    res.render("user/pages/clinic/clinic-appointment", { layout: "user/layouts/clinic" });
  }

  clinicList(req, res, next) {
    res.render("user/pages/clinic/clinic-list", { layout: "user/layouts/clinic-list" });
  }

  clinicLogin(req, res, next) {
    res.render("user/pages/clinic/clinic-login", { layout: "user/layouts/clinic" });
  }

  gfrCalculator(req, res, next) {
    res.render("user/pages/gfr-calculate", { layout: "user/layouts/gfr-calculate" });
  }
}

module.exports = new HomeController();
