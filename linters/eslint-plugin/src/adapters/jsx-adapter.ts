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

import type { AttributeValue, ParsedElement } from '../core/types.js';
import { camelToKebab, isSwcJsxTag, resolveJsxTagName } from './utils.js';

interface JSXIdentifier {
  type: 'JSXIdentifier';
  name: string;
}

interface JSXMemberExpression {
  type: 'JSXMemberExpression';
  object: JSXIdentifier | JSXMemberExpression;
  property: JSXIdentifier;
}

interface JSXAttribute {
  type: 'JSXAttribute';
  name: JSXIdentifier;
  value:
    | { type: 'Literal'; value: string | number | boolean | null }
    | { type: 'JSXExpressionContainer'; expression: { type: string } }
    | null;
}

interface JSXSpreadAttribute {
  type: 'JSXSpreadAttribute';
  argument: { type: string };
}

interface JSXOpeningElement {
  type: 'JSXOpeningElement';
  name: JSXIdentifier | JSXMemberExpression;
  attributes: Array<JSXAttribute | JSXSpreadAttribute>;
  selfClosing: boolean;
}

interface JSXChild {
  type: string;
  value?: string;
  expression?: { type: string };
  openingElement?: JSXOpeningElement;
  children?: JSXChild[];
}

interface JSXElement {
  type: 'JSXElement';
  openingElement: JSXOpeningElement;
  children: JSXChild[];
}

/**
 * Resolve a JSX element's name node to a plain string.
 * Handles both `<SpButton>` (JSXIdentifier) and `<Sp.Button>` (JSXMemberExpression).
 */
function getJsxElementName(
  nameNode: JSXIdentifier | JSXMemberExpression
): string | null {
  if (nameNode.type === 'JSXIdentifier') {
    return nameNode.name;
  }

  if (nameNode.type === 'JSXMemberExpression') {
    const parts: string[] = [];
    let current: JSXIdentifier | JSXMemberExpression = nameNode;
    while (current.type === 'JSXMemberExpression') {
      parts.unshift(current.property.name);
      current = current.object;
    }
    parts.unshift(current.name);
    return parts.join('.');
  }

  return null;
}

/**
 * Determine if an attribute name is already kebab-case (contains a hyphen)
 * meaning it doesn't need conversion.
 */
function isKebabCase(name: string): boolean {
  return name.includes('-');
}

/**
 * Normalize a JSX attribute name to its HTML attribute equivalent.
 * If the prop is already kebab-case (e.g. `aria-label`), keep as-is.
 * Otherwise convert camelCase to kebab-case.
 */
function normalizeAttributeName(jsxPropName: string): string {
  if (isKebabCase(jsxPropName)) {
    return jsxPropName;
  }
  return camelToKebab(jsxPropName);
}

/**
 * Extract attributes from a JSXOpeningElement into a normalized map.
 */
function extractAttributes(
  opening: JSXOpeningElement
): Map<string, AttributeValue> {
  const attributes = new Map<string, AttributeValue>();

  for (const attr of opening.attributes) {
    if (attr.type === 'JSXSpreadAttribute') {
      continue;
    }

    const propName = attr.name.name;
    const htmlName = normalizeAttributeName(propName);

    if (attr.value === null) {
      attributes.set(htmlName, { value: '', isDynamic: false });
    } else if (attr.value.type === 'Literal') {
      const raw = attr.value.value === null ? '' : String(attr.value.value);
      attributes.set(htmlName, { value: raw, isDynamic: false });
    } else if (attr.value.type === 'JSXExpressionContainer') {
      attributes.set(htmlName, { value: null, isDynamic: true });
    }
  }

  return attributes;
}

/**
 * Recursively extract child ParsedElements from JSX children.
 * Includes all element children so slot validation can check non-SWC tags too.
 */
function extractChildElements(children: JSXChild[]): ParsedElement[] {
  const results: ParsedElement[] = [];

  for (const child of children) {
    if (child.type !== 'JSXElement' || !child.openingElement) {
      continue;
    }

    const rawName = getJsxElementName(child.openingElement.name);
    if (!rawName) {
      continue;
    }

    const isSwc = isSwcJsxTag(rawName);
    const tagName = isSwc ? resolveJsxTagName(rawName) : rawName;
    const attributes = extractAttributes(child.openingElement);
    const grandchildren = child.children
      ? extractChildElements(child.children)
      : [];

    let hasTextContent = false;
    if (child.children) {
      for (const grandchild of child.children) {
        if (grandchild.type === 'JSXText') {
          const text = (grandchild.value ?? '').trim();
          if (text.length > 0) {
            hasTextContent = true;
            break;
          }
        }
      }
    }

    results.push({
      tagName,
      attributes,
      children: grandchildren,
      hasTextContent,
    });
  }

  return results;
}

/**
 * Extract a ParsedElement from a JSXElement AST node.
 * Returns an empty array if not an SWC element.
 * Recursively extracts direct children for slot validation.
 */
export function extractElementFromJSX(node: Rule.Node): ParsedElement[] {
  const jsxNode = node as unknown as JSXElement;
  const opening = jsxNode.openingElement;

  const rawName = getJsxElementName(opening.name);
  if (!rawName || !isSwcJsxTag(rawName)) {
    return [];
  }

  const tagName = resolveJsxTagName(rawName);
  const attributes = extractAttributes(opening);
  const children = jsxNode.children
    ? extractChildElements(jsxNode.children)
    : [];

  let hasTextContent = false;
  if (jsxNode.children) {
    for (const child of jsxNode.children) {
      if (child.type === 'JSXText') {
        const text = (child.value ?? '').trim();
        if (text.length > 0) {
          hasTextContent = true;
          break;
        }
      }
    }
  }

  return [
    {
      tagName,
      attributes,
      children,
      hasTextContent,
    },
  ];
}
