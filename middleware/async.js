const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      // send error to next middleware which is error-hanlder.js
      next(error)
    }
  }
}

module.exports = asyncWrapper