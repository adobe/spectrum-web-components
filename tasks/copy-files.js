const cached = require('gulp-cached');
const debug = require('gulp-debug');
const gulp = require('gulp');
const path = require('path');

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
