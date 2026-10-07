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
 * Changesets changelog generator for gen2 that groups entries by component.
 *
 * It wraps `@changesets/changelog-github`, which still renders every entry
 * (PR link, commit link, body), and only changes how the entries of one
 * release are laid out: entries whose first line names a component
 * (`**fix(menu):**`, `fix(menu):`, `` `Menu` — ``, or `**Menu** —`) are nested
 * under `- **menu**:`, sorted alphabetically. Other entries stay ungrouped,
 * after the groups, in their original order.
 *
 * Changesets asks for one line per changeset (`getReleaseLine`), then exactly
 * one `getDependencyReleaseLine` for the same package, all synchronously and
 * before awaiting any of them. This generator holds the release lines until
 * that dependency call (or the next tick, as a fallback), renders the whole
 * batch at once, resolves the first line of each bump type with the grouped
 * block, and resolves the rest with an empty string, which changesets drops.
 *
 * Configured in `gen2/.changeset/config.json`.
 */

'use strict';

const LINK_PREFIX =
  /^-\s+(?:\[#\d+\]\([^)]*\)\s*)?(?:\[`[0-9a-f]+`\]\([^)]*\)\s*)?(?:Thanks\s[^!]*!\s*)?(?:-\s+)?/;

/**
 * Normalizes a component scope or name into a group key.
 *
 * @param {string} scope - Raw scope, for example `Color Loupe` or `<swc-menu>`
 * @returns {string | null} The key, or `null` when the scope is not a component
 */
function normalizeScope(scope) {
  const keys = scope
    .replace(/\\\*/g, '*')
    .split(',')
    .map((part) =>
      part
        .trim()
        .toLowerCase()
        .replace(/[<>`]/g, '')
        .replace(/^(swc|sp)-/, '')
        .replace(/\s+/g, '-')
    )
    .filter((part) => part && part !== '*');
  if (!keys.length) {
    return null;
  }
  return [...new Set(keys)].sort().join(', ');
}

/**
 * Detects the component an entry belongs to from its first line.
 *
 * @param {string} firstLine - First line of a rendered changelog entry
 * @returns {string | null} The group key, or `null` when ungrouped
 */
function getComponentKey(firstLine) {
  const text = firstLine.replace(LINK_PREFIX, '');
  const scope =
    text.match(/^\*\*\s*[a-z]+\(([^)]*)\)!?:?\s*\*\*/i)?.[1] ??
    text.match(/^[a-z]+\(([^)]*)\)!?:/i)?.[1] ??
    text.match(/^`([^`]+)`\s+[—–-]\s/)?.[1] ??
    text.match(/^\*\*([^*]+)\*\*\s+[—–-]\s/)?.[1];
  return scope === undefined ? null : normalizeScope(scope);
}

/**
 * Groups rendered entries by component.
 *
 * @param {string[]} entries - Entries rendered by the wrapped generator
 * @returns {string} The grouped Markdown list
 */
function groupEntries(entries) {
  const groups = new Map();
  const ungrouped = [];
  for (const entry of entries) {
    const text = entry.trim();
    const key = getComponentKey(text.split('\n')[0]);
    if (key === null) {
      ungrouped.push(text);
    } else {
      groups.set(key, [...(groups.get(key) ?? []), text]);
    }
  }

  const indent = (text) =>
    text
      .split('\n')
      .map((line) => (line.trim() ? `  ${line}` : ''))
      .join('\n');
  const rendered = [...groups.keys()]
    .sort()
    .map((key) =>
      [`- **${key}**:`, groups.get(key).map(indent).join('\n\n')].join('\n')
    );
  return [...rendered, ...ungrouped].join('\n\n');
}

/**
 * Creates the changesets changelog functions around a base generator.
 *
 * @param {() => { getReleaseLine: Function, getDependencyReleaseLine: Function }} loadBase
 *   Returns the generator that renders single entries
 * @returns {{ getReleaseLine: Function, getDependencyReleaseLine: Function }}
 *   The grouped changelog functions
 */
function createChangelogFunctions(loadBase) {
  let pending = [];
  let fallbackScheduled = false;

  /**
   * Renders every pending release line and resolves the deferred promises.
   */
  async function flush() {
    const batch = pending;
    pending = [];
    if (!batch.length) {
      return;
    }
    try {
      const base = loadBase();
      const lines = await Promise.all(
        batch.map(({ changeset, type, options }) =>
          base.getReleaseLine(changeset, type, options)
        )
      );
      const byType = new Map();
      batch.forEach((item, index) => {
        if (!lines[index]) {
          return;
        }
        byType.set(item.type, [
          ...(byType.get(item.type) ?? []),
          { item, line: lines[index] },
        ]);
      });
      const firsts = new Map();
      for (const entries of byType.values()) {
        firsts.set(
          entries[0].item,
          `\n\n${groupEntries(entries.map(({ line }) => line))}\n`
        );
      }
      for (const item of batch) {
        item.resolve(firsts.get(item) ?? '');
      }
    } catch (error) {
      for (const item of batch) {
        item.reject(error);
      }
    }
  }

  return {
    getReleaseLine(changeset, type, options) {
      return new Promise((resolve, reject) => {
        pending.push({ changeset, type, options, resolve, reject });
        if (!fallbackScheduled) {
          fallbackScheduled = true;
          setImmediate(() => {
            fallbackScheduled = false;
            flush();
          });
        }
      });
    },
    getDependencyReleaseLine(changesets, dependenciesUpdated, options) {
      flush();
      return loadBase().getDependencyReleaseLine(
        changesets,
        dependenciesUpdated,
        options
      );
    },
  };
}

/**
 * Loads `@changesets/changelog-github` on first use.
 *
 * @returns {{ getReleaseLine: Function, getDependencyReleaseLine: Function }}
 *   The GitHub changelog functions
 */
function loadChangelogGithub() {
  const changelogGithub = require('@changesets/changelog-github');
  return changelogGithub.default ?? changelogGithub;
}

module.exports = createChangelogFunctions(loadChangelogGithub);
