const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (error) {    
      error.statusCode = 500
      // send error to next middleware which is error-hanlder.js
      next(error)
    }
  }
}

module.exports = asyncWrapper