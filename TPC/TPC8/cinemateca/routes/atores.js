var express = require('express');
var router = express.Router();
var Atores = require('../controllers/atores')

router.get('/', function(req, res, next) {
  Atores.getLista()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem de atores: ${e}`))
});

router.get('/:id', function(req, res, next) {
    id = req.params.id
    sexo = ""
  
    Atores.getAtor(id)
      .then(dados => {
          dados.results.bindings.forEach(element => {
              nome = element.nome.value
              sexo = element.sexo.value
          })
          ator = {
            nome: id,
            sexo: sexo,
          }
          res.jsonp(ator)
        })
      .catch(e => res.status(500).send(`Erro na listagem de atores: ${e}`))
  });

  

module.exports = router;
