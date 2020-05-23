#!/usr/bin/env node

const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

function copy(source) {
    const indexJSDir = path.resolve(
        __dirname,
        '..',
        '_site',
        'src',
        'index.js'
    );
    const sourceFile = fs.readFileSync(source);
    const destinationPath = source.replace('src', '_site/src');
    if (
        fs.existsSync(path.resolve(__dirname, '..', '_site')) &&
        fs.existsSync(path.resolve(__dirname, '..', '_site', 'src')) &&
        fs.existsSync(indexJSDir)
    ) {
        const indexJSSource = fs.readFileSync(indexJSDir);
        fs.writeFileSync(destinationPath, sourceFile);
        fs.writeFileSync(indexJSDir, indexJSSource);
    }
}

// One-liner for current directory
chokidar.watch('src/**/*.css').on('change', copy).on('add', copy);

console.log('Listening to CSS...');
