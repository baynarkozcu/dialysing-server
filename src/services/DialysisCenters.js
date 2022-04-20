const BaseService = require("./BaseServices");
const BaseModal = require("../models/DialysisCenters");

class DialysisCenters extends BaseService {
  constructor() {
    super(BaseModal);
  }

  async groupBy(fieldOne, fieldTwo) {
    return await BaseModal.aggregate([{ $group: { _id: { country: fieldOne, city: fieldTwo }, count: { $sum: 1 } } }]);
  }

  paginateList(where, page, count) {
    return this.BaseModal?.find(where || {})
      .limit(count)
      .skip(count * page);
  }
}

module.exports = new DialysisCenters();

//! Match Kullanımı
//! return await BaseModal.aggregate([{ $match: { "address.country": "Ukraine" } }, { $project: { _id: 1 } }]);
