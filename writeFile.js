module.exports = writeFile;

var fs = require('fs');

function writeFile(value) {
    fs.writeFile('test.json', JSON.stringify(value), function (err) {
        if (err) return console.log(err);
    });
    return;
}