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

import fg from 'fast-glob';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const tokensRoot = path.join(
    __dirname,
    '..',
    'node_modules',
    '@spectrum-css',
    'tokens',
    'dist',
    'css',
    '**',
    '*.css'
);

/** @todo Could generate this from CSS packages that have @spectrum-css/tokens as a dependency */
const tokenPackages = [
    'accordion',
    'actionbutton',
    'avatar',
    'checkbox',
    'button',
    'closebutton',
    'helptext',
    'radio',
    'switch',
    'statuslight',
    'toast',
    'actiongroup',
    'divider',
    'fieldlabel',
    'progresscircle',
    'buttongroup',
    'swatch',
    'swatchgroup',
    'badge',
    'fieldgroup',
    'link',
    'tag',
    'tooltip',
    'tray',
    'progressbar',
    'picker',
    'colorarea',
    'colorwheel',
    'colorhandle',
    'colorloupe',
    'illustratedmessage',
    'slider',
    'popover',
    'thumbnail',
    'dropzone',
    'stepper',
    'textfield',
    'search',
    'tabs',
    'actionbar',
    'pickerbutton',
];

const packagePaths = tokenPackages.map((packageName) => {
    return path.join(
        __dirname,
        '..',
        'node_modules',
        '@spectrum-css',
        packageName,
        'dist',
        'themes'
    );
});

const spectrumThemeSelectorRegExp =
    /(?:\.spectrum(--(?:express|light(?:est)?|dark(?:est)?|medium|large)?,?(\n|\s)*)?)+\s?\{/g;
const importantCommentRegExp = /\/\*![^*]*\*+([^\/*][^*]*\*+)*\//g;

const targetHost = (css) => {
    /** @note Could use this regex to more permissive of class names */
    // return css.replaceAll(/(?:\.spectrum(--[a-z]+,?(\n|\s)*)?)+ \{/g, ':host,\n:root {');

    /**
     * @note ...Or this to lock down expected class names
     *
     * A few helpful regex hints:
     *   (?:...) - non-capturing group
     *   \s - whitespace
     *   \n - newline
     *   (...)? - 0 or 1
     *   \g - global
     **/
    return css.replaceAll(spectrumThemeSelectorRegExp, ':host,\n:root {');
};

const removeImporantComments = (css) => {
    /**
     * Spectrum CSS uses /*! comments that are "not" removable.
     * These comments pile up in merged files, so we _need_ to remove them.
     */
    return css.replaceAll(importantCommentRegExp, '');
};

const processTokens = (srcPath) => {
    let css = fs.readFileSync(srcPath, 'utf8');
    const fileName = srcPath.split(path.sep + 'css' + path.sep).at(-1);
    css = removeImporantComments(targetHost(css));

    fs.writeFileSync(
        path.join(__dirname, '..', 'tools', 'styles', 'tokens', fileName),
        css
    );
};

const processPackages = async (srcPath, index) => {
    const packageName = tokenPackages[index];
    const expressPath = path.join(srcPath, 'express.css');
    const spectrumPath = path.join(srcPath, 'spectrum.css');
    let express = fs.readFileSync(expressPath, 'utf8');
    let spectrum = fs.readFileSync(spectrumPath, 'utf8');
    express = removeImporantComments(targetHost(express));
    spectrum = removeImporantComments(targetHost(spectrum));

    fs.appendFileSync(
        path.join(
            __dirname,
            '..',
            'tools',
            'styles',
            'tokens',
            'express',
            'global-vars.css'
        ),
        express
    );
    fs.appendFileSync(
        path.join(
            __dirname,
            '..',
            'tools',
            'styles',
            'tokens',
            'spectrum',
            'global-vars.css'
        ),
        spectrum
    );

    const varsPaths = path.join(
        __dirname,
        '..',
        'tools',
        'styles',
        '**',
        '*.css'
    );
    const varsRegExp = new RegExp(`\\s*--spectrum-${packageName}[^;}]*;*`, 'g');
    const aliasRegExp = new RegExp(
        `\\s*--spectrum-alias-${packageName}[^;}]*;*`,
        'g'
    );
    const varsWithoutTokens = await fg([varsPaths], {
        ignore: ['**/tokens/**/*.css'],
    });
    for (const varsPath of varsWithoutTokens) {
        let css = fs.readFileSync(varsPath, 'utf8');
        css = css.replaceAll(varsRegExp, '');
        css = css.replaceAll(aliasRegExp, '');
        fs.writeFileSync(varsPath, css);
    }
};

const spectrumTokens = async () => {
    fs.mkdirSync(
        path.join(__dirname, '..', 'tools', 'styles', 'tokens', 'spectrum'),
        {
            recursive: true,
        }
    );
    fs.mkdirSync(
        path.join(__dirname, '..', 'tools', 'styles', 'tokens', 'express'),
        {
            recursive: true,
        }
    );
    for (const tokensPath of await fg([`${tokensRoot}`])) {
        processTokens(tokensPath);
    }
    const processes = packagePaths.map(processPackages);
    await Promise.all(processes);
};

spectrumTokens();
