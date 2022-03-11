const AppointmentService = require('../services/Appointments');

class HomeController {
  index(req, res, next) {
    res.render("user/pages/index", { layout: "user/layouts/main" });
  }
  clinicMain(req, res, next) {
    // res.cookie("clinicId", req.params.id);
    res.render("user/pages/clinic/clinic-main", { layout: "user/layouts/clinic" });
  }

  singleClinic(req, res, next) {
    console.log(req.body);
    res.render("user/pages/clinic/clinic", { layout: "user/layouts/clinic" });
  }

  viewAppointment(req, res, next) {
    res.cookie("treatmentMethod", req.body.treatmentMethod, { maxAge: 50000 });
    res.cookie("sessionsDayCount", req.body.sessionsDayCount, { maxAge: 50000 });
    res.cookie("sessionsDay", req.body.sessionsDay, { maxAge: 50000 });
    res.cookie("session", req.body.session, { maxAge: 50000 });
    res.cookie("checkOutDate", req.body.checkOutDate, { maxAge: 50000 });
    res.cookie("checkInDate", req.body.checkInDate, { maxAge: 50000 });

    res.render("user/pages/clinic/clinic-appointment", { layout: "user/layouts/clinic", cookieValue: req.cookies });
  }

  clinicAppointment(req, res, next) {
    res.render("user/pages/clinic/clinic-appointment", { layout: "user/layouts/clinic" });
  }

  createAppointment(req, res, next) {
    // console.log("cookie : ", req.cookies);
    // console.log("body : ", req.body);

    var appointment = {
      nameSurname: req.body.nameSurname,
      email: req.body.email,
      phone: req.body.phone,
      birthDate: req.body.birthDate,
      patientNameSurname: req.body.patientNameSurname,
      situation: req.body.situation,
      insurance: "SSK",
      adress: {
        city: req.body.city,
        district: req.body.district,
        street: req.body.street,
        adressDetailText: req.body.adressDetailText,
        zipCode: req.body.zipCode,
      },
      checkInDate: req.cookies.checkInDate,
      checkOutDate: req.cookies.checkOutDate,
      treatmentMethod: req.cookies.treatmentMethod,
      sessionsDay: req.cookies.sessionsDay,
      session: req.cookies.session,
      dialysisCenter: "Türkmed Diyaliz Merkezi",
    };
    AppointmentService.create(appointment).then(data => {
      console.log("data : ", data);
      res.redirect("/");
    }).catch(err => {
      console.log(err);
    })
  }

  addressCorrection(req, res, next) {
    res.render("user/pages/clinic/clinic-address-correction", { layout: "user/layouts/clinic" });
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
