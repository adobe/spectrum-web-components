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
const gulp = require('gulp');
const license = require('gulp-license-check');
const path = require('path');

const srcPath = path.resolve(path.join(__dirname, '..', 'src'));
const licensePath = path.resolve(
    path.join(__dirname, '..', 'config', 'license.js')
);

const checkCSS = () => {
    return gulp.src(path.join(srcPath, '**/*.css')).pipe(
        license({
            path: licensePath,
            blocking: true,
            logInfo: false,
            logError: true,
        })
    );
};
const checkTS = () => {
    return gulp.src(path.join(srcPath, '**/*.ts')).pipe(
        license({
            path: licensePath,
            blocking: true,
            logInfo: false,
            logError: true,
        })
    );
};
const checkJS = () => {
    return gulp.src(path.join(srcPath, '**/*.js')).pipe(
        license({
            path: licensePath,
            blocking: true,
            logInfo: false,
            logError: true,
        })
    );
};

const checkLicenseNotices = gulp.parallel(checkCSS, checkJS, checkTS);

module.exports = { checkLicenseNotices };
