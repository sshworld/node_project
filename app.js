var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var index = require('./routes/index');

// 세션
const session = require('express-session');
const mysqlStore = require("express-mysql-session")(session)

const options = {
  host: '',
    port: 3306,
    user: 'root',
    password: '',
    database: 'mydb'
}

const sessionStore = new mysqlStore(options);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 밑에 GET / 이런식으로 뜨는 것
// app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//d

// 세션
app.use(session({
  secret: 'session!',
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
}));


app.use('/', index);


// catch 404 and forward to error handler
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

module.exports = app;
