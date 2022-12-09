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
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { outputFile, readFileSync, readJSON } = fsExtra;

const prettierConfig = yaml.load(
    readFileSync(path.resolve(__dirname, '..', '.prettierrc.yaml'))
);

/**
 * Code generation method
 */
const index = (component, id, iconElementName, iconPkg) => {
    const wrapperComponentName = `${component}`;
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
  
import { ${component} as Sp${component} } from '@spectrum-web-components/${iconPkg}/src/elements/${id}.js';
import '@spectrum-web-components/${iconPkg}/icons/${iconElementName}.js';
  
export const ${wrapperComponentName} = createComponent({ react: React, tagName: '${iconElementName}', elementClass: Sp${component}, events: {}, displayName: '${wrapperComponentName}' });
`;
};

/**
 * Core entry function
 */
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
                        `react/${iconType}/${componentName}.ts`
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
                            ...prettierConfig,
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
                path.resolve(__dirname, '..', `react/${iconType}/package.json`),
                prettier.format(
                    `{
    "name": "@swc-react/${iconType}",
    "version": "${pkgVersion}",
    "publishConfig": {
        "access": "public"
    },
    "description": "React wrapper of the ${iconType} component",
    "license": "Apache-2.0",
    "author": "",
    "main": "index.js",
    "files": [
        "**/*.d.ts",
        "**/*.js",
        "**/*.js.map"
    ],
    "keywords": [
        "React",
        "Spectrum Web Components",
        "${iconType}"
    ],
    "dependencies": {
        "@lit-labs/react": "1.1.1",
        "${pkgName}": "${pkgVersion}"
    }
}
`,
                    {
                        parser: 'json',
                        ...prettierConfig,
                    }
                )
            );

            await outputFile(
                path.resolve(
                    __dirname,
                    '..',
                    `react/${iconType}/tsconfig.json`
                ),
                prettier.format(
                    `{
    "extends": "../../tsconfig.json",
    "compilerOptions": {
        "composite": true,
        "rootDir": "./"
    },
    "include": ["*.ts"]
}
                `,
                    {
                        parser: 'json',
                        ...prettierConfig,
                    }
                )
            );
        }
    );
};

(async () => {
    await generateIconWrapper('icons-ui');
    await generateIconWrapper('icons-workflow');
})();
