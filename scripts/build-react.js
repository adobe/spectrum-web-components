/*
Copyright 2020 Adobe. All rights reserved.
Copyright 2021 Gaoding. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
import commandLineArgs from 'command-line-args';
import prettier from 'prettier';

const { publish } = commandLineArgs([
    { name: 'publish', type: Boolean },
]);

if (publish) {
    console.log(chalk.yellow('The --publish flag was used so the package will be published to npm after building!\n'));
}

// Clear build directory
process.chdir('./packages/react/');

// Fetch component metadata
const metadata = JSON.parse(
    fs.readFileSync('./custom-elements.json', 'utf8')
);

// Wrap components
console.log('Wrapping components...');

function getAllComponents() {
    const allComponents = [];

    metadata.modules.map(module => {
        if (module.path.startsWith('packages')) {
            module.declarations?.map(declaration => {
                if (declaration.customElement && declaration.tagName) {
                    const component = declaration;
                    const modulePath = module.path;

                    if (component) {
                        allComponents.push(Object.assign(component, { modulePath }));
                    }
                }
            });
        }
    });

    return allComponents;
}

const components = getAllComponents();

const mainExports = []

function formatCode(string) {
    return prettier.format(string, {
        parser: 'babel-ts',
        singleQuote: true,
    })
}

components.map(component => {
    const { name } = component;
    const componentFile = path.join('./src', `${name}.ts`)

    const events = (component.events || [])
        .map(event => {
            return `'${event.name}': '${event.name}'`;
        })
        .join(',\n');

    const source = formatCode(
        `
      import * as React from 'react';
      import { createComponent } from '@lit-labs/react';
      import { ${name} as Component } from '@iliad-ui/bundle';

      export const ${name} = createComponent(
        React,
        '${component.tagName}',
        Component,
        {
          ${events}
        },
        '${name}'
      );
    `);

    fs.writeFileSync(componentFile, source, 'utf8');
    mainExports.push(`export * from './src/${name}'`)
    console.log(`✓ <${component.tagName}>`);
});

fs.writeFileSync('./index.ts', formatCode(mainExports.join('\n')), 'utf8');

// Run TypeScript on the generated src directory
console.log('Source files have been generated. Running the TypeScript compiler...');
execSync('npx tsc', { stdio: 'inherit' });

// Publish to npm
if (publish) {
    console.log('Publishing to npm...');
    execSync('npm publish', { stdio: 'inherit' });
}

console.log(chalk.cyan(`\nAll components have been wrapped for React! 📦\n`));
