const DialysisCenterService = require("../services/DialysisCenters");

class HomeController {
  index(req, res, next) {
    res.render("clinic-panel/pages/index", { layout: "clinic-panel/layouts/main" });
  }

  createDialysisCenter(req, res, next) {
    DialysisCenterService.create(req.body).then(data => {
      res.redirect("panel");
    }).catch(err => {
      console.log(err);
    })
  }

}

module.exports = new HomeController();
