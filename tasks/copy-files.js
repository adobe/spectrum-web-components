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

const gulp = require('gulp');
const cached = require('gulp-cached');
const debug = require('gulp-debug');

const srcPath = path.resolve(path.join(__dirname, '..', 'src'));
const dstPath = path.resolve(path.join(__dirname, '..', 'dist'));

const copyFiles = () => {
    return (
        gulp
            // copy files that are not typescript or css files since they're handled by other tasks
            .src(path.join(srcPath, '**/!(*.ts|*.css)'))
            // keep a cache of copied files so we don't recopy unnecessarily
            .pipe(cached('copy'))
            .pipe(debug({ title: 'copy' }))
            .pipe(gulp.dest(dstPath))
    );
};

const watchCopyFiles = () => {
    return gulp.watch(path.join(srcPath, '**/!(*.ts|*.css)'), copyFiles);
};

module.exports = { copyFiles, watchCopyFiles };
