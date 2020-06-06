const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')

const modelRunner = require("./model");
const modelConvertor = require("./modelConvertor");
const authorizeMiddleware = require("./authorizeMiddleware")
const PORT = process.env.PORT || 5001

const loggerTemplate = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms'

express()
    .use(morgan(loggerTemplate))
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(authorizeMiddleware)
    .post('/train', (req, res) => {
        const modelCode = modelRunner(req.body);
        res.send(modelConvertor(modelCode));
    })
    .get('/healthcheck', (req, res) => {
        res.send("OK");
    })
    .listen(PORT, () => console.log(`Listening on ${PORT}`))
