'use strict';

var RatesApi = require('openexchangerates-api');
const key = '8c4b88e2a9714e338b6bf1a47e36ef8f'
var client = new RatesApi({
  appId: key
});

client.latest({base: 'USD',symbols:'BRL'}, function handleLatest(err, data) {
  if (err) {
    throw err;
  }
  else {
    /*console.dir(data.rates);*/
    var teste = JSON.stringify(data.rates)
    console.log(teste)
    dolar(teste)
  }
});
function dolar(teste){
  document.querySelector('.results').innerHTML = 'teste';
  console.log(teste)
}
