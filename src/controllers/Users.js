// const Service = require("../services/Users");

// const httpStatus = require("http-status");
// const AppError = require("../errors/AppError");
// const ErrorMessage = require("../scripts/utils/errorMessages");

// const { passwordToHash, generateAcessToken, generateRefreshToken } = require("../scripts/utils/helper");

// class UserController {
//     index(req, res, next) {
//         Service?.index()
//             .then((data) => {
//                 res.json(data);
//             })
//             .catch((err) => {
//                 next(new AppError("Listeleme İşlemi Başarısız.", httpStatus.INTERNAL_SERVER_ERROR));
//             });
//     }

//     findById(req, res, next) {
//         Service.findById(req.params.id)
//             .then((data) => {
//                 if (!data) return next(new AppError("Görüntülemek İstediğiniz Veri Bulunamadı.", httpStatus.NOT_FOUND));
//                 res.json(data);
//             })
//             .catch((err) => {
//                 next(new AppError("Yapmak İstediğiniz İşlem Sırasında Hata Oluştu.", httpStatus.INTERNAL_SERVER_ERROR));
//             });
//     }

//     // find(req, res, next) {
//     //     Service.find(req.body)
//     //         .then((data) => {
//     //             if (!data) return next(new AppError("Görüntülemek İstediğiniz Veri Bulunamadı.", httpStatus.NOT_FOUND));
//     //             res.json(data);
//     //         })
//     //         .catch((err) => {
//     //             next(new AppError("Yapmak İstediğiniz İşlem Sırasında Hata Oluştu.", httpStatus.INTERNAL_SERVER_ERROR));
//     //         });
//     // }

//     create(req, res, next) {
//         req.body.password = passwordToHash(req.body.password);
//         Service?.create(req.body)
//             .then((data) => {
//                 res.send(data);
//             })
//             .catch((err) => {
//                 const message = ErrorMessage.printMessage(err);
//                 if (message != undefined) {
//                     return next(new AppError(message, httpStatus.INTERNAL_SERVER_ERROR));
//                 }
//                 next(new AppError("Kayıt İşlemi Sırasında Hata Oluştu.", httpStatus.INTERNAL_SERVER_ERROR));
//             });
//     }

//     // update(req, res, next) {
//     //     Service.update(req.params.id, req.body)
//     //         .then((data) => {
//     //             if (!data) return next(new AppError("Güncellemek istediğiniz Veri Bulunamadı.", httpStatus.BAD_REQUEST));
//     //             res.send(data);
//     //         })
//     //         .catch((err) => {
//     //             const message = ErrorMessage.printMessage(err);
//     //             if (message != undefined) {
//     //                 next(new AppError(message, httpStatus.INTERNAL_SERVER_ERROR));
//     //             }
//     //             next(new AppError("Güncelleme İşlemi Başarısız.", httpStatus.INTERNAL_SERVER_ERROR));
//     //         });
//     // }

//     // delete(req, res, next) {
//     //     Service.delete(req.params.id)
//     //         .then((data) => {
//     //             if (!data) return next(new AppError("Silmek istediğiniz Veri Bulunamadı.", httpStatus.BAD_REQUEST));
//     //             res.send("Silme İşleminiz Başarılı bir Şekilde Gerçekleştirildi.");
//     //         })
//     //         .catch((err) => {
//     //             next(new AppError("Silme İşlemi Sırasında Hata Oluştu.", httpStatus.INTERNAL_SERVER_ERROR));
//     //         });
//     // }

//     login(req, res, next) {
//         req.body.password = passwordToHash(req.body.password);
//         Service.find(req.body)
//             .then((user) => {
//                 if (!user) return res.status(httpStatus.NOT_FOUND).send({ message: "Böyle bir kullanıcı bulunamadı." });

//                 user = {
//                     ...user.toObject(),
//                     accessToken: generateAcessToken(user),
//                     refreshToken: generateRefreshToken(user),
//                 };
//                 delete user.password;
//                 res.status(httpStatus.OK).send(user);
//             })
//             .catch((err) => {
//                 res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
//             });
//     }

//     // softDelete(req, res, next) {
//     //     Service.softDelete(req.params.id)
//     //         .then((data) => {
//     //             if (!data) return next(new AppError("Silmek istediğiniz Veri Bulunamadı.", httpStatus.BAD_REQUEST));
//     //             res.send("Silme İşleminiz Başarılı bir Şekilde Gerçekleştirildi.");
//     //         })
//     //         .catch((err) => {
//     //             next(new AppError("Silme İşlemi Sırasında Hata Oluştu.", httpStatus.INTERNAL_SERVER_ERROR));
//     //         });
//     // }

//     // restore(req, res, next) {
//     //     Service.restored(req.params.id)
//     //         .then((data) => {
//     //             if (!data) return next(new AppError("Geri Almak istediğiniz Veri Bulunamadı.", httpStatus.BAD_REQUEST));
//     //             res.send(data);
//     //         })
//     //         .catch((err) => {
//     //             next(new AppError("Geri Alma İşlemi Sırasında Hata Oluştu.", httpStatus.INTERNAL_SERVER_ERROR));
//     //         });
//     // }
// }

// module.exports = new UserController();
