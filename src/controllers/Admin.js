

class AdminController {
  login(req, res) {
    res.render("admin/pages/login", { layout: "admin/layouts/auth" });
  }

  register(req, res) {
    res.render("admin/pages/register", { layout: "admin/layouts/auth" });
  }

  forgotPassword(req, res) {
    res.render("admin/pages/forgot-password", { layout: "admin/layouts/auth" });
  }

  lockScreen(req, res) {
    res.render("admin/pages/lock-screen", { layout: "admin/layouts/auth" });
  }

  resetPassword(req, res) {
    res.render("admin/pages/reset-password", { layout: "admin/layouts/auth" });
  }

  error(req, res) {
    res.render("admin/pages/error-500", { layout: "admin/layouts/auth" });
  }

  blogs(req, res) {
    res.render("admin/pages/blogs", { layout: "admin/layouts/index" });
  }

  addBlog(req, res) {
    res.render("admin/pages/add-blog", { layout: "admin/layouts/index" });
  }

  datatable(req, res) {
    res.render("admin/pages/datatable", { layout: "admin/layouts/index" });
  }

  confirmClinic(req, res) {
    res.render("admin/pages/confirm-clinic", { layout: "admin/layouts/index" });
  }

  appointments(req, res) {
    res.render("admin/pages/appointments", { layout: "admin/layouts/index" });
  }

  centerList(req, res) {
    res.render("admin/pages/center-list", { layout: "admin/layouts/index" });
  }
}


module.exports = new AdminController();