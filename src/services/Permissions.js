const BaseService = require("./BaseServices");
const BaseModal = require("../models/Permissions");

class Permissions extends BaseService {
  constructor() {
    super(BaseModal);
  }
}

module.exports = new Permissions();
