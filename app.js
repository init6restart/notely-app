var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var register = require('./routers/router.register.js');

var app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Register the Routers
register(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})