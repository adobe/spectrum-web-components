#!/usr/bin/env node

const path = require('path');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const wrap = require('gulp-wrap');
const rename = require('gulp-rename');

const srcPath = path.resolve(path.join(__dirname, '..', 'src'));
const dstPath = path.resolve(path.join(__dirname, '..', 'dist'));

gulp.src(path.join(srcPath, '**/*.css'))
    // process with postcss
    .pipe(
        postcss([
            // inline imports since we can't resolve paths from within web components
            require('postcss-import'),
            // minify the css with cssnano presets
            require('cssnano')({ preset: 'default' }),
        ])
    )
    // output processed css files to destination folder
    .pipe(gulp.dest(dstPath))
    // now wrap the css files in ES-modules for easy import in javascript
    .pipe(
        wrap(
            // this is lodash template syntax to output an ES-module export of our CSS as a string
            'export default /* css */ `\n<%= contents %>\n`;',
            {},
            { parse: false }
        )
    )
    // rename the wrapped css to javascript files
    .pipe(
        rename((path) => {
            path.extname = '.css.js';
        })
    )
    // and write them to the destination folder
    .pipe(gulp.dest(dstPath));
