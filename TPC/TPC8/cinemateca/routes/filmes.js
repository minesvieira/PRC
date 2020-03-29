var express = require('express');
var router = express.Router();
var Filmes = require('../controllers/filmes')
var Produtores = require('../controllers/produtores')
var Generos = require('../controllers/generos')
var Personagens = require('../controllers/personagens')
var Atores = require('../controllers/atores')

/* GET home page. */
router.get('/', function(req, res, next) {
  Filmes.getLista()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`))
});

router.get('/:id', async (req, res, next) => {
	try{
        var filme = await Filmes.getFilme(req.params.id);
        filme.produtores = await Produtores.getLista(req.params.id);
        filme.generos = await Generos.getLista(req.params.id);
        filme.personagens = await Personagens.getPersonagem(req.params.id);
        filme.atores = await Atores.getAtor(req.params.id)
        res.jsonp(filme)
    } catch(erro){
        res.status(500).send(`Erro na listagem de filmes: ${erro}`)
    }
})
module.exports = router;
