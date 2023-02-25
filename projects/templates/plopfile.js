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

const { execSync } = require('child_process');
const { kebabCase } = require('lodash');

module.exports = function (plop) {
    // name of custom element tag
    plop.setPartial('tagnamePartial', 'sp-{{name}}');
    // name of LitElement class
    plop.setHelper('className', function (name) {
        const camel = name.replace(/-([a-z])/g, (g) => {
            return g[1].toUpperCase();
        });
        camel[0] = camel[0].toUpperCase();
        const capitalized = camel.charAt(0).toUpperCase() + camel.substring(1);
        return capitalized;
    });
    // name of Spectrum CSS package
    plop.setHelper('spectrumCSS', function (name) {
        return name.replace(/-/g, '');
    });
    // name used as title in storybook and documentation
    plop.setHelper('displayName', function (name) {
        const camel = name.replace(/-([a-z])/g, (g) => {
            return ` ${g[1].toUpperCase()}`;
        });
        camel[0] = camel[0].toUpperCase();
        const capitalized = camel.charAt(0).toUpperCase() + camel.substring(1);
        return capitalized;
    });

    plop.setActionType('install deps', function (answers) {
        execSync(
            `cd ../../ && yarn lerna add @spectrum-web-components/base --scope=@spectrum-web-components/${answers.name} --no-bootstrap`
        );
        execSync(
            `cd ../../ && yarn lerna add @spectrum-web-components/${answers.name} --scope=@spectrum-web-components/bundle --no-bootstrap`
        );
        if (answers.spectrum)
            execSync(
                `cd ../../ && yarn lerna add @spectrum-css/${answers.spectrum} --scope=@spectrum-web-components/${answers.name} --dev --no-bootstrap`
            );
    });

    plop.setActionType('format files', function (answers) {
        execSync(
            `cd ../../ && yarn prettier --write packages/${answers.name} && eslint --fix -f pretty packages/${answers.name} && stylelint --fix packages/${answers.name}`
        );
    });

    plop.setGenerator('component', {
        description: 'application controller logic',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'SWC package name (i.e. color-area)',
                validate: (answer) => {
                    if (answer.length < 1) {
                        return "It's a fact universally acknowledged that naming is hard; but it must have a name. You can always change it later.";
                    } else return true;
                },
                // Convert the input into kebab case if not provided as such and strip swc- prefixing if present
                filter: (response) => kebabCase(response.replace(/^sp-/, '')),
            },
            {
                type: 'input',
                name: 'spectrum',
                message: 'Spectrum CSS package name (i.e. colorarea)',
                // Remove the package prefix if provided and strip out any dashes or spaces in the result
                filter: (response) => {
                    return response
                        .replace(/^\@spectrum-css\//, '')
                        .replace(/[-|\s]/g, '');
                },
            },
        ],
        actions: [
            {
                type: 'add',
                path: '../../packages/{{name}}/src/index.ts',
                templateFile: 'plop-templates/index.ts.hbs',
            },
            {
                type: 'add',
                path: '../../packages/{{name}}/src/{{className name}}.ts',
                templateFile: 'plop-templates/component.ts.hbs',
            },
            {
                type: 'add',
                path: '../../packages/{{name}}/{{> tagnamePartial }}.ts',
                templateFile: 'plop-templates/component-registration.ts.hbs',
            },
            {
                type: 'add',
                path: '../../packages/{{name}}/src/{{name}}.css',
                templateFile: 'plop-templates/component.css.hbs',
            },
            {
                type: 'add',
                path: '../../packages/{{name}}/src/spectrum-config.v2.js',
                templateFile: 'plop-templates/spectrum-config.v2.js.hbs',
            },
            {
                type: 'add',
                path: '../../packages/{{name}}/test/{{name}}.test.ts',
                templateFile: 'plop-templates/test.ts.hbs',
            },
            {
                type: 'add',
                path: '../../packages/{{name}}/test/benchmark/basic-test.ts',
                templateFile: 'plop-templates/benchmark.ts.hbs',
            },
            {
                type: 'add',
                path: '../../packages/{{name}}/stories/{{name}}.stories.ts',
                templateFile: 'plop-templates/stories.ts.hbs',
            },
            {
                type: 'add',
                path: '../../packages/{{name}}/README.md',
                templateFile: 'plop-templates/README.md.hbs',
            },
            {
                type: 'add',
                path: '../../packages/{{name}}/tsconfig.json',
                templateFile: 'plop-templates/tsconfig.json.hbs',
            },
            {
                type: 'add',
                path: '../../packages/{{name}}/package.json',
                templateFile: 'plop-templates/package.json.hbs',
            },
            {
                type: 'add',
                path: '../../packages/{{name}}/exports.json',
                templateFile: 'plop-templates/exports.json.hbs',
            },
            {
                type: 'add',
                path: '../../packages/{{name}}/.npmignore',
                templateFile: 'plop-templates/.npmignore.hbs',
            },
            {
                type: 'install deps',
            },
            {
                type: 'format files',
            },
        ],
    });
};
