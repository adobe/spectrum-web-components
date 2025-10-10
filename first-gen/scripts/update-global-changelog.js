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
 * Processes changeset files to generate and update changelogs for:
 * - first-gen Spectrum Web Components → first-gen/CHANGELOG.md
 * - @swc/core → second-gen/packages/core/CHANGELOG.md
 *
 * Extracts major, minor, and patch changes from changesets and formats them
 * into organized changelog entries.
 */

import { version as currentVersion } from '@spectrum-web-components/base/src/version.js';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoUrl = 'https://github.com/adobe/spectrum-web-components';

/**
 * Validates that the current version exists and has a corresponding git tag
 * @returns {string} The current git tag
 * @throws {Error} If validation fails
 */
function validateCurrentVersion() {
    if (!currentVersion) {
        console.error('Error: currentVersion is undefined or empty');
        process.exit(1);
    }

    const currentTag = `v${currentVersion}`;
    try {
        const gitTagOutput = execSync('git tag --sort=-creatordate');
        if (!gitTagOutput) {
            throw new Error('Git tag command returned empty output');
        }

        const gitTagList = gitTagOutput.toString().split('\n').filter(Boolean);
        if (gitTagList.length === 0) {
            throw new Error('No git tags found in repository');
        }

        const gitTag = gitTagList.find((tag) => tag === currentTag);
        if (!gitTag) {
            throw new Error(
                'Could not find a matching tag for the current version'
            );
        }
        return currentTag;
    } catch (error) {
        console.error(`Failed to get current git tag: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Processes changeset files and categorizes changes by type and target
 * @returns {Object} Object containing categorized changes for both first-gen and core
 */
function processChangesets() {
    const changesetDir = path.resolve(__dirname, '../../.changeset');
    const changesetFiles = fs
        .readdirSync(changesetDir)
        .filter((file) => file.endsWith('.md') && file !== 'README.md');

    const majorChanges = [];
    const minorChanges = [];
    const patchChanges = [];
    const coreMajorChanges = [];
    const coreMinorChanges = [];
    const corePatchChanges = [];

    for (const file of changesetFiles) {
        const filePath = path.join(changesetDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');

        const frontmatterMatch = content.match(
            /---\n([\s\S]*?)\n---\n([\s\S]*)/
        );
        if (frontmatterMatch) {
            const [, frontmatter, description] = frontmatterMatch;
            const cleanDescription = description.trim();

            // "@spectrum-web-components" (first-gen components)
            // go to first-gen global changelog
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

            // @swc/core changes go to core changelog
            for (const match of frontmatter.matchAll(
                /['"]@swc\/core['"]:\s*(major|minor|patch)/g
            )) {
                const changeType = match[1];
                const entry = `${cleanDescription}\n\n`;

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

    return {
        firstGen: { majorChanges, minorChanges, patchChanges },
        core: {
            majorChanges: coreMajorChanges,
            minorChanges: coreMinorChanges,
            patchChanges: corePatchChanges,
        },
    };
}

/**
 * Calculates the next version based on change types
 * @param {string} currentVersion - Current version string
 * @param {Array} majorChanges - Array of major changes
 * @param {Array} minorChanges - Array of minor changes
 * @returns {string} Next version string
 */
function calculateNextVersion(currentVersion, majorChanges, minorChanges) {
    const currentVersionParts = currentVersion
        .split('.')
        .map((part) => parseInt(part, 10));

    if (majorChanges.length > 0) {
        return `${currentVersionParts[0] + 1}.0.0`;
    } else if (minorChanges.length > 0) {
        return `${currentVersionParts[0]}.${currentVersionParts[1] + 1}.0`;
    } else {
        return `${currentVersionParts[0]}.${currentVersionParts[1]}.${currentVersionParts[2] + 1}`;
    }
}

/**
 * Extracts and preserves the header from an existing changelog
 * @param {string} changelogContent - The existing changelog content
 * @returns {Object} Object with headerText and remaining content
 */
function extractChangelogHeader(changelogContent) {
    let headerText = '';
    let remainingContent = changelogContent;

    const headerMatch = changelogContent.match(
        /^(# ChangeLog\n\n[\s\S]+?(?=\n\n# \[))/
    );
    if (headerMatch) {
        headerText = headerMatch[1];
        remainingContent = changelogContent.substring(headerMatch[0].length);
    } else if (changelogContent.startsWith('# Change Log')) {
        const simpleHeaderMatch = changelogContent.match(
            /^(# Change Log\n\n[\s\S]+?)(?=\n\n|$)/
        );
        if (simpleHeaderMatch) {
            headerText = simpleHeaderMatch[1];
            remainingContent = changelogContent.substring(headerText.length);
        }
    }

    return { headerText, remainingContent };
}

/**
 * Builds a changelog entry with categorized changes
 * @param {string} version - Version string
 * @param {string} compareUrl - URL for comparing versions
 * @param {string} date - Date string
 * @param {Object} changes - Object containing major, minor, and patch changes
 * @param {string} headerLevel - Header level for change sections (## or ###)
 * @returns {string} Formatted changelog entry
 */
function buildChangelogEntry(
    version,
    compareUrl,
    date,
    changes,
    headerLevel = '##'
) {
    const { majorChanges, minorChanges, patchChanges } = changes;
    let entry = `# [${version}](${compareUrl}) (${date})\n\n`;

    if (majorChanges.length) {
        entry += `${headerLevel} Major Changes\n\n${majorChanges.join('\n')}\n\n`;
    }
    if (minorChanges.length) {
        entry += `${headerLevel} Minor Changes\n\n${minorChanges.join('\n')}\n\n`;
    }
    if (patchChanges.length) {
        entry += `${headerLevel} Patch Changes\n\n${patchChanges.join('\n')}\n\n`;
    }

    return entry;
}

/**
 * Updates a changelog file with a new entry
 * @param {string} changelogPath - Path to the changelog file
 * @param {string} version - Version string
 * @param {string} compareUrl - URL for comparing versions
 * @param {string} date - Date string
 * @param {Object} changes - Object containing categorized changes
 * @param {string} headerLevel - Header level for change sections
 * @param {string} versionPattern - Regex pattern for version entries
 * @param {string} skipMessage - Message to show when skipping update
 * @param {string} successMessage - Message to show when update succeeds
 */
function updateChangelogFile(
    changelogPath,
    version,
    compareUrl,
    date,
    changes,
    headerLevel = '##',
    versionPattern,
    skipMessage,
    successMessage
) {
    let existingChangelog = fs.existsSync(changelogPath)
        ? fs.readFileSync(changelogPath, 'utf-8')
        : '';

    const versionEntryPattern = new RegExp(versionPattern);
    if (versionEntryPattern.test(existingChangelog)) {
        console.log(skipMessage);
        return;
    }

    const { majorChanges, minorChanges, patchChanges } = changes;
    if (!majorChanges.length && !minorChanges.length && !patchChanges.length) {
        console.log('🚫 No changes to add to the changelog.');
        process.exit(0);
    }

    const newEntry = buildChangelogEntry(
        version,
        compareUrl,
        date,
        changes,
        headerLevel
    );
    const { headerText, remainingContent } =
        extractChangelogHeader(existingChangelog);

    fs.writeFileSync(
        changelogPath,
        `${headerText}\n\n${newEntry.trim()}\n\n${remainingContent.trim()}`,
        'utf-8'
    );
    console.log(successMessage);
}

/**
 * Creates or updates the global CHANGELOG.md file based on changeset files.
 *
 * Reads changeset files, categorizes changes by type (major/minor/patch),
 * and updates both the first-gen and @swc/core changelogs accordingly.
 *
 * Should be run during the release process after prepublishOnly but before
 * changeset version. Automatically called by `yarn changeset-publish`.
 *
 * @returns {Promise<void>}
 * @throws {Error} If there's an issue with git tags or file operations
 */
async function createGlobalChangelog() {
    const currentTag = validateCurrentVersion();
    const { firstGen, core } = processChangesets();

    const nextVersion = calculateNextVersion(
        currentVersion,
        firstGen.majorChanges,
        firstGen.minorChanges
    );
    const nextTag = `v${nextVersion}`;
    const date = new Date().toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    // Update first-gen changelog
    const changelogPath = path.resolve(__dirname, '../CHANGELOG.md');
    const compareUrl = `${repoUrl}/compare/${currentTag}...${nextTag}`;

    updateChangelogFile(
        changelogPath,
        nextVersion,
        compareUrl,
        date,
        firstGen,
        '##',
        `# \\[${nextVersion.replace(/\./g, '\\.')}\\]`,
        `⚠️ Version ${nextVersion} already has an entry in the CHANGELOG. Skipping global update.`,
        `✅ CHANGELOG updated for ${nextVersion}`
    );

    // Update @swc/core changelog if there are core changes
    const coreChangelogPath = path.resolve(
        __dirname,
        '../../second-gen/packages/core/CHANGELOG.md'
    );

    if (
        core.majorChanges.length ||
        core.minorChanges.length ||
        core.patchChanges.length
    ) {
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
        const coreNextVersion = calculateNextVersion(
            coreCurrentVersion,
            core.majorChanges,
            core.minorChanges
        );

        const coreCurrentTag = `@swc/core@${coreCurrentVersion}`;
        const coreNextTag = `@swc/core@${coreNextVersion}`;
        const coreCompareUrl = `${repoUrl}/compare/${coreCurrentTag}...${coreNextTag}`;

        updateChangelogFile(
            coreChangelogPath,
            coreNextVersion,
            coreCompareUrl,
            date,
            core,
            '###',
            `## \\[${coreNextVersion.replace(/\\./g, '\\\\.')}\\]`,
            `⚠️ Version ${coreNextVersion} already has an entry in the @swc/core CHANGELOG. Skipping core update.`,
            `✅ @swc/core CHANGELOG updated for ${coreNextVersion}`
        );
    } else {
        console.log('ℹ️ No @swc/core changes to add to the core changelog.');
    }
}
createGlobalChangelog().catch((error) => {
    console.error('Error updating changelog:', error);
    process.exit(1);
});
