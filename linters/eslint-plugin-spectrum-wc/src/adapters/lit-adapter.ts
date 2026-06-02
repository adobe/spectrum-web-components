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

import type { Rule } from 'eslint';
import { parseFragment } from 'parse5';

import type { AttributeValue, ParsedElement } from '../core/types.js';

/** Placeholder inserted where template expressions (${...}) appear. */
const EXPR_PLACEHOLDER = '\u200B__SWC_EXPR__\u200B';

const LIT_HTML_TAGS = new Set(['html']);

function isLitHtmlTemplate(node: Rule.Node): boolean {
  if (node.type !== 'TaggedTemplateExpression') {
    return false;
  }

  const te = node as unknown as {
    tag: {
      type: string;
      name?: string;
      property?: { name?: string };
    };
    quasi: { quasis: Array<{ value: { raw: string } }> };
  };

  const { tag } = te;

  if (tag.type === 'Identifier' && LIT_HTML_TAGS.has(tag.name ?? '')) {
    return true;
  }

  if (
    tag.type === 'MemberExpression' &&
    tag.property?.name &&
    LIT_HTML_TAGS.has(tag.property.name)
  ) {
    return true;
  }

  return false;
}

function getTemplateText(node: Rule.Node): string {
  const te = node as unknown as {
    quasi: { quasis: Array<{ value: { raw: string } }> };
  };

  return te.quasi.quasis
    .map((quasi, i) => {
      const text = quasi.value.raw;
      if (i < te.quasi.quasis.length - 1) {
        return text + EXPR_PLACEHOLDER;
      }
      return text;
    })
    .join('');
}

function parseAttributeName(raw: string): {
  name: string;
  bindingType?: '.' | '?' | '@';
} {
  if (raw.startsWith('.')) {
    return { name: raw.slice(1), bindingType: '.' };
  }
  if (raw.startsWith('?')) {
    return { name: raw.slice(1), bindingType: '?' };
  }
  if (raw.startsWith('@')) {
    return { name: raw.slice(1), bindingType: '@' };
  }
  return { name: raw };
}

interface Parse5Node {
  nodeName: string;
  tagName?: string;
  attrs?: Array<{ name: string; value: string }>;
  childNodes?: Parse5Node[];
  value?: string;
  sourceCodeLocation?: {
    startOffset: number;
    endOffset: number;
    startLine: number;
    startCol: number;
  };
}

function extractFromParse5(
  fragment: ReturnType<typeof parseFragment>
): ParsedElement[] {
  const results: ParsedElement[] = [];

  function walk(nodes: Parse5Node[]): ParsedElement[] {
    const localResults: ParsedElement[] = [];

    for (const node of nodes) {
      if (node.nodeName === '#text') {
        continue;
      }
      if (node.nodeName === '#comment') {
        continue;
      }

      const tagName = node.tagName ?? node.nodeName;

      const childElements = node.childNodes ? walk(node.childNodes) : [];

      const isSwcElement =
        tagName.startsWith('sp-') || tagName === 'overlay-trigger';

      if (!isSwcElement) {
        localResults.push(...childElements);
        continue;
      }

      const attributes = new Map<string, AttributeValue>();

      if (node.attrs) {
        for (const attr of node.attrs) {
          const { name, bindingType } = parseAttributeName(attr.name);
          const isDynamic = attr.value.includes(EXPR_PLACEHOLDER);
          attributes.set(name, {
            value: isDynamic ? null : attr.value,
            isDynamic,
            bindingType,
          });
        }
      }

      let hasTextContent = false;
      if (node.childNodes) {
        for (const child of node.childNodes) {
          if (child.nodeName === '#text') {
            const text = child.value ?? '';
            const stripped = text
              .replace(/\u200B__SWC_EXPR__\u200B/g, '')
              .trim();
            if (stripped.length > 0) {
              hasTextContent = true;
              break;
            }
          }
        }
      }

      localResults.push({
        tagName,
        attributes,
        children: childElements,
        hasTextContent,
        loc: node.sourceCodeLocation
          ? {
              startOffset: node.sourceCodeLocation.startOffset,
              endOffset: node.sourceCodeLocation.endOffset,
              startLine: node.sourceCodeLocation.startLine,
              startCol: node.sourceCodeLocation.startCol,
            }
          : undefined,
      });
    }

    return localResults;
  }

  const nodes = (fragment as unknown as { childNodes: Parse5Node[] })
    .childNodes;
  results.push(...walk(nodes));
  return results;
}

/**
 * Extract all SWC elements from a Lit `html` tagged template expression.
 * Returns an empty array if the node is not a Lit template.
 */
export function extractElementsFromTemplate(node: Rule.Node): ParsedElement[] {
  if (!isLitHtmlTemplate(node)) {
    return [];
  }

  const templateText = getTemplateText(node);

  try {
    const fragment = parseFragment(templateText, {
      sourceCodeLocationInfo: true,
    });
    return extractFromParse5(fragment);
  } catch {
    return [];
  }
}
