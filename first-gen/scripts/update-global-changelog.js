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

/**
 * Global Changelog Generator
 *
 * This script generates and updates changelogs for first-gen Spectrum Web Components
 * and @swc/core by processing changeset files. It extracts information about major,
 * minor, and patch changes from individual changesets and organizes them into
 * formatted changelog entries for each target:
 *   - first-gen Spectrum Web Components → first-gen/CHANGELOG.md
 *   - @swc/core                         → second-gen/packages/core/CHANGELOG.md
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
    const changesetDir = path.resolve(__dirname, '../../.changeset');
    const changesetFiles = fs
        .readdirSync(changesetDir)
        .filter((file) => file.endsWith('.md') && file !== 'README.md');

    const majorChanges = [];
    const minorChanges = [];
    const patchChanges = [];

    // Buckets for @swc/core-only changes (not included in first-gen/global)
    const coreMajorChanges = [];
    const coreMinorChanges = [];
    const corePatchChanges = [];

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

            // Clean up the description text
            const cleanDescription = description.trim();

            // ---- First-gen SWC: only @spectrum-web-components/* go to the global (first-gen) changelog ----
            for (const match of frontmatter.matchAll(
                /['"]@spectrum-web-components\/([^'"]+)['"]:\s*(major|minor|patch)/g
            )) {
                const componentName = match[1];
                const changeType = match[2];
                const scope = `sp-${componentName}`;
                const entry = `**${scope}**: ${cleanDescription}\n\n`;

                if (changeType === 'major') {
                    majorChanges.push(entry);
                } else if (changeType === 'minor') {
                    minorChanges.push(entry);
                } else {
                    patchChanges.push(entry);
                }
            }

            // ---- Core: only @swc/core goes to the core changelog (included in secon-gen) ----
            for (const match of frontmatter.matchAll(
                /['"]@swc\/core['"]:\s*(major|minor|patch)/g
            )) {
                const changeType = match[1]; // captured group: major|minor|patch
                const entry = `${cleanDescription}\n\n`; // no scope prefix in core changelog

                if (changeType === 'major') {
                    coreMajorChanges.push(entry);
                } else if (changeType === 'minor') {
                    coreMinorChanges.push(entry);
                } else {
                    corePatchChanges.push(entry);
                }
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

    // Format date for the changelog entry
    const date = new Date().toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

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
            `⚠️ Version ${nextVersion} already has an entry in the CHANGELOG. Skipping global update.`
        );
        // Don't exit here - we still want to check for core changes
    } else {
        // Create comparison URL for viewing changes between versions
        const compareUrl = `${repoUrl}/compare/${currentTag}...${nextTag}`;

        // Skip if no changes are found
        if (
            !majorChanges.length &&
            !minorChanges.length &&
            !patchChanges.length
        ) {
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
            existingChangelog = existingChangelog.substring(
                headerMatch[0].length
            );
        } else if (existingChangelog.startsWith('# Change Log')) {
            // Handle case where there might not be any versions yet
            const simpleHeaderMatch = existingChangelog.match(
                /^(# Change Log\n\n[\s\S]+?)(?=\n\n|$)/
            );
            if (simpleHeaderMatch) {
                headerText = simpleHeaderMatch[1];
                existingChangelog = existingChangelog.substring(
                    headerText.length
                );
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

    // Also update the @swc/core individual changelog if there are core changes
    const coreChangelogPath = path.resolve(
        __dirname,
        '../../second-gen/packages/core/CHANGELOG.md'
    );

    if (
        coreMajorChanges.length ||
        coreMinorChanges.length ||
        corePatchChanges.length
    ) {
        // Get the actual @swc/core package version
        const corePackageJson = JSON.parse(
            fs.readFileSync(
                path.resolve(
                    __dirname,
                    '../../second-gen/packages/core/package.json'
                ),
                'utf8'
            )
        );
        const coreCurrentVersion = corePackageJson.version;

        // Calculate next version for core package
        const coreCurrentVersionParts = coreCurrentVersion
            .split('.')
            .map((part) => parseInt(part, 10));
        let coreNextVersion;
        if (coreMajorChanges.length) {
            coreNextVersion = `${coreCurrentVersionParts[0] + 1}.0.0`;
        } else if (coreMinorChanges.length) {
            coreNextVersion = `${coreCurrentVersionParts[0]}.${coreCurrentVersionParts[1] + 1}.0`;
        } else {
            coreNextVersion = `${coreCurrentVersionParts[0]}.${coreCurrentVersionParts[1]}.${coreCurrentVersionParts[2] + 1}`;
        }

        const coreCurrentTag = `@swc/core@${coreCurrentVersion}`;
        const coreNextTag = `@swc/core@${coreNextVersion}`;
        const coreCompareUrl = `${repoUrl}/compare/${coreCurrentTag}...${coreNextTag}`;

        // Check if this version already has an entry in the core changelog
        let existingCoreChangelog = fs.existsSync(coreChangelogPath)
            ? fs.readFileSync(coreChangelogPath, 'utf-8')
            : '';

        const coreVersionEntryPattern = new RegExp(
            `## \\[${coreNextVersion.replace(/\\./g, '\\\\.')}\\]`
        );
        if (coreVersionEntryPattern.test(existingCoreChangelog)) {
            console.log(
                `⚠️ Version ${coreNextVersion} already has an entry in the @swc/core CHANGELOG. Skipping core update.`
            );
        } else {
            // Build core changelog entry (## version, ### sections)
            let newCoreEntry = `## [${coreNextVersion}](${coreCompareUrl}) (${date})\n\n`;

            if (coreMajorChanges.length) {
                newCoreEntry += `### Major Changes\n\n${coreMajorChanges.join('\n')}\n\n`;
            }
            if (coreMinorChanges.length) {
                newCoreEntry += `### Minor Changes\n\n${coreMinorChanges.join('\n')}\n\n`;
            }
            if (corePatchChanges.length) {
                newCoreEntry += `### Patch Changes\n\n${corePatchChanges.join('\n')}\n\n`;
            }

            // Preserve the header if it exists in the current core changelog (reuse same logic)
            let coreHeaderText = '';
            const coreHeaderMatch = existingCoreChangelog.match(
                /^(# ChangeLog\n\n[\s\S]+?(?=\n\n## \[))/
            );
            if (coreHeaderMatch) {
                coreHeaderText = coreHeaderMatch[1];
                existingCoreChangelog = existingCoreChangelog.substring(
                    coreHeaderMatch[0].length
                );
            } else if (existingCoreChangelog.startsWith('# Change Log')) {
                const coreSimpleHeaderMatch = existingCoreChangelog.match(
                    /^(# Change Log\n\n[\s\S]+?)(?=\n\n|$)/
                );
                if (coreSimpleHeaderMatch) {
                    coreHeaderText = coreSimpleHeaderMatch[1];
                    existingCoreChangelog = existingCoreChangelog.substring(
                        coreHeaderText.length
                    );
                }
            }

            fs.writeFileSync(
                coreChangelogPath,
                `${coreHeaderText}\n\n${newCoreEntry.trim()}\n\n${existingCoreChangelog.trim()}`,
                'utf-8'
            );
            console.log(
                `✅ @swc/core CHANGELOG updated for ${coreNextVersion}`
            );
        }
    } else {
        console.log('ℹ️ No @swc/core changes to add to the core changelog.');
    }
}

// Execute the function and handle any errors
createGlobalChangelog().catch((error) => {
    console.error('Error updating changelog:', error);
    process.exit(1);
});
