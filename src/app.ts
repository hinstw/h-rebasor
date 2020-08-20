import child_process from 'child_process';
const { argv } = require('yargs');

class App {
    async run(workingDirectory: string, revisionHash: string) {
        child_process.execSync("git rebase -i " + revisionHash, {
            cwd: workingDirectory
        });
    }
}

const workingDirectory: string = argv['workingDirectory'];
console.assert(workingDirectory, 'Need working directory');
const revisionHash: string = argv['revision'];
new App().run(workingDirectory, revisionHash ? revisionHash : 'HEAD~1');