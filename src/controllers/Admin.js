const BlogService = require("../services/Blogs");
const DialysisCenterService = require("../services/DialysisCenters");
const { convertToSlug } = require("../scripts/utils/slugConverter");

const i18n = require("../i18n.config");

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

  // BLOGS

  blogs(req, res) {
    BlogService.index()
      .then((blogs) => {
        res.render("admin/pages/blogs", { layout: "admin/layouts/index", blogs });
      })
      .catch((err) => {
        //TODO index Sayfasına Yönlendir..
        console.log("Hata Çıktı...", err);
        res.render("admin/pages/blogs", { layout: "admin/layouts/index" });
      });
  }

  addViewBlog(req, res) {
    res.render("admin/pages/add-blog", { layout: "admin/layouts/index" });
  }

  addBlog(req, res) {
    req.body.seflink = convertToSlug(req.body.title);
    BlogService.create(req.body)
      .then((result) => {
        res.render("admin/pages/blogs", { layout: "admin/layouts/index" });
      })
      .catch((err) => {
        console.log("Hata Çıktı...");
        res.render("admin/pages/add-blog", { layout: "admin/layouts/index" });
      });
  }

  deleteBlog(req, res) {
    BlogService.delete(req.query.id)
      .then((result) => {
        res.redirect("/admin/blogs");
      })
      .catch((err) => {
        console.log("Hata Çıktı...");
        res.render("admin/pages/blogs", { layout: "admin/layouts/index" });
      });
  }

  datatable(req, res) {
    res.render("admin/pages/datatable", { layout: "admin/layouts/index" });
  }

  userEdit(req, res) {
    res.render("admin/pages/user-edit", { layout: "admin/layouts/index" });
  }

  confirmClinicView(req, res) {
    DialysisCenterService.index({ isActive: false, personalInformation: { $ne: undefined } })
      .then((centers) => {
        res.render("admin/pages/confirm-clinic", { layout: "admin/layouts/index", centers });
      })
      .catch((error) => {
        console.log("Hata Çıktı...", error);
        res.render("admin/pages/confirm-clinic", { layout: "admin/layouts/index" });
      });
  }

  confirmClinic(req, res) {
    const id = req.params.id;
    DialysisCenterService.update(id, { isActive: true })
      .then((result) => {
        res.redirect("/admin/confirm-clinic");
      })
      .catch((err) => {
        console.log("Hata Çıktı...", err);
        res.redirect("/admin/confirm-clinic");
      });
  }

  appointments(req, res) {
    res.render("admin/pages/appointments", { layout: "admin/layouts/index" });
  }

  centerList(req, res) {
    res.render("admin/pages/center-list", { layout: "admin/layouts/index" });
  }

  homeManagement(req, res) {
    res.render("admin/pages/home-management", { layout: "admin/layouts/index" });
  }

  clinicHomeManagement(req, res) {
    res.render("admin/pages/clinic-home-management", { layout: "admin/layouts/index" });
  }

  clinicManagement(req, res) {
    res.render("admin/pages/clinic-management", { layout: "admin/layouts/index" });
  }

  premiumCenter(req, res) {
    res.render("admin/pages/premium-clinic", { layout: "admin/layouts/index" });
  }

  //! TODO Change Language
  deneme(req, res) {
    res.cookie("lang", req.params.lang);
    res.redirect("/admin/confirm-clinic");
  }
}

module.exports = new AdminController();
