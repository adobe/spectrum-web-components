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
import { version as newVersion } from '@spectrum-web-components/base/src/version.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoUrl = 'https://github.com/adobe/spectrum-web-components';

/**
 * Creates or updates the global CHANGELOG.md file based on changeset files.
 * This function should be run as part of the release process after changeset version
 * but before publishing to ensure the global changelog is updated with the latest changes.
 * It is automatically called by the `yarn changeset-publish` command.
 * @returns {Promise<void>} A promise that resolves when the changelog is updated
 * @throws {Error} If there's an issue with git tags or file operations
 */
async function createGlobalChangelog() {
    if (!newVersion) {
        console.error('Error: newVersion is undefined or empty');
        process.exit(1);
    }
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
    // Read all changesets from the .changeset directory
    const changesetDir = path.resolve(__dirname, '../.changeset');
    const changesetFiles = fs
        .readdirSync(changesetDir)
        .filter((file) => file.endsWith('.md') && file !== 'README.md');

    const majorChanges = [];
    const minorChanges = [];
    const patchChanges = [];

    // Process each changeset file
    for (const file of changesetFiles) {
        const filePath = path.join(changesetDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');

        // Extract the frontmatter from the changeset
        const frontmatterMatch = content.match(
            /---\n([\s\S]*?)\n---\n([\s\S]*)/
        );

        if (frontmatterMatch) {
            const [, frontmatter, description] = frontmatterMatch;

            // Parse the frontmatter to determine the change type
            console.log(frontmatter);
            const isMajor = frontmatter.includes('major');
            const isMinor = frontmatter.includes('minor');
            // If not major or minor, it's a patch

            // Extract the package scope from the frontmatter
            const packageMatch = frontmatter.match(
                /'@spectrum-web-components\/([^']+)':|"@spectrum-web-components\/([^"]+)":/
            );
            // Extract component name from package name and prefix with "sp-"
            const scope = packageMatch ? `sp-${packageMatch[1]}` : 'core';
            // Clean up the description text
            const cleanDescription = description.trim();

            // Create the entry (without commit hash since we're using changesets)
            const entry = `**${scope}**: ${cleanDescription}\n\n`;

            // Categorize based on semver bump type
            if (isMajor) {
                majorChanges.push(entry);
            } else if (isMinor) {
                minorChanges.push(entry);
            } else {
                patchChanges.push(entry);
            }
        }
    }

    // Skip if nothing relevant
    if (!majorChanges.length && !minorChanges.length && !patchChanges.length) {
        console.log('🚫 No changes to add to the changelog.');
        process.exit(0);
    }

    // Format new changelog entry
    let newEntry = `# [${newVersion}](${compareUrl}) (${date})\n\n`;

    if (majorChanges.length) {
        newEntry += `## Major Changes\n\n${majorChanges.join('\n')}\n\n`;
    }

    if (minorChanges.length) {
        newEntry += `## Minor Changes\n\n${minorChanges.join('\n')}\n\n`;
    }

    if (patchChanges.length) {
        newEntry += `## Patch Changes\n\n${patchChanges.join('\n')}\n\n`;
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
