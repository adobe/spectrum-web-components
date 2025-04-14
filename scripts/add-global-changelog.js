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
import { version as newVersion } from '../tools/base/src/version.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoUrl = 'https://github.com/adobe/spectrum-web-components';

async function createGlobalChangelog() {
    const newTag = `v${newVersion}`;
    let prevTag;
    try {
        const gitTagOutput = execSync('git tag --sort=-creatordate');
        if (!gitTagOutput) {
            throw new Error('Git tag command returned empty output');
        }

        const tagList = gitTagOutput.toString().split('\n').filter(Boolean);
        if (tagList.length === 0) {
            throw new Error('No git tags found in repository');
        }

        prevTag = tagList.find((tag) => tag !== newTag);
        if (!prevTag) {
            throw new Error(
                'Could not find a previous tag different from the new tag'
            );
        }
    } catch (error) {
        console.error(`Failed to get previous git tag: ${error.message}`);
        process.exit(1);
    }

    if (!prevTag) {
        console.error('No previous tag found.');
        process.exit(1);
    }

    // Read the existing CHANGELOG.md early to check for existing entries
    const changelogPath = path.resolve(__dirname, '../CHANGELOG.md');
    let existingChangelog = fs.existsSync(changelogPath)
        ? fs.readFileSync(changelogPath, 'utf-8')
        : '';

    // Check if this version already has an entry in the changelog
    const versionEntryPattern = new RegExp(
        `# \\[${newVersion.replace(/\./g, '\\.')}\\]`
    );
    if (versionEntryPattern.test(existingChangelog)) {
        console.log(
            `⚠️ Version ${newVersion} already has an entry in the CHANGELOG. Skipping update.`
        );
        process.exit(0);
    }

    const date = new Date().toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    // We need to use a stable release tag (not a pre-release/beta) for the comparison URL
    // to ensure the changelog shows changes between proper semver releases
    const compareUrl = `${repoUrl}/compare/${prevTag}...${newTag}`;
    const commitLogs = execSync(
        `git log ${prevTag}..HEAD --pretty=format:"%s|%h"`
    )
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

    // Preserve the header if it exists
    let headerText = '';
    const headerMatch = existingChangelog.match(
        /^(# Change Log\n\n[\s\S]+?(?=\n\n# \[))/
    );
    if (headerMatch) {
        headerText = headerMatch[1];
        existingChangelog = existingChangelog.substring(headerMatch[0].length);
    } else if (existingChangelog.startsWith('# Change Log')) {
        // Handle case where there might not be any versions yet
        const simpleHeaderMatch = existingChangelog.match(
            /^(# Change Log\n\n[\s\S]+?)(?=\n\n|$)/
        );
        if (simpleHeaderMatch) {
            headerText = simpleHeaderMatch[1];
            existingChangelog = existingChangelog.substring(headerText.length);
        }
    }

    fs.writeFileSync(
        changelogPath,
        `${headerText}\n\n${newEntry.trim()}\n\n${existingChangelog.trim()}`,
        'utf-8'
    );
    console.log(`✅ CHANGELOG updated for ${newVersion}`);
}

createGlobalChangelog().catch((error) => {
    console.error('Error updating changelog:', error);
    process.exit(1);
});
