// create an express server listening on port 3005
var express = require('express');
const MongoDB = require('./mongoose_connection')

const routes = require('./routes.js');

var app = express();

new MongoDB().createConnection()
    .then(() => {
        app.use(express.urlencoded());
        app.use(express.json());
        app.listen(3000);
        console.log(`Server running on port 3000`);

        app.use(routes);
    })