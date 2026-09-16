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
 * Apply token reference fixes to a CSS string.
 *
 * Each `token("name")` call in the content is inspected against the renamed and deleted
 * maps and replaced according to one of four rules:
 *
 *   - Renamed:  token("old")  →  token("new")
 *   - Zero:     token("zero") →  0
 *   - Replaced: token("old")  →  token("suggestion")
 *   - TODO:     token("old")  →  token("old") /∗ TODO ∗/
 *
 * @param {string} content - CSS source to transform
 * @param {Record<string, string>} renamed - deprecated+renamed token map { old → new }
 * @param {Record<string, string | null>} deleted - curated deleted token map
 * @returns {{ result: string, replacements: Array<{kind: string, from: string, to?: string}> }}
 */
export function fixContent(content, renamed, deleted) {
  const re = /token\(\s*(['"])([\w-]+)\1\s*\)/g;
  const replacements = [];

  const result = content.replace(re, (match, _quote, tokenName) => {
    if (tokenName in renamed) {
      const newName = renamed[tokenName];
      replacements.push({ kind: 'renamed', from: tokenName, to: newName });
      return `token("${newName}")`;
    }

    if (tokenName in deleted) {
      const replacement = deleted[tokenName];

      if (replacement === '0') {
        replacements.push({ kind: 'zero', from: tokenName });
        return '0';
      }

      if (typeof replacement === 'string') {
        replacements.push({
          kind: 'replaced',
          from: tokenName,
          to: replacement,
        });
        return `token("${replacement}")`;
      }

      // null: no known replacement — flag for manual review
      replacements.push({ kind: 'todo', from: tokenName });
      return `${match} /* TODO: removed token — no known replacement, check Spectrum changelog */`;
    }

    return match;
  });

  return { result, replacements };
}
