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

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Message constants (aligned with eslint-plugin-notice)
const COULD_NOT_FIND = 'Missing notice header';
const REPORT_AND_SKIP =
  'Found a header comment which did not have a notice header, skipping fix and reporting';

export const MESSAGES = {
  whenFailedToMatch: COULD_NOT_FIND,
  reportAndSkip: REPORT_AND_SKIP,
};

const ESCAPE = /[-[\]/{}()*+?.\\^$|]/g;

function escapeRegExp(str) {
  return String(str).replace(ESCAPE, '\\$&');
}

/**
 * Resolve template content from templateFile or template string.
 * Tries templateFile as-is, then relative to cwd, then relative to this package's repo root.
 *
 * @param {string} fileName - Path to the file being linted (for context)
 * @param {object} opts - Options object containing templateFile and template
 * @param {string | null} opts.templateFile - Path to the template file
 * @param {string | null} opts.template - Template string
 * @returns {string | null} Template string or null if not found / not provided
 */
export function resolveTemplate(fileName, { templateFile, template }) {
  if (template != null && typeof template === 'string') {
    return template.replace(/\r\n/g, '\n');
  }
  if (!templateFile) {
    return null;
  }
  const candidates = [
    path.isAbsolute(templateFile)
      ? templateFile
      : path.join(process.cwd(), templateFile),
    path.resolve(__dirname, '..', '..', templateFile),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return fs.readFileSync(candidate, 'utf8').replace(/\r\n/g, '\n');
    }
  }
  return null;
}

/**
 * Resolve options for notice-style rules (shared with notice/notice and notice-after-shebang).
 * Returns resolvedTemplate (with YEAR substituted), mustMatch (RegExp), onNonMatchingHeader, messages.
 *
 * @param {object} options - Rule options (mustMatch, templateFile, template, templateVars, onNonMatchingHeader, messages)
 * @param {string} fileName - Path to the file being linted
 * @returns {{ resolvedTemplate: string | null, mustMatch: RegExp | null, onNonMatchingHeader: 'prepend' | 'replace' | 'report', messages: object }}
 */
export function resolveOptions(options, fileName) {
  const opts = options || {};
  let {
    mustMatch,
    templateFile,
    template,
    templateVars,
    onNonMatchingHeader,
    messages,
  } = opts;

  onNonMatchingHeader = onNonMatchingHeader || 'prepend';
  templateVars = templateVars || {};
  messages = { ...MESSAGES, ...messages };

  let templateStr = resolveTemplate(fileName, { templateFile, template });
  const year = new Date().getFullYear();
  let resolvedTemplate = null;
  if (templateStr) {
    resolvedTemplate = templateStr.replace(/<%\s*=\s*YEAR\s*%>/g, String(year));
    for (const [key, value] of Object.entries(templateVars)) {
      resolvedTemplate = resolvedTemplate.replace(
        new RegExp(`<%=\\s*${escapeRegExp(key)}\\s*%>`, 'g'),
        String(value)
      );
    }
  }

  let mustMatchRegex = null;
  if (mustMatch instanceof RegExp) {
    mustMatchRegex = mustMatch;
  } else if (typeof mustMatch === 'string') {
    mustMatchRegex = new RegExp(escapeRegExp(mustMatch));
  } else if (resolvedTemplate) {
    // Require exact match including current year when no mustMatch is provided.
    mustMatchRegex = new RegExp(escapeRegExp(resolvedTemplate));
  }

  return {
    resolvedTemplate,
    mustMatch: mustMatchRegex,
    onNonMatchingHeader,
    messages,
  };
}

/**
 * Create a fixer for the notice-after-shebang rule: insert after shebang or replace existing header range.
 *
 * @param {object} params
 * @param {string | null} params.resolvedTemplate - Resolved header text (trimmed when used)
 * @param {boolean} params.hasHeaderComment - Whether a header comment block exists after the shebang
 * @param {[number, number] | null} params.replaceRange - Range to replace when onNonMatchingHeader === 'replace'
 * @param {string} params.replaceSuffix - Newline(s) after the header when replacing
 * @param {number} params.endOfFirstLine - End offset of the shebang line (insertion point)
 * @param {string} params.text - Full source text (to detect existing newlines after shebang)
 * @param {'prepend' | 'replace' | 'report'} params.onNonMatchingHeader
 * @returns {((fixer: import('eslint').Rule.RuleFixer) => import('eslint').Rule.Fix) | undefined}
 */
export function createFixerForShebang({
  resolvedTemplate,
  hasHeaderComment,
  replaceRange,
  replaceSuffix,
  endOfFirstLine,
  text,
  onNonMatchingHeader,
}) {
  if (!resolvedTemplate) {
    return undefined;
  }
  const headerBlock = resolvedTemplate.trim();
  if (!hasHeaderComment || onNonMatchingHeader === 'prepend') {
    return (fixer) => {
      const afterShebang = text[endOfFirstLine];
      const nextLineBlank =
        afterShebang === '\n' &&
        (text[endOfFirstLine + 1] === '\n' ||
          text[endOfFirstLine + 1] === '\r');
      const suffix = nextLineBlank ? '\n' : '\n\n';
      return fixer.insertTextAfterRange(
        [0, endOfFirstLine],
        '\n' + headerBlock + suffix
      );
    };
  }
  if (hasHeaderComment && onNonMatchingHeader === 'replace' && replaceRange) {
    return (fixer) =>
      fixer.replaceTextRange(replaceRange, headerBlock + replaceSuffix);
  }
  return undefined;
}
