import child_process from 'child_process';
import { replaceText } from './string';
const { argv } = require('yargs');

class App {
    async run(workingDirectory: string, revisionHash: string) {
        const sequenceEditorCommand = 'node ' + replaceText(__dirname, '\\', '/') + '/commitListProcessor.js';
        console.log(sequenceEditorCommand);
        child_process.execSync('git rebase -i ' + revisionHash, {
            cwd: workingDirectory,
            env: {
                GIT_SEQUENCE_EDITOR: sequenceEditorCommand
            }
        });
    }
}

const workingDirectory: string = argv['workingDirectory'];
console.assert(workingDirectory, 'Need working directory');
const revisionHash: string = argv['revision'];
new App().run(workingDirectory, revisionHash ? revisionHash : 'HEAD~1');