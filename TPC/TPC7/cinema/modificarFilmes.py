import json
import re
import requests

nomesFilmes = []

def readFile(file):
    with open(file) as f:
        data = json.load(f)
    filme = ""
    i = 0
    while i < len(data):
        lista = {}
        lista.update(data[i])
        for valores in lista:
            if valores == 'fname':
                for valor in lista[valores]:
                    if valor == 'value':
                        filme = str(lista[valores][valor])
        filme = re.sub(r'[ \'.()–’]', '_', str(filme))
        if(not(nomesFilmes.__contains__(filme))):
            print("###  http://www.semanticweb.org/maria/ontologies/2020/2/cinema#" + filme)
            print(":" + filme, "rdf:type owl:NamedIndividual ,")
            print("                :Filme ;")
            nomesFilmes.append(filme)
        i = i + 1

readFile('filmes.json')