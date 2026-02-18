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
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.resolve(__dirname, '../content');
const outputPath = path.resolve(contentDir, 'llms.txt');

/**
 * Derives a short description from a component content.md (first paragraph after ## Overview).
 */
function getComponentDescription(contentPath) {
    try {
        const raw = fs.readFileSync(contentPath, 'utf8');
        const afterFrontMatter = raw.replace(/^---[\s\S]*?---\s*/m, '').trim();
        const overviewMatch = afterFrontMatter.match(/##\s+Overview\s*\n+([^\n#]+)/);
        const firstLine = overviewMatch ? overviewMatch[1].trim() : null;
        if (firstLine && firstLine.length < 120) {return firstLine;}
        if (firstLine) {return firstLine.slice(0, 117) + '...';}
    } catch {
        // ignore
    }
    return '1st-gen component documentation';
}

/**
 * Converts directory name to title (e.g. color-wheel -> Color Wheel).
 */
function nameToTitle(name) {
    return name
        .replace(/(^|-)(\w)/g, (_, p, c) => (p === '-' ? ' ' : '') + c.toUpperCase())
        .replace('Ui', 'UI');
}

function main() {
    const sections = [];

    // Title and description (llms.txt spec)
    sections.push(`# Spectrum Web Components

> Adobe's web component library implementing the Spectrum design system. Covers both 1st-gen (@spectrum-web-components/) and 2nd-gen (@adobe/swc) packages.
`);

    // Getting started
    sections.push(`## Getting started

- [Getting started](getting-started.md): Install and use Spectrum Web Components
- [Migrating to Spectrum 2](migrating-to-spectrum2.md): Migration from Spectrum 1 to 2
- [Dev mode](dev-mode.md): Development workflow
`);

    // Guides
    const guidesDir = path.join(contentDir, 'guides');
    if (fs.existsSync(guidesDir)) {
        const guideFiles = fs.readdirSync(guidesDir).filter((f) => f.endsWith('.md'));
        if (guideFiles.length) {
            sections.push('');
            sections.push('## Guides');
            const guideTitles = {
                'adding-component.md': 'Adding a component',
                'configuring-openwc.md': 'Configuring OpenWC',
                'generating-components.md': 'Generating components',
                'styling-components.md': 'Styling components',
                'writing-changesets.md': 'Writing changesets',
            };
            for (const f of guideFiles.sort()) {
                const title = guideTitles[f] || nameToTitle(f.replace('.md', '').replace(/-/g, ' '));
                sections.push(`- [${title}](guides/${f})`);
            }
        }
    }

    // 1st-gen components (from content/components/*/content.md)
    const componentsDir = path.join(contentDir, 'components');
    if (fs.existsSync(componentsDir)) {
        const componentDirs = fs
            .readdirSync(componentsDir, { withFileTypes: true })
            .filter((d) => d.isDirectory())
            .map((d) => d.name)
            .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

        if (componentDirs.length) {
            sections.push('');
            sections.push('## Components (1st-gen)');
            for (const name of componentDirs) {
                const contentPath = path.join(componentsDir, name, 'content.md');
                if (!fs.existsSync(contentPath)) {continue;}
                const desc = getComponentDescription(contentPath);
                const title = nameToTitle(name);
                sections.push(`- [${title}](components/${name}.md): ${desc}`);
            }
        }
    }

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, sections.join('\n'), 'utf8');
}

main();
