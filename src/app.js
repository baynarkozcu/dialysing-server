const express = require("express");
const helmet = require("helmet");
const config = require("./configs/");
const loaders = require("./loaders");
const path = require("path");

const { AuthRouter, UserRouter, BlogRouter, HomeRouter, ClinicPanelRouter } = require("./routers");
const errorHandler = require("./middlewares/errorHandler");

const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

config();
loaders();

const app = express();

const MongoDbStore = require("connect-mongodb-session")(session);

const SessionStore = new MongoDbStore({
  uri: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: SessionStore,
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.validationErrors = req.flash("validationErrors");
  res.locals.loginErrors = req.flash("error");
  res.locals.authorizationErrors = req.flash("authorizationErrors");
  res.locals.loginMessages = req.flash("loginMessages");

  res.locals.nameSurname = req.flash("nameSurname");
  res.locals.email = req.flash("email");
  res.locals.phone = req.flash("phone");
  res.locals.password = req.flash("password");
  res.locals.birthDate = req.flash("birthDate");

  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// Template Engine
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

app.listen(process.env.APP_PORT, () => {
  console.log(`Server listening on port ${process.env.APP_PORT}`);

  app.use("/auth", AuthRouter);
  app.use("/blogs", BlogRouter);
  app.use("/panel", ClinicPanelRouter);
  app.use("/", HomeRouter);

  app.use((req, res, next) => {
    const error = new Error("Aradığınız sayfa bulunamadı");
    error.status = 404;
    next(error);
  });

  app.use(errorHandler);
});
