import process from 'process';
import fs from 'fs';

const ticketKey: string = process.env['HREBASOR_TICKET_KEY'] as string;
const filePath = process.argv[2];

function main() {
    let text = fs.readFileSync(filePath).toString();
    if (text.startsWith(ticketKey))
        return;
    const ticketKeyMatcher = new RegExp('/^[A-Z]{1,5}-\d{1,5}/g');
    text.replace(ticketKeyMatcher, '');
    text = ticketKey + ' ' + text;
    fs.writeFileSync(filePath, text);
}

main();