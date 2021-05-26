import fs  from 'fs';

class CSVParser {
  constructor() {}

  public toJSON(csvString: string) {
    let output: any[] = [];
    let lines: string[] = csvString.split('\r\n');
    let headerFields: string[] = this.clearHeaderfieldNames(lines.shift()!.split(','));
    
    lines.forEach(line => {
      let values = line.split(',');
      let object: { [key: string]: any } = {};
      values.forEach((value: string, index: number) => {
        // type identification
        let finalValue: string | boolean | number;
        if(value.startsWith('"') && value.endsWith('"')) {
          // string
          finalValue = this.stripString(value);
        } else if(value === 'true' || value === 'false') {
          // boolean
          switch(value) {
            case 'true':
              finalValue = true;
              break;
            case 'false':
              finalValue = false;
              break;
          }
        } else {
          // number
          finalValue = parseInt(value, 10);
        }

        object[headerFields[index]] = finalValue;
      });
      output.push(object);
    });

    return output;
  }

  public toCSV(csvArray: { [key: string]: string | number | boolean }[]) {
    let globalOutput: string[] = [];
    let headerFields = Object.keys(csvArray[0]).map((fieldName: string) => {
      return `"${fieldName}"`;
    }).join(',');

    csvArray.forEach((entry: { [key: string]: string | number | boolean }) => {
      let output: any[] = [];
      let values: (string | number | boolean)[] = Object.values(entry);
      
      values.forEach((value: string | number | boolean) => {
        let finalValue: string | number | boolean;
        if(typeof value === 'string') {
          finalValue = `"${value}"`;
        } else {
          finalValue = value;
        }
        output.push(finalValue);
      });

      globalOutput.push(output.join(','));

    });

    globalOutput.splice(0, 0, headerFields);

    return globalOutput.join('\r\n');
  }

  private clearHeaderfieldNames(fieldNames: string[]) {
    for(let i: number = 0; i < fieldNames.length; i++) {
      let result: string = this.stripString(fieldNames[i]);
      fieldNames[i] = result;
    }

    return fieldNames;
  }

  private stripString(text: string): string {
    return text.substring(1, text.length - 1);
  }
}