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

import { readFile } from 'fs/promises';
import fsExtra from 'fs-extra';
import { basename, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import prettier from 'prettier';
import Case from 'case';
import fg from 'fast-glob';
import yaml from 'js-yaml';

const { existsSync, outputFile, readFileSync, readJSON } = fsExtra;

const __dirname = dirname(fileURLToPath(import.meta.url));
const prettierConfig = yaml.load(
    readFileSync(resolve(__dirname, '..', '.prettierrc.yaml'))
);

/**
 * Core entry function
 */
export async function generateIconWrapper(iconType) {
    const icons = await fg(
        resolve(__dirname, '..', `packages/${iconType}/src/elements/**.d.ts`)
    );
    for (let icon of icons) {
        const id = basename(icon).split('.')[0].substring('Icon'.length);
        const componentName = id === 'github' ? 'GitHub' : Case.pascal(id);
        const iconElementName = `sp-icon-${Case.kebab(componentName)}`;
        await outputFile(
            resolve(__dirname, '..', `react/${iconType}/${componentName}.ts`),
            await prettier.format(
                genIconReactComponent(
                    `Icon${componentName}`,
                    `Icon${id}`,
                    iconElementName,
                    `${iconType}`
                ),
                {
                    parser: 'typescript',
                    ...prettierConfig,
                }
            )
        );
        await outputFile(
            resolve(
                __dirname,
                '..',
                `react/${iconType}/next/${componentName}.ts`
            ),
            await prettier.format(genIconNextComponent(Case.pascal(id)), {
                parser: 'typescript',
                ...prettierConfig,
            })
        );
    }

    const { name: pkgName, version: pkgVersion } = await readJSON(
        resolve(__dirname, '..', `packages/${iconType}/package.json`)
    );

    await outputFile(
        resolve(__dirname, '..', `react/${iconType}/package.json`),
        await prettier.format(
            genPackageJson(iconType, pkgName, pkgVersion, true),
            {
                parser: 'json',
                ...prettierConfig,
            }
        )
    );

    await outputFile(
        resolve(__dirname, '..', `react/${iconType}/tsconfig.json`),
        await prettier.format(genTsconfigJson(), {
            parser: 'json',
            ...prettierConfig,
        })
    );
}

(async () => {
    await generateIconWrapper('icons-ui');
    await generateIconWrapper('icons-workflow');
})();
