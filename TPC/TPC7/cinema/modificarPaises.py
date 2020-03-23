import re
import requests
import json

nomesPaises = []

def readFile(file):
    with open(file) as f:
        data = json.load(f)
    pais = ""
    i = 0
    while i < len(data):
        lista = {}
        lista.update(data[i])
        for valores in lista:
            if valores == 'country':
                for valor in lista[valores]:
                    if valor == 'value':
                        pais = str(lista[valores][valor])
        pais = re.sub(r'[ \'.()–’]', '_', str(pais))
        if(not(nomesPaises.__contains__(pais))):
            print("###  http://www.semanticweb.org/maria/ontologies/2020/2/cinema#" + pais)
            print(":" + pais, "rdf:type owl:NamedIndividual ,")
            print("                :País ;")
            nomesPaises.append(pais)
        i = i + 1

readFile('paises.json')
