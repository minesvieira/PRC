var express = require('express');
var router = express.Router();
var axios = require('axios');

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    `

/* GET home page. */
router.get('/', function(req, res, next) {
  var resultado = []
  axios.get("http://localhost:7200/repositories")
    .then(dados => {
      dados.data.results.bindings.forEach (element => {
        resultado.push (element.id.value)
      })
      res.render('index', {repositorios: resultado, resultado: []})
    })
    .catch(erro => console.log(erro))
});

router.post('/query', async(req, res, next) => {
  var getLink = "http://localhost:7200/repositories/" + req.body.rep + "?query=" 
  var encoded = encodeURIComponent(prefixes + req.body.query)
  
  var nomesreposi = []
  var rep = await axios.get("http://localhost:7200/repositories")
  rep.data.results.bindings.forEach (element => {
    nomesreposi.push (element.id.value)
  })
  var queries = []
  axios.get(getLink + encoded) 
  .then(dados => {
    dados.data.results.bindings.forEach (element => {
      queries.push(element)
    })
    //console.log(JSON.stringify(dados.data.results.bindings))
    res.render('index', {repositorios: nomesreposi, resultado: JSON.stringify(queries)})
  })
  .catch(erro => console.log(erro))
});

module.exports = router;
