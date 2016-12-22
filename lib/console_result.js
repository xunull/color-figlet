const Table = require('cli-table');

function consoleObjResult(result) {
    const keys = Object.keys(result);
    const table = new Table({
        head: [result],
    });
    for (const key of keys) {
        // console.log(key)
        // console.log(result[key])
        // let table = new Table({
        // 	head:[key]
        // })
        // table.push([result[key]])
        //
        // console.log(table.toString())

        const temp = {};
        temp[key] = result[key];
        table.push(temp);
    }
    console.log(table.toString());
}

function consoleObjResultSingle(result) {
    const keys = Object.keys(result);
    for (const key of keys) {
        const table = new Table({
            head: [key],
        });
        table.push([result[key]]);

        console.log(table.toString());
    }
}

module.exports = {
    consoleObjResult,
    consoleObjResultSingle,
};
