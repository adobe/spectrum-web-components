/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { globSync } from 'glob';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const swcRoot = path.resolve(dirname, '..');
const componentsDir = path.join(swcRoot, 'components');
const storyPattern = path.join(componentsDir, '*/stories/*.stories.ts');
const importLine =
    "import { applyStoryTests } from '../../../utils/storybook-tests.js';";

const applyStoryTestsCall = (storyNames) => {
    const lines = storyNames.map((name) => `    ${name},`).join('\n');
    return `applyStoryTests(import.meta.url, {\n${lines}\n});\n`;
};

const getStoryExportNames = (content) => {
    const matches = [...content.matchAll(/export const (\w+)/g)];
    return matches.map((match) => match[1]);
};

const insertImport = (content) => {
    const importMatches = [...content.matchAll(/^import .*;$/gm)];
    if (importMatches.length === 0) {
        return `${importLine}\n${content}`;
    }

    const lastImport = importMatches[importMatches.length - 1];
    const insertAt = lastImport.index + lastImport[0].length;
    return `${content.slice(0, insertAt)}\n${importLine}${content.slice(
        insertAt
    )}`;
};

const upsertApplyCall = (content, storyNames) => {
    const applyCall = applyStoryTestsCall(storyNames);
    const applyCallRegex =
        /applyStoryTests\(\s*import\.meta\.url\s*,\s*\{[\s\S]*?\}\s*\);/m;

    if (applyCallRegex.test(content)) {
        return content.replace(applyCallRegex, applyCall.trim());
    }

    const trimmed = content.replace(/\s*$/, '');
    return `${trimmed}\n\n${applyCall}`;
};

const syncStoryFile = async (storyFile) => {
    const testFile = storyFile
        .replace(`${path.sep}stories${path.sep}`, `${path.sep}test${path.sep}`)
        .replace(/\.stories\.ts$/, '.test.ts');

    try {
        await fs.access(testFile);
    } catch {
        return;
    }

    const content = await fs.readFile(storyFile, 'utf8');
    const storyNames = getStoryExportNames(content);
    if (storyNames.length === 0) {
        return;
    }

    let updated = content;
    if (!updated.includes(importLine)) {
        updated = insertImport(updated);
    }

    updated = upsertApplyCall(updated, storyNames);

    if (updated !== content) {
        await fs.writeFile(storyFile, updated);
    }
};

const storyFiles = globSync(storyPattern, { nodir: true });

await Promise.all(storyFiles.map((storyFile) => syncStoryFile(storyFile)));
