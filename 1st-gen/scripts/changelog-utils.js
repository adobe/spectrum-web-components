/**
 * Copyright 2026 Adobe. All rights reserved.
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
 * Pure helpers for the 1st-gen changelog rollup (see update-changelog.js).
 *
 * Kept free of side effects (no git, no file system, no version import) so
 * they can be unit tested with `node --test`.
 */

export const REPO_URL = 'https://github.com/adobe/spectrum-web-components';

const SWC_SCOPE = '@spectrum-web-components/';
const BUMP_TYPES = ['major', 'minor', 'patch'];

/**
 * Parses a changeset file into its package releases and body.
 *
 * @param {string} content - Raw changeset markdown
 * @returns {{ releases: Array<{ name: string, type: string }>, body: string } | null}
 *   The parsed changeset, or `null` when the file has no frontmatter
 */
export function parseChangeset(content) {
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
export function toComponentLabel(packageName, componentDirs) {
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
export function parseCommitLog(logLine) {
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
export function formatEntry(body, meta = {}, repoUrl = REPO_URL) {
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
export function groupChangesets(changesets, labelFor, repoUrl = REPO_URL) {
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
export function renderGroups(groups) {
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
export function buildChangelogEntry(version, compareUrl, date, groups) {
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
export function extractChangelogHeader(changelogContent) {
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
