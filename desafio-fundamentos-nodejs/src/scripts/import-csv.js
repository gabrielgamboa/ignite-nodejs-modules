import fs from 'node:fs';
import { parse } from 'csv-parse';

const __dirname = new URL('./tasks.csv', import.meta.url);

const processFile = async () => {
  const records = [];
  const parser = fs
    .createReadStream(__dirname)
    .pipe(parse());

  for await (const record of parser) {
    // Work with each record
    records.push(record);
  }
  return records;
};

(async () => {
  const records = await processFile();
  records.shift()
  records.forEach(( async ([title, description]) => {
    const body = {
      title,
      description 
   };


   await fetch('http://localhost:3333/tasks', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
  }))
})();