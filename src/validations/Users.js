const Joi = require("joi");

const createValidator = Joi.object({
  nameSurname: Joi.string().required().min(3).max(50).messages({
    "string.empty": "Ad Soyad Alanı Boş Olamaz.",
    "string.min": "Ad Soyad Alanı 3 Karakterden Küçük Olamaz.",
    "string.max": "Ad Soyad Alanı 50 Karakterden Büyük Olamaz.",
    "any.required": "Ad Soyad Alanı Boş Olamaz.",
  }),
  phone: Joi.string().required().pattern(/^[0-9]{10}$/).messages({
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
  birthDate: Joi.date().required().min(1900-01-01).max(new Date()).messages({
    "date.empty": "Doğum Tarihi Alanı Boş Olamaz.",
    "any.required": "Doğum Tarihi Alanı Boş Olamaz.",
    "date.min": "Doğum Tarihi 1900-01-01'tan Küçük Olamaz.",
    "date.max": "Doğum Tarihi Şimdiki Tarihten Büyük Olamaz.",
  })
});

const updateValidator = Joi.object({
  nameSurname: Joi.string().required().min(3).max(50).messages({
    "string.empty": "Ad Soyad Alanı Boş Olamaz.",
    "string.min": "Ad Soyad Alanı 3 Karakterden Küçük Olamaz.",
    "string.max": "Ad Soyad Alanı 50 Karakterden Büyük Olamaz.",
    "any.required": "Ad Soyad Alanı Boş Olamaz.",
  }),
  // phone: Joi.string()
  //   .required()
  //   .pattern(/^[0-9]{10}$/)
  //   .messages({
  //     "string.empty": "Telefon Numarası Alanı Boş Olamaz.",
  //     "string.pattern.base": "Telefon Numarası 10 Haneli Olmalıdır.",
  //     "any.required": "Telefon Numarası Alanı Boş Olamaz.",
  //   }),
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
  updateValidator,
  loginValidator,
  //   resetPasswordValidator,
  //   changePasswordValidator,
};
