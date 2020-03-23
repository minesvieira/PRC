import json
import re
import requests

nomesLinguas = []

def readFile(file):
    with open(file) as f:
        data = json.load(f)
    lingua = ""
    i = 0
    while i < len(data):
        lista = {}
        lista.update(data[i])
        for valores in lista:
            if valores == 'lang':
                for valor in lista[valores]:
                    if valor == 'value':
                        lingua = str(lista[valores][valor])
        lingua = re.sub(r'[ \'.()–’]', '_', str(lingua))
        if(not(nomesLinguas.__contains__(lingua))):
            print("###  http://www.semanticweb.org/maria/ontologies/2020/2/cinema#" + lingua)
            print(":" + lingua, "rdf:type owl:NamedIndividual ,")
            print("                :Língua ;")
            nomesLinguas.append(lingua)
        i = i + 1

readFile('linguas.json')