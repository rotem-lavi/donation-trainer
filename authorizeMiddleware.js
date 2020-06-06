const INTEGRATION_TOKEN = process.env.INTEGRATION_TOKEN || "local";

const middleware = (req, res, next) => {
    if (req.headers.authorization === `Bearer ${INTEGRATION_TOKEN}`)
        return next()
    else
        res.status(403).send("Unauthorised")
}

module.exports = middleware;