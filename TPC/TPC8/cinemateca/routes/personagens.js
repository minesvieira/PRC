var express = require('express');
var router = express.Router();
var Personagens = require('../controllers/personagens')

router.get('/', function(req, res, next) {
  Personagens.getLista()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem de personagens: ${e}`))
});

router.get('/:id', function(req, res, next) {
  id = req.params.id
  nome = ""
  sexo = ""

  Personagens.getPersonagem(id)
    .then(dados => {
        dados.results.bindings.forEach(element => {
            nome = element.nome.value
            sexo = element.sexo.value
        })
        personagem = {
          nome: id,
          sexo: sexo,
        }
        res.jsonp(personagem)
      })
    .catch(e => res.status(500).send(`Erro na listagem de personagens: ${e}`))
});

module.exports = router;
