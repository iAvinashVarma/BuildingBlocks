var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var app = express();

// View Engine setup.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(express.static('public'));

var index = require('./routes/index');
var cities = require('./routes/cities');
var blocks = require('./routes/blocks');
var parts = require('./routes/parts');

app.use(logger('dev'));
app.use('/', index);
app.use('/cities', cities);
app.use('/blocks', blocks);
app.use('/parts', parts);

// catch 404 and forward to error handler
app.use(function(request, response, next){
    var error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// error handler
app.use(function(error, request, response, next){
    // set locals, only providing error in development.
    response.locals.message = error.message;
    response.locals.error = request.app.get('env') === 'development' ? error : {};

    // render the error page.
    response.status(error.status || 500);
    response.render('error');
})

module.exports = app;