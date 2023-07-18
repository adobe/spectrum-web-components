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

import fs from 'fs';
import { glob } from 'glob';
import path from 'path';
import { load } from 'cheerio';
import prettier from 'prettier';
import Case from 'case';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rootDir = path.join(__dirname, '../../../');

const iconsPath = process.argv.slice(2)[0];
const keepColors = process.argv.slice(2)[1];

const disclaimer = `
/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/`;

const icons = (
    await glob(`${rootDir}/node_modules/${iconsPath}/**.svg`)
).sort();

if (!fs.existsSync(`${rootDir}packages/icons-ui/src`)) {
    fs.mkdirSync(`${rootDir}packages/icons-ui/src`);
}
if (!fs.existsSync(`${rootDir}packages/icons-ui/src/icons`)) {
    fs.mkdirSync(`${rootDir}packages/icons-ui/src/icons`);
}
if (!fs.existsSync(`${rootDir}packages/icons-ui/src/elements`)) {
    fs.mkdirSync(`${rootDir}packages/icons-ui/src/elements`);
}
if (!fs.existsSync(`${rootDir}packages/icons-ui/icons`)) {
    fs.mkdirSync(`${rootDir}packages/icons-ui/icons`);
}
fs.writeFileSync(
    path.join(rootDir, 'packages', 'icons-ui', 'src', 'icons.ts'),
    disclaimer,
    'utf-8'
);
const manifestPath = path.join(
    rootDir,
    'packages',
    'icons-ui',
    'stories',
    'icon-manifest.ts'
);
fs.writeFileSync(manifestPath, disclaimer, 'utf-8');
let manifestImports = `import {
    html,
    TemplateResult
} from '@spectrum-web-components/base';\r\n`;
let manifestListings = `\r\nexport const iconManifest = [\r\n`;

icons.forEach((i) => {
    const svg = fs.readFileSync(i, 'utf-8');
    let id = path.basename(i, '.svg').replace('S_', '').replace('_22_N', '');
    if (id.search(/^Ad[A-Z]/) !== -1) {
        id = id.replace(/^Ad/, '');
        id += 'Advert';
    }
    const ComponentName = id === 'github' ? 'GitHub' : Case.pascal(id);
    const $ = load(svg, {
        xmlMode: true,
    });
    const title = Case.capital(id);
    const fileName = `${id}.ts`;
    const location = path.join(
        rootDir,
        'packages/icons-ui/src/icons',
        fileName
    );

    if (!Number.isNaN(Number(ComponentName[0]))) {
        return;
    }

    $('*').each((index, el) => {
        if (el.name === 'svg') {
            $(el).attr('aria-hidden', 'true');
            $(el).attr('role', 'img');
            if (keepColors !== 'keep') {
                $(el).attr('fill', 'currentColor');
            }
            $(el).attr('aria-label', '...');
            $(el).removeAttr('id');
            $(el).attr('width', '...');
            $(el).attr('height', '...');
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
        });
    });

    const iconLiteral = `
    ${disclaimer}

    import {tag as html, TemplateResult} from '../custom-tag.js';

    export {setCustomTemplateLiteralTag} from '../custom-tag.js';
    export const ${ComponentName}Icon = ({
    width = 24,
    height = 24,
    title = '${title}',
    } = {},): string | TemplateResult => {
    return html\`${$('svg')
        .toString()
        .replace('width="..."', 'width=${width}')
        .replace('height="..."', 'height=${height}')
        .replace('aria-label="..."', 'aria-label=${title}')}\`;
    }
`;

    const icon = prettier.format(iconLiteral, {
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        arrowParens: 'avoid',
        parser: 'typescript',
    });

    fs.writeFileSync(location, icon, 'utf-8');

    const exportString = `export {${ComponentName}Icon} from './icons/${id}.js';\r\n`;
    fs.appendFileSync(
        path.join(rootDir, 'packages', 'icons-ui', 'src', 'icons.ts'),
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
            return ${ComponentName}Icon() as TemplateResult;
        }
    }
    `;
    const iconElementFile = prettier.format(iconElement, {
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        arrowParens: 'avoid',
        parser: 'typescript',
    });

    fs.writeFileSync(
        path.join(
            rootDir,
            'packages',
            'icons-ui',
            'src',
            'elements',
            `Icon${id}.ts`
        ),
        iconElementFile,
        'utf-8'
    );

    const iconRegistration = `
    ${disclaimer}

    import { Icon${ComponentName} } from '../src/elements/Icon${id}.js';
    import { defineElement } from '@spectrum-web-components/base/src/define-element.js';

    defineElement('${iconElementName}', Icon${ComponentName});

    declare global {
        interface HTMLElementTagNameMap {
            '${iconElementName}': Icon${ComponentName};
        }
    }
    `;
    const iconRegistrationFile = prettier.format(iconRegistration, {
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        arrowParens: 'avoid',
        parser: 'typescript',
    });

    fs.writeFileSync(
        path.join(
            rootDir,
            'packages',
            'icons-ui',
            'icons',
            `${iconElementName}.ts`
        ),
        iconRegistrationFile,
        'utf-8'
    );
    const importStatement = `\r\nimport '@spectrum-web-components/icons-ui/icons/${iconElementName}.js';`;
    const metadata = `{name: '${Case.sentence(
        ComponentName
    )}', tag: '<${iconElementName}>', story: (size: string): TemplateResult => html\`<${iconElementName} size=\$\{size\}></${iconElementName}>\`},\r\n`;
    manifestImports += importStatement;
    manifestListings += metadata;
});

const exportString = `\r\nexport { setCustomTemplateLiteralTag } from './custom-tag.js';\r\n`;
fs.appendFileSync(
    path.join(rootDir, 'packages', 'icons-ui', 'src', 'icons.ts'),
    exportString,
    'utf-8'
);
fs.appendFileSync(
    manifestPath,
    `${manifestImports}${manifestListings}];\r\n`,
    'utf-8'
);
