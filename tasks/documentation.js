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
const path = require('path');
const { exec } = require('child_process');
const PluginError = require('plugin-error');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server/lib/Server');
const webpackConfig = require('../documentation/webpack.config');

const projectDir = path.dirname(__dirname);
const srcPath = path.join(projectDir, 'src');

const extractComponentDocumentation = () => {
    return exec(
        `node "${path.join(
            projectDir,
            'documentation/scripts/extractComponentAPIDocs.js'
        )}"`
    );
};

const watchComponentDocumentation = () => {
    gulp.watch(
        path.join(srcPath, '**/*.ts'),
        { ignoreInitial: false },
        extractComponentDocumentation
    );
};

const webpackDevServer = () => {
    const config = Object.assign({ mode: 'development' }, webpackConfig);
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer).listen(
        config.devServer.port,
        'localhost',
        (error) => {
            if (error) {
                throw new PluginError('webpack-dev-server', error);
            }
        }
    );
};

const webpackBuild = () => {
    const config = Object.assign({ mode: 'production' }, webpackConfig);
    return new Promise((resolve, reject) => {
        webpack(config, (errors, stats) => {
            if (errors) {
                console.log('Webpack', errors);
            }
            resolve();
        });
    });
};

module.exports = {
    docsCompile: gulp.series(extractComponentDocumentation, webpackBuild),
    docsWatchCompile: gulp.parallel(
        watchComponentDocumentation,
        webpackDevServer
    ),
};
