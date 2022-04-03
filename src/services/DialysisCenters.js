const BaseService = require("./BaseServices");
const BaseModal = require("../models/DialysisCenters");

class DialysisCenters extends BaseService {
  constructor() {
    super(BaseModal);
  }

  async groupBy(field) {
    return await BaseModal.aggregate([{ $group: { _id: "$adress." + field, count: { $sum: 1 } } }]);
  }
}

module.exports = new DialysisCenters(); 
