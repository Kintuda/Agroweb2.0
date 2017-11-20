var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('cookie-session')

var app = express();

var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'vash');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    secret: 'agrowebsession',
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: {
      secure: true, // Assegura que o navegador só envie o cookie por HTTPS.
      httpOnly: true, // Assegura que o cookie seja enviado apenas por HTTP(S), não por cliente JavaScript, ajudando assim a se proteger contra ataques de cross-site scripting.
      domain: 'localhost', // indica o domínio do cookie; use-o para comparação contra o domínio do servidor em que a URL está sendo solicitada.
      path: '/', // indica o caminho do cookie; use-o para comparação contra o caminho da solicitação. Se este e o domínio corresponderem, então envie o cookie na solicitação.
      expires: expiryDate // use para configurar uma data de expiração para cookies persistentes.
    }
  })
)
require('./config/passport')(app)

var index = require('./routes/index');
var users = require('./routes/users');
const produto = require('./routes/produto')
const perfil = require('./routes/perfil')
const about = require('./routes/about')
app.use('/', index)
app.use('/users', users)
app.use('/produto', produto)
app.use('/perfil',perfil)
app.use('/about',about)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
