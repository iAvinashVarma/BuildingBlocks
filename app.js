var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({extended: false});
app.use(express.static('public'));
var cities = {
    'Hyderabad': 'Capital of Telangana',
    'Bangalore': 'Capital of Karnataka',
    'Chennai': 'Capital of Tamil Nadu'
};

app.get('/', function (request, response) {
    response.send('Hello World!');
});

app.get('/cities', function(request, response){
    response.json(Object.keys(cities));
});

app.post('/cities', urlencode, function(request, response){
    var newCity = request.body;
    cities[newCity.name] = newCity.description;
    response.status(201).json(newCity.name);
});

app.get('/blocks', function(request, response){
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    response.send(blocks);
});

app.get('/blockspage', function(request, response){
    response.redirect('/parts');
});

app.get('/part', function(request, response){
    response.redirect(301, '/parts');
});

app.get('/parts', function(request, response){
    var blocks = '<ul><li>Fixed</li></ul>';
    response.send(blocks);
});

module.exports = app;