#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');

const srcPath = path.join('src');
const dstPath = 'dist';

fs.copySync(srcPath, dstPath, {
    overwrite: true,
    filter: (src, dest) => {
        // skip typescript files since we compile these to js
        // also skip css files since we output those with postcss to destination folder
        return !src.endsWith('.ts') && !src.endsWith('.css');
    },
});
