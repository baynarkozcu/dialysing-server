const BlogService = require("../services/Blogs");
const DialysisCenterService = require("../services/DialysisCenters");
const SeoSettings = require("../services/SeoSettings");
const Users = require("../services/Users");
const { convertToSlug } = require("../scripts/utils/slugConverter");

const { passwordToHash, hashToPassword } = require("../scripts/utils/helper");

const i18n = require("../i18n.config");

class AdminController {
  loginView(req, res) {
    res.render("admin/pages/login", { layout: "admin/layouts/auth" });
  }

  login(req, res) {
    Users.find({ email: req.body.email })
      .then((user) => {
        if (!user) {
          console.log("Email Bulunamadı...");
          res.render("admin/pages/login", { layout: "admin/layouts/auth" });
        } else {
          if (req.body.password === hashToPassword(user.password)) {
            console.log("Giriş Başarılı...", user);
            //TODO DEGİŞTİRİLECEK....
            res.redirect("/admin/confirm-clinic");
          } else {
            console.log("Şifre Yanlış...");
            res.render("admin/pages/login", { layout: "admin/layouts/auth" });
          }
        }
      })
      .catch((error) => {
        console.log("Hata Çıktı...", error);
        res.render("admin/pages/login", { layout: "admin/layouts/auth" });
      });
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
        res.redirect("/admin/blogs");
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
    Users.index()
      .then((users) => {
        res.render("admin/pages/datatable", { layout: "admin/layouts/index", users });
      })
      .catch((err) => {
        console.log("Hata Çıktı...", err);
      });
  }

  userEdit(req, res) {
    Users.index()
      .then((users) => {
        res.render("admin/pages/user-edit", { layout: "admin/layouts/index", users });
      })
      .catch((err) => {
        console.log("Hata Çıktı...", err);
      });
  }

  deleteUser(req, res) {
    const id = req.params.id;
    Users.delete(id)
      .then((result) => {
        res.redirect("/admin/user-edit");
      })
      .catch((err) => {
        console.log("Hata Çıktı...", err);
      });
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
    DialysisCenterService.index({ isActive: true })
      .then((centers) => {
        res.render("admin/pages/center-list", { layout: "admin/layouts/index", centers });
      })
      .catch((err) => {
        console.log("Hata Çıktı...", err);
      });
  }

  homeManagementView(req, res) {
    SeoSettings.find({ page: "HomePage" })
      .then((settings) => {
        console.log("Home Settings", settings);
        res.render("admin/pages/home-management", { layout: "admin/layouts/index", seoSettings: settings });
      })
      .catch((err) => {
        console.log("Hata Çıktı...", err);
        //res.render("admin/pages/home-management", { layout: "admin/layouts/index" });
      });
  }

  homeManagement(req, res) {
    SeoSettings.updateWhere({ page: "HomePage" }, { $set: { ...req.body } })
      .then(() => {
        res.redirect("/admin/home-management");
      })
      .catch((err) => {
        console.log("Hata Çıktı...", err);
        res.redirect("/admin/home-management");
      });
  }

  clinicHomeManagementView(req, res) {
    SeoSettings.find({ page: "ClinicMainPage" })
      .then((settings) => {
        res.render("admin/pages/clinic-home-management", { layout: "admin/layouts/index", seoSettings: settings });
      })
      .catch((err) => {
        console.log("Hata Çıktı...", err);
        //res.render("admin/pages/home-management", { layout: "admin/layouts/index" });
      });
  }

  clinicHomeManagement(req, res) {
    SeoSettings.updateWhere({ page: "ClinicMainPage" }, { $set: { ...req.body } })
      .then(() => {
        res.redirect("/admin/clinic-home-management");
      })
      .catch((err) => {
        console.log("Hata Çıktı...", err);
        res.redirect("/admin/clinic-home-management");
      });
  }

  clinicManagementView(req, res) {
    SeoSettings.find({ page: "ClinicListPage" })
      .then((settings) => {
        console.log("Home Settings", settings);
        res.render("admin/pages/clinic-management", { layout: "admin/layouts/index", seoSettings: settings });
      })
      .catch((err) => {
        console.log("Hata Çıktı...", err);
        //res.render("admin/pages/home-management", { layout: "admin/layouts/index" });
      });
  }

  clinicManagement(req, res) {
    SeoSettings.updateWhere({ page: "ClinicListPage" }, { $set: { ...req.body } })
      .then(() => {
        res.redirect("/admin/clinic-management");
      })
      .catch((err) => {
        console.log("Hata Çıktı...", err);
        res.redirect("/admin/clinic-management");
      });
  }

  invoiceList(req, res) {
    res.render("admin/pages/invoice-list", { layout: "admin/layouts/index" });
  }

  centerInvoiceDetail(req, res) {
    res.render("admin/pages/center-invoice-detail", { layout: "admin/layouts/index" });
  }

  centerSpend(req, res) {
    res.render("admin/pages/center-spend", { layout: "admin/layouts/index" });
  }

  premiumCenter(req, res) {
    DialysisCenterService.index({ isActive: true, isPremium: true })
      .then((centers) => {
        res.render("admin/pages/premium-clinic", { layout: "admin/layouts/index", centers });
      })
      .catch((err) => {
        console.log("Hata Çıktı...", err);
      });
  }

  deleteCenter(req, res) {
    const id = req.params.id;
    DialysisCenterService.delete(id)
      .then(() => {
        res.redirect("/admin/center-list");
      })
      .catch((err) => {
        console.log("Hata Çıktı...", err);
      });
  }

  makePremium(req, res) {
    const id = req.params.id;
    DialysisCenterService.update(id, { isPremium: true })
      .then(() => {
        res.redirect("/admin/premium-center");
      })
      .catch((err) => {
        console.log("Hata Çıktı...", err);
      });
  }

  deletePremium(req, res) {
    const id = req.params.id;
    DialysisCenterService.update(id, { isPremium: false })
      .then(() => {
        res.redirect("/admin/premium-center");
      })
      .catch((err) => {
        console.log("Hata Çıktı...", err);
      });
  }

  profileAuth(req, res) {
    res.render("admin/pages/profile-auth", { layout: "admin/layouts/index" });
  }
  faqSubmit(req, res) {
    res.render("admin/pages/faq", { layout: "admin/layouts/index" });
  }

  //! TODO Change Language
  deneme(req, res) {
    res.cookie("lang", req.params.lang);
    res.redirect("/admin/confirm-clinic");
  }
}

module.exports = new AdminController();
