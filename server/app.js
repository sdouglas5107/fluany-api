import express from "express";
import mongoose from "mongoose";
import config from "./config";
import http from "http";
import bodyParser from "body-parser";
mongoose.Promise = require('bluebird');

mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function (err) {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});

// Populate databases
require('./config/seed');

// Setup server
var app = express();
var server = http.createServer(app);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

require('./routes').default(app);

// Start server
setImmediate(() =>
    server.listen(config.port, config.ip,
        () => console.log('Express server listening on %d, in %s mode', config.port, app.get('env')))
);

// Expose app
exports = module.exports = app;