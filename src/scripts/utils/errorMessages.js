class ErrorMessage {
  printMessage(err) {
    // TODO ERROR CODE 11000 : DUPLICATE ERROR
    if (err.code === 11000) {
      const keyList = Object.keys(err.keyValue);
      for (const key of keyList) {
        if (key === "email") return `Kaydetmek istediğiniz '${err.keyValue.email}' E-Posta Adresi Başka bir kullanıcı Tarafından Kullanılmaktadır.`;
        if (key === "phone") return `Kaydetmek istediğiniz '${err.keyValue.phone}' Telefon Numarası Başka bir kullanıcı Tarafından Kullanılmaktadır.`;
      }
    }
  }
}

module.exports = new ErrorMessage();
