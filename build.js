var fs = require('fs');
var archiver = require('archiver');
var pjson = require('./package.json');

if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

var output = fs.createWriteStream(`dist/${pjson.name}.zip`);
var archive = archiver('zip');

output.on('close', () => {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', (err) => {
    throw err;
});

archive.pipe(output);
archive.directory('src/', false);

archive.finalize();