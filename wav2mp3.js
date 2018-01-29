const fs = require('fs'),
  path = require('path'),
  util = require('util'),
  readdir = util.promisify(fs.readdir),
  execSync = require('child_process').execSync,
  srcDir = process.argv[2] || '.',
  dstDir = process.argv[3] || 'mp3';

try{ fs.mkdirSync(dstDir); }catch(e){}

const getDstFilePath = (f) => path.join(dstDir, path.basename(f, '.wav') + '.mp3');

const main = async () => {
  try {
    (await readdir(srcDir))
      .map(f => path.resolve(path.join(srcDir, f)))
      .filter(f => fs.existsSync(f) && fs.statSync(f).isFile() && /.*\.wav$/.test(f))
      .filter(f => !fs.existsSync(getDstFilePath(f)))
      .map(f => `lame --preset extreme '${f}' '${getDstFilePath(f)}'`)
      .forEach(cmd => { console.log(cmd); execSync(cmd);});
  }catch(e) {
    console.error('error: ' + e)
  }
};

main();
