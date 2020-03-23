import json
import re
import requests

nomesEscritores = []

def readFile(file):
    with open(file) as f:
        data = json.load(f)
    escritor = ""
    i = 0
    while i < len(data):
        lista = {}
        lista.update(data[i])
        for valores in lista:
            if valores == 'wname':
                for valor in lista[valores]:
                    if valor == 'value':
                        escritor = str(lista[valores][valor])
        escritor = re.sub(r'[ \'.()–’]', '_', str(escritor))
        if(not(nomesEscritores.__contains__(escritor))):
            print("###  http://www.semanticweb.org/maria/ontologies/2020/2/cinema#" + escritor)
            print(":" + escritor, "rdf:type owl:NamedIndividual ,")
            print("                :Escritor ,")
            print("                :Pessoa ;")
            nomesEscritores.append(escritor)
        i = i + 1

readFile('escritores.json')
