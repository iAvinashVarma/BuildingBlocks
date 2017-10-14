var express = require('express');
var blocksrouter = express.Router();

blocksrouter.route('/')
    .get(function(request, response){
        var blocks = ['Fixed', 'Movable', 'Rotating'];
        response.send(blocks);
    });

module.exports = blocksrouter;