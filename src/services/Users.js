const BaseService = require("./BaseServices");
const BaseModal = require("../models/Users");

class Users extends BaseService {
  constructor() {
    super(BaseModal);
  }
}

module.exports = new Users();
