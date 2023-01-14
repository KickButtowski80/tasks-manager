const errorHandlerMiddleware = (err, req, res, next) => {
    console.dir(err)
    return res.status(500).json({ msg: err.message })
}

module.exports = errorHandlerMiddleware