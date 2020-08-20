import process from 'process';
import fs from 'fs';

const filePath = process.argv[2];
const text = fs.readFileSync(filePath).toString();
const ticketKey = process.env['HREBASOR_TICKET_KEY'];
