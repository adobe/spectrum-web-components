#!/usr/bin/env node
const path = require('path');

const esModuleDevserver = require('es-module-devserver');
const express = require('express');
const browserSync = require('browser-sync');
const serveIndex = require('serve-index');

const DIST_FOLDER = 'dist';
const rootPath = path.resolve(path.join(__dirname, '..', DIST_FOLDER, '..'));

const app = express();
const port = 3000;

// TODO: Make browsersync optional

// setup browser sync to watch for change and trigger live reload
const bs = browserSync.create();
bs.watch(path.join(rootPath, '**/*.html')).on('change', bs.reload);
bs.watch(path.join(rootPath, '**/*.css')).on('change', bs.reload);
bs.watch(path.join(rootPath, '**/*.js')).on('change', bs.reload);
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

// So we use the esModuleDevserver middleware to rewrite our import and export
// statements in our modules to point to the node_modules folder.
app.use(esModuleDevserver.middleware(rootPath));

app.listen(port, () =>
    console.log(
        `Dev server listening at http://localhost:${port}/${DIST_FOLDER}/`
    )
);
