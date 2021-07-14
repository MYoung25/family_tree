// create an express server listening on port 3005
var express = require('express');
const MongoDB = require('./mongoose_connection')

var app = express();

new MongoDB().createConnection()
    .then(() => {
        app.use(express.static(__dirname + '/public'));
        app.listen(3000);
        console.log(`Server running on port 3000`);

        app.get('*', (req, res) => {
            res.sendStatus(200)
        })
    })