var express = require('express');
var app = express();
app.get('/', function (request, response) {
    response.send('Hello World!');
});

app.get('/cities', function(request, response){
    response.json('Cities.');
});
module.exports = app;