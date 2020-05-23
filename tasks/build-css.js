/*
Copyright 2020 Adobe. All rights reserved.
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
const merge = require('merge2');
const tap = require('gulp-tap');

const srcPath = path.resolve(path.join(__dirname, '..', 'packages'));

function whichDst(file, t) {
    const dirname = path.dirname(file.path);
    const component = dirname.split('packages/')[1].split('/')[0];
    const name = file.relative.split('/')[2];
    const base = file.base;
    file.path = path.join(base, name);
    t.through(gulp.dest, ['packages/' + component + '/src/']);
}
const configPath = path.resolve(path.join(__dirname, '..', 'config'));

const { postCSSPlugins, wrapCSSResult } = require('../scripts/css-processing');

const buildCSS = () => {
    const tsResult = merge([
        gulp.src([
            './packages/**/src/*.css',
            '!./packages/**/node_modules/**/*.css',
        ]),
    ])
        // create in-memory cache of css files so we don't reprocess everything all the time
        .pipe(cached('css'))
        .pipe(debug({ title: 'css' }))
        // process with postcss
        .pipe(postcss(postCSSPlugins()))
        // now wrap the css files in ES-modules for easy import in typescript
        .pipe(
            wrap((data) => wrapCSSResult(data.contents), {}, { parse: false })
        )
        // add license header to top of typescript file
        .pipe(
            header(
                fs.readFileSync(path.join(configPath, 'license.js'), 'utf8'),
                false
            )
        )
        // rename the wrapped css to typescript files
        .pipe(
            rename((path) => {
                path.extname = '.css.ts';
            })
        );

    // compile the ts to js
    return tsResult.pipe(tap(whichDst));
};
const watchBuildCSS = () => {
    return gulp.watch(path.join(srcPath, '**/*.css'), buildCSS);
};

module.exports = { buildCSS, watchBuildCSS };
