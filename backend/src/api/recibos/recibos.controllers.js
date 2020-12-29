async function getById(Model, id, res, next) {
  try {
    const results = await Model.query().findById(id);
    res.json(results);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getById,
};
