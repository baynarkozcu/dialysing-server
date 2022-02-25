const Joi = require("joi");

const createValidator = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Başlık Alanı Boş Olamaz.",
    "any.required": "Başlık Alanı Boş Olamaz.",
  }),
  content: Joi.string().required().messages({
    "string.empty": "Blog İçeriği Boş Olamaz.",
    "any.required": "Blog İçeriği Boş Olamaz.",
  }),
  author: Joi.string().required().messages({
    "string.empty": "Yazar Alanı Boş Olamaz.",
    "any.required": "Yazar Alanı Boş Olamaz.",
  }),
});

const updateValidator = Joi.object({
  title: Joi.string().messages({
    "string.empty": "Başlık Alanı Boş Olamaz.",
    "any.required": "Başlık Alanı Boş Olamaz.",
  }),
  content: Joi.string().messages({
    "string.empty": "Blog İçeriği Boş Olamaz.",
    "any.required": "Blog İçeriği Boş Olamaz.",
  }),
  author: Joi.string().messages({
    "string.empty": "Yazar Alanı Boş Olamaz.",
    "any.required": "Yazar Alanı Boş Olamaz.",
  }),
});

module.exports = {
  createValidator,
  updateValidator,
};
