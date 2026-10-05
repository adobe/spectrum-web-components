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

'use strict';

const assert = require('node:assert/strict');
const { describe, it } = require('node:test');

const {
  createChangelogFunctions,
  getComponentKey,
  normalizeScope,
} = require('./changelog-grouped.cjs');

const REPO = 'https://github.com/adobe/spectrum-web-components';

/**
 * Builds a fake `@changesets/changelog-github` that renders entries the same
 * way, using `pr` and `commit` fields from the test changesets.
 *
 * @returns {{ getReleaseLine: Function, getDependencyReleaseLine: Function }}
 *   The fake generator
 */
function fakeChangelogGithub() {
  return {
    async getReleaseLine(changeset) {
      const [firstLine, ...futureLines] = changeset.summary.trim().split('\n');
      const prefix = ` [#${changeset.pr}](${REPO}/pull/${changeset.pr}) [\`${changeset.commit.slice(0, 7)}\`](${REPO}/commit/${changeset.commit})`;
      return `\n\n-${prefix} - ${firstLine}\n${futureLines.map((line) => `  ${line}`).join('\n')}`;
    },
    async getDependencyReleaseLine(changesets, dependenciesUpdated) {
      if (!dependenciesUpdated.length) {
        return '';
      }
      return [
        '- Updated dependencies:',
        ...dependenciesUpdated.map(
          (dependency) => `  - ${dependency.name}@${dependency.newVersion}`
        ),
      ].join('\n');
    },
  };
}

/**
 * Mirrors how `@changesets/apply-release-plan` builds the changelog entry of
 * each release: every release's lines are requested synchronously, followed
 * by one dependency line, and only then awaited.
 *
 * @param {object} changelog - The changelog functions under test
 * @param {Array<{ name: string, dependencies?: object[] }>} releases - Releases
 * @param {object[]} changesets - Changesets with `releases`, `summary`, `pr`, `commit`
 * @returns {Promise<string[]>} The changelog entry of each release
 */
function generate(changelog, releases, changesets) {
  return Promise.all(
    releases.map(async (release) => {
      const lines = { major: [], minor: [], patch: [] };
      for (const changeset of changesets) {
        const rls = changeset.releases.find(
          (item) => item.name === release.name
        );
        if (rls && rls.type !== 'none') {
          lines[rls.type].push(
            changelog.getReleaseLine(changeset, rls.type, {})
          );
        }
      }
      lines.patch.push(
        changelog.getDependencyReleaseLine([], release.dependencies ?? [], {})
      );
      const blocks = [];
      for (const type of ['major', 'minor', 'patch']) {
        const resolved = (await Promise.all(lines[type])).filter(
          (line) => line
        );
        if (resolved.length) {
          const title = type[0].toUpperCase() + type.slice(1);
          blocks.push(`### ${title} Changes\n\n${resolved.join('\n')}\n`);
        }
      }
      return blocks.join('\n');
    })
  );
}

/**
 * Collapses runs of blank lines, as Prettier does when changesets writes the
 * CHANGELOG.
 *
 * @param {string} text - Markdown
 * @returns {string} Normalized Markdown
 */
function normalize(text) {
  return text.replace(/\n{3,}/g, '\n\n').trim();
}

let commitCounter = 0;

/**
 * Creates a test changeset.
 *
 * @param {string} summary - Changeset body
 * @param {Record<string, string>} releases - Bump type per package
 * @returns {object} The changeset
 */
function changeset(summary, releases) {
  commitCounter += 1;
  return {
    id: `changeset-${commitCounter}`,
    summary,
    pr: 1000 + commitCounter,
    commit: commitCounter.toString(16).padStart(40, 'a'),
    releases: Object.entries(releases).map(([name, type]) => ({ name, type })),
  };
}

describe('normalizeScope', () => {
  it('normalizes element names, spaces and lists', () => {
    assert.equal(normalizeScope('<swc-menu>'), 'menu');
    assert.equal(normalizeScope('Color Loupe'), 'color-loupe');
    assert.equal(normalizeScope('sp-picker, menu'), 'menu, picker');
    assert.equal(normalizeScope('*'), null);
  });
});

