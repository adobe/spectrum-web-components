#!/usr/bin/env node

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
import Case from 'case';
import glob from 'glob';
import fsExtra from 'fs-extra';
import { fileURLToPath } from 'url';
import prettier from 'prettier';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { outputFile, readJSON } = fsExtra;

const index = (component, id, iconElementName, iconPkg) => {
    const wrapperComponentName = `Sp${component}`;
    return `/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { createComponent } from '@lit-labs/react';
import * as React from 'react';
  
import { ${component} } from '@spectrum-web-components/${iconPkg}/src/elements/${id}.js';
import '@spectrum-web-components/${iconPkg}/icons/${iconElementName}.js';
  
export const ${wrapperComponentName} = createComponent({ react: React, tagName: '${iconElementName}', elementClass: ${component}, events: {}, displayName: '${wrapperComponentName}' });
`;
};

const generateIconWrapper = async (iconType) => {
    glob(
        path.resolve(
            __dirname,
            '..',
            `packages/${iconType}/src/elements/**.d.ts`
        ),
        async (_, icons) => {
            for (let icon of icons) {
                const id = path
                    .basename(icon)
                    .split('.')[0]
                    .substring('Icon'.length);
                const componentName =
                    id === 'github' ? 'GitHub' : Case.pascal(id);
                const iconElementName = `sp-icon-${Case.kebab(componentName)}`;
                await outputFile(
                    path.resolve(
                        __dirname,
                        '..',
                        `react/sp-${iconType}/${componentName}.ts`
                    ),
                    prettier.format(
                        index(
                            `Icon${componentName}`,
                            `Icon${id}`,
                            iconElementName,
                            `${iconType}`
                        ),
                        {
                            parser: 'babel',
                            printWidth: 80,
                            tabWidth: 4,
                            semi: true,
                            singleQuote: true,
                            trailingComma: 'es5',
                            bracketSpacing: true,
                            arrowParens: 'always',
                            htmlWhitespaceSensitivity: 'ignore',
                        }
                    )
                );
            }

            const { name: pkgName, version: pkgVersion } = await readJSON(
                path.resolve(
                    __dirname,
                    '..',
                    `packages/${iconType}/package.json`
                )
            );

            await outputFile(
                path.resolve(
                    __dirname,
                    '..',
                    `react/sp-${iconType}/package.json`
                ),
                `{
    "name": "@spectrum-web-components/sp-${iconType}",
    "version": "${pkgVersion}",
    "description": "React wrapper of the ${iconType} component",
    "license": "Apache-2.0",
    "author": "jian.liao@gmail.com",
    "main": "index.js",
    "keywords": [
        "React",
        "Spectrum Web Components",
        "${iconType}"
    ],
    "dependencies": {
        "@lit-labs/react": "1.1.0",
        "${pkgName}": "${pkgVersion}"
    }
}`
            );
        }
    );
};

(async () => {
    await generateIconWrapper('icons-ui');
    await generateIconWrapper('icons-workflow');
})();
