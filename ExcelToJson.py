import openpyxl
import json

def excel_to_json(excel_file, json_file):
    workbook = openpyxl.load_workbook(excel_file)
    sheet = workbook.active

    data = []

    for row in sheet.iter_rows(values_only=True):
        data.append(row)

    headers = data[0]
    rows = data[1:]
 
    json_data = []
    count = 0
    for row in rows:

        row_data = {}
        for index, value in enumerate(row):
            header = headers[index]
            row_data[header] = value
            row_data["id"] = count
        count = count +1    
        json_data.append(row_data)
        

    output_data = {
        'columns': headers,
        'data': json_data
    }

    with open(json_file, 'w') as file:
        json.dump(output_data, file, indent=4)

# Example usage
excel_file = 'Dictionary.xlsx'
json_file = 'data.json'
excel_to_json(excel_file, json_file)
