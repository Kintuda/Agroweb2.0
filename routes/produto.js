var express = require('express');
var router = express.Router();
var db = require('../db/connect');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  var result = await db.query('SELECT * FROM usuarios')
  res.render('produto',{nome:(req.user ?req.user.nome_completo : ''),
  pessoas: result.rowCount > 0 ? result.rows : null})
});
router.get('/grao', async (req, res, next) => {
  var result = await db.query('SELECT * FROM produto')
  res.render('../views/produto_grao', {
    nome: req.user.nome_completo,
    id:req.user.id,
    produto: result.rowCount > 0 ? result.rows : null,
    nome:(req.user ?req.user.nome_completo : '')
  })

})
router.get('/adubo', async function(req, res, next) {
  var result = await db.query('SELECT * FROM produto')
  res.render('produto_adubo',{tipo:'Adubo',nome:(req.user ?req.user.nome_completo : ''),
  nome: req.user.nome_completo,
  id:req.user.id,
  produto: result.rowCount > 0 ? result.rows : null,
  nome:(req.user ?req.user.nome_completo : '')
});
});
router.get('/maquinas', async function(req, res, next) {
  var result = await db.query('SELECT * FROM produto')
  res.render('produto_maquinas',{title:'Máquinas',nome:(req.user ?req.user.nome_completo : ''),
  id:req.user.id,
  nome: req.user.nome_completo,
  produto: result.rowCount > 0 ? result.rows : null,
  nome:(req.user ?req.user.nome_completo : '')
  });
});
router.get('/cadastro', async (req, res, next) => {
  var produto = {}

  if (req.params.id && req.params.id > 0) {
    var result = await db.query('SELECT * FROM produto WHERE id = $1', [req.params.id])

    if (result.rowCount > 0) {
      produto = result.rows[0]
    }
  }
  res.render('../views/produtocadastro', {
    nome: req.user.nome_completo,
  })
})
router.post('/cadastro', async (req, res, next) => {
  var produto = req.body
  var params = []
  var sql = ''
  sql = `
  INSERT INTO produto (produtonome, produtopreco, produtoqt,categoriaid,empresa,local,url,cadastro) VALUES ($1, $2, $3, $4,$5,$6,$7,$8)
  `
  params = [produto.nome, produto.preco, produto.qt, produto.categoria,produto.empresa,produto.local,produto.url,req.user.id]

  var result = await db.query(sql, params)

  if (result.rowCount > 0) {
    return res.redirect('/produto/')
  }

  return res.render('../views/produtocadastro', {
    title: 'Cadastro de Pessoa',
    nome: 'Ocorreu algum erro',
    produto:produto
  })
})
module.exports = router;
