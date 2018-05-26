#!/usr/bin/env node

const srcDir = process.argv[2] || '.';
const dstDir = process.argv[3] || 'mp3';
const ext = process.argv[4] || 'wav';

const mconv = require('./util');

const cmdFuncClojure =
  (src, dst) => `ffmpeg -i "${src}" -vn -ac 2 -ar 44100 -ab 256k -acodec libmp3lame -f mp3 "${dst}"`;

mconv.applyCommandToFiles(srcDir, dstDir, cmdFuncClojure, ext);