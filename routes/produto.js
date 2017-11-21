var express = require('express');
var router = express.Router();
var db = require('../db/connect');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('produto',{nome:(req.user ?req.user.nome_completo : '')});
});
router.get('/grao', async (req, res, next) => {
  var result = await db.query('SELECT * FROM produto')
  res.render('../views/produto_grao', {
    title: 'Consulta de Pessoas',
    nome: req.user.nome_completo,
    produto: result.rowCount > 0 ? result.rows : null,
    nome:(req.user ?req.user.nome_completo : '')
  })

})
router.get('/adubo', async function(req, res, next) {
  res.render('produto_adubo',{tipo:'Adubo',nome:(req.user ?req.user.nome_completo : '')});
});
router.get('/ferramentas', async function(req, res, next) {
  res.render('produto_ferramentas',{titlepo:'Ferramentas',nome:(req.user ?req.user.nome_completo : '')});
});
module.exports = router;
