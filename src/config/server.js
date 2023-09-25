const port = 3003


const bodyParser = require('body-parser');
const express = require('express');

const app = express()
const cors = require('./cors');
const routes = require('./routes')
const queryParser = require('express-query-int')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(queryParser())
server.use(cors)
app.use('/', routes);

app.listen(port, function(){
    console.log(`⚡️[server]: iniciado na porta: ${port}`)
})

