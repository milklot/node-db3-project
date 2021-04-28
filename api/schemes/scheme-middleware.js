const db = require('../../data/db-config')

const checkSchemeId = () => {
  return async (req, res, next) => {
    try {
      const { scheme_id } = req.params
      const scheme = await db("schemes").where( { scheme_id } ).first()
      if (!scheme) {
          return res.status(404).json({
          message: `scheme with ID ${scheme_id} not found`,
        })
      }
      req.scheme = scheme
      next()
    } catch(err) {
      next(err)
    }
  }
}

const validateScheme = () => {
  return async (req, res, next) => {
    try {
      const { scheme_name } = req.body;

      if (!scheme_name || scheme_name === '' || typeof scheme_name !== 'string') {
        await res.status(400).json({
          message: `error with scheme name`,
        })
      }
      next()
    } catch(err) {
      next(err)
    }
  }
}

const validateStep = () => {
  return async (req, res, next) => {
    try {
      const { instructions, step_number } = req.body;

      if (!instructions || instructions === '' || typeof instructions !== 'string' || typeof step_number !== 'number' || step_number < 1) {
        await res.status(400).json({
          message: `error with step`,
        })
      }
      next();
    } catch(err) {
      next(err)
    }
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
