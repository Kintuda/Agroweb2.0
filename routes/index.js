var express = require('express');
var router = express.Router();
var db = require("../db/connect.js")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home',{nome:(req.user ?req.user.nome_completo : '')});
});
router.post('/', async function(req,res,next){
  var mensagem = req.body
  console.log(mensagem)
  var produto = req.body
  var params = []
  var sql = ''
  sql = `
  INSERT INTO comentarios(nome,email,mensagem,data) VALUES ($1, $2, $3,CURRENT_DATE)
  `
  params = [mensagem.nome,mensagem.email,mensagem.mensagem]

  var result = await db.query(sql, params)

  if (result.rowCount > 0) {
    return res.redirect('/')
  }
  return res.render('../views/home', {
    title: 'Cadastro de Pessoa',
    nome: 'Ocorreu algum erro',
    produto:produto
    })
})
module.exports = router;
