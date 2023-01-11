const notFound = (req, res) => {
    res.status(401).send(`${req.originalUrl} does not exist`)
}

module.exports = notFound