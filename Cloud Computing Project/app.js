var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hostname = '0.0.0.0';
const port = 3000;



var app = express();
//connecting to the database
var monk = require('monk');
var db = monk("mongodb+srv://Rahul:sairam@cluster0.5ep2p.mongodb.net/todolist?retryWrites=true&w=majority");
app.use(function(req,res,next){
    req.db = db;
    //console.log(db);
    next();
   });
//setting view engine to ejs
app.set('view engine', 'ejs');


//give all the access to the folders within.
var welcomeRouter = require('./routes/welcome');
var toDoListRouter = require('./routes/todolist');
var addTasksRouter = require('./routes/addtasks');


//main part and the routtes.
app.use('/',welcomeRouter);
app.use('/todolist',toDoListRouter);
app.use('/addtasks',addTasksRouter);

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


app.listen(port,hostname,function(){
    console.log('server started on port :' + port);
})
module.exports = app;