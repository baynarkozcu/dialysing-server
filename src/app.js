const express = require("express");
const helmet = require("helmet");
const config = require("./configs/");
const loaders = require("./loaders");
const path = require("path");

const { UserRouter, BlogRouter } = require("./routers");
const errorHandler = require("./middlewares/errorHandler");

config();
loaders();

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static("public"));
app.use(express.json());
app.use(helmet());

app.listen(process.env.APP_PORT, () => {
    console.log(`Server listening on port ${process.env.APP_PORT}`);
    app.use("/users", UserRouter);
    app.use("/blogs", BlogRouter);
//   app.use("/companies", CompanyRouter);
//   app.use("/adverts", AdvertRouter);

  app.use((req, res, next) => {
    const error = new Error("Aradığınız sayfa bulunamadı");
    error.status = 404;
    next(error);
  });

    app.use(errorHandler);
});
