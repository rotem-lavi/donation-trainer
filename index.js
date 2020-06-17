const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')

const modelRunner = require("./model");
const authorizeMiddleware = require("./authorizeMiddleware")
const PORT = process.env.PORT || 5001

const loggerTemplate = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms'

express()
    .use(morgan(loggerTemplate))
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(authorizeMiddleware)
    .post('/train', (req, res) => {
        res.send(modelRunner(req.body));
    })
    .get('/healthcheck', (req, res) => {
        res.send("OK");
    })
    .use((err, req, res, next) => {
        console.error(err);
        res.status(500).send({error: 'Something failed!'});
    })
    .listen(PORT, () => console.log(`Listening on ${PORT}`))
