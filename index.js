const express = require('express');
const bodyParser = require('body-parser');
const trade = require('./crypto_trade')

const port = process.env.PORT || 3000
const app = express()

app.get('/', function (request, response) {
    response.end("Coin Trade Server Status - Running")
})
app.use(bodyParser.json());

app.use('/crypto', trade)

app.listen(port)
console.log(`server is listening on port ${port}...`);