// import built-in dependencies
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

// import user defined dependencies
const routes = require('./config/route.config.json');
const requestProcessors = require('./config/request_processors');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Set up CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Configure routes
routes.forEach(route => {
    app[route.method](route.url, (req, res, next) => {
        var requestProcessorParams, responsejson;

        requestProcessorParams = {
            method: req.method,
            queryParams: req.params,
            requestBody: req.body
        }
        result = requestProcessors[route.requestProcessor](requestProcessorParams);
        res.status(result.code).send(result.data);
    });
});

// if a resouce is requested which does not exists
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404; 
    next(error);
});

// Global error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