describe('getComponentKey', () => {
  const prefix = `- [#1](${REPO}/pull/1) [\`abcdef0\`](${REPO}/commit/abcdef0) - `;

  it('reads conventional scopes, bold or plain', () => {
    assert.equal(getComponentKey(`${prefix}**fix(menu):** text`), 'menu');
    assert.equal(
      getComponentKey(`${prefix}feat(ai-toolkit)!: text`),
      'ai-toolkit'
    );
  });

  it('reads code and bold component names', () => {
    assert.equal(
      getComponentKey(`${prefix}\`Color Loupe\` — text`),
      'color-loupe'
    );
    assert.equal(getComponentKey(`${prefix}**Badge** — text`), 'badge');
  });

  it('returns null without a component', () => {
    assert.equal(getComponentKey(`${prefix}Plain change`), null);
    assert.equal(getComponentKey('- Updated dependencies:'), null);
  });
});

describe('grouped changelog functions', () => {
  it('groups each release by component and bump type', async () => {
    const changelog = createChangelogFunctions(fakeChangelogGithub);
    const changesets = [
      changeset('**fix(menu):** Fixed focus.', {
        '@adobe/spectrum-wc': 'patch',
      }),
      changeset('`Badge` — Added size.', { '@adobe/spectrum-wc': 'minor' }),
      changeset('Improved the build.', { '@adobe/spectrum-wc': 'patch' }),
      changeset('**fix(badge):** Fixed color.\n\nMore detail.', {
        '@adobe/spectrum-wc': 'patch',
        '@adobe/spectrum-wc-core': 'patch',
      }),
      changeset('**fix(menu):** Fixed scroll.', {
        '@adobe/spectrum-wc': 'patch',
      }),
    ];
    const [swc, core] = await generate(
      changelog,
      [
        { name: '@adobe/spectrum-wc' },
        {
          name: '@adobe/spectrum-wc-core',
          dependencies: [
            { name: '@adobe/spectrum-wc-icons', newVersion: '1.0.0' },
          ],
        },
      ],
      changesets
    );

    const link = (item) =>
      `[#${item.pr}](${REPO}/pull/${item.pr}) [\`${item.commit.slice(0, 7)}\`](${REPO}/commit/${item.commit})`;
    const [menuFocus, badgeSize, build, badgeColor, menuScroll] = changesets;

    assert.equal(
      normalize(swc),
      [
        '### Minor Changes',
        '',
        '- **badge**:',
        `  - ${link(badgeSize)} - \`Badge\` — Added size.`,
        '',
        '### Patch Changes',
        '',
        '- **badge**:',
        `  - ${link(badgeColor)} - **fix(badge):** Fixed color.`,
        '',
        '    More detail.',
        '',
        '- **menu**:',
        `  - ${link(menuFocus)} - **fix(menu):** Fixed focus.`,
        '',
        `  - ${link(menuScroll)} - **fix(menu):** Fixed scroll.`,
        '',
        `- ${link(build)} - Improved the build.`,
      ].join('\n')
    );
    assert.equal(
      normalize(core),
      [
        '### Patch Changes',
        '',
        '- **badge**:',
        `  - ${link(badgeColor)} - **fix(badge):** Fixed color.`,
        '',
        '    More detail.',
        '',
        '- Updated dependencies:',
        '  - @adobe/spectrum-wc-icons@1.0.0',
      ].join('\n')
    );
  });

  it('resolves release lines requested without a dependency line', async () => {
    const changelog = createChangelogFunctions(fakeChangelogGithub);
    const item = changeset('**fix(menu):** Fixed focus.', {});
    const line = await changelog.getReleaseLine(item, 'patch', {});
    assert.match(line, /^\n\n- \*\*menu\*\*:\n {2}- \[#\d+\]/);
  });

  it('rejects every pending line when rendering fails', async () => {
    const changelog = createChangelogFunctions(() => ({
      getReleaseLine: async () => {
        throw new Error('no token');
      },
      getDependencyReleaseLine: async () => '',
    }));
    const lines = [
      changelog.getReleaseLine(changeset('a', {}), 'patch', {}),
      changelog.getReleaseLine(changeset('b', {}), 'minor', {}),
    ];
    await changelog.getDependencyReleaseLine([], [], {});
    for (const line of lines) {
      await assert.rejects(line, /no token/);
    }
  });
});
