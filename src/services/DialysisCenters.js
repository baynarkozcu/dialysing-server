const BaseService = require("./BaseServices");
const BaseModal = require("../models/DialysisCenters");

class DialysisCenters extends BaseService {
  constructor() {
    super(BaseModal);
  }
}

module.exports = new DialysisCenters();
