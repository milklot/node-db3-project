const db = require('../../data/db-config')

function find() {
 return db('schemes')
}

function findById(id) {
    try {
      return db('schemes').where('id', id)
    }
    catch(e) {
      Promise.resolve(null)
    }
}

function findSteps(scheme_id) {
    return db('steps as st')
      .select('st.step_id', 'st.step_number', 'st.instructions', 'sc.scheme_name')
      .leftJoin('schemes as sc', 'sc.scheme_id', 'st.scheme_id')
      .where('sc.scheme_id', scheme_id)
      .orderBy('st.step_number', 'asc')
  }

function add(scheme) {
  return db("schemes as s")
  .insert(scheme)
  .then(([scheme_id]) => findById(scheme_id))
}

function addStep(scheme_id, step) {
  return db('steps as st')
    .insert(step, scheme_id)
    .then(([scheme_id]) => findSteps(scheme_id))
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
