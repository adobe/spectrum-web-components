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

// A loader to convert css into a Typescript module that
// exports a default CSSResult containing the compiled CSS

const path = require('path');
const { wrapCSSResult } = require('../scripts/css-processing.cjs');

const filenameToOutputFilename = (filename) => {
    const dirName = path.dirname(filename);
    const baseName = path.basename(filename);
    return path.join(dirName, `${baseName}.ts`);
};

const loaderUtils = require('loader-utils');

module.exports = function loader(content, ...rest) {
    const filename = this.resourcePath;
    const outputFilename = filenameToOutputFilename(filename);
    // wrap the file in css literal
    const code = wrapCSSResult(content);
    return code;
};
