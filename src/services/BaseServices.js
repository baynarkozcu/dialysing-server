BaseModal = null;

class BaseService {
  constructor(modal) {
    this.BaseModal = modal;
  }

  index(where) {
    return this.BaseModal?.find(where || {});
  }

  indexTop5(where) {
    return this.BaseModal?.find(where || {}).limit(5);
  }

  find(where) {
    return this.BaseModal.findOne(where);
  }

  findById(where) {
    return this.BaseModal.findById(where);
  }

  create(data) {
    return new this.BaseModal(data).save();
  }

  update(id, data) {
    return this.BaseModal.findByIdAndUpdate(id, data, { new: true });
  }

  updateWhere(where, data) {
    return this.BaseModal.findOneAndUpdate(where, data, { new: true });
  }

  delete(id) {
    return this.BaseModal.findByIdAndDelete(id);
  }

  restore(id) {
    return this.BaseModal.restore()
      .then(() => {
        return this.BaseModal.findById(id);
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = BaseService;
