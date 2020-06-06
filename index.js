const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')

const modelRunner = require("./model");
const modelConvertor = require("./modelConvertor");
const PORT = process.env.PORT || 5001


express()
    .use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms'))
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .post('/train', (req, res) => {
        const modelCode = modelRunner(req.body);
        res.send(modelConvertor(modelCode))
    })
    .listen(PORT, () => console.log(`Listening on ${PORT}`))
