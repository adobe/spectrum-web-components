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
 *
 * Generates the 2nd-gen llms.txt: component index with links to 2nd-gen component .md
 * files. Distinct from the 1st-gen llms.txt (build-llms-txt.js).
 *
 * Usage:
 * node build-llms-txt-2nd-gen.js [--components-dir=<path>] [--output=<path>]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const argv = Object.fromEntries(
  process.argv
    .slice(2)
    .filter((a) => a.startsWith('--'))
    .map((a) => {
      const [k, v] = a.replace(/^--/, '').split('=');
      return [k, v ?? true];
    })
);

const componentsDir = path.resolve(
  argv['components-dir'] ?? path.join(__dirname, '../../swc/components')
);
const outputPath = path.resolve(
  argv.output ?? path.join(__dirname, 'dist', 'llms.txt')
);

function getSecondGenSubtitle(componentName) {
  const storiesDir = path.join(componentsDir, componentName, 'stories');
  if (!fs.existsSync(storiesDir)) {
    return null;
  }
  const files = fs
    .readdirSync(storiesDir)
    .filter((f) => f.endsWith('.stories.ts'));
  const storyFile = files.find((f) => f.startsWith(componentName)) || files[0];
  if (!storyFile) {
    return null;
  }
  try {
    const raw = fs.readFileSync(path.join(storiesDir, storyFile), 'utf8');
    const match = raw.match(/subtitle:\s*`([^`]+)`/);
    return match ? match[1].trim() : null;
  } catch {
    return null;
  }
}

function nameToTitle(name) {
  return name
    .replace(
      /(^|-)(\w)/g,
      (_, p, c) => (p === '-' ? ' ' : '') + c.toUpperCase()
    )
    .replace('Ui', 'UI');
}

function main() {
  const sections = [];

  sections.push(`# Spectrum Web Components (2nd-gen)

> 2nd-gen (@adobe/swc) component library implementing the Spectrum design system.
> This index lists components and links to their static documentation.
`);

  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, sections.join('\n'), 'utf8');
    return;
  }

  const dirs = fs
    .readdirSync(componentsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => fs.existsSync(path.join(componentsDir, name, 'stories')))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  if (dirs.length) {
    sections.push('');
    sections.push('## Components');
    for (const name of dirs) {
      const desc =
        getSecondGenSubtitle(name) || '2nd-gen component documentation';
      const title = nameToTitle(name);
      const mdPath = `2nd-gen/components/${name}.md`;
      sections.push(`- [${title}](${mdPath}): ${desc}`);
    }
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, sections.join('\n'), 'utf8');
}

main();
