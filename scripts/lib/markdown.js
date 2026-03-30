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
 * Escape a markdown table cell value: collapse newlines to a space
 * and backslash-escape pipe characters.
 *
 * @param {string|null|undefined} value Cell content to escape
 * @returns {string} Escaped cell string safe for use inside a pipe table
 */
export function escapeCell(value) {
  if (!value) {
    return '';
  }
  return value.replace(/\r?\n/g, ' ').replace(/\|/g, '\\|');
}

/**
 * Render a GFM pipe table.
 * Returns an empty string when there are no rows.
 *
 * @param {string[]} headers Column header labels
 * @param {(string|null|undefined)[][]} rows Table rows; each inner array maps to one row
 * @returns {string} GFM pipe table string, or empty string when rows is empty
 */
export function mdTable(headers, rows) {
  if (rows.length === 0) {
    return '';
  }
  const header = `| ${headers.join(' | ')} |`;
  const divider = `| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows.map(
    (row) => `| ${row.map((c) => escapeCell(c) || '-').join(' | ')} |`
  );
  return [header, divider, ...body].join('\n');
}
