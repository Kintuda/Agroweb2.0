var express = require('express')
var router = express.Router()
var db = require('../db/connect')
var criptografia = require('../config/criptografia')
var passport = require('passport')

router.use(function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/users/login')
  }
  next()
})
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/perfil',{nome:(req.user ?req.user.nome_completo : ''),
  user:req.body,
  nome_completo:(req.user ?req.user.nome_completo : '')});
});

module.exports = router;
