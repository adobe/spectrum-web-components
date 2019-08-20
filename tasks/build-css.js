/*
Copyright 2019 Adobe. All rights reserved.
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

const stripIndent = require('common-tags').stripIndents;

const srcPath = path.resolve(path.join(__dirname, '..'));
const dstPath = path.resolve(path.join(__dirname, '..', 'lib'));
const configPath = path.resolve(path.join(__dirname, '..', 'config'));

const { postCSSPlugins, wrapCSSResult } = require('../scripts/css-processing');

const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

const buildCSS = () => {
    const tsResult = merge([
        gulp.src(['./src/**/*.css'], { base: './src' }),
        gulp.src(['./styles/*.css', './styles/**/*.css'], {
            base: '.',
        }),
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
        )
        // feed to the typescript project
        .pipe(tsProject());

    // compile the ts to js
    return merge(
        tsResult.js.pipe(gulp.dest(dstPath)),
        tsResult.dts.pipe(gulp.dest(dstPath))
    );
};
const watchBuildCSS = () => {
    return gulp.watch(path.join(srcPath, '**/*.css'), buildCSS);
};

module.exports = { buildCSS, watchBuildCSS };
