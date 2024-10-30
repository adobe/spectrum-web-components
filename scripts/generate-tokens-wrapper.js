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
    'asset',
    'avatar',
    'badge',
    'button',
    'buttongroup',
    'breadcrumb',
    'checkbox',
    'card',
    'clearbutton',
    'closebutton',
    'coachindicator',
    'coachmark',
    'colorarea',
    'colorfield',
    'colorhandle',
    'colorloupe',
    'colorslider',
    'colorwheel',
    'combobox',
    'contextualhelp',
    'dialog',
    'divider',
    'dropzone',
    'fieldgroup',
    'fieldlabel',
    'helptext',
    'illustratedmessage',
    'icon',
    'infieldbutton',
    'link',
    'menu',
    'meter',
    'modal',
    'numberfield',
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
    'opacitycheckerboard',
    'switch',
    'table',
    'tabs',
    'tag',
    'taggroup',
    'textfield',
    'thumbnail',
    'toast',
    'tooltip',
    'topnav',
    'tray',
    'underlay',
    'typography',
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
    /(?:\.spectrum(--(?:express|light(?:est)?|dark(?:est)?|medium|large|legacy)?,?(\n|\s)*)?)+\s?\{/g;
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

const removeImportantComments = (css) => {
    /**
     * Spectrum CSS uses /*! comments that are "not" removable.
     * These comments pile up in merged files, so we _need_ to remove them.
     */
    return css.replaceAll(importantCommentRegExp, '');
};

/**
 * copies @spectrum-css/dist/css/*.css and @spectrum-css/dist/css/**\/*.css
 * replaces classes with :root, :host, and pastes them into
 * corresponding /tools/styles/*.css and /tools/styles/tokens/**\/*.css
 * @param {string} srcPath @spectrum-css/dist/css path
 * @param {*} tokensDir styles/tokens path
 */
const processTokens = (srcPath, tokensDir) => {
    let css = fs.readFileSync(srcPath, 'utf8');
    const fileName = srcPath.split(path.sep + 'css' + path.sep).at(-1);

    css = removeImportantComments(targetHost(css));

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

    return Promise.all(
        ['spectrum', 'express', 'spectrum-two'].map((type) => {
            const outputDir = type !== 'spectrum-two' ? 'tokens' : 'tokens-v2';
            const outputType = outputDir === 'tokens-v2' ? 'spectrum' : type;
            const cssFilePath = path.join(
                componentLevelTokensPath,
                type,
                packagename + '.css'
            );

            // check if cssFilePath exists
            if (fs.existsSync(cssFilePath)) {
                let content = fs.readFileSync(cssFilePath, 'utf8');
                content = removeImportantComments(targetHost(content));
                fs.appendFileSync(
                    path.join(
                        __dirname,
                        '..',
                        'tools',
                        'styles',
                        outputDir,
                        outputType,
                        'global-vars.css'
                    ),
                    content
                );
            }
        })
    );
};

/**
 * Core entry function
 */
export async function generateTokensWrapper(spectrumVersion) {
    const isSpectrumOne = Boolean(spectrumVersion === 'spectrum');
    const tokensDir = isSpectrumOne ? 'tokens' : 'tokens-v2';

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
    if (isSpectrumOne) {
        return;
    }
    return Promise.all(
        packagePaths.map((_, index) => {
            return processPackages(tokensDir, index);
        })
    );
}
