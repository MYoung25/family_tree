// create an express server listening on port 3005
var express = require('express');
const MongoDB = require('./src/mongoose_connection')

const routes = require('./src/routes.js');

var app = express();

new MongoDB().createConnection()
    .then(() => {
        app.use(express.urlencoded());
        app.use(express.json());

        // allow cross-origin requests
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            // allow actual CORS
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            // allow actual CORS
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            // allow actual CORS
            res.header("Access-Control-Allow-Credentials", "true");
            // pass to next layer of middleware
            next();
        })
        
        app.listen(3000);
        console.log(`Server running on port 3000`);

        // serve the static files
        app.use(express.static(__dirname + '/public'));

        app.use(routes);
    })