const figlet = require('figlet');
const _ = require('lodash');

let fonts = [];

let allOptions = [];

const horizontals = ['default', 'full', 'fitted', 'controlled smushing', 'universal smushing'];
const verticals = ['default', 'full', 'fitted', 'controlled smushing', 'universal smushing'];


let fontCount = 0;

(function init() {
    fonts = figlet.fontsSync();
    fontCount = fonts.length;

    for (const font of fonts) {
        allOptions = allOptions.concat(getSomeOption(font));
    }

})()


const defaultOption = {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default',
};

function wrapText(data, options, callback) {
    let result = {};
    let counter = 0;
    for (const option of options) {
        figlet.text(data, option, function (err, data) {

            let key_name = ''.concat(option.font, '-', option.horizontalLayout, '-', option.verticalLayout)

            if (err) {
                result[key_name] = `sorry,get ${key_name} has error!`;
            } else {
                result[key_name] = data;
            }
            counter += 1;
            if (counter === options.length) {
                callback(result);
            }
        });
    }
}


function getSomeOption(font_name, type_name) {
    let result = []
    if ('horizontalLayout' === type_name) {
        for (let temp of horizontals) {
            result.push({
                font: font_name,
                verticalLayout: 'default',
                horizontalLayout: temp
            })
        }
    } else if ('verticalLayout' === type_name) {
        for (let temp of verticals) {
            result.push({
                font: font_name,
                verticalLayout: temp,
                horizontalLayout: 'default'
            })
        }
    } else if ('default' === type_name) {

    } else {
        for (let h of horizontals) {
            let obj = {
                font: font_name,
                verticalLayout: undefined,
                horizontalLayout: h
            }
            for (let v of verticals) {
                obj.verticalLayout = v
                result.push(obj)
            }

        }
    }

    return result
}

function getFontNames() {
    return new Promise((resolve, reject) => {
        figlet.fonts((err, fonts) => {
            if (err) {
                console.log('get fonts has error');
                console.dir(err);
                reject(err);
            } else {
                resolve(fonts);
            }
        });
    });
}

function generateAll(data, callback) {
    if (undefined !== callback) {
        wrapText(data, allOptions, function (result) {
            callback(result)
        })
    } else {
        return new Promise((resolve, reject) => {
            wrapText(data, allOptions, function (result) {
                resolve(result);
            });
        });
    }
}

function genereateSomeFontAllHorizontal(data, font, callback) {
    let options = getSomeOption(font, 'horizontalLayout');
    if (undefined !== callback) {
        wrapText(data, options, function (result) {
            callback(result);
        })
    } else {
        return new Promise((resolve, reject) => {
            wrapText(data, options, function (result) {
                resolve(result);
            });
        });
    }
}

function genereateSomeFontAllVertical(data, font, callback) {
    let options = getSomeOption(font, 'verticalLayout')
    if (undefined !== callback) {
        wrapText(data, options, function (result) {
            callback(result);
        });
    } else {
        return new Promise((resolve, reject) => {
            wrapText(data, options, function (result) {
                resolve(result);
            });
        });
    }
}

function genereateAllFontsDeault(data, callback) {
    let result = {};
    let counter = 0;
    let options = [];

    for (let font of fonts) {
        let option = _.clone(defaultOption);
        option.font = font;
        options.push(option);
    }

    if (undefined !== callback) {
        wrapText(data, options, function (result) {
            callback(result);
        });
    } else {
        return new Promise((resolve, reject) => {
            wrapText(data, options, function (result) {
                resolve(result);
            });
        });
    }
}



function genereateOne(data, { font, horizontalLayout, verticalLayout } = defaultOption, callback) {

    var { font,
        horizontalLayout,
        verticalLayout } = _.defaults({
            font,
            horizontalLayout,
            verticalLayout
        }, defaultOption)

    if (undefined !== callback) {

        figlet.text(data, { font, horizontalLayout, verticalLayout }, function (err, data) {
            if (err) {
                console.log('get font has error');
                console.dir(err);
                callback(err);
            } else {
                callback(null, data);
            }
        });
    } else {
        return new Promise((resolve, reject) => {
            figlet.text(data, { font, horizontalLayout, verticalLayout }, function (err, data) {
                if (err) {
                    console.log('get font has error');
                    console.dir(err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}

module.exports = {
    fonts,

    fontCount,
  
    getFontNames,
  
    generateAll,
   
    genereateSomeFontAllHorizontal,
   
    genereateSomeFontAllVertical,
   
    genereateAllFontsDeault,
    genereateOne,
};

