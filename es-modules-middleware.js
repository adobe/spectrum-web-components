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
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const resolve = require('resolve');

function resolvePath(root, filepath, url) {
    try {
        // ignore full urls
        new URL(url);
        return url;
    } catch (e) {}
    try {
        const resolvedPath = require.resolve(url);
        const result = path.relative(path.dirname(filepath), resolvedPath);
        const rewrittenPath = result.startsWith('.') ? result : './' + result;
        return rewrittenPath;
    } catch (e) {}
    return url;
}

function transformJs(root, filepath, src) {
    return src
        .replace(
            /import\s+(|[\{\*\w][^"']*)["']([^"']+)["'][\t ]*($|;|\/\/|\/\*)/gm,
            (match, pre, url, post) =>
                `import ${pre}'${resolvePath(root, filepath, url)}'${post}`
        )
        .replace(
            /export\s+([\{\*\w][^"']*)\s*from\s*["']([^"']+)["'][\t ]*($|;|\/\/|\/\*)/gm,
            (match, pre, url, post) =>
                `export ${pre} from '${resolvePath(
                    root,
                    filepath,
                    url
                )}'${post}`
        );
}

const EsModulesMiddlewareFactory = function(basePath, config) {
    const root = __dirname;
    return function(req, res, next) {
        // we want to ignore anything thats karma specific, all user content is under /base
        if (
            !req.url.startsWith('/base/') &&
            !req.url.startsWith('/node_modules/')
        ) {
            return next();
        }
        let requestedPath = req.originalUrl;
        let filePath = req.originalUrl;
        if (requestedPath.startsWith('/base/')) {
            requestedPath = requestedPath.slice('/base/'.length);
            filepath = path.resolve(basePath, requestedPath);
        } else if (requestedPath.startsWith('/node_modules/')) {
            requestedPath = path.resolve(path.join(root, requestedPath));
            filepath = requestedPath;
        }
        // if there's no path, do nothing
        if (requestedPath.length < 1) {
            return next();
        }
        if (fs.existsSync(filepath)) {
            const filetype =
                mime.getType(filepath) || 'application/octet-stream';
            res.setHeader('Content-Type', filetype);
            if (
                filetype.startsWith('text/javascript') ||
                filetype.startsWith('application/javascript')
            ) {
                const content = fs.readFileSync(filepath, {
                    encoding: 'utf-8',
                });
                return res.end(transformJs(root, filepath, content), 'utf-8');
            } else {
                const content = fs.readFileSync(filepath);
                return res.end(content);
            }
        }
        next();
    };
};

EsModulesMiddlewareFactory.$inject = ['config.basePath', 'config.esModules'];
module.exports = {
    'middleware:es-modules': ['factory', EsModulesMiddlewareFactory],
};
