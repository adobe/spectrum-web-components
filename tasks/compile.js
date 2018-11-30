const cached = require('gulp-cached');
const debug = require('gulp-debug');
const gulp = require('gulp');
const path = require('path');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

const srcPath = path.resolve(path.join(__dirname, '..', 'src'));
const dstPath = path.resolve(path.join(__dirname, '..', 'dist'));

const compile = () => {
    const tsResult = gulp
        .src(path.join(srcPath, '**/*.ts'))
        .pipe(cached('typescript'))
        .pipe(debug({ title: 'typescript' }))
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest(dstPath));
};

const watchCompile = () => {
    return gulp.watch(path.join(srcPath, '**/*.ts'), compile);
};

module.exports = { compile, watchCompile };
