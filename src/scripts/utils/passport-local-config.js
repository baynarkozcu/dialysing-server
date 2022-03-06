const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/Users");
const { passwordToHash } = require("./helper");

module.exports = (passport) => {
  const options = {
    usernameField: "email",
    passwordField: "password",
  };

  passport.use(
    new LocalStrategy(options, async (email, password, done) => {
      console.log("Deneme");
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "Böyle bir Email Adresi Bulunamadı.." });
        }
        //TODO Email Onay Yapılırsa Aşağıdaki Kontroller Yapılacak...
        // if (user && user.emailConfirmation == false) {
        //     return done(null, false, { message: "Lütfen Email Adresinize Gönderilen Onay Mailine Tıklayın" });
        // }
        password = passwordToHash(password);

        if (user.password !== password) {
          return done(null, false, { message: "Girdiğiniz Şifre Yanlış." });
        } else {
          console.log("Başarılı");
          return done(null, user);
        }
      } catch (error) {
        console.log(`passportLocal Error :  ${error}`);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
