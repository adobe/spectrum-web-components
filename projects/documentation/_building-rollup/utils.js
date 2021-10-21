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
/* eslint-disable import/no-extraneous-dependencies */
import glob from 'glob';
import fs from 'fs';
import path from 'path';

import merge from 'deepmerge';
import { createScript } from '@open-wc/building-utils';
import { parse, serialize } from 'parse5';
import { append, predicates, query } from '@open-wc/building-utils/dom5-fork';
import Terser from 'terser';

const isFalsy = (_) => !!_;

function dedupedBabelPlugin(babel, userConfig, defaultConfig) {
    if (!userConfig) {
        return undefined;
    }

    const config = merge(
        defaultConfig,
        typeof userConfig === 'object' ? userConfig : {}
    );

    const newPlugins = [];
    const addedPlugins = new Set();
    for (const plugin of [...config.plugins].reverse()) {
        const name = Array.isArray(plugin) ? plugin[0] : plugin;
        const resolvedName = require.resolve(name);
        if (!addedPlugins.has(resolvedName)) {
            addedPlugins.add(resolvedName);
            newPlugins.unshift(plugin);
        }
    }

    config.plugins = newPlugins;
    return babel(config);
}

function pluginWithOptions(plugin, userConfig, defaultConfig, ...otherParams) {
    if (!userConfig) {
        return undefined;
    }

    const config = merge(
        defaultConfig,
        typeof userConfig === 'object' ? userConfig : {}
    );
    return plugin(config, ...otherParams);
}

/**
 * @param {string} htmlString
 * @returns {string}
 */
function applyServiceWorkerRegistration(htmlString) {
    const documentAst = parse(htmlString);
    const body = query(documentAst, predicates.hasTagName('body'));
    const swRegistration = createScript(
        {},
        Terser.minify(`
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker
          .register('./sw.js')
          .then(function() {
            console.log('ServiceWorker registered.');
          })
          .catch(function(err) {
            console.log('ServiceWorker registration failed: ', err);
          });
      });
    }
  `).code
    );

    append(body, swRegistration);
    return serialize(documentAst);
}

/**
 * Lists all files using the specified glob, starting from the given root directory.
 *
 * Will return all matching file paths fully resolved.
 */
function listFiles(fromGlob, rootDir = process.cwd()) {
    return new Promise((resolve) => {
        glob(fromGlob, { cwd: rootDir }, (er, files) => {
            // remember, each filepath returned is relative to rootDir
            resolve(
                files
                    // fully resolve the filename relative to rootDir
                    .map((filePath) => path.resolve(rootDir, filePath))
                    // filter out directories
                    .filter((filePath) => !fs.lstatSync(filePath).isDirectory())
            );
        });
    });
}

export {
    isFalsy,
    pluginWithOptions,
    dedupedBabelPlugin,
    applyServiceWorkerRegistration,
    listFiles,
};
