# Simple CSV parser

## Usage

```typescript
let p: CSVParser = new CSVParser();

let csvFileAsString = fs.readFileSync(pathToFile, { encoding: 'uft-8' });

let j = p.toJSON(csvFileAsString); // parses csv string to json assuming the first line describes the headernames

let c = p.toCSV(j); // takes an array of objects and parses it to a csv string with headernames
```