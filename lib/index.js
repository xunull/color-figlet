const co = require('co');
const figlet = require('./figlet');
const rainbow = require('./rainbow');

module.exports = {
    * rainbowSome(data, option) {
        const result = yield figlet.genereateOne(data, option);
        return rainbow(result);
    },
    figlet,
    rainbow,
    * figletSome(data, option) {
        const result = yield figlet.genereateOne(data, option);
        return result;
    },
};

