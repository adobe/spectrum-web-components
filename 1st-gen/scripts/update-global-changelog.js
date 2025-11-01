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
 * - 1st-gen Spectrum Web Components → 1st-gen/CHANGELOG.md
 * - @spectrum-web-components/core → 2nd-gen/packages/core/CHANGELOG.md
 *
 * Extracts major, minor, and patch changes from changesets and formats them
 * into organized changelog entries.
 */

import { version as currentVersion } from '@spectrum-web-components/core/shared/base/version.js';
import { execSync } from 'child_process';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import path from 'path';
import semver from 'semver';
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
 * Extracts changes from frontmatter using a pattern and categorizes by type
 * @param {string} frontmatter - The frontmatter content to parse
 * @param {string} description - The description of the change
 * @param {RegExp} pattern - The regex pattern to match package changes
 * @param {string} prefix - Optional prefix to add to the entry (e.g., 'sp-')
 * @returns {Object} Object containing major, minor, and patch changes
 */
function extractChanges(frontmatter, description, pattern, prefix = '') {
    const changes = { major: [], minor: [], patch: [] };
    for (const match of frontmatter.matchAll(pattern)) {
        // Handle two different regex patterns:
        // 1. @spectrum-web-components/button: patch
        //    → match: [full, 'button', 'patch'] (has component name)
        // 2. @spectrum-web-components/core: minor
        //    → match: [full, 'minor'] (no component name)
        const hasName = match.length > 2;
        const name = hasName ? match[1] : null;
        const type = hasName ? match[2] : match[1];
        const entry =
            prefix && name
                ? `**${prefix}${name}**: ${description.trim()}\n\n`
                : `${description.trim()}\n\n`;
        changes[type].push(entry);
    }
    return changes;
}

/**
 * Processes changeset files and categorizes changes by type and target
 * @returns {Promise<Object>} Object containing categorized changes for both 1st-gen and core
 */
async function processChangesets() {
    const changesetDir = path.resolve(__dirname, '../../.changeset');

    // Use non-blocking I/O for directory read
    const files = await fsPromises.readdir(changesetDir);
    const markdownFiles = files.filter(
        (f) => f.endsWith('.md') && f !== 'README.md'
    );

    // Read all files concurrently
    const fileContents = await Promise.all(
        markdownFiles.map((file) =>
            fsPromises.readFile(path.join(changesetDir, file), 'utf8')
        )
    );

    // Prepare change containers
    const firstGen = { majorChanges: [], minorChanges: [], patchChanges: [] };
    const core = { majorChanges: [], minorChanges: [], patchChanges: [] };

    for (const content of fileContents) {
        const frontmatterMatch = content.match(
            /---\n([\s\S]*?)\n---\n([\s\S]*)/
        );
        if (!frontmatterMatch) {
            continue;
        }

        const [, frontmatter, description] = frontmatterMatch;
        const cleanDescription = description.trim();

        // Extract 1st-gen (@spectrum-web-components/*) changes
        const swcChanges = extractChanges(
            frontmatter,
            cleanDescription,
            /['"]@spectrum-web-components\/([^'"]+)['"]:\s*(major|minor|patch)/g,
            'sp-'
        );

        // Extract @spectrum-web-components/core changes
        const coreChanges = extractChanges(
            frontmatter,
            cleanDescription,
            /['"]@spectrum-web-components\/core['"]:\s*(major|minor|patch)/g
        );

        // Merge results into categorized buckets
        firstGen.majorChanges.push(...swcChanges.major);
        firstGen.minorChanges.push(...swcChanges.minor);
        firstGen.patchChanges.push(...swcChanges.patch);

        core.majorChanges.push(...coreChanges.major);
        core.minorChanges.push(...coreChanges.minor);
        core.patchChanges.push(...coreChanges.patch);
    }

    return { firstGen, core };
}

/**
 * Calculates the next version based on change types
 * @param {string} currentVersion - Current version string
 * @param {Array} majorChanges - Array of major changes
 * @param {Array} minorChanges - Array of minor changes
 * @returns {string} Next version string
 */
function calculateNextVersion(currentVersion, majorChanges, minorChanges) {
    if (majorChanges.length > 0) {
        return semver.inc(currentVersion, 'major');
    }
    if (minorChanges.length > 0) {
        return semver.inc(currentVersion, 'minor');
    }
    return semver.inc(currentVersion, 'patch');
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
 * and updates both the 1st-gen and @spectrum-web-components/core changelogs accordingly.
 *
 * Should be run during the release process before changeset version.
 * Automatically called by the unified publish script for regular releases.
 *
 * @returns {Promise<void>}
 * @throws {Error} If there's an issue with git tags or file operations
 */
async function createGlobalChangelog() {
    const currentTag = validateCurrentVersion();
    const { firstGen, core } = await processChangesets();

    // Early exit if no changes detected
    if (
        !firstGen.majorChanges.length &&
        !firstGen.minorChanges.length &&
        !firstGen.patchChanges.length &&
        !core.majorChanges.length &&
        !core.minorChanges.length &&
        !core.patchChanges.length
    ) {
        console.log(
            '🚫 No new changesets detected. Skipping changelog generation.'
        );
        return;
    }

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

    // Update 1st-gen changelog
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

    // Update @spectrum-web-components/core changelog if there are core changes
    const coreChangelogPath = path.resolve(
        __dirname,
        '../../2nd-gen/packages/core/CHANGELOG.md'
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
                    '../../2nd-gen/packages/core/package.json'
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

        const coreCurrentTag = `@spectrum-web-components/core@${coreCurrentVersion}`;
        const coreNextTag = `@spectrum-web-components/core@${coreNextVersion}`;
        const coreCompareUrl = `${repoUrl}/compare/${coreCurrentTag}...${coreNextTag}`;

        updateChangelogFile(
            coreChangelogPath,
            coreNextVersion,
            coreCompareUrl,
            date,
            core,
            '###',
            `## \\[${coreNextVersion.replace(/\\./g, '\\\\.')}\\]`,
            `⚠️ Version ${coreNextVersion} already has an entry in the @spectrum-web-components/core CHANGELOG. Skipping core update.`,
            `✅ @spectrum-web-components/core CHANGELOG updated for ${coreNextVersion}`
        );
    } else {
        console.log(
            'ℹ️ No @spectrum-web-components/core changes to add to the core changelog.'
        );
    }
}
(async () => {
    try {
        await createGlobalChangelog();
    } catch (error) {
        console.error('Error updating changelog:', error);
        process.exit(1);
    }
})();
