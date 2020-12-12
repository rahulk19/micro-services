var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

var monk = require('monk');
var db = monk("mongodb+srv://Rahul:sairam@cluster0.5ep2p.mongodb.net/todolist?retryWrites=true&w=majority");
app.use(function(req,res,next){
    req.db = db;
    console.log('connected to database');
    next();
   });

//setting view engine to ejs
app.set('view engine', 'ejs');

app.get('/',function(req,res){
    res.send('<h1>Hello there it is working</h1>');
});
var addtasksRouter = require('./routes/form');
app.use('/form',addtasksRouter);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//catch 404 error
app.use(function(req, res, next) {
    next(createError(404));
  });

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });


//all other routes.
app.get('*',function(req,res){
    res.send('<h1>Page Not Found</h1>');
});


app.listen(3001);
console.log('running on port 3001');

module.exports = app;