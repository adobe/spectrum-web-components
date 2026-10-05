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
 * Extracts major, minor, and patch changes from changesets and groups them by
 * component: each changeset is listed once, under the set of components it
 * releases, with its PR and commit links and its body kept intact.
 */

import { execFileSync, execSync } from 'child_process';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import path from 'path';
import semver from 'semver';
import { fileURLToPath } from 'url';

import { version as currentVersion } from '@spectrum-web-components/base/src/version.js';

import {
  buildChangelogEntry,
  extractChangelogHeader,
  groupChangesets,
  parseChangeset,
  parseCommitLog,
  REPO_URL as repoUrl,
  toComponentLabel,
} from './changelog-utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
 * Looks up the commit that added a changeset file and the PR it was merged in.
 * Returns an empty object when git has no record of the file (for example, a
 * changeset that is not committed yet), so the entry renders without links.
 *
 * @param {string} filePath - Absolute path to the changeset file
 * @returns {{ commit?: string, pr?: string }} Commit hash and PR number, when found
 */
function getChangesetCommit(filePath) {
  try {
    const output = execFileSync(
      'git',
      ['log', '--diff-filter=A', '--format=%H%x09%s', '-1', '--', filePath],
      { cwd: path.dirname(filePath), encoding: 'utf8' }
    );
    return parseCommitLog(output);
  } catch {
    return {};
  }
}

/**
 * Reads the pending 1st-gen changesets and groups them by bump type and
 * component.
 *
 * @returns {Promise<object>} Grouped major, minor, and patch changes
 */
async function processChangesets() {
  const changesetDir = path.resolve(__dirname, '../.changeset');
  const packagesDir = path.resolve(__dirname, '../packages');

  // Sorted so the generated entry is stable regardless of file system order.
  const files = (await fsPromises.readdir(changesetDir))
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .sort();

  const changesets = [];
  for (const file of files) {
    const filePath = path.join(changesetDir, file);
    const parsed = parseChangeset(await fsPromises.readFile(filePath, 'utf8'));
    if (!parsed || !parsed.releases.length) {
      continue;
    }
    changesets.push({ ...parsed, ...getChangesetCommit(filePath) });
  }

  const componentDirs = new Set(
    (await fsPromises.readdir(packagesDir, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
  );

  return groupChangesets(changesets, (name) =>
    toComponentLabel(name, componentDirs)
  );
}

/**
 * Calculates the next version based on change types
 *
 * @param {string} currentVersion - Current version string
 * @param {Array} majorChanges - Major change groups
 * @param {Array} minorChanges - Minor change groups
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
 * Updates a changelog file with a new entry
 *
 * @param {string} changelogPath - Path to the changelog file
 * @param {string} version - Version string
 * @param {string} compareUrl - URL for comparing versions
 * @param {string} date - Date string
 * @param {object} changes - Grouped major, minor, and patch changes
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

  const { major, minor, patch } = changes;
  if (!major.length && !minor.length && !patch.length) {
    console.log('🚫 No changes to add to the changelog.');
    process.exit(0);
  }

  const newEntry = buildChangelogEntry(version, compareUrl, date, changes);
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
 * Reads changeset files and groups changes by type (major/minor/patch) and
 * component before writing the changelog entry.
 *
 * Should be run during the release process before changeset version.
 *
 * @returns {Promise<void>}
 * @throws {Error} If there's an issue with git tags or file operations
 */
async function createChangelog() {
  const currentTag = validateCurrentVersion();
  const firstGen = await processChangesets();

  // Early exit if no changes detected
  if (
    !firstGen.major.length &&
    !firstGen.minor.length &&
    !firstGen.patch.length
  ) {
    console.log(
      '🚫 No new changesets detected. Skipping changelog generation.'
    );
    return;
  }

  const nextVersion = calculateNextVersion(
    currentVersion,
    firstGen.major,
    firstGen.minor
  );
  const nextTag = `gen1-${nextVersion}`;
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
