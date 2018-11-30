const gulp = require('gulp');

// import the tasks
const { buildCSS, watchBuildCSS } = require('./tasks/build-css');
const { compile, watchCompile } = require('./tasks/compile');
const { copyFiles, watchCopyFiles } = require('./tasks/copy-files');

// default is to compile, build and copy
const defaultTasks = gulp.parallel(compile, buildCSS, copyFiles);
// watch variations of default task
const watchTasks = gulp.parallel(watchCompile, watchBuildCSS, watchCopyFiles);

exports.default = defaultTasks;
exports.watch = watchTasks;
