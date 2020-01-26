var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Database connected")).catch((err) => console.log("Error", err))

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

var signupsRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var indexRouter = require('./routes/rend');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/register', signupsRouter);
app.use('/api/login', loginRouter);
app.use('/get', indexRouter);

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
