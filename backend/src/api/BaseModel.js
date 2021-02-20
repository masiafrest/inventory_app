const { Model } = require("objection");

class BaseModel extends Model {
  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
  $afterDelete() {
    this.deleted_at = new Date().toISOString();
  }
}

module.exports = BaseModel;
