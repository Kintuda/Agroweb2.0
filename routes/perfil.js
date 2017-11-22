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
router.get('/', async function(req, res, next) {
  var result = await db.query('SELECT * FROM usuarios where id=$1',[req.user.id])
  var produto = await db.query('SELECT * FROM produto where cadastro=$1',[req.user.id])
  res.render('users/perfil',{nome:(req.user ?req.user.nome_completo : ''),
  user:result.rowCount > 0 ? result.rows : null,
  nome_completo:(req.user ?req.user.nome_completo : ''),
  produto:produto.rowCount > 0 ? produto.rows : null})
});
router.get('/update', async (req, res, next) => {
  res.render('users/perfilupdate',{
    user:req.user,
    nome_completo:(req.user ?req.user.nome_completo : '')
  });
})
router.post('/update', async (req, res, next) => {
  var pessoa = req.user
  var teste = req.body
  var params = []

  var sql = ''
  if (pessoa.id && pessoa.id > 0) {
    sql = `
    UPDATE usuarios SET nome_completo = $1, fone = $2, cpf = $3 WHERE id = $4
    `
    params = [teste.nome_completo,teste.fone,teste.cpf, pessoa.id]
  }

  var result = await db.query(sql, params)

  if (result.rowCount > 0) {
    return res.redirect('/perfil/')
  }

  return res.render('../views/users/perfilupdate', {
    error: 'Ocorreu algum erro'
  })
})

module.exports = router;
