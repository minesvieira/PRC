import csv

csv_file = open('alunos.csv')
csv_reader = csv.reader(csv_file, delimiter=',')
next(csv_reader)

with open('alunos.ttl', 'w') as f:
    for row in csv_reader:
        numero = row[0]
        nome = row[1]
        git = row[2]
        print(numero, nome, git)
        f.write(f'###  http://www.prc.di.uminho.pt/2020/SalaAula#' + numero + '\n' )
        f.write(f':' + numero + ' rdf:type owl:NamedIndividual ,\n')
        f.write(f'\t\t\t:Pessoa ;\n')
        f.write(f'\t:frequenta :PRI ;\n')
        f.write(f'\t:curso "MIEI"^^xsd:string ;\n')
        f.write(f'\t:email ' + '"' + numero + '@alunos.uminho.pt"^^xsd:string ;\n')
        f.write(f'\t:ident ' + '"' + numero + '"^^xsd:string ;\n')
        f.write(f'\t:nome ' + '"' + nome + '"^^xsd:string .\n\n')

csv_file.close()