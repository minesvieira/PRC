import json
import re
import requests

nomesCompositores = []

def readFile(file):
    with open(file) as f:
        data = json.load(f)

    comp = ""
    i = 0
    while i < len(data):
        lista = {}
        lista.update(data[i])
        for valores in lista:
            if valores == 'mname':
                for valor in lista[valores]:
                    if valor == 'value':
                        comp = str(lista[valores][valor])
        comp = re.sub(r'[ \'.()–’]', '_', str(comp))
        if(not(nomesCompositores.__contains__(comp))):
            print("###  http://www.semanticweb.org/maria/ontologies/2020/2/cinema#" + comp)
            print(":" + comp, "rdf:type owl:NamedIndividual ,")
            print("                :Compositor ,")
            print("                :Pessoa ;")
            nomesCompositores.append(comp)
        i = i + 1

readFile('compositores.json')