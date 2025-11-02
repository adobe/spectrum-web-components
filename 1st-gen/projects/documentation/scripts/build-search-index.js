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

import fs from 'fs-extra';
import globby from 'globby';
import lunr from 'lunr';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define file paths for the project, local build, and distribution directories
const projectDir = path.resolve(__dirname, '..', '..', '..');
const localDir = path.resolve(projectDir, 'projects/documentation/_site/src/');
const devDir = path.resolve(projectDir, 'projects/documentation/');
const buildDir = path.resolve(projectDir, 'projects/documentation/dist');
const localIndexPath = path.resolve(localDir, 'searchIndex.json');
const devIndexPath = path.resolve(devDir, 'searchIndex.json');
const buildIndexPath = path.resolve(buildDir, 'searchIndex.json');

// Create necessary directories if they don't exist
fs.mkdirSync(localDir, { recursive: true });
fs.mkdirSync(buildDir, { recursive: true });
fs.mkdirSync(devDir, { recursive: true });
/**
 * Converts kebab-case names to Title Case with spaces
 * Example: "color-picker" becomes "Color Picker"
 *
 * @param {string} name - The component/page name in kebab-case
 * @returns {string} The formatted title
 */
function nameToTitle(name) {
    return name.replace(/((^|-)(\w))/gm, (match, p1, p2, p3) => {
        let result = p3.toUpperCase();
        if (p2 === '-') {
            result = ` ${result}`;
        }
        return result;
    });
}

/**
 * Main function to build the search index
 * Processes markdown files from various directories, extracts their content,
 * and builds a lunr search index that's saved to both local and build directories
 */
async function main() {
    // Array to hold all documents for the search index
    const documents = [];

    // Process Component documentation
    for await (const path of globby.stream(`${projectDir}/packages/**/*.md`, {
        ignore: ['**/node_modules/**'],
    })) {
        // Extract component name from the file path
        let componentName = /([^/]+)\/([a-zA-Z-]+)\.md$/.exec(path)[1];
        const fileName = /([a-zA-Z-]+)\.md$/.exec(path)[0];

        // Skip changelog files
        if (fileName === 'CHANGELOG.md') {
            continue;
        }

        // For non-README files, use the file name (without extension) as component name
        if (fileName !== 'README.md') {
            componentName = fileName.replace('.md', '');
        }

        // Read and process the markdown content
        const content = await fs.readFile(path, { encoding: 'utf8' });
        // Remove code blocks from the indexed content
        const body = content.replace(/```((.|\s)*?)```/g, '');
        const title = nameToTitle(componentName);

        // Add document to the index with appropriate metadata
        documents.push({
            title,
            body,
            metadata: JSON.stringify({
                category: 'Components',
                name: title,
                url: `/${
                    process.env.SWC_DIR ? `${process.env.SWC_DIR}/` : ''
                }components/${componentName}`,
            }),
        });
    }

    // Process Tools documentation
    for await (const path of globby.stream(`${projectDir}/tools/**/*.md`, {
        ignore: ['**/node_modules/**'],
    })) {
        // Similar processing as components, but for tools
        let componentName = /([^/]+)\/([a-zA-Z-]+)\.md$/.exec(path)[1];
        const fileName = /([a-zA-Z-]+)\.md$/.exec(path)[0];
        if (fileName === 'CHANGELOG.md') {
            continue;
        }
        if (fileName !== 'README.md') {
            componentName = fileName.replace('.md', '');
        }
        const content = await fs.readFile(path, { encoding: 'utf8' });
        const body = content.replace(/```((.|\s)*?)```/g, '');
        const title = nameToTitle(componentName);
        documents.push({
            title,
            body,
            metadata: JSON.stringify({
                category: 'Tools',
                name: title,
                url: `/${
                    process.env.SWC_DIR ? `${process.env.SWC_DIR}/` : ''
                }tools/${componentName}`,
            }),
        });
    }

    // Process Guides and other documentation pages
    for await (const path of globby.stream(
        [
            `${projectDir}/projects/documentation/content/guides/*.md`,
            `${projectDir}/projects/documentation/content/migrations/*.md`,
            `${projectDir}/projects/documentation/content/getting-started.md`,
            `${projectDir}/projects/documentation/content/dev-mode.md`,
            `${projectDir}/projects/documentation/content/registry-conflicts.md`,
        ],
        {
            ignore: ['**/node_modules/**'],
        }
    )) {
        // Extract guide name and directory from the path
        const guideName = /\/([^/]+).md$/.exec(path)[1];
        const guideDir = path.split('/').at(-2);
        const content = await fs.readFile(path, { encoding: 'utf8' });
        const body = content.replace(/```((.|\s)*?)```/g, '');
        const title = nameToTitle(guideName);

        // Add guides to the index with proper category and URL
        documents.push({
            title,
            body,
            metadata: JSON.stringify({
                category: 'Guides',
                name: title,
                url: `/${process.env.SWC_DIR ? `${process.env.SWC_DIR}/` : ''}${
                    guideDir !== 'content' ? `${guideDir}/` : ''
                }${guideName}`,
            }),
        });
    }

    // Create the lunr search index
    const index = lunr(function () {
        // Configure the index fields
        this.ref('metadata');
        // Boost title field for higher relevance when matching titles
        this.field('title', { boost: 50 });
        this.field('body');
        this.field('category', { boost: 10 });

        // Add all documents to the index
        for (const document of documents) {
            this.add(document);
        }
    });

    // Write the serialized index to both local and build directories
    await fs.writeFile(localIndexPath, JSON.stringify(index));
    await fs.writeFile(buildIndexPath, JSON.stringify(index));
    await fs.writeFile(devIndexPath, JSON.stringify(index));
}

// Execute the main function
main();
