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

function nameToTitle(name) {
    // Convert directory name to page title...
    // accordion => Accordion
    // color-wheel => Color Wheel
    // icons-ui => Icons UI
    let noDashes = name.replace(/((^|\-)(\w))/gm, (match, p1, p2, p3) => {
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

function buildTable(title, rowData, headings, cells) {
    return `
### ${title}

<div class="table-container">
<table class="spectrum-Table">
<thead class="spectrum-Table-head">
<tr>
${headings
    .map(
        (heading) => `
<th class="spectrum-Table-headCell">
${heading}
</th>
`
    )
    .join('')}
</tr>
</thead>
<tbody class="spectrum-Table-body">
${rowData
    .sort(sortByName)
    .map(
        (property) => `
<tr class="spectrum-Table-row">
${cells
    .map(
        (cell) => `
<td class="spectrum-Table-cell">
${cell(property)}
</td>
`
    )
    .join('')}
</tr>
`
    )
    .join('')}
</tbody>
</table>
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
    tag.attributes && tag.attributes.length
        ? buildTable(
              'Attributes and Properties',
              tag.attributes,
              ['Property', 'Attribute', 'Type', 'Default', 'Description'],
              [
                  (attribute) => `<code>${attribute.fieldName}</code>`,
                  (attribute) => `<code>${attribute.name || ''}</code>`,
                  (attribute) => `<code>${attribute.type?.text || ''}</code>`,
                  (attribute) => `<code>${attribute.default || ''}</code>`,
                  (attribute) => `${attribute.description || ''}`,
              ]
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
              ]
          )
        : ``
}
${
    tag.events &&
    tag.events.length &&
    tag.events.filter((tag) => tag.privacy !== 'private').length
        ? buildTable(
              'Events',
              tag.events.filter((tag) => tag.privacy !== 'private'),
              ['Name', 'Description'],
              [
                  (property) => `<code>${property.name}</code>`,
                  (property) => `<code>${property.description || ''}</code>`,
              ]
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
              ]
          )
        : ``
}`;
}

export function exampleDestinationTemplate(componentName, componentHeading) {
    return `---
layout: examples.njk
title: '${nameToTitle(componentName)}: Spectrum Web Components'
displayName: ${nameToTitle(componentName)}
componentName: ${componentName}
componentHeading: ${componentHeading}
tags:
- component-examples
---`;
}

export function examplePartialTemplate(componentName, componentHeading, body) {
    return `---
layout: partial.njk
title: '${nameToTitle(componentName)}: Spectrum Web Components'
displayName: ${nameToTitle(componentName)}
componentName: ${componentName}
partType: examples
tags:
- ${componentName}
---
${body}`;
}
