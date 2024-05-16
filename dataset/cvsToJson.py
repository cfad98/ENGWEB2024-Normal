import csv
import json

def read_csv_file(file_path):
    bd = []
    try:
        with open(file_path, "r") as csv_file:
            csv_reader = csv.DictReader(csv_file, delimiter = ';')
            
            for row in csv_reader:
                bd.append(row)
    except FileNotFoundError:
        print(f'O ficheiro: {file_path} não encontrado')
    except Exception as e:
        print(f'Ocorreu um erro: {e}')
    
    return bd


file_path = './contratos2024.csv'
myBD = read_csv_file(file_path)
newDb = []
for elem in myBD:
    data = {
        '_id' : elem['idcontrato'],
        "nAnuncio": elem['nAnuncio'],
        "tipoprocedimento": elem['tipoprocedimento'],
        "objectoContrato": elem['objectoContrato'],
        "dataPublicacao": elem['dataPublicacao'],
        "dataCelebracaoContrato": elem['dataCelebracaoContrato'],
        "precoContratual": elem['precoContratual'],
        "prazoExecucao": elem['prazoExecucao'],
        "NIPC_entidade_comunicante": elem['NIPC_entidade_comunicante'],
        "entidade_comunicante": elem['entidade_comunicante'],
        "fundamentacao": elem['fundamentacao']
    }
    newDb.append(data)

f = open("dataset.json","w",encoding='utf-8')
json.dump(newDb, f, indent=2)
f.close()