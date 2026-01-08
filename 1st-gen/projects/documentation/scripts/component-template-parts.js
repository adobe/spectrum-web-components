/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

function nameToTitle(name) {
    // Convert directory name to page title...
    // accordion => Accordion
    // color-wheel => Color Wheel
    // icons-ui => Icons UI
    let noDashes = name.replace(/((^|-)(\w))/gm, (match, p1, p2, p3) => {
        let result = p3.toUpperCase();
        if (p2 === '-') {
            result = ` ${result}`;
        }
        return result;
    });
    return noDashes.replace('Ui', 'UI');
}

function sortByName(a, b) {
    const missingName = !a.name || !b.name;
    if (missingName || a.name === b.name) {
        return 0;
    }
    return a.name > b.name ? 1 : -1;
}

const codeWrappedRegex = /<code>(.*)<\/code>/;

function encodeCodeWrappedHTML(source) {
    const parts = codeWrappedRegex.exec(source);
    if (!parts) {
        return source;
    }
    let html = parts[1];
    html = html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return source.replace(codeWrappedRegex, `<code>${html}</code>`);
}

function buildTable(title, rowData, headings, cells, copyData) {
    return `
### ${title}

<div class="table-container">
<sp-table size="m" class="${title.toLowerCase()}">
<sp-table-head>
${headings
    .map(
        (heading) => `
${
    heading === 'Description'
        ? `<sp-table-head-cell class="${title} description">`
        : `<sp-table-head-cell>`
}
${heading}
</sp-table-head-cell>
`
    )
    .join('')}
</sp-table-head>
<sp-table-body>
${rowData
    .sort(sortByName)
    .map(
        (property) => `
<sp-table-row id="${title.toLowerCase()}_${property.name}" data-name="${
            copyData.name
        }" data-value="${copyData.value(property)}">
${cells
    .map(
        (cell, index) => `
${
    headings[index] === 'Description'
        ? `<sp-table-cell class="${title} description">`
        : `<sp-table-cell>`
}
${encodeCodeWrappedHTML(cell(property))}
</sp-table-cell>
`
    )
    .join('')}
</sp-table-row>
`
    )
    .join('')}
</sp-table-body>
</sp-table>
</div>
    `;
}

export function apiDestinationTemplate(componentName, componentHeading) {
    return `---
layout: api.njk
title: '${nameToTitle(componentName)} API: Spectrum Web Components'
displayName: ${nameToTitle(componentName)}
componentName: ${componentName}
componentHeading: ${componentHeading}
tags:
- component-api
---`;
}

export function changelogDestinationTemplate(componentName, componentHeading) {
    return `---
layout: changelog.njk
title: '${nameToTitle(componentName)} changelog: Spectrum Web Components'
displayName: ${nameToTitle(componentName)}
componentName: ${componentName}
componentHeading: ${componentHeading}
tags:
- component-changelog
---`;
}

export function changelogPartialTemplate(
    componentName,
    componentHeading,
    body
) {
    return `---
layout: partial.njk
title: '${nameToTitle(componentName)}: Spectrum Web Components'
displayName: ${nameToTitle(componentName)}
componentName: ${componentName}
componentHeading: ${componentHeading}
partType: changelog
tags:
- ${componentName}
---
${body}`;
}

export function apiPartialTemplate(componentName, componentHeading, tag) {
    return `---
layout: partial.njk
title: '${nameToTitle(componentName)}: Spectrum Web Components'
displayName: ${nameToTitle(componentName)}
componentName: ${componentName}
componentHeading: ${componentHeading}
partType: api
tags:
- ${componentName}
---
${
    tag.attributes &&
    tag.attributes.length &&
    tag.members &&
    tag.members.length &&
    tag.attributes.filter((attribute) => {
        const member = tag.members.find((member) => {
            const attrName = attribute.fieldName || attribute.name;
            return member.name === attrName;
        });
        // Treat missing privacy as public; skip only explicit private
        return member && member.privacy !== 'private';
    }).length
        ? buildTable(
              'Attributes and Properties',
              tag.attributes.filter((attribute) => {
                  const member = tag.members.find((member) => {
                      const attrName = attribute.fieldName || attribute.name;
                      return member.name === attrName;
                  });
                  // Treat missing privacy as public; skip only explicit private
                  return !!member && member.privacy !== 'private';
              }),
              ['Property', 'Attribute', 'Type', 'Default', 'Description'],
              [
                  (attribute) => `<code>${attribute.fieldName || ''}</code>`,
                  (attribute) => `<code>${attribute.name || ''}</code>`,
                  (attribute) => `<code>${attribute.type?.text || ''}</code>`,
                  (attribute) => `<code>${attribute.default || ''}</code>`,
                  (attribute) => `${attribute.description || ''}`,
              ],
              {
                  name: 'Property',
                  value: (attribute) => attribute.fieldName,
              }
          )
        : ``
}
${
    tag.slots && tag.slots.length
        ? buildTable(
              'Slots',
              tag.slots,
              ['Name', 'Description'],
              [
                  (property) =>
                      `<code>${property.name || 'default slot'}</code>`,
                  (property) => `${property.description || ''}`,
              ],
              {
                  name: 'Slot name',
                  value: (attribute) => attribute.name || 'default slot',
              }
          )
        : ``
}
${
    tag.events &&
    tag.events.length &&
    tag.events.filter(
        (tag) =>
            tag.privacy !== 'private' &&
            tag.type !== 'click' &&
            tag.description !==
                'Trick :focus-visible polyfill into thinking keyboard based focus'
    ).length
        ? buildTable(
              'Events',
              tag.events.filter(
                  (tag) =>
                      tag.privacy !== 'private' &&
                      tag.type !== 'click' &&
                      tag.description !==
                          'Trick :focus-visible polyfill into thinking keyboard based focus'
              ),
              ['Name', 'Type', 'Description'],
              [
                  (property) => `<code>${property.name}</code>`,
                  (property) =>
                      `<code>${property.type?.text ?? 'Event'}</code>`,
                  (property) => `<code>${property.description || ''}</code>`,
              ],
              {
                  name: 'Event name',
                  value: (attribute) => attribute.name,
              }
          )
        : ``
}
${
    tag.cssProperties && tag.cssProperties.length
        ? buildTable(
              'CSS Custom Properties',
              tag.cssProperties,
              ['Name', 'Default'],
              [
                  (property) => `<code>${property.name}</code>`,
                  (property) => `<code>${property.default || '""'}</code>`,
              ],
              {
                  name: 'CSS Custom Property',
                  value: (attribute) => attribute.name,
              }
          )
        : ``
}`;
}

export function overviewDestinationTemplate(
    componentName,
    componentHeading,
    tagType,
    parent,
    packageName
) {
    return `---
layout: overview.njk
title: '${nameToTitle(componentName)}: Spectrum Web Components'
displayName: ${nameToTitle(componentName)}
componentName: ${componentName}
componentHeading: ${componentHeading}
componentPackage: ${packageName}
tags:
- ${tagType}
- ${parent}
---`;
}

export function overviewPartialTemplate(componentName, componentHeading, body) {
    return `---
layout: partial.njk
title: '${nameToTitle(componentName)}: Spectrum Web Components'
displayName: ${nameToTitle(componentName)}
componentName: ${componentName}
partType: overview
tags:
- ${componentName}
---
${body}`;
}
