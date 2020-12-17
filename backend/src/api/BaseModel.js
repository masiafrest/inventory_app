const { Model } = require("objection");

class BaseModel extends Model {
  $afterUpdate() {
    this.updated_at = new Date().toISOString();
  }

  $afterDelete() {
    this.deleted_at = new Date().toISOString();
  }
}

module.exports = BaseModel;
