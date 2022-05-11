const BaseService = require("./BaseServices");
const BaseModal = require("../models/Admin");

class Admin extends BaseService {
  constructor() {
    super(BaseModal);
  }
}

module.exports = new Admin();
