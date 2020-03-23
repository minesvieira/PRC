import json
import re
import requests

nomesAtores = []

def readFile(file):
    with open(file) as f:
        data = json.load(f)

    ator = ""
    i = 0
    while i < len(data):
        lista = {}
        lista.update(data[i])
        for valores in lista:
            if valores == 'aname':
                for values in lista[valores]:
                    if values == 'value':
                        ator= str(lista[valores][values])
        ator = re.sub(r'[,,/\"]', '', str(ator))
        ator = re.sub(r'[ \'.()–’]', '_', str(ator))
        if(not(nomesAtores.__contains__(ator))):
            print("###  http://www.semanticweb.org/maria/ontologies/2020/2/cinema#" + ator)
            print(":" + ator, "rdf:type owl:NamedIndividual ,")
            print("                :Ator ,")
            print("                :Pessoa ;")
            nomesAtores.append(ator)
        i = i + 1

readFile('atores.json')