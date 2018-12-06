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

// import the tasks
const { buildCSS, watchBuildCSS } = require('./tasks/build-css');
const { compile, watchCompile } = require('./tasks/compile');
const { copyFiles, watchCopyFiles } = require('./tasks/copy-files');
const { checkLicenseNotices } = require('./tasks/check-license-notices');

// default is to compile, build and copy
const defaultTasks = gulp.parallel(compile, buildCSS, copyFiles);
// watch variations of default task
const watchTasks = gulp.parallel(watchCompile, watchBuildCSS, watchCopyFiles);

exports.licenses = checkLicenseNotices;
exports.default = defaultTasks;
exports.watch = watchTasks;
