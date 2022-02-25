const BaseService = require("./BaseServices");
const BaseModal = require("../models/Blogs");

class Blogs extends BaseService {
  constructor() {
    super(BaseModal);
  }
}

module.exports = new Blogs();
