#!/usr/bin/env node

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

const esModuleMiddleware = require('@adobe/es-modules-middleware');
const express = require('express');
const browserSync = require('browser-sync');
const serveIndex = require('serve-index');

const DIST_FOLDER = 'src';
const rootPath = path.resolve(path.join(__dirname, '..'));

const app = express();
const port = 4000;

// @TODO: Make browsersync optional

// setup browser sync to watch for change and trigger live reload
const bs = browserSync.create();
bs.watch(path.join(rootPath, 'src/**/(*.html|*.css|*.js)')).on(
    'change',
    bs.reload
);
bs.init({ logSnippet: false });

// setup express to use the browsersync middleware and inject the script tag
app.use(require('connect-browser-sync')(bs));

// generate browsable index pages
app.use(serveIndex(rootPath, { icons: true }));

// NOTE: Because we are using ES-module imports and are not bundling our code
// with a bundler like webpack or rollup, we have to handle the imports that
// are to be resolved from the node_modules folder.

// The browser does not like these paths since they are bare module specifiers and
// not valid urls to modules as the browser expects.

// So we use the es-modules-middleware middleware to rewrite our import and export
// statements in our modules to point to the node_modules folder.
app.use(esModuleMiddleware.middleware(rootPath));

app.listen(port, () =>
    console.log(`
=====================================================================
Dev server listening at http://localhost:${port}/${DIST_FOLDER}/
=====================================================================
`)
);
