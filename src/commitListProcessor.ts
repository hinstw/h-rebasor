import process from 'process';
import fs from 'fs';

const filePath = process.argv[2];
const text = fs.readFileSync(filePath).toString();
const lines = text.split('\n')
    .map(line => line.trim())
    .map(line => {
        if (line.startsWith('pick'))
            line = 'reword' + line.substring('pick'.length);
        return line;
    });

fs.writeFileSync(filePath, lines.join('\n'));