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
  getComponentKey,
  groupChangelog,
  normalizeScope,
} from './group-gen2-changelog.js';

const REPO = 'https://github.com/adobe/spectrum-web-components';
const entry = (pr, sha, text) =>
  `- [#${pr}](${REPO}/pull/${pr}) [\`${sha.slice(0, 7)}\`](${REPO}/commit/${sha}) - ${text}`;

const SHA = {
  a: 'aaaaaaa111111111111111111111111111111111',
  b: 'bbbbbbb222222222222222222222222222222222',
  c: 'ccccccc333333333333333333333333333333333',
  d: 'ddddddd444444444444444444444444444444444',
  old: 'eeeeeee555555555555555555555555555555555',
};

const released = [
  '## 2.0.0-beta.1',
  '',
  '### Patch Changes',
  '',
  entry(1, SHA.old, '**fix(menu):** Old fix.'),
  '',
].join('\n');

const header = '# @adobe/spectrum-wc\n';

describe('normalizeScope', () => {
  it('normalizes names, tags, and lists', () => {
    assert.equal(normalizeScope('Color Loupe'), 'color-loupe');
    assert.equal(normalizeScope('<swc-menu>'), 'menu');
    assert.equal(normalizeScope('sp-menu'), 'menu');
    assert.equal(normalizeScope('tabs, menu'), 'menu, tabs');
  });

  it('treats wildcard and empty scopes as ungrouped', () => {
    assert.equal(normalizeScope('\\*'), null);
    assert.equal(normalizeScope(''), null);
  });
});

describe('getComponentKey', () => {
  const keyOf = (text) => getComponentKey(entry(1, SHA.a, text));

  it('reads bold and plain conventional commit scopes', () => {
    assert.equal(keyOf('**fix(menu):** x'), 'menu');
    assert.equal(keyOf('**feat(menu)!:** x'), 'menu');
    assert.equal(keyOf('fix(Action Button): x'), 'action-button');
    assert.equal(getComponentKey('- fix(menu): no links'), 'menu');
  });

  it('reads a leading component name', () => {
    assert.equal(keyOf('`Color Loupe` — x'), 'color-loupe');
    assert.equal(keyOf('**AI Toolkit** — x'), 'ai-toolkit');
  });

  it('leaves unscoped and dependency entries ungrouped', () => {
    assert.equal(keyOf('Add the gen2 `<swc-card>`.'), null);
    assert.equal(keyOf('**fix(\\*):** x'), null);
    const dependencies = `- Updated dependencies [[\`aaaaaaa\`](${REPO}/commit/${SHA.a})]:`;
    assert.equal(getComponentKey(dependencies), null);
  });
});

describe('groupChangelog', () => {
  const newSection = [
    '## 2.0.0-beta.2',
    '',
    '### Minor Changes',
    '',
    entry(10, SHA.a, '**feat(tabs):** Tabs feature.'),
    '',
    '### Patch Changes',
    '',
    entry(11, SHA.b, '**fix(menu):** Second menu fix.'),
    '',
    '  More detail.',
    '  - nested',
    '',
    entry(12, SHA.c, 'Unscoped change.'),
    '',
    entry(13, SHA.d, '**fix(action-button):** Button fix.'),
    '',
    entry(14, SHA.a.replace('a', 'f'), '**fix(menu):** Third menu fix.'),
    '',
    `- Updated dependencies [[\`ddddddd\`](${REPO}/commit/${SHA.d})]:`,
    '  - @adobe/spectrum-wc-core@2.0.0-beta.2',
    '',
  ].join('\n');

  const content = `${header}\n${newSection}\n${released}`;
  const previous = `${header}\n${released}`;

  it('groups a component once with each change nested under it', () => {
    const output = groupChangelog(content, previous);
    assert.equal(
      output,
      [
        header,
        '## 2.0.0-beta.2',
        '',
        '### Minor Changes',
        '',
        '- **tabs**:',
        `  ${entry(10, SHA.a, '**feat(tabs):** Tabs feature.')}`,
        '',
        '### Patch Changes',
        '',
        '- **action-button**:',
        `  ${entry(13, SHA.d, '**fix(action-button):** Button fix.')}`,
        '',
        '- **menu**:',
        `  ${entry(11, SHA.b, '**fix(menu):** Second menu fix.')}`,
        '',
        '    More detail.',
        '    - nested',
        '',
        `  ${entry(14, SHA.a.replace('a', 'f'), '**fix(menu):** Third menu fix.')}`,
        '',
        entry(12, SHA.c, 'Unscoped change.'),
        '',
        `- Updated dependencies [[\`ddddddd\`](${REPO}/commit/${SHA.d})]:`,
        '  - @adobe/spectrum-wc-core@2.0.0-beta.2',
        '',
        released,
      ].join('\n')
    );
  });

  it('leaves released sections untouched', () => {
    const output = groupChangelog(content, previous);
    assert.ok(output.endsWith(released));
  });

  it('is idempotent', () => {
    const once = groupChangelog(content, previous);
    assert.equal(groupChangelog(once, previous), once);
  });

  it('drops entries already listed in an older section', () => {
    const notes = [];
    const withDuplicate = content.replace(
      '### Patch Changes\n\n',
      `### Patch Changes\n\n${entry(1, SHA.old, '**fix(menu):** Old fix.')}\n\n`
    );
    const output = groupChangelog(withDuplicate, previous, (note) =>
      notes.push(note)
    );
    assert.equal(output, groupChangelog(content, previous));
    assert.equal(notes.length, 1);
  });

  it('removes a change type heading left empty by duplicates', () => {
    const onlyDuplicate = [
      header,
      '## 2.0.0-beta.2',
      '',
      '### Minor Changes',
      '',
      entry(1, SHA.old, '**fix(menu):** Old fix.'),
      '',
      '### Patch Changes',
      '',
      entry(10, SHA.a, '**fix(tabs):** New.'),
      '',
      released,
    ].join('\n');
    const output = groupChangelog(onlyDuplicate, previous);
    assert.ok(!output.includes('### Minor Changes'));
    assert.ok(output.includes('- **tabs**:'));
  });

  it('treats every section as new when there is no previous revision', () => {
    const output = groupChangelog(`${header}\n${released}`);
    const nested = `  ${entry(1, SHA.old, '**fix(menu):** Old fix.')}`;
    assert.ok(output.includes(`- **menu**:\n${nested}`));
  });

  it('produces the same output regardless of group input order', () => {
    const a = entry(20, SHA.a, '**fix(zeta):** Z.');
    const b = entry(21, SHA.b, '**fix(alpha):** A.');
    const build = (first, second) =>
      `${header}\n## 2.0.0-beta.2\n\n### Patch Changes\n\n${first}\n\n${second}\n`;
    const forward = groupChangelog(build(a, b));
    const reversed = groupChangelog(build(b, a));
    assert.equal(forward, reversed);
    assert.ok(forward.indexOf('**alpha**') < forward.indexOf('**zeta**'));
  });
});
