/* eslint-disable no-console */
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

import { appendFileSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { ensureDirSync } from 'fs-extra';
import { join, resolve } from 'path';
import { createRequire } from 'module';
import { load } from 'cheerio';
import { format } from 'prettier';
import Case from 'case';

const require = createRequire(import.meta.url);
const rootDir = process.env.PROJECT_CWD;

const iconsPath = process.argv.slice(2)[0];
const keepColors = process.argv.slice(2)[1];

const licensePath = join(rootDir, 'config/license.js');
const disclaimer = existsSync(licensePath)
    ? readFileSync(licensePath, 'utf8')?.replace(
          '<%= YEAR %>',
          new Date().getFullYear()
      )
    : '';

const iconData = require.resolve(iconsPath);
if (!iconData) throw new Error(`Could not find manifest at ${iconsPath}`);

const icons = JSON.parse(readFileSync(iconData, 'utf8'));

if (icons.length === 0) throw new Error(`No icons found at ${iconsPath}`);

// Test that the folders exist, if not, create them
ensureDirSync(join(rootDir, 'packages/icons-workflow/src/icons'));
ensureDirSync(join(rootDir, 'packages/icons-workflow/src/elements'));
ensureDirSync(join(rootDir, 'packages/icons-workflow/icons'));

// Write the copyright to the files
writeFileSync(
    join(rootDir, 'packages/icons-workflow/src/icons.ts'),
    disclaimer,
    'utf-8'
);

const manifestPath = join(
    rootDir,
    'packages/icons-workflow/stories/icon-manifest.ts'
);
writeFileSync(manifestPath, disclaimer, 'utf-8');

let manifestImports = `import { html, TemplateResult } from '@spectrum-web-components/base';`;
let manifestListings = `export const iconManifest = [`;
icons.forEach((iconName) => {
    const i = join(resolve(iconData, `..`), `18`, iconName);
    const svg = readFileSync(i, 'utf-8');
    let id = iconName
        .replace(/\.svg$/, '')
        .replace('S_', '')
        .replace('_22_N', '');
    if (id.search(/^Ad[A-Z]/) !== -1) {
        id = id.replace(/^Ad/, '');
        id += 'Advert';
    }
    const ComponentName = id === 'github' ? 'GitHub' : Case.pascal(id);
    const $ = load(svg, { xmlMode: true });
    const title = Case.capital(id);
    const fileName = `${id}.ts`;
    const location = join(
        rootDir,
        'packages/icons-workflow/src/icons',
        fileName
    );

    if (!Number.isNaN(Number(ComponentName[0]))) {
        return;
    }

    $('*').each((_idx, el) => {
        if (el.name === 'svg') {
            $(el).attr('aria-hidden', '...');
            $(el).attr('role', 'img');
            if (keepColors !== 'keep') {
                $(el).attr('fill', 'currentColor');
            }
            $(el).attr('aria-label', '${title}');
            $(el).removeAttr('id');
        }
        if (el.name === 'defs') {
            $(el).remove();
        }
        Object.keys(el.attribs).forEach((x) => {
            if (x === 'class') {
                $(el).removeAttr(x);
            }
            if (keepColors !== 'keep' && x === 'stroke') {
                $(el).attr(x, 'currentColor');
            }
            if (keepColors !== 'keep' && x === 'fill') {
                $(el).attr(x, 'currentColor');
            }
            if (el.name === 'svg') {
                if (x === 'width' || x === 'height') {
                    $(el).attr(x, '${' + x + '}');
                }
            }
        });
    });

    const iconLiteral = `
    ${disclaimer}

    import {tag as html, TemplateResult} from '../custom-tag.js';

    export {setCustomTemplateLiteralTag} from '../custom-tag.js';
    export const ${ComponentName}Icon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = '${title}',
    } = {},): string | TemplateResult => {
    return html\`${$('svg')
        .toString()
        .replace(
            'aria-hidden="..."',
            "aria-hidden=\"${hidden ? 'true' : 'false'}\""
        )}\`;
    }
`;

    const icon = format(iconLiteral, {
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'avoid',
        parser: 'typescript',
    });

    writeFileSync(location, icon, 'utf-8');

    const exportString = `export {${ComponentName}Icon} from './icons/${id}.js';\r\n`;
    appendFileSync(
        join(rootDir, 'packages/icons-workflow/src/icons.ts'),
        exportString,
        'utf-8'
    );

    const iconElementName = `sp-icon-${Case.kebab(ComponentName)}`;
    const iconElement = `
    ${disclaimer}

    import {
        html,
        TemplateResult
    } from '@spectrum-web-components/base';
    import {
        IconBase
    } from '@spectrum-web-components/icon';

    import {
        ${ComponentName}Icon
    } from '../icons/${id}.js';
    import {
        setCustomTemplateLiteralTag
    } from '../custom-tag.js';

    /**
     * @element ${iconElementName}
     */
    export class Icon${ComponentName} extends IconBase {
        protected override render(): TemplateResult {
            setCustomTemplateLiteralTag(html);
            return ${ComponentName}Icon({hidden: !this.label, title: this.label}) as TemplateResult;
        }
    }
    `;
    const iconElementFile = format(iconElement, {
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'avoid',
        parser: 'typescript',
    });

    writeFileSync(
        join(rootDir, 'packages/icons-workflow/src/elements', `Icon${id}.ts`),
        iconElementFile,
        'utf-8'
    );

    const iconRegistration = `
    ${disclaimer}

    import { Icon${ComponentName} } from '../src/elements/Icon${id}.js';

    customElements.define('${iconElementName}', Icon${ComponentName});

    declare global {
        interface HTMLElementTagNameMap {
            '${iconElementName}': Icon${ComponentName};
        }
    }
    `;
    const iconRegistrationFile = format(iconRegistration, {
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'avoid',
        parser: 'typescript',
    });

    writeFileSync(
        join(
            rootDir,
            'packages',
            'icons-workflow',
            'icons',
            `${iconElementName}.ts`
        ),
        iconRegistrationFile,
        'utf-8'
    );
    const importStatement = `\r\nimport '../icons/${iconElementName}.js';`;
    const metadata = `{name: '${Case.sentence(
        ComponentName
    )}', tag: '<${iconElementName}>', story: (size: string): TemplateResult => html\`<${iconElementName} size=\$\{size\}></${iconElementName}>\`},\r\n`;
    manifestImports += importStatement;
    manifestListings += metadata;
});

const exportString = `\r\nexport { setCustomTemplateLiteralTag } from './custom-tag.js';\r\n`;
appendFileSync(
    join(rootDir, 'packages', 'icons-workflow', 'src', 'icons.ts'),
    exportString,
    'utf-8'
);
appendFileSync(
    manifestPath,
    `${manifestImports}${manifestListings}];\r\n`,
    'utf-8'
);
