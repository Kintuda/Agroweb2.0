var express = require('express');
var router = express.Router();
var db = require('../db/connect');
/* GET home page. */
router.use(function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/users/login')
  }
  next()
})
router.get('/', async function(req, res, next) {
  var admin = await db.query('SELECT isadmin from usuarios where id =$1',[req.user.id])
  if(admin.rows[0].isadmin){
    var contador =  await db.query('SELECT COUNT(produtoid) FROM produto where produtoid>0')
    var count = await db.query('SELECT count(id) FROM usuarios where id>0')
    var result = await db.query('SELECT produtoid,produtonome,produtodata from produto ORDER BY produtoid DESC LIMIT 5')
    console.log(result.rows)
    var user = await db.query('SELECT id,nome_completo,email,data_cadastro FROM usuarios ORDER BY id DESC LIMIT 5')
    var reclamacao = await db.query('SELECT * from comentarios')
    var contadorrec = await db.query('SELECT count(id) FROM comentarios where id>0 LIMIT 5')
    res.render('../views/dashboard/dashboard',{nome:(req.user ?req.user.nome_completo : ''),
    contador: contador.rows[0].count,
    produto:result.rows,
    user:user.rows,
    count:count.rows[0].count,
    rec:reclamacao.rows,
    contadorrec:contadorrec.rows[0].count
    });
  }else{
    res.redirect('/')
  }
});
router.get('/tables', async function(req, res, next) {
  var admin = await db.query('SELECT isadmin from usuarios where id =$1',[req.user.id])
  var produto =  await db.query('SELECT * FROM produto ORDER BY produtoid')
  var user = await db.query('SELECT * FROM usuarios ORDER BY id')
  if(admin.rows[0].isadmin){
    res.render('../views/dashboard/table',{nome:(req.user ?req.user.nome_completo : ''),
    produto:produto.rows,
    user:user.rows
    });
  }else{
    res.redirect('/')
  }
});
module.exports = router;
