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

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildChangelogEntry,
  formatEntry,
  groupChangesets,
  parseChangeset,
  parseCommitLog,
  renderGroups,
  toComponentLabel,
} from './changelog-utils.js';

const REPO = 'https://github.com/adobe/spectrum-web-components';
const componentDirs = new Set(['menu', 'picker', 'tabs']);
const labelFor = (name) => toComponentLabel(name, componentDirs);

describe('parseChangeset', () => {
  it('reads releases and body, ignoring `none` bumps', () => {
    const parsed = parseChangeset(
      [
        '---',
        "'@spectrum-web-components/menu': patch",
        '"@spectrum-web-components/picker": minor',
        '@spectrum-web-components/tabs: none',
        '---',
        '',
        'Fixed a thing.',
        '',
      ].join('\r\n')
    );
    assert.deepEqual(parsed.releases, [
      { name: '@spectrum-web-components/menu', type: 'patch' },
      { name: '@spectrum-web-components/picker', type: 'minor' },
    ]);
    assert.equal(parsed.body, 'Fixed a thing.');
  });

  it('returns null without frontmatter', () => {
    assert.equal(parseChangeset('Just text'), null);
  });
});

describe('toComponentLabel', () => {
  it('prefixes component packages with sp-', () => {
    assert.equal(labelFor('@spectrum-web-components/menu'), 'sp-menu');
  });

  it('keeps tool packages and other scopes as is', () => {
    assert.equal(
      labelFor('@spectrum-web-components/reactive-controllers'),
      'reactive-controllers'
    );
    assert.equal(labelFor('@adobe/other'), '@adobe/other');
  });
});

describe('parseCommitLog', () => {
  const sha = 'abcdef1234567890abcdef1234567890abcdef12';

  it('reads a squash-merge PR number', () => {
    assert.deepEqual(parseCommitLog(`${sha}\tfix(menu): thing (#6789)\n`), {
      commit: sha,
      pr: '6789',
    });
  });

  it('reads a merge-commit PR number', () => {
    assert.deepEqual(
      parseCommitLog(`${sha}\tMerge pull request #42 from a/b`),
      { commit: sha, pr: '42' }
    );
  });

  it('returns the commit only when no PR is referenced', () => {
    assert.deepEqual(parseCommitLog(`${sha}\tchore: thing`), { commit: sha });
  });

  it('returns nothing for empty output', () => {
    assert.deepEqual(parseCommitLog(''), {});
  });
});

describe('formatEntry', () => {
  const meta = { commit: 'abcdef1234567890', pr: '12' };

  it('prefixes the first line with PR and commit links', () => {
    assert.equal(
      formatEntry('Fixed a thing.', meta, REPO),
      `- [#12](${REPO}/pull/12) [\`abcdef1\`](${REPO}/commit/abcdef1234567890) - Fixed a thing.`
    );
  });

  it('renders a plain item without links', () => {
    assert.equal(formatEntry('Fixed a thing.'), '- Fixed a thing.');
  });

  it('keeps multi-line bodies intact inside the list item', () => {
    const body = [
      'Fixed a thing.',
      '',
      'More detail.',
      '- nested one',
      '- nested two',
      '',
      '```js',
      'const x = 1;',
      '```',
    ].join('\n');
    assert.equal(
      formatEntry(body),
      [
        '- Fixed a thing.',
        '',
        '  More detail.',
        '  - nested one',
        '  - nested two',
        '',
        '  ```js',
        '  const x = 1;',
        '  ```',
      ].join('\n')
    );
  });

  it('nests bodies that start with a list under the links', () => {
    assert.equal(
      formatEntry('- one\n- two', { pr: '7' }, REPO),
      [`- [#7](${REPO}/pull/7)`, '  - one', '  - two'].join('\n')
    );
  });
});

describe('groupChangesets', () => {
  const menu = '@spectrum-web-components/menu';
  const picker = '@spectrum-web-components/picker';
  const tabs = '@spectrum-web-components/tabs';

  it('lists a component once with every change nested under it', () => {
    const groups = groupChangesets(
      [
        { releases: [{ name: menu, type: 'patch' }], body: 'First.' },
        { releases: [{ name: tabs, type: 'patch' }], body: 'Tabs.' },
        { releases: [{ name: menu, type: 'patch' }], body: 'Second.' },
      ],
      labelFor
    );
    assert.deepEqual(groups.patch, [
      { label: '**sp-menu**', entries: ['- First.', '- Second.'] },
      { label: '**sp-tabs**', entries: ['- Tabs.'] },
    ]);
    assert.deepEqual(groups.major, []);
    assert.deepEqual(groups.minor, []);
  });

  it('lists a multi-package changeset once under a sorted label', () => {
    const groups = groupChangesets(
      [
        {
          releases: [
            { name: tabs, type: 'patch' },
            { name: menu, type: 'patch' },
          ],
          body: 'Shared fix.',
        },
      ],
      labelFor
    );
    assert.deepEqual(groups.patch, [
      { label: '**sp-menu**, **sp-tabs**', entries: ['- Shared fix.'] },
    ]);
  });

  it('splits a changeset across bump types', () => {
    const groups = groupChangesets(
      [
        {
          releases: [
            { name: picker, type: 'minor' },
            { name: menu, type: 'patch' },
          ],
          body: 'Mixed.',
        },
      ],
      labelFor
    );
    assert.deepEqual(groups.minor, [
      { label: '**sp-picker**', entries: ['- Mixed.'] },
    ]);
    assert.deepEqual(groups.patch, [
      { label: '**sp-menu**', entries: ['- Mixed.'] },
    ]);
  });

  it('sorts groups alphabetically regardless of input order', () => {
    const changesets = [
      { releases: [{ name: tabs, type: 'patch' }], body: 'T.' },
      {
        releases: [{ name: '@spectrum-web-components/base', type: 'patch' }],
        body: 'B.',
      },
      { releases: [{ name: menu, type: 'patch' }], body: 'M.' },
    ];
    const labels = groupChangesets(changesets, labelFor).patch.map(
      (group) => group.label
    );
    assert.deepEqual(labels, ['**base**', '**sp-menu**', '**sp-tabs**']);
    assert.deepEqual(
      groupChangesets([...changesets].reverse(), labelFor).patch.map(
        (group) => group.label
      ),
      labels
    );
  });

  it('skips changesets with an empty body', () => {
    const groups = groupChangesets(
      [{ releases: [{ name: menu, type: 'patch' }], body: '' }],
      labelFor
    );
    assert.deepEqual(groups.patch, []);
  });
});

describe('renderGroups and buildChangelogEntry', () => {
  it('renders the 1st-gen grouped format', () => {
    const groups = groupChangesets(
      [
        {
          releases: [{ name: '@spectrum-web-components/menu', type: 'patch' }],
          body: 'One.\n\nDetail.',
        },
        {
          releases: [{ name: '@spectrum-web-components/menu', type: 'patch' }],
          body: 'Two.',
        },
      ],
      labelFor
    );
    assert.equal(
      renderGroups(groups.patch),
      '**sp-menu**:\n\n- One.\n\n  Detail.\n\n- Two.'
    );
    assert.equal(
      buildChangelogEntry('1.2.3', 'URL', '2026-01-01', groups),
      '# [1.2.3](URL) (2026-01-01)\n\n## Patch Changes\n\n**sp-menu**:\n\n- One.\n\n  Detail.\n\n- Two.\n\n'
    );
  });
});
