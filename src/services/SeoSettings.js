const BaseService = require("./BaseServices");
const BaseModal = require("../models/SeoSettings");

class SeoSettings extends BaseService {
  constructor() {
    super(BaseModal);
  }
}

module.exports = new SeoSettings();
