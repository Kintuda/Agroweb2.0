var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('about',{nome:(req.user ?req.user.nome_completo : '')});
});

module.exports = router;
