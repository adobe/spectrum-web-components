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
 * Changelog Generator (1st-gen)
 *
 * Processes 1st-gen changeset files and updates 1st-gen/CHANGELOG.md.
 *
 * Extracts major, minor, and patch changes from changesets and formats them
 * into organized changelog entries.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import path from 'path';
import semver from 'semver';
import { fileURLToPath } from 'url';

import { version as currentVersion } from '@spectrum-web-components/base/src/version.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoUrl = 'https://github.com/adobe/spectrum-web-components';

/**
 * Validates that the current version exists and has a corresponding git tag
 *
 * @returns {string} The current git tag
 * @throws {Error} If validation fails
 */
function validateCurrentVersion() {
  if (!currentVersion) {
    console.error('Error: currentVersion is undefined or empty');
    process.exit(1);
  }

  // Releases tag as `gen1-<version>` going forward (see create-git-tag.js), but
  // releases published before that switch were tagged as `v<version>` - fall back
  // to the old prefix so the changelog compare URL still resolves for those.
  const candidateTags = [`gen1-${currentVersion}`, `v${currentVersion}`];
  try {
    const gitTagOutput = execSync('git tag --sort=-creatordate');
    if (!gitTagOutput) {
      throw new Error('Git tag command returned empty output');
    }

    const gitTagList = gitTagOutput.toString().split('\n').filter(Boolean);
    if (gitTagList.length === 0) {
      throw new Error('No git tags found in repository');
    }

    const gitTag = candidateTags.find((tag) => gitTagList.includes(tag));
    if (!gitTag) {
      throw new Error('Could not find a matching tag for the current version');
    }
    return gitTag;
  } catch (error) {
    console.error(`Failed to get current git tag: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Extracts changes from frontmatter using a pattern and categorizes by type
 *
 * @param {string} frontmatter - The frontmatter content to parse
 * @param {string} description - The description of the change
 * @param {RegExp} pattern - The regex pattern to match package changes
 * @param {string} prefix - Optional prefix to add to the entry (e.g., 'sp-')
 * @returns {object} Object containing major, minor, and patch changes
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
 * Processes changeset files and categorizes 1st-gen changes by type
 *
 * @returns {Promise<object>} Object containing categorized 1st-gen changes
 */
async function processChangesets() {
  const changesetDir = path.resolve(__dirname, '../.changeset');

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

  // Prepare change container
  const firstGen = { majorChanges: [], minorChanges: [], patchChanges: [] };

  for (const content of fileContents) {
    const frontmatterMatch = content.match(/---\n([\s\S]*?)\n---\n([\s\S]*)/);
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

    // Merge results into categorized buckets
    firstGen.majorChanges.push(...swcChanges.major);
    firstGen.minorChanges.push(...swcChanges.minor);
    firstGen.patchChanges.push(...swcChanges.patch);
  }

  return { firstGen };
}

/**
 * Calculates the next version based on change types
 *
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
 *
 * @param {string} changelogContent - The existing changelog content
 * @returns {object} Object with headerText and remaining content
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
 *
 * @param {string} version - Version string
 * @param {string} compareUrl - URL for comparing versions
 * @param {string} date - Date string
 * @param {object} changes - Object containing major, minor, and patch changes
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
 *
 * @param {string} changelogPath - Path to the changelog file
 * @param {string} version - Version string
 * @param {string} compareUrl - URL for comparing versions
 * @param {string} date - Date string
 * @param {object} changes - Object containing categorized changes
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
 * Creates or updates 1st-gen/CHANGELOG.md based on 1st-gen changeset files.
 *
 * Reads changeset files and categorizes changes by type (major/minor/patch)
 * before writing the changelog entry.
 *
 * Should be run during the release process before changeset version.
 *
 * @returns {Promise<void>}
 * @throws {Error} If there's an issue with git tags or file operations
 */
async function createChangelog() {
  const currentTag = validateCurrentVersion();
  const { firstGen } = await processChangesets();

  // Early exit if no changes detected
  if (
    !firstGen.majorChanges.length &&
    !firstGen.minorChanges.length &&
    !firstGen.patchChanges.length
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
    `⚠️ Version ${nextVersion} already has an entry in the CHANGELOG. Skipping changelog update.`,
    `✅ CHANGELOG updated for ${nextVersion}`
  );
}
(async () => {
  try {
    await createChangelog();
  } catch (error) {
    console.error('Error updating changelog:', error);
    process.exit(1);
  }
})();
