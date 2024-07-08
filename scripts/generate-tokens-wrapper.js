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

const tokensRoot = (tokensDir) => {
    return path.join(
        __dirname,
        '..',
        'node_modules',
        '@spectrum-css',
        tokensDir,
        'dist',
        'css',
        '**',
        '*.css'
    );
};

/** @todo Could generate this from CSS packages that have @spectrum-css/tokens as a dependency */
const tokenPackages = [
    'accordion',
    'actionbar',
    'actionbutton',
    'actiongroup',
    'alertbanner',
    'alertdialog',
    'avatar',
    'badge',
    'button',
    'buttongroup',
    'checkbox',
    'closebutton',
    'colorarea',
    'colorhandle',
    'colorloupe',
    'colorwheel',
    'combobox',
    'divider',
    'dropzone',
    'fieldgroup',
    'fieldlabel',
    'helptext',
    'illustratedmessage',
    'infieldbutton',
    'link',
    'menu',
    'picker',
    'pickerbutton',
    'popover',
    'progressbar',
    'progresscircle',
    'radio',
    'search',
    'sidenav',
    'slider',
    'splitview',
    'statuslight',
    'stepper',
    'swatch',
    'swatchgroup',
    'switch',
    'table',
    'tabs',
    'tag',
    'textfield',
    'thumbnail',
    'toast',
    'tooltip',
    'tray',
    'underlay',
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

const processTokens = (srcPath, tokensDir) => {
    let css = fs.readFileSync(srcPath, 'utf8');
    const fileName = srcPath.split(path.sep + 'css' + path.sep).at(-1);
    css = removeImporantComments(targetHost(css));

    // s2 doesn't need express tokens
    if (tokensDir === 'tokens-v2' && fileName.startsWith('express')) {
        return;
    }

    try {
        fs.writeFileSync(
            path.join(__dirname, '..', 'tools', 'styles', tokensDir, fileName),
            css
        );
    } catch (er) {}
};

const processPackages = async (tokensDir, index) => {
    const packagename = tokenPackages[index];

    let componentLevelTokensPath = path.join(
        __dirname,
        '..',
        'node_modules',
        '@spectrum-css',
        tokensDir,
        'dist',
        'css',
        'components'
    );
    const spectrumPath = path.join(
        componentLevelTokensPath,
        'spectrum',
        packagename + '.css'
    );
    // check if spectrumPath exists
    if (fs.existsSync(spectrumPath)) {
        let spectrum = fs.readFileSync(spectrumPath, 'utf8');
        spectrum = removeImporantComments(targetHost(spectrum));
        fs.appendFileSync(
            path.join(
                __dirname,
                '..',
                'tools',
                'styles',
                tokensDir,
                'spectrum',
                'global-vars.css'
            ),
            spectrum
        );
    }

    // s2 doesn't need express tokens
    if (tokensDir === 'tokens-v2') {
        return;
    }

    const expressPath = path.join(
        componentLevelTokensPath,
        'express',
        packagename + '.css'
    );

    // check if expressPath exists
    if (fs.existsSync(expressPath)) {
        let express = fs.readFileSync(expressPath, 'utf8');
        express = removeImporantComments(targetHost(express));
        fs.appendFileSync(
            path.join(
                __dirname,
                '..',
                'tools',
                'styles',
                tokensDir,
                'express',
                'global-vars.css'
            ),
            express
        );
    }
};

/**
 * Core entry function
 */
export async function generateTokensWrapper(spectrumVersion) {
    const tokensDir = spectrumVersion === 'spectrum' ? 'tokens' : 'tokens-v2';
    fs.mkdirSync(
        path.join(__dirname, '..', 'tools', 'styles', tokensDir, 'spectrum'),
        {
            recursive: true,
        }
    );

    if (spectrumVersion === 'spectrum') {
        fs.mkdirSync(
            path.join(__dirname, '..', 'tools', 'styles', tokensDir, 'express'),
            {
                recursive: true,
            }
        );
    }

    fs.writeFileSync(
        path.join(
            __dirname,
            '..',
            'tools',
            'styles',
            tokensDir,
            'spectrum',
            'global-vars.css'
        ),
        ''
    );

    for (const tokensPath of await fg([`${tokensRoot(tokensDir)}`])) {
        processTokens(tokensPath, tokensDir);
    }

    const processes = packagePaths.map((path, index) => {
        return processPackages(tokensDir, index);
    });
    await Promise.all(processes);
}
