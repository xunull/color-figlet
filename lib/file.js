const path = require('path');
const fs = require('fs');


function isExists(_path) {
    return new Promise((resolve, reject) => {
        fs.access(_path, fs.constants.F_OK, (err) => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function save(_path, data, option) {
    return new Promise((resolve, reject) => {
        fs.writeFile(_path, data, err => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}

function appendFile(_path, data, option) {
    return new Promise((resolve, reject) => {
        fs.appendFile(_path, data, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}

function unshiftFile(_path, data) {
    return new Promise((resolve, reject) => {
        fs.readFile(_path, 'utf8', function (err, originalData) {
            if (err) {
                reject(err);
            } else {
                fs.writeFile(_path, data, err => {
                    if (err) {
                        reject(err);
                    } else {
                        fs.appendFile(_path, originalData, function (err) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(true);
                            }
                        });
                    }
                });
            }
        });
    });
}

function* isDir(_path) {
    const stats = yield exports.stat(_path);
    return stats.isDirectory();
}

function stat(_path) {
    return new Promise((resolve, reject) => {
        fs.stat(_path, (err, stats) => {
            if (err) {
                reject(err);
            } else {
                resolve(stats);
            }
        });
    });
}

module.exports = {
    isExists,
    save,
    appendFile,
    unshiftFile,
    isDir,
    stat,
};
