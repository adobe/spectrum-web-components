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

const fs = require('fs');
const glob = require('glob');
const path = require('path');
const cheerio = require('cheerio');
const prettier = require('prettier');
const Case = require('case');

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

glob(`${rootDir}/node_modules/${iconsPath}/**.svg`, (err, icons) => {
    if (!fs.existsSync(`${rootDir}packages/icons-ui/src`)) {
        fs.mkdirSync(`${rootDir}packages/icons-ui/src`);
    }
    if (!fs.existsSync(`${rootDir}packages/icons-ui/src/icons`)) {
        fs.mkdirSync(`${rootDir}packages/icons-ui/src/icons`);
    }
    fs.writeFileSync(
        path.join(rootDir, 'packages', 'icons-ui', 'src', 'icons.ts'),
        disclaimer,
        'utf-8'
    );

    icons.forEach((i) => {
        const svg = fs.readFileSync(i, 'utf-8');
        const id = path
            .basename(i, '.svg')
            .replace('S_', '')
            .replace('_22_N', '');
        const ComponentName = id === 'github' ? 'GitHub' : Case.pascal(id);
        const $ = cheerio.load(svg, {
            xmlMode: true,
        });
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
                if (keepColors !== 'keep') {
                    $(el).attr('fill', 'currentColor');
                }
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
            });
        });

        const iconLiteral = `
      ${disclaimer}

      import {tag as html, TemplateResult} from '../custom-tag.js';

      export {setCustomTemplateLiteralTag} from '../custom-tag.js';
      export const ${ComponentName}Icon = (): string | TemplateResult => {
        return html\`${$('svg').toString()}\`;
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
    });

    const exportString = `\r\nexport { setCustomTemplateLiteralTag } from './custom-tag.js';\r\n`;
    fs.appendFileSync(
        path.join(rootDir, 'packages', 'icons-ui', 'src', 'icons.ts'),
        exportString,
        'utf-8'
    );
});
