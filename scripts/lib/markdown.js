/**
 * Build a GitHub-flavoured markdown table.
 *
 * @param {string[]} headers  - Column headings.
 * @param {string[][]} rows   - Array of rows, each row an array of cell values.
 * @returns {string} The formatted markdown table.
 */
export function mdTable(headers, rows) {
  const separator = headers.map(() => '---');
  const formatRow = (cells) => `| ${cells.join(' | ')} |`;
  return [
    formatRow(headers),
    formatRow(separator),
    ...rows.map(formatRow),
  ].join('\n');
}
