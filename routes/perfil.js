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
  user:req.user,
  nome_completo:(req.user ?req.user.nome_completo : '')});
});
router.get('/cadastro/:id?', async (req, res, next) => {
  var pessoa = {}

  if (req.params.id && req.params.id > 0) {
    var result = await db.query('SELECT * FROM usuarios WHERE id = $1', [req.params.id])

    if (result.rowCount > 0) {
      pessoa = result.rows[0]
    }
  }

  res.render('../views/pessoas/cadastro', {
    title: 'Cadastro de Pessoa',
    nome: req.user.nome_completo,
    pessoa: pessoa
  })
})

router.post('/cadastro/:id?', async (req, res, next) => {
  var pessoa = req.body
  var params = []

  var sql = ''

  if (pessoa.id && pessoa.id > 0) {
    sql = `
    UPDATE usuarios SET nome = $1, telefone = $2, cpf = $3 WHERE id = $4
    `
    params = [pessoa.nome, pessoa.telefone, pessoa.cpf, pessoa.id]
  } else {
    sql = `
    INSERT INTO usuarios (nome_completo, fone, cpf) VALUES ($1, $2, $3)
    `
    params = [pessoa.nome, pessoa.telefone, pessoa.cpf]
  }

  var result = await db.query(sql, params)

  if (result.rowCount > 0) {
    return res.redirect('/perfil/')
  }

  return res.render('../views/pessoas/cadastro', {
    title: 'Cadastro de Pessoa',
    nome: 'Ocorreu algum erro',
    pessoa: pessoa
  })
})
module.exports = router;
