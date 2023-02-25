/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import path from 'path';
import fs from 'fs';
import fg from 'fast-glob';

const excludes = [
    // internal config file
    './src/spectrum-config.js',
    './src/spectrum-config.v2.js',
    './src/~spectrum-config.v2.js',
    // partial only asset the is used to build other exports
    /spectrum-(?![i][c][o][n][-]).+\.css/,
    /\.css$/,
    /\.ts$/,
    /\.map/,
    './src/spectrum-vars.json',
];

/**
 *
 * Convert `exports.json` files into `exports` listings in the relative `package.json` file.
 *
 * - only affects packages with `exports.json` files
 * - sets the following by default
 *  {
 *      '.': {
 *          'development': './src/index.dev.js',
 *          'default': './src/index.js'
 *      },
 *      './package.json': './package.json'
 *  }
 * - explodes wildcards
 * - excludes files in the `excludes` list above
 * - does not expose `development` conditions on `*.css.js` files
 * - saves back into the `package.json` without linting
 *
 */

const hydrateExportMap = async (exportMapPath) => {
    const exportMapSrc = JSON.parse(fs.readFileSync(exportMapPath, 'utf8'));
    const exportMapResolved = {};
    const exportMapExploded = {
        '.': {
            development: './src/index.dev.js',
            default: './src/index.js',
        },
        './package.json': './package.json',
    };
    for (const key in exportMapSrc) {
        if (key.search(/\*/) > -1) {
            // If there is a wildcard in the list, resolve it to all the requires exports.
            // Get the depth between the script location and the package location so that number of
            // directories can be removed from the path set to the map.
            const depth = exportMapPath.split('/').length - 1;
            const blob = path.join(exportMapPath, '..', key);
            for (const fullExportPath of await fg(blob, {
                ignore: ['**/*.dev.js'],
            })) {
                const exportPath =
                    './' +
                    fullExportPath.split(path.sep).splice(depth).join(path.sep);
                if (
                    excludes.some((exclude) => exportPath.search(exclude) > -1)
                ) {
                    // skip excludes
                    continue;
                }
                exportMapResolved[exportPath] = exportPath;
            }
        } else {
            exportMapResolved[key] = exportMapSrc[key];
        }
    }
    for (const key in exportMapResolved) {
        if (
            key.endsWith('.css.js') ||
            exportMapResolved[key].endsWith('.css.js') ||
            (key !== '.' && !key.endsWith('.js'))
        ) {
            // simple map for assets without "development" versions
            exportMapExploded[key] = exportMapResolved[key];
            continue;
        }
        // exploded map for assets with "development" versions
        const exportPath = key === '.' ? exportMapResolved[key] : key;
        exportMapExploded[key] = {
            development: exportPath.replace('.js', '.dev.js'),
            default: exportPath,
        };
    }
    const packageJSONPath = path.join(exportMapPath, '..', 'package.json');
    const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath, 'utf8'));
    packageJSON.exports = exportMapExploded;
    fs.writeFileSync(
        packageJSONPath,
        JSON.stringify(packageJSON, null, '    ') + '\n',
        {
            encoding: 'utf8',
        }
    );
};

const hydrateExportMaps = async () => {
    for (const exportMap of await fg(`./**/exports.json`, {
        ignore: ['**/node_modules/**'],
    })) {
        hydrateExportMap(exportMap);
    }
};

hydrateExportMaps();
