var express = require('express');
var partsrouter = express.Router();

partsrouter.route('/')
    .get(function(request, response){
        response.redirect(301, '/blocks');
    });

module.exports = partsrouter;