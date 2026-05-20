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
 * Hybrid changesets changelog function.
 *
 * - 2nd-gen packages (`@adobe/spectrum-wc`, `@spectrum-web-components/core`):
 *   Returns changeset bodies as CHANGELOG bullets. No commit
 *   hashes, no author attributions, no reformatting. If the body
 *   does not already contain a PR link, one is auto-appended by
 *   resolving the changeset's commit via the GitHub API.
 *
 * - 1st-gen packages (everything else): Delegates to
 *   `@changesets/changelog-github` so existing behavior is unchanged.
 *
 * Uses .cjs because changesets resolves changelog functions via
 * require() and the repo root has "type": "module".
 *
 * See CONTRIBUTOR-DOCS/01_contributor-guides/15_changelog-strategy.md
 * for the 2nd-gen format spec.
 */

const githubChangelog = require('@changesets/changelog-github');
const githubFunctions = githubChangelog.default || githubChangelog;
const { getInfo } = require('@changesets/get-github-info');

const SECOND_GEN_PACKAGES = [
  '@adobe/spectrum-wc',
  '@spectrum-web-components/core',
];

const PR_LINK_PATTERN = /\[#\d+\]\(/;

function is2ndGen(changeset) {
  return changeset.releases.every((r) => SECOND_GEN_PACKAGES.includes(r.name));
}

module.exports = {
  async getReleaseLine(changeset, type, options) {
    if (!is2ndGen(changeset)) {
      return githubFunctions.getReleaseLine(changeset, type, options);
    }

    const lines = changeset.summary
      .split('\n')
      .map((l) => l.trimEnd())
      .filter(Boolean);

    if (lines.length === 0) {
      return '';
    }

    const hasPRLink = lines.some((line) => PR_LINK_PATTERN.test(line));
    if (!hasPRLink && changeset.commit && options?.repo) {
      try {
        const { links } = await getInfo({
          repo: options.repo,
          commit: changeset.commit,
        });
        if (links.pull) {
          lines[lines.length - 1] += ` ${links.pull}`;
        }
      } catch {
        // GitHub API unavailable — continue without PR link
      }
    }

    return (
      '\n\n' +
      lines
        .map((line) => (line.startsWith('#') ? line : `- ${line}`))
        .join('\n')
    );
  },

  async getDependencyReleaseLine(changesets, dependenciesUpdated, options) {
    return githubFunctions.getDependencyReleaseLine(
      changesets,
      dependenciesUpdated,
      options
    );
  },
};
