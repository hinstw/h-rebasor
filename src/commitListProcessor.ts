import process from 'process';
import fs from 'fs';

const filePath = process.argv[2];
const ticketKey = process.env['HREBASOR_TICKET_KEY'] as string;

function processRevisionString(text: string) {
    const parts = text.split(' ');
    if (parts.length >= 3) {
        const commitMessage = parts[2];
        if (text.startsWith('pick') && !commitMessage.startsWith(ticketKey))
            text = 'reword' + text.substring('pick'.length);
    }
    return text;
}

const text = fs.readFileSync(filePath).toString();
const lines = text.split('\n')
    .map(line => line.trim())
    .map(processRevisionString);

fs.writeFileSync('text.txt', lines.join('\n'));