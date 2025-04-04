/*
Copyright 2025 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.

*/

import fs from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoUrl = 'https://github.com/adobe/spectrum-web-components';

const pkg = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8')
);
const newVersion = pkg.version;
const newTag = `v${newVersion}`;
const prevTag = execSync('git tag --sort=-creatordate')
    .toString()
    .split('\n')
    .filter(Boolean)
    .find((tag) => tag !== newTag);

if (!prevTag) {
    console.error('No previous tag found.');
    process.exit(1);
}

const date = new Date().toISOString().split('T')[0];
const compareUrl = `${repoUrl}/compare/${prevTag}...${newTag}`;
const commitLogs = execSync(`git log ${prevTag}..HEAD --pretty=format:"%s|%h"`)
    .toString()
    .trim();

const commits = commitLogs.split('\n').map((line) => {
    const [message, hash] = line.split('|');
    return { message, hash };
});

const features = [];
const fixes = [];

commits.forEach(({ message, hash }) => {
    const typeMatch = message.match(/^(feat|fix)\(([^)]+)\):\s*(.+)/i);
    if (typeMatch) {
        const [, type, scope, description] = typeMatch;
        const entry = `-   **${scope}**: ${description} ([\`${hash}\`](${repoUrl}/commit/${hash}))`;
        if (type === 'feat') {
            features.push(entry);
        } else if (type === 'fix') {
            fixes.push(entry);
        }
    }
});

// Skip if nothing relevant
if (!features.length && !fixes.length) {
    console.log('🚫 No new feat() or fix() commits to add.');
    process.exit(0);
}

// Format new changelog entry
let newEntry = `# [${newVersion}](${compareUrl}) (${date})\n\n`;

if (fixes.length) {
    newEntry += `### Bug Fixes\n\n${fixes.join('\n')}\n\n`;
}

if (features.length) {
    newEntry += `### Features\n\n${features.join('\n')}\n\n`;
}

// Prepend to existing CHANGELOG.md
const changelogPath = path.resolve(__dirname, '../CHANGELOG.md');
const existingChangelog = fs.existsSync(changelogPath)
    ? fs.readFileSync(changelogPath, 'utf-8')
    : '';

fs.writeFileSync(
    changelogPath,
    `${newEntry.trim()}\n\n${existingChangelog}`,
    'utf-8'
);
console.log(`✅ CHANGELOG updated for ${newVersion}`);
