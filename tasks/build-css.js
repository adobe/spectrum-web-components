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
const stripIndent = require('common-tags').stripIndents;

const srcPath = path.resolve(path.join(__dirname, '..'));
const configPath = path.resolve(path.join(__dirname, '..', 'config'));

const buildCSS = () => {
    return (
        gulp
            .src(['./lib/**/*.css', './styles/*.css', './styles/**/*.css'], {
                base: srcPath,
            })
            // create in-memory cache of css files so we don't reprocess everything all the time
            .pipe(cached('css'))
            .pipe(debug({ title: 'css' }))
            // process with postcss
            .pipe(
                postcss([
                    // inline imports since we can't resolve paths from within web components
                    require('postcss-import'),
                    require('postcss-inherit'),
                    require('postcss-preset-env')({
                        stage: 0,
                        browsers: [
                            'last 2 Chrome versions',
                            'Firefox >= 63',
                            'Safari >= 10.1',
                        ],
                    }),
                    // minify the css with cssnano presets
                    require('cssnano')({ preset: 'default' }),
                ])
            )
            // now wrap the css files in ES-modules for easy import in typescript
            .pipe(
                wrap(
                    // this is lodash template syntax to output an ES-module export of our CSS as a string
                    stripIndent`import { css } from 'lit-element';
                    export default css\`
                        <%= contents %>
                    \`;`,
                    {},
                    { parse: false }
                )
            )
            // add license header to top of typescript file
            .pipe(
                header(
                    fs.readFileSync(
                        path.join(configPath, 'license.js'),
                        'utf8'
                    ),
                    false
                )
            )
            // rename the wrapped css to typescript files
            .pipe(
                rename((path) => {
                    path.extname = '.css.ts';
                })
            )
            // and write them back out
            .pipe(gulp.dest(srcPath))
    );
};
const watchBuildCSS = () => {
    return gulp.watch(path.join(srcPath, '**/*.css'), buildCSS);
};

module.exports = { buildCSS, watchBuildCSS };
