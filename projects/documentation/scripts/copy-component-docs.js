/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const fs = require('fs');
const globby = require('globby');
const path = require('path');

const projectDir = path.resolve(__dirname, '..', '..', '..');
const destinationPath = path.resolve(__dirname, '..', 'content', 'components');
const partialPath = path.resolve(
    __dirname,
    '..',
    'content',
    '_includes',
    'partials',
    'components'
);

function nameToTitle(name) {
    return name.replace(/((^|\-)(\w))/gm, (match, p1, p2, p3) => {
        let result = p3.toUpperCase();
        if (p2 === '-') {
            result = ` ${result}`;
        }
        return result;
    });
}

function sortByName(a, b) {
    if (!a.name || !b.name) {
        return 0;
    }
    if (a.name > b.name) {
        return 1;
    }
    if (b.name > a.name) {
        return -1;
    }
    return 0;
}

function buildTable(title, rowData, headings, cells) {
    return `
<h2>${title}</h2>
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

async function main() {
    // Create the test directory if needed.
    if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath);
    }
    // Create the test directory if needed.
    if (!fs.existsSync(partialPath)) {
        fs.mkdirSync(partialPath);
    }

    let rawCustomElementsJSON = fs.readFileSync(
        `${projectDir}/projects/documentation/custom-elements.json`
    );
    let customElements = JSON.parse(rawCustomElementsJSON);

    for await (const path of globby.stream(`${projectDir}/packages/**/*.md`)) {
        let componentName = /([^/]+)\/([a-zA-Z-]+)\.md$/.exec(path)[1];
        const elementByDirectory = customElements.tags.find(
            (el) => el.name === 'sp-' + componentName
        );
        const fileName = /([a-zA-Z-]+)\.md$/.exec(path)[0];
        if (fileName === 'CHANGELOG.md' || /node_modules/.test(path)) {
            continue;
        }
        if (fileName !== 'README.md') {
            componentName = fileName.replace('.md', '');
        }
        // Create the test directory if needed.
        if (!fs.existsSync(`${destinationPath}/${componentName}`)) {
            fs.mkdirSync(`${destinationPath}/${componentName}`);
        }
        const exampleDestinationFile = `${destinationPath}/${componentName}/index.md`;
        const apiDestinationFile = `${destinationPath}/${componentName}/api.md`;
        const examplePartialFile = `${destinationPath}/${componentName}/content.md`;
        const apiPartialFile = `${destinationPath}/${componentName}/api-content.md`;
        const elementByComponentName = customElements.tags.find(
            (el) => el.name === 'sp-' + componentName
        );
        const tag = elementByComponentName || elementByDirectory;
        const body = fs.readFileSync(path);
        if (tag) {
            fs.writeFileSync(
                apiDestinationFile,
                `---
layout: api.njk
title: '${nameToTitle(componentName)} API: Spectrum Web Components'
displayName: ${nameToTitle(componentName)}
componentName: ${componentName}
tags:
  - component-api
---`
            );
            fs.writeFileSync(
                apiPartialFile,
                `---
partType: api
tags:
    - ${componentName}
---
${
    tag.properties && tag.properties.length
        ? buildTable(
              'Attributes and Properties',
              tag.properties,
              ['Name', 'Attribute', 'Type', 'Default', 'Description'],
              [
                  (property) => `<code>${property.name}</code>`,
                  (property) => `<code>${property.attribute || ''}</code>`,
                  (property) => `<code>${property.type || ''}</code>`,
                  (property) => `<code>${property.default || ''}</code>`,
                  (property) => `${property.description || ''}`,
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
                  (property) => `<code>${property.name}</code>`,
                  (property) => `${property.description || ''}`,
              ]
          )
        : ``
}
${
    tag.events && tag.events.length
        ? buildTable(
              'Events',
              tag.events,
              ['Name'],
              [(property) => `<code>${property.name}</code>`]
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
                  (property) =>
                      `<code>${(property.default || '""').slice(
                          1,
                          (property.default || '""').length - 1
                      )}</code>`,
              ]
          )
        : ``
}`
            );
        }
        fs.writeFileSync(
            exampleDestinationFile,
            `---
layout: examples.njk
title: '${nameToTitle(componentName)}: Spectrum Web Components'
displayName: ${nameToTitle(componentName)}
componentName: ${componentName}
tags:
  - component-examples
---`
        );
        fs.writeFileSync(
            examplePartialFile,
            `---
partType: examples
tags:
  - ${componentName}
---
${body}`
        );
    }
}

main();
