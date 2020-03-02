var express = require('express');
var router = express.Router();
var axios = require('axios')

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX amd: <http://prc.di.uminho.pt/2020/amd#>
    `
    //PREFIX amd: <http://prc.di.uminho.pt/2020/amd#>

var getLink = "http://localhost:7200/repositories/amd" + "?query="
/* GET home page. */
router.get('/', function(req, res, next) {
  var query = `
  select ?tit (count (?part) as ?nparts) ?id where { 
    ?id rdf:type amd:Obra.
      ?id amd:título ?tit.
      ?id amd:temPartitura ?part.
  } 
  group by ?tit ?id
  order by ?tit`

  var encoded = encodeURIComponent(prefixes + query)
  axios.get(getLink + encoded)
  .then(dados =>{
    var mydata = []
    mydata = dados.data.results.bindings.map(obra => {return {id:obra.id.value.split('#')[1], 
                                                      tit: obra.tit.value,
                                                      nparts: obra.nparts.value}})
    res.render('index', {obras: mydata})
  })
  .catch(erro => res.render('error', {error:erro}))
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id
  var partitura = `
  select ?s ?voz ?clave ?path where { 
    ?s rdf:type amd:Partitura.
    amd:${id} amd:temPartitura ?s .
    ?s amd:path ?path .
    optional {
    	?s amd:voz ?voz .    
    }
    optional {
        ?s amd:clave ?clave .
    }
    optional {
      ?s amd:path ?path .
  }
}`;
  
  var encoded = encodeURIComponent(prefixes + partitura)
  axios.get(getLink + encoded)
    .then(dados => {
      var mydata = dados.data.results.bindings.map(partitura => {
        path = "Não existe"
        if(partitura.hasOwnProperty('path')){
          //console.log("Path: " + element.path.value)
          path = partitura.path.value
        }
        
        clave = "Não existe"
        if(partitura.hasOwnProperty('clave')){
          clave = partitura.clave.value
        }

        afinacao = "Não existe"
        if(partitura.hasOwnProperty('afinação')){
          afinacao = partitura.afinação.value
        }
        
        voz = "Não existe"
        if(partitura.hasOwnProperty('voz')){
          voz = partitura.voz.value
        }
        return {
          id: partitura.s.value.split('#')[1], 
          voz: voz, 
          clave: clave,         
          path: path,
          afinacao: afinacao
        }
      })
      res.render('partitura', { partituras: mydata });
    })
    .catch(erro => {
      res.render('error', {error : erro})   
    })
});

module.exports = router;
