const fs = require('fs'),
  path = require('path'),
  util = require('util'),
  readdir = util.promisify(fs.readdir),
  execSync = require('child_process').execSync;


const applyCommandToFiles = async (srcDir, dstDir, cmdFunc, ext) => {
  const getDstFilePath = (f) => path.join(dstDir, path.basename(f, `.${ext}`) + '.mp3');
  try{ fs.mkdirSync(dstDir); }catch(e){}

  try {
    (await readdir(srcDir))
      .map(f => path.resolve(path.join(srcDir, f)))
      .filter(f => fs.existsSync(f) && fs.statSync(f).isFile() && RegExp(`.*\.${ext}$`).test(f))
      .filter(f => !fs.existsSync(getDstFilePath(f)))
      .map((f) => cmdFunc(f, getDstFilePath(f)))
      .forEach(cmd => { console.log(cmd); execSync(cmd);});
  }catch(e) {
    console.error('error: ' + e)
  }
};

module.exports.applyCommandToFiles = applyCommandToFiles;