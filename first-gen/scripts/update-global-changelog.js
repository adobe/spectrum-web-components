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
    if (!currentVersion) {
        console.error('Error: currentVersion is undefined or empty');
        process.exit(1);
    }

    const currentTag = `v${currentVersion}`;
    let gitTag;
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
    const changesetDir = path.resolve(__dirname, '../../.changeset');
    const changesetFiles = fs
        .readdirSync(changesetDir)
        .filter((file) => file.endsWith('.md') && file !== 'README.md');

    const majorChanges = [];
    const minorChanges = [];
    const patchChanges = [];

    // @swc/core-only changes (separate from first-gen global changelog)
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
            // First-gen components go to global changelog
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

    const currentVersionParts = currentVersion
        .split('.')
        .map((part) => parseInt(part, 10));
    let nextVersion;
    if (majorChanges.length > 0) {
        nextVersion = `${currentVersionParts[0] + 1}.0.0`;
    } else if (minorChanges.length > 0) {
        nextVersion = `${currentVersionParts[0]}.${currentVersionParts[1] + 1}.0`;
    } else {
        nextVersion = `${currentVersionParts[0]}.${currentVersionParts[1]}.${currentVersionParts[2] + 1}`;
    }

    const nextTag = `v${nextVersion}`;
    const date = new Date().toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    const changelogPath = path.resolve(__dirname, '../CHANGELOG.md');
    let existingChangelog = fs.existsSync(changelogPath)
        ? fs.readFileSync(changelogPath, 'utf-8')
        : '';
    const versionEntryPattern = new RegExp(
        `# \\[${nextVersion.replace(/\./g, '\\.')}\\]`
    );

    if (versionEntryPattern.test(existingChangelog)) {
        console.log(
            `⚠️ Version ${nextVersion} already has an entry in the CHANGELOG. Skipping global update.`
        );
    } else {
        const compareUrl = `${repoUrl}/compare/${currentTag}...${nextTag}`;

        if (
            !majorChanges.length &&
            !minorChanges.length &&
            !patchChanges.length
        ) {
            console.log('🚫 No changes to add to the changelog.');
            process.exit(0);
        }

        let newEntry = `# [${nextVersion}](${compareUrl}) (${date})\n\n`;
        if (majorChanges.length) {
            newEntry += `## Major Changes\n\n${majorChanges.join('\n')}\n\n`;
        }

        if (minorChanges.length) {
            newEntry += `## Minor Changes\n\n${minorChanges.join('\n')}\n\n`;
        }

        if (patchChanges.length) {
            newEntry += `## Patch Changes\n\n${patchChanges.join('\n')}\n\n`;
        }
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
        fs.writeFileSync(
            changelogPath,
            `${headerText}\n\n${newEntry.trim()}\n\n${existingChangelog.trim()}`,
            'utf-8'
        );
        console.log(`✅ CHANGELOG updated for ${nextVersion}`);
    }
    const coreChangelogPath = path.resolve(
        __dirname,
        '../../second-gen/packages/core/CHANGELOG.md'
    );

    if (
        coreMajorChanges.length ||
        coreMinorChanges.length ||
        corePatchChanges.length
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
createGlobalChangelog().catch((error) => {
    console.error('Error updating changelog:', error);
    process.exit(1);
});
