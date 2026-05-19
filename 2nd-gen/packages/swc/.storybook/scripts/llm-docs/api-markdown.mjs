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
 * Escapes a table cell value for markdown pipe tables.
 *
 * @param {string} value - Raw cell value
 * @returns {string} Escaped cell value
 */
function escapeCell(value) {
  return String(value ?? '')
    .replace(/\|/g, '\\|')
    .replace(/\n/g, ' ');
}

/**
 * Formats a markdown pipe table.
 *
 * @param {string[]} headers - Column headings
 * @param {string[][]} rows - Table body rows
 * @returns {string} Markdown table, or an empty string when there are no rows
 */
function markdownTable(headers, rows) {
  if (rows.length === 0) {
    return '';
  }

  const headerLine = `| ${headers.join(' | ')} |`;
  const separator = `| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows
    .map((row) => `| ${row.map(escapeCell).join(' | ')} |`)
    .join('\n');

  return `${headerLine}\n${separator}\n${body}`;
}

/**
 * Finds a custom element declaration in the CEM package.
 *
 * @param {import('custom-elements-manifest/schema').Package} cem - Custom elements manifest
 * @param {string} tagName - Custom element tag name
 * @returns {import('custom-elements-manifest/schema').Declaration | undefined} Matching declaration, if any
 */
function findComponent(cem, tagName) {
  for (const mod of cem.modules ?? []) {
    for (const decl of mod.declarations ?? []) {
      if ('tagName' in decl && decl.tagName === tagName) {
        return decl;
      }
    }
  }
  return undefined;
}

/**
 * Renders API reference tables from the custom elements manifest.
 *
 * @param {import('custom-elements-manifest/schema').Package} cem - Custom elements manifest
 * @param {string} tagName - Custom element tag name
 * @returns {string} Markdown API section
 */
export function renderApiMarkdown(cem, tagName) {
  const component = findComponent(cem, tagName);

  if (!component) {
    return `_No API data found for \`${tagName}\` in custom-elements.json. Run \`yarn analyze\` first._\n`;
  }

  const sections = [];

  const members = (component.members ?? []).filter(
    (m) =>
      m.kind === 'field' &&
      m.privacy !== 'private' &&
      m.privacy !== 'protected' &&
      !m.static
  );

  const attrByField = new Map();
  for (const attr of component.attributes ?? []) {
    if (attr.fieldName) {
      attrByField.set(attr.fieldName, attr);
    }
  }

  if (members.length > 0) {
    const rows = members.map((prop) => {
      const attr = attrByField.get(prop.name);
      const attribute = attr
        ? `\`${attr.name}\`${prop.reflects ? ' (reflects)' : ''}`
        : '-';
      const type = prop.type?.text ? `\`${prop.type.text}\`` : '-';
      const defaultValue = prop.default != null ? `\`${prop.default}\`` : '-';

      return [
        `\`${prop.name}\``,
        attribute,
        type,
        defaultValue,
        prop.description ?? '',
      ];
    });

    sections.push(
      '### Properties\n\n' +
        markdownTable(
          ['Property', 'Attribute', 'Type', 'Default', 'Description'],
          rows
        )
    );
  }

  const slots = component.slots ?? [];
  if (slots.length > 0) {
    const rows = slots.map((slot) => [
      `\`${slot.name || '(default)'}\``,
      slot.description ?? '',
    ]);
    sections.push(
      '### Slots\n\n' + markdownTable(['Name', 'Description'], rows)
    );
  }

  const events = component.events ?? [];
  if (events.length > 0) {
    const rows = events.map((event) => [
      `\`${event.name}\``,
      event.description ?? '',
    ]);
    sections.push(
      '### Events\n\n' + markdownTable(['Name', 'Description'], rows)
    );
  }

  const cssProps = component.cssProperties ?? [];
  if (cssProps.length > 0) {
    const rows = cssProps.map((prop) => [
      `\`${prop.name}\``,
      prop.default != null ? `\`${prop.default}\`` : '-',
      prop.description ?? '',
    ]);
    sections.push(
      '### CSS custom properties\n\n' +
        markdownTable(['Name', 'Default', 'Description'], rows)
    );
  }

  const cssParts = component.cssParts ?? [];
  if (cssParts.length > 0) {
    const rows = cssParts.map((part) => [
      `\`${part.name}\``,
      part.description ?? '',
    ]);
    sections.push(
      '### CSS parts\n\n' + markdownTable(['Name', 'Description'], rows)
    );
  }

  return sections.length > 0
    ? `${sections.join('\n\n')}\n`
    : '_No public API members documented in the manifest._\n';
}
