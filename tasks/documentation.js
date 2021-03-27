/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import gulp from 'gulp';
import path from 'path';
import fs from 'fs-extra';
import { exec } from 'child_process';
import PluginError from 'plugin-error';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server/lib/Server.js';
import webpackConfig from '../documentation/webpack.config.js';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectDir = path.dirname(__dirname);

const BASE_URL = 'https://opensource.adobe.com/spectrum-web-components/';

const buildSearchIndex = () => {
    return exec(
        `node "${path.join(
            projectDir,
            'documentation/scripts/buildSearchIndex.js'
        )}"`
    );
};

const webpackDevServer = () => {
    const config = Object.assign(webpackConfig, { mode: 'development' });
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

const webpackBuild = (baseUrl) => async () => {
    await new Promise((resolve, reject) => {
        webpack(webpackConfig, (errors, stats) => {
            if (errors) {
                console.log('Webpack', errors);
            }
            resolve();
        });
    });
    const indexPath = path.join(projectDir, 'documentation/dist/index.html');
    let indexHtml = await fs.readFile(indexPath, {
        encoding: 'utf8',
    });
    indexHtml = indexHtml.replace(
        '<base href="/">',
        `<base href="${baseUrl}">`
    );
    return fs.writeFile(indexPath, indexHtml, {
        encoding: 'utf8',
    });
};

const docsBuildProduction = gulp.series(
    buildSearchIndex,
    webpackBuild(BASE_URL)
);
const docsBuildStaging = gulp.series(buildSearchIndex, webpackBuild('/'));
const docsWatchCompile = gulp.series(buildSearchIndex, webpackDevServer);

export {
    buildSearchIndex,
    docsBuildProduction,
    docsBuildStaging,
    docsWatchCompile,
    webpackBuild,
};
