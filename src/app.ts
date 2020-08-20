import child_process from 'child_process';
import { replaceText } from './string';
const { argv } = require('yargs');

class App {
    async run(workingDirectory: string, revisionHash: string, ticketKey: string) {
        const sequenceEditorCommand = 'node ' + replaceText(__dirname, '\\', '/') + '/commitListProcessor.js';
        const commitMessageEditorCommand = 'node ' + replaceText(__dirname, '\\', '/') + '/commitProcessor.js';
        console.log(sequenceEditorCommand);
        child_process.execSync('git rebase -i ' + revisionHash, {
            cwd: workingDirectory,
            env: {
                GIT_SEQUENCE_EDITOR: sequenceEditorCommand,
                GIT_EDITOR: commitMessageEditorCommand,
                HREBASOR_TICKET_KEY: ticketKey
            }
        });
    }
}

const workingDirectory: string = argv['workingDirectory'];
console.assert(workingDirectory, 'Need working directory');
const revisionHash: string = argv['revision'];
const ticketKey: string = argv['ticket'];
new App().run(
    workingDirectory,
    revisionHash ? revisionHash : 'HEAD~1',
    ticketKey
);