#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const co = require('co');
const path = require('path');
const os = require('os');

const colorFiglet = require('../lib');
const file = require('../lib/file');


program
    .version(require('../package').version)
    .usage('string [file]')
    .option('-f, --file <file>', 'save file')
    .option('-t, --typeface <font>', 'figlet font')
    .command('list', 'list font', { isDefault: false })
    .action(function () {

    }).parse(process.argv);

// console.dir(program)
if (!program.runningCommand) {
    let targetStr = 'welcome';

    if (0 === program.args.length) {

    } else {
        targetStr = program.args[0];
    }

    let targetFile = program.file;

    let question = [
        {
            type: 'confirm',
            message: 'target file exists. Continue?',
            name: 'insert',
        }, {
            type: 'list',
            message: 'choice insert type',
            name: 'insertType',
            choices: [
                'head', 'tail', 'cover',
            ],
            when: function (answers) {
                return answers.insert;
            },
        },
    ];

    let option = {};
    if (program.typeface) {
        option.font = program.typeface;
    }

    co(function* () {
        if (undefined !== targetFile) {
            let isExists = yield file.isExists(targetFile);
            targetPath = path.resolve(process.cwd(), targetFile);

            let result = yield colorFiglet.figletSome(targetStr, option);

            if (isExists) {
                let isDir = yield file.isDir(targetPath);
                if (isDir) {
                    console.log('target path is a folder ,please give me a file');
                    return;
                }

              
                let answers = yield inquirer.prompt(question);
                if (answers.insert) {
                    if ('cover' === answers.insertType) {
                      
                        result = colorFiglet.rainbow(result);
                        yield file.save(targetPath, result + os.EOL);
                        console.log('save file success!');
                        return result;
                    } else if ('tail' === answers.insertType) {
                      

                        yield file.appendFile(targetPath, result + os.EOL).catch((err) => {
                            console.log('insert figlet has error!');
                        });
                        console.log('append file success!');
                    } else {
                   
                        yield file.unshiftFile(targetPath, result + os.EOL).catch((err) => {
                            console.log('insert figlet has error!');
                        });
                        console.log('append file success!');
                    }
                } else {
                }
            } else {
               
                result = colorFiglet.rainbow(result);
                file.save(targetPath, result + os.EOL);
                console.log('save file success!');
                return result;
            }
        } else {
            let result = yield colorFiglet.rainbowSome(targetStr, option);
            console.log(result);
        }
    }).then(value => {

    }, err => {
        console.dir(err);
    });
}
