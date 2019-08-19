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
const gulp = require('gulp');

// import the tasks
const { buildCSS, watchBuildCSS } = require('./tasks/build-css');
const { compile, watchCompile } = require('./tasks/compile');
const { docsCompile, docsWatchCompile } = require('./tasks/documentation');

// default is to compile, build and copy
const defaultTasks = gulp.series(buildCSS, compile);
// watch variations of default task
const watchTasks = gulp.parallel(watchCompile, watchBuildCSS);

exports.default = defaultTasks;
exports.watch = watchTasks;
exports.docsCompile = docsCompile;
exports.docsWatchCompile = docsWatchCompile;
