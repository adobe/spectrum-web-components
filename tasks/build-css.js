const cached = require('gulp-cached');
const debug = require('gulp-debug');
const gulp = require('gulp');
const path = require('path');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const wrap = require('gulp-wrap');

const srcPath = path.resolve(path.join(__dirname, '..', 'src'));
const dstPath = path.resolve(path.join(__dirname, '..', 'dist'));

const buildCSS = () => {
    return (
        gulp
            .src(path.join(srcPath, '**/*.css'))
            // create in-memory cache of css files so we don't reprocess everything all the time
            .pipe(cached('css'))
            .pipe(debug({ title: 'css' }))
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
            .pipe(gulp.dest(dstPath))
    );
};
const watchBuildCSS = () => {
    return gulp.watch(path.join(srcPath, '**/*.css'), buildCSS);
};

module.exports = { buildCSS, watchBuildCSS };
