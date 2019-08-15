/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const {
    AnalyzeCliCommand,
    markdownTransformer,
} = require('web-component-analyzer');

const path = require('path');
const fs = require('fs-extra');
const marked = require('marked');

const projectDir = path.dirname(path.dirname(__dirname));
const glob = path.join(projectDir, 'src/*/*.ts');
const outputDir = path.join(projectDir, 'documentation/api-docs');
const outFile = path.join(
    projectDir,
    'documentation/api-docs/component_data.json'
);

function extractComponentData(component) {
    const result = { name: component.tagName };
    return result;
}

class CustomAnalyzer extends AnalyzeCliCommand {
    constructor(...args) {
        super(...args);
        console.log('hi');
        const renderer = new marked.Renderer();
        this.parser = new marked.Parser({ renderer });
        Object.assign(renderer, {
            table: this.table,
            tablecell: this.tablecell,
            tablerow: this.tablerow,
            heading: this.heading,
        });
    }

    transformResults(results, program, config) {
        const markdownResults = markdownTransformer(results, program, config);
        const tokens = marked.lexer(markdownResults);

        // Split generated Markdown into individual files per component
        const components = {};
        let current;
        for (const token of tokens) {
            if (token.type === 'heading' && token.depth === 1) {
                // This is the start of a component's markdown
                const name = token.text;
                current = {
                    name,
                    tokens: [],
                };
                current.tokens.links = {};
                const match = /^sp-(.*)/.exec(name);
                if (match) {
                    current.name = match[1];
                    components[name] = current;
                }
            } else {
                current.tokens.push(token);
            }
        }

        // Write the files
        for (const component of Object.values(components)) {
            const outputPath = path.join(outputDir, `${component.name}.html`);
            const html = this.parser.parse(component.tokens);
            fs.writeFile(outputPath, html, { encoding: 'utf8' });
        }

        return markdownResults;
    }

    // Custom rendering
    table(header, body) {
        return `
            <table class="spectrum-Table">
                <thead class="spectrum-Table-head">
                    ${header}
                </thead>
                <tbody class="spectrum-Table-body">
                    ${body}
                </tbody>
            </table>
        `;
    }

    tablecell(content, flags) {
        if (flags.header) {
            return `
                <th class="spectrum-Table-headCell">
                    ${content}
                </th>
            `;
        } else {
            return `
                <td class="spectrum-Table-cell">
                    ${content}
                </td>
            `;
        }
    }

    tablerow(content) {
        return `
            <tr class="spectrum-Table-row">
                ${content}
            </tr>
        `;
    }

    heading(text, level, raw, slugger) {
        let className = `spectrum-Heading${level}`;
        if (level <= 2) {
            className += '--quiet';
        }
        return `<p class=${className}>${text}</p>`;
    }
}

const command = new CustomAnalyzer();
command
    .run(
        {
            _: ['analyze', glob],
            outFile,
        },
        glob
    )
    .then(() => console.log(`Component data written to ${outFile}`));
