#!/usr/bin/env node



const program = require('commander');
const colorFiglet = require('../lib');
const co = require('co');

program
    .usage('');


program.on('--help', function() {
  console.log('  Examples:');
});

program.parse(process.argv);

co(function* () {
    let result = yield colorFiglet.figlet.getFontNames();
    let temp='';
    result.forEach(function(name,index){
        if((index+1)%8===0) {
            temp=temp.concat('  "', name, '"');
            console.log(temp);
            temp='';
        } else {
            temp=temp.concat('  "', name, '"');
        }
    });
});

