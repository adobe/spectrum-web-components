#!/usr/bin/env node

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

const esModuleMiddleware = require('@adobe/es-modules-middleware');
const express = require('express');
const browserSync = require('browser-sync');
const serveIndex = require('serve-index');

const rootPath = path.resolve(path.join(__dirname, '..'));

const app = express();
const port = 4000;

// @TODO: Make browsersync optional

// setup browser sync to watch for change and trigger live reload
const bs = browserSync.create();
bs.watch([
    path.join(rootPath, 'lib/**/*.js'), // compiled js files
]).on('change', bs.reload);
bs.init({ logSnippet: false });

// setup express to use the browsersync middleware and inject the script tag
app.use(require('connect-browser-sync')(bs));

// statically serve the assets in src folder (for demo pages etc)
app.use(express.static('src'));
// generate browsable index pages from src folder
app.use(serveIndex(rootPath + '/src', { icons: true }));

// NOTE: Because we are using ES-module imports and are not bundling our code
// with a bundler like webpack or rollup, we have to handle the imports that
// are to be resolved from the node_modules folder.

// The browser does not like these paths since they are bare module specifiers and
// not valid urls to modules as the browser expects.

// So we use the es-modules-middleware middleware to rewrite our import and export
// statements in our modules to point to the node_modules folder.

// serve the compiled modules from lib folder
app.use(
    esModuleMiddleware.middleware({
        paths: {
            '/': path.resolve(path.join(rootPath, 'lib')),
            '/styles': path.resolve(path.join(rootPath, 'styles')),
            '/node_modules': path.resolve(path.join(rootPath, 'node_modules')),
            '/src': path.resolve(path.join(rootPath, 'src')), // serve source files for sourcemaps
        },
    })
);

app.listen(port, '0.0.0.0', () =>
    console.log(`
=====================================================================
Dev server listening at http://localhost:${port}/
=====================================================================
`)
);
