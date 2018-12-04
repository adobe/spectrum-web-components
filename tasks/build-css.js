/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const path = require('path');
const fs = require('fs');

const gulp = require('gulp');
const cached = require('gulp-cached');
const debug = require('gulp-debug');
const header = require('gulp-header');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const wrap = require('gulp-wrap');

const srcPath = path.resolve(path.join(__dirname, '..', 'src'));
const dstPath = path.resolve(path.join(__dirname, '..', 'dist'));
const configPath = path.resolve(path.join(__dirname, '..', 'config'));

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
            // add license header to top of JS file
            .pipe(
                header(
                    fs.readFileSync(
                        path.join(configPath, 'license.js'),
                        'utf8'
                    ),
                    false
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
