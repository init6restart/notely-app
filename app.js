'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var register = require('./routers/router.register.js');
var nunjucks = require('nunjucks');

var app = express();


// view engine setup
nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Register the Routers
register(app);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: err
      });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {}
  });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
  debug('Express server listening on port ' + server.address().port);
});
 

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })