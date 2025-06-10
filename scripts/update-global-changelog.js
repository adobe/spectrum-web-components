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

/**
 * Global Changelog Generator
 *
 * This script generates and updates the project-wide CHANGELOG.md file by processing
 * changeset files. It extracts information about major, minor, and patch changes
 * from the individual changesets and organizes them into a formatted changelog entry.
 */

import { version as currentVersion } from '@spectrum-web-components/base/src/version.js';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert ESM __dirname equivalent
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoUrl = 'https://github.com/adobe/spectrum-web-components';

/**
 * Creates or updates the global CHANGELOG.md file based on changeset files.
 *
 * This function:
 * 1. Retrieves the current and previous version tags
 * 2. Checks if an entry for the current version already exists in the changelog
 * 3. Reads all changeset files and categorizes changes as major, minor, or patch
 * 4. Formats a new changelog entry with the categorized changes
 * 5. Updates the CHANGELOG.md file with the new entry
 *
 * This function should be run as part of the release process after prepublishOnly
 * but before changeset version to ensure the global changelog is updated with the latest changes.
 * It is automatically called by the `yarn changeset-publish` command.
 *
 * @returns {Promise<void>} A promise that resolves when the changelog is updated
 * @throws {Error} If there's an issue with git tags or file operations
 */
async function createGlobalChangelog() {
    // Validate the new version exists
    if (!currentVersion) {
        console.error('Error: currentVersion is undefined or empty');
        process.exit(1);
    }

    const currentTag = `v${currentVersion}`;
    let gitTag;

    // Confirm the current version has a git tag
    try {
        const gitTagOutput = execSync('git tag --sort=-creatordate');
        if (!gitTagOutput) {
            throw new Error('Git tag command returned empty output');
        }

        const gitTagList = gitTagOutput.toString().split('\n').filter(Boolean);
        if (gitTagList.length === 0) {
            throw new Error('No git tags found in repository');
        }

        gitTag = gitTagList.find((tag) => tag === currentTag);

        if (!gitTag) {
            throw new Error(
                'Could not find a matching tag for the current version'
            );
        }
    } catch (error) {
        console.error(`Failed to get current git tag: ${error.message}`);
        process.exit(1);
    }

    if (!gitTag) {
        console.error('No current version git tag found.');
        process.exit(1);
    }

    // Read all changesets from the .changeset directory
    const changesetDir = path.resolve(__dirname, '../.changeset');
    const changesetFiles = fs
        .readdirSync(changesetDir)
        .filter((file) => file.endsWith('.md') && file !== 'README.md');

    const majorChanges = [];
    const minorChanges = [];
    const patchChanges = [];

    // Process each changeset file to extract change information
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
            const isMajor = frontmatter.includes('major');
            const isMinor = frontmatter.includes('minor');
            // If not major or minor, it's a patch

            // Extract the package scope from the frontmatter
            const packageMatch = frontmatter.match(
                /'@spectrum-web-components\/([^']+)':|"@spectrum-web-components\/([^"]+)":/
            );
            // Extract component name from package name and prefix with "sp-"
            const match = packageMatch?.[1] || packageMatch?.[2];
            const scope = match ? `sp-${match}` : 'core';
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

    // Parse version into number array for potential version calculations
    const currentVersionParts = currentVersion
        .split('.')
        .map((part) => parseInt(part, 10));
    let nextVersion;

    // Calculate next version based on changes
    if (majorChanges.length > 0) {
        // Major version bump
        nextVersion = `${currentVersionParts[0] + 1}.0.0`;
    } else if (minorChanges.length > 0) {
        // Minor version bump
        nextVersion = `${currentVersionParts[0]}.${currentVersionParts[1] + 1}.0`;
    } else {
        // Patch version bump
        nextVersion = `${currentVersionParts[0]}.${currentVersionParts[1]}.${currentVersionParts[2] + 1}`;
    }

    const nextTag = `v${nextVersion}`;

    // Read the existing CHANGELOG.md to check for existing entries
    const changelogPath = path.resolve(__dirname, '../CHANGELOG.md');
    let existingChangelog = fs.existsSync(changelogPath)
        ? fs.readFileSync(changelogPath, 'utf-8')
        : '';

    // Check if this version already has an entry in the changelog
    const versionEntryPattern = new RegExp(
        `# \\[${nextVersion.replace(/\./g, '\\.')}\\]`
    );

    if (versionEntryPattern.test(existingChangelog)) {
        console.log(
            `⚠️ Version ${nextVersion} already has an entry in the CHANGELOG. Skipping update.`
        );
        process.exit(0);
    }

    // Format date for the changelog entry
    const date = new Date().toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    // Create comparison URL for viewing changes between versions
    const compareUrl = `${repoUrl}/compare/${currentTag}...${nextTag}`;

    // Skip if no changes are found
    if (!majorChanges.length && !minorChanges.length && !patchChanges.length) {
        console.log('🚫 No changes to add to the changelog.');
        process.exit(0);
    }

    // Format new changelog entry with version, date, and comparison link
    let newEntry = `# [${nextVersion}](${compareUrl}) (${date})\n\n`;

    // Add categorized changes to the entry
    if (majorChanges.length) {
        newEntry += `## Major Changes\n\n${majorChanges.join('\n')}\n\n`;
    }

    if (minorChanges.length) {
        newEntry += `## Minor Changes\n\n${minorChanges.join('\n')}\n\n`;
    }

    if (patchChanges.length) {
        newEntry += `## Patch Changes\n\n${patchChanges.join('\n')}\n\n`;
    }

    // Preserve the header if it exists in the current changelog
    let headerText = '';
    const headerMatch = existingChangelog.match(
        /^(# ChangeLog\n\n[\s\S]+?(?=\n\n# \[))/
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

    // Write the updated changelog with the new entry
    fs.writeFileSync(
        changelogPath,
        `${headerText}\n\n${newEntry.trim()}\n\n${existingChangelog.trim()}`,
        'utf-8'
    );
    console.log(`✅ CHANGELOG updated for ${nextVersion}`);
}

// Execute the function and handle any errors
createGlobalChangelog().catch((error) => {
    console.error('Error updating changelog:', error);
    process.exit(1);
});
