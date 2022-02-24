const Joi = require("joi");

const createValidator = Joi.object({
  nameSurname: Joi.string().required().min(3).max(50).messages({
    "string.empty": "Ad Soyad Alanı Boş Olamaz.",
    "string.min": "Ad Soyad Alanı 3 Karakterden Küçük Olamaz.",
    "string.max": "Ad Soyad Alanı 50 Karakterden Büyük Olamaz.",
    "any.required": "Ad Soyad Alanı Boş Olamaz.",
  }),
  phoneNumber: Joi.string()
    .required()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.empty": "Telefon Numarası Alanı Boş Olamaz.",
      "string.pattern.base": "Telefon Numarası 10 Haneli Olmalıdır.",
      "any.required": "Telefon Numarası Alanı Boş Olamaz.",
    }),
  email: Joi.string().required().email().messages({
    "string.empty": "Email Alanı Boş Olamaz.",
    "string.email": "Geçerli Bir Email Adresi Giriniz.",
    "any.required": "Email Alanı Boş Olamaz.",
  }),
  password: Joi.string().required().min(8).messages({
    "string.empty": "Şifre Alanı Boş Olamaz.",
    "string.min": "Şifre Alanı 8 Karakterden Küçük Olamaz.",
    "any.required": "Şifre Alanı Boş Olamaz.",
  }),
});

// const updateValidator = Joi.object({
//   nameSurname: Joi.string().min(3).max(50).messages({
//     "string.empty": "Ad Soyad alanı boş olamaz.",
//     "string.min": "Ad Soyad alanı en az 3 karakter olmalıdır.",
//     "string.max": "Ad Soyad alanı en fazla 50 karakter olmalıdır.",
//   }),
//   phone: Joi.string()
//     .pattern(/^[0-9]{10}$/)
//     .messages({
//       "string.pattern.base": "Telefon numarası 10 haneli olmalıdır.",
//     }),
//   email: Joi.string().email().messages({
//     "string.email": "Geçerli bir email adresi giriniz.",
//   }),
//   password: Joi.string().min(8).messages({
//     "string.empty": "Şifre alanı boş olamaz.",
//     "string.min": "Şifre en az 8 karakter olmalıdır.",
//   }),
// });

const loginValidator = Joi.object({
  email: Joi.string().required().email().messages({
    "string.empty": "Email Alanı Boş Olamaz.",
    "string.email": "Geçerli Bir Email Adresi Giriniz.",
    "any.required": "Email Alanı Boş Olamaz.",
  }),
  password: Joi.string().required().min(8).max(30).messages({
    "string.empty": "Şifre Alanı Boş Olamaz.",
    "string.min": "Şifre Alanı 8 Karakterden Küçük Olamaz.",
    "string.max": "Şifre Alanı 30 Karakterden Büyük Olamaz.",
    "any.required": "Şifre Alanı Boş Olamaz.",
  }),
});

// const resetPasswordValidator = Joi.object({
//   email: Joi.string().required().email(),
// });

// const changePasswordValidator = Joi.object({
//   password: Joi.string().required().min(8).max(30),
// });

module.exports = {
  createValidator,
  //   updateValidator,
  loginValidator,
  //   resetPasswordValidator,
  //   changePasswordValidator,
};
