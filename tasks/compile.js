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

const gulp = require('gulp');
const cached = require('gulp-cached');
const debug = require('gulp-debug');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const merge = require('merge2');

const tsProject = ts.createProject('tsconfig.json');

const srcPath = path.resolve(path.join(__dirname, '..'));
const dstPath = path.resolve(path.join(__dirname, '..', 'lib'));

const compile = () => {
    const tsResult = merge([
        gulp.src(['./src/**/*.ts'], { base: path.join(srcPath, 'src') }),
        gulp.src(['./styles/**/*.ts'], { base: srcPath }),
    ])
        .pipe(cached('typescript'))
        .pipe(debug({ title: 'typescript' }))
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return merge(
        tsResult.js
            .pipe(
                sourcemaps.write('.', {
                    includeContent: true,
                })
            )
            .pipe(gulp.dest(dstPath)),
        tsResult.dts.pipe(gulp.dest(dstPath))
    );
};

const watchCompile = () => {
    return gulp.watch(path.join(srcPath, '**/*.ts'), compile);
};

module.exports = { compile, watchCompile };
