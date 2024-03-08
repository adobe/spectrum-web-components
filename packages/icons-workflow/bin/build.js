/* eslint-disable @typescript-eslint/explicit-function-return-type */
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import fs from 'fs';
import fg from 'fast-glob';
import path from 'path';
import { load } from 'cheerio';
import Case from 'case';
import { fileURLToPath } from 'url';
import { disclaimer, prettify } from './build-utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rootDir = path.join(__dirname, '../../../');

const iconsPath = process.argv.slice(2)[0];
const keepColors = process.argv.slice(2)[1];
const theme = process.argv.slice(2)[1] ?? '';

const setupDirectoryStructure = () => {
    if (
        !fs.existsSync(
            path.join(`${rootDir}packages/icons-workflow/src`, theme)
        )
    ) {
        fs.mkdirSync(path.join(`${rootDir}packages/icons-workflow/src`, theme));
    }
    if (
        !fs.existsSync(
            path.join(`${rootDir}packages/icons-workflow/src`, theme, 'icons')
        )
    ) {
        fs.mkdirSync(
            path.join(`${rootDir}packages/icons-workflow/src`, theme, 'icons')
        );
    }
    if (
        !fs.existsSync(
            path.join(
                `${rootDir}packages/icons-workflow/src`,
                theme,
                'elements'
            )
        )
    ) {
        fs.mkdirSync(
            path.join(
                `${rootDir}packages/icons-workflow/src`,
                theme,
                'elements'
            )
        );
    }
    if (
        !fs.existsSync(
            path.join(`${rootDir}packages/icons-workflow/icons`, theme)
        )
    ) {
        fs.mkdirSync(
            path.join(`${rootDir}packages/icons-workflow/icons`, theme),
            { recursive: true }
        );
    }
};

const getIconId = (svgPath) => {
    let id = path
        .basename(svgPath, '.svg')
        .replace('S_', '')
        .replace('_22_N', '');
    if (id.search(/^Ad[A-Z]/) !== -1) {
        id = id.replace(/^Ad/, '');
        id += 'Advert';
    }
    return id.includes('Fullscreen')
        ? id.replace('Fullscreen', 'FullScreen')
        : id;
};

const stripColors = (icon) => {
    const $ = load(icon.rawFile, {
        xmlMode: true,
    });

    $('*').each((index, el) => {
        if (el.name === 'svg') {
            $(el).attr('aria-hidden', '...');
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
    return $('svg')
        .toString()
        .replace(
            'aria-hidden="..."',
            "aria-hidden=${hidden ? 'true' : 'false'}"
        )
        .replace('width="..."', 'width=${width}')
        .replace('height="..."', 'height=${height}')
        .replace('aria-label="..."', 'aria-label=${title}');
};

const generateIconLiteral = (icon) => {
    const customTagRelativePath = path.relative(
        path.dirname(getIconLiteralPath(icon)),
        path.join(rootDir, 'packages/icons-workflow/src/custom-tag.js')
    );
    const iconLiteral = `
    ${disclaimer}

    import {tag as html, TemplateResult} from '${customTagRelativePath}';

    export const ${icon.componentName}Icon = ({
      width = 24,
      height = 24,
      hidden = false,
      title = '${icon.title}',
    } = {},): string | TemplateResult => {
      return html\`${icon.sanitizedSVG}\`;
    }
  `;
    return prettify(iconLiteral);
};

const getIconLiteralPath = ({ id }, extension = 'ts') => {
    return path.join(
        rootDir,
        'packages/icons-workflow/src',
        theme,
        'icons',
        `${id}.${extension}`
    );
};

const getIconElementPath = ({ id }, extension = 'ts') => {
    return path.join(
        rootDir,
        'packages',
        'icons-workflow',
        'src',
        theme,
        'elements',
        `Icon${id}.${extension}`
    );
};

const generateIconElement = (icon) => {
    const customTagRelativePath = path.relative(
        path.dirname(getIconElementPath(icon)),
        path.join(rootDir, 'packages/icons-workflow/src/custom-tag.js')
    );
    const iconComponentRelativePath = path.join(
        path.relative(
            path.dirname(getIconElementPath(icon)),
            getIconLiteralPath(icon, 'js')
        )
    );
    return prettify(`
        ${disclaimer}

        import {
            html,
            TemplateResult
        } from '@spectrum-web-components/base';
        import {
            IconBase
        } from '@spectrum-web-components/icon';

        import {
            ${icon.componentName}Icon
        } from '${iconComponentRelativePath}';
        import {
            setCustomTemplateLiteralTag
        } from '${customTagRelativePath}';

        /**
         * @element ${icon.elementName}
         */
        export class Icon${icon.componentName} extends IconBase {
            protected override render(): TemplateResult {
                setCustomTemplateLiteralTag(html);
                return ${icon.componentName}Icon({hidden: !this.label, title: this.label}) as TemplateResult;
            }
        }
        `);
};

const generateIconRegistration = (icon) => {
    return `
    ${disclaimer}

    import { Icon${icon.componentName} } from '@spectrum-web-components/icons-workflow/src/elements/Icon${icon.id}.js';

    customElements.define('${icon.elementName}', Icon${icon.componentName});

    declare global {
        interface HTMLElementTagNameMap {
            '${icon.elementName}': Icon${icon.componentName};
        }
    }
    `;
};

const getIconRegistrationPath = ({ elementName }, extension = 'ts') => {
    return path.join(
        rootDir,
        'packages',
        'icons-workflow',
        'icons',
        theme,
        `${elementName}.${extension}`
    );
};

// Build start
setupDirectoryStructure();

const icons = (await fg(`${rootDir}/node_modules/${iconsPath}/**.svg`)).sort();

icons.forEach((i) => {
    const svg = fs.readFileSync(i, 'utf-8');
    const id = getIconId(i);

    const icon = {
        id,
        rawFile: svg,
        componentName: Case.pascal(id),
        elementName: `sp-icon-${Case.kebab(id)}`,
        title: Case.capital(id),
    };

    if (!Number.isNaN(Number(icon.componentName[0]))) {
        return;
    }

    // Write svgs in icons-workflow/src/icons/** */
    icon.sanitizedSVG = stripColors(icon);
    const iconLiteral = generateIconLiteral(icon);
    const iconLiteralPath = getIconLiteralPath(icon);

    fs.writeFileSync(iconLiteralPath, iconLiteral, 'utf-8');

    // Write custom elements in icons-workflow/icons/** */
    const iconElement = generateIconElement(icon);
    const iconElementPath = getIconElementPath(icon);

    fs.writeFileSync(iconElementPath, iconElement, 'utf-8');

    // Write class decarations in icons-workflow/src/elements/** */
    const iconRegistration = prettify(generateIconRegistration(icon));
    const iconRegistrationPath = getIconRegistrationPath(icon);

    fs.writeFileSync(iconRegistrationPath, iconRegistration, 'utf-8');
});
