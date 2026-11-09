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

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const REPO_URL = 'https://github.com/adobe/spectrum-web-components';

const SWC_SCOPE = '@spectrum-web-components/';
const BUMP_TYPES = ['major', 'minor', 'patch'];

/**
 * Parses a changeset file into its package releases and body.
 *
 * @param {string} content - Raw changeset markdown
 * @returns {{ releases: Array<{ name: string, type: string }>, body: string } | null}
 *   The parsed changeset, or `null` when the file has no frontmatter
 */
function parseChangeset(content) {
  const normalized = content.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n?---\n([\s\S]*)$/);
  if (!match) {
    return null;
  }

  const [, frontmatter, body] = match;
  const releases = [];
  for (const line of frontmatter.split('\n')) {
    const release = line.match(
      /^\s*['"]?([^'":\s]+)['"]?\s*:\s*(major|minor|patch)\s*$/
    );
    if (release) {
      releases.push({ name: release[1], type: release[2] });
    }
  }

  return { releases, body: body.trim() };
}

/**
 * Returns the label a 1st-gen package is listed under in the changelog.
 * Component packages (1st-gen/packages/*) use their `sp-` tag name; tool
 * packages (1st-gen/tools/*) and anything outside the scope keep their name.
 *
 * @param {string} packageName - npm package name
 * @param {Set<string>} componentDirs - Directory names under 1st-gen/packages
 * @returns {string} The component label
 */
function toComponentLabel(packageName, componentDirs) {
  if (!packageName.startsWith(SWC_SCOPE)) {
    return packageName;
  }
  const shortName = packageName.slice(SWC_SCOPE.length);
  return componentDirs.has(shortName) ? `sp-${shortName}` : shortName;
}

/**
 * Parses `git log --format=%H%x09%s` output for the commit that added a
 * changeset, and pulls the PR number out of the commit subject.
 *
 * @param {string} logLine - A single `<hash>\t<subject>` line
 * @returns {{ commit?: string, pr?: string }} Commit hash and PR number, when found
 */
function parseCommitLog(logLine) {
  const [commit, subject = ''] = (logLine || '').trim().split('\t');
  if (!/^[0-9a-f]{7,40}$/.test(commit || '')) {
    return {};
  }
  const pr =
    subject.match(/\(#(\d+)\)\s*$/)?.[1] ??
    subject.match(/^Merge pull request #(\d+)/)?.[1];
  return pr ? { commit, pr } : { commit };
}

/**
 * Formats one changeset as a markdown list item, prefixed with its PR and
 * commit links when known. The body is kept intact: continuation lines are
 * indented so nested lists, paragraphs, and code blocks stay inside the item.
 *
 * @param {string} body - The changeset description
 * @param {{ commit?: string, pr?: string }} [meta] - Commit hash and PR number
 * @param {string} [repoUrl] - Repository URL used to build the links
 * @returns {string} The formatted list item
 */
function formatEntry(body, meta = {}, repoUrl = REPO_URL) {
  const links = [];
  if (meta.pr) {
    links.push(`[#${meta.pr}](${repoUrl}/pull/${meta.pr})`);
  }
  if (meta.commit) {
    links.push(
      `[\`${meta.commit.slice(0, 7)}\`](${repoUrl}/commit/${meta.commit})`
    );
  }
  const prefix = links.join(' ');
  const [firstLine, ...rest] = body.trim().split('\n');
  const indent = (line) => (line.trim() ? `  ${line}` : '');

  // A body that opens with a list, heading, or code fence can't share the
  // bullet's line, so it moves under the links as nested content.
  if (/^([-*+]|\d+[.)])\s|^#|^```/.test(firstLine)) {
    const head = prefix ? `- ${prefix}` : '-';
    return [head, ...[firstLine, ...rest].map(indent)].join('\n');
  }

  const head = prefix ? `- ${prefix} - ${firstLine}` : `- ${firstLine}`;
  return [head, ...rest.map(indent)].join('\n');
}

const plainLabel = (label) => label.replace(/\*/g, '').toLowerCase();

/**
 * Groups changesets by bump type and component.
 *
 * Every changeset becomes one entry. Within each bump type, entries are
 * grouped under the sorted set of components the changeset releases at that
 * bump type, so a changeset touching several packages is listed once instead
 * of once per package. Groups are sorted alphabetically; entries keep the
 * order of the input changesets.
 *
 * @param {Array<{ releases: Array<{ name: string, type: string }>, body: string, commit?: string, pr?: string }>} changesets
 *   Parsed changesets, in a stable order
 * @param {(packageName: string) => string} labelFor - Maps a package to its component label
 * @param {string} [repoUrl] - Repository URL used to build the links
 * @returns {{ major: Array<{ label: string, entries: string[] }>, minor: Array<{ label: string, entries: string[] }>, patch: Array<{ label: string, entries: string[] }> }}
 *   Sorted groups for each bump type
 */
function groupChangesets(changesets, labelFor, repoUrl = REPO_URL) {
  const buckets = { major: new Map(), minor: new Map(), patch: new Map() };

  for (const changeset of changesets) {
    if (!changeset.body) {
      continue;
    }
    for (const type of BUMP_TYPES) {
      const components = [
        ...new Set(
          changeset.releases
            .filter((release) => release.type === type)
            .map((release) => labelFor(release.name))
        ),
      ].sort();
      if (!components.length) {
        continue;
      }
      const label = components.map((name) => `**${name}**`).join(', ');
      const group = buckets[type].get(label) ?? { label, entries: [] };
      group.entries.push(formatEntry(changeset.body, changeset, repoUrl));
      buckets[type].set(label, group);
    }
  }

  const sortGroups = (map) =>
    [...map.values()].sort((a, b) =>
      plainLabel(a.label) < plainLabel(b.label) ? -1 : 1
    );
  return {
    major: sortGroups(buckets.major),
    minor: sortGroups(buckets.minor),
    patch: sortGroups(buckets.patch),
  };
}

/**
 * Renders the groups of one bump type as markdown.
 *
 * @param {Array<{ label: string, entries: string[] }>} groups - Sorted groups
 * @returns {string} The rendered groups
 */
function renderGroups(groups) {
  return groups
    .map((group) => `${group.label}:\n\n${group.entries.join('\n\n')}`)
    .join('\n\n');
}

/**
 * Builds a changelog release entry from grouped changes.
 *
 * @param {string} version - Version string
 * @param {string} compareUrl - URL for comparing versions
 * @param {string} date - Date string
 * @param {{ major: Array<object>, minor: Array<object>, patch: Array<object> }} groups
 *   Grouped changes from groupChangesets
 * @returns {string} Formatted changelog entry
 */
function buildChangelogEntry(version, compareUrl, date, groups) {
  let entry = `# [${version}](${compareUrl}) (${date})\n\n`;
  const headings = { major: 'Major', minor: 'Minor', patch: 'Patch' };
  for (const type of BUMP_TYPES) {
    if (groups[type].length) {
      entry += `## ${headings[type]} Changes\n\n${renderGroups(groups[type])}\n\n`;
    }
  }
  return entry;
}

/**
 * Splits an existing changelog into its header and its release entries.
 *
 * @param {string} changelogContent - The existing changelog content
 * @returns {{ headerText: string, remainingContent: string }} Header and release entries
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
  const compareUrl = `${REPO_URL}/compare/${currentTag}...${nextTag}`;

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
