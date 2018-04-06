const express = require('express')
var router  = express.Router();
var request   = require("request");
router.get('/',(req,res,next)=>{
  res.render('index',{title:"Módulo Boleto"})
})
router.post('/',(req,res,next)=>{
  var idIntegracao = req.body.idIntegracao;
  console.log(idIntegracao);
  var options = { method: 'GET',
  url: 'http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/boletos',
  qs: { idIntegracao: idIntegracao},
  json: true,
  headers: 
   { 'cpf-cedente': '11361429917',
     'token-sh': 'f22b97c0c9a3d41ac0a3875aba69e5aa',
     'cnpj-sh': '01001001000113' },
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var data = JSON.stringify(body,null,2)
    console.log(data);
    res.render('index',{dados:data})
    });
});
router.post('/boleto',(req,res,next)=>{
  var jsonBoletoStr = req.body.idIntegracao;
  var jsonBoleto    = JSON.parse(jsonBoletoStr);
  console.log(jsonBoleto)
  var options = { method: 'POST',
    url: 'http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/boletos/lote',
    headers: 
    { 'cpf-cedente': '11361429917',
      'token-sh': 'f22b97c0c9a3d41ac0a3875aba69e5aa',
      'cnpj-sh': '01001001000113' },
    body:jsonBoleto,
    json:true}
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var data = JSON.stringify(body,null,2);

    console.log(data);
    res.render('index',{dados:data})
  });
})
module.exports = router;