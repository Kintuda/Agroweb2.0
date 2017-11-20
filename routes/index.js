var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home',{nome:(req.user ?req.user.nome_completo : '')});
});

module.exports = router;
