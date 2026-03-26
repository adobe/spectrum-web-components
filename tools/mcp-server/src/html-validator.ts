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

import { parse } from 'node-html-parser';

import type { ComponentRegistry } from './registry.js';
import type { ValidationDiagnostic, ValidationResult } from './types.js';

const GLOBAL_ATTRIBUTES = new Set([
  'id',
  'class',
  'style',
  'title',
  'lang',
  'dir',
  'hidden',
  'tabindex',
  'slot',
  'part',
  'role',
]);

function isGlobalAttribute(name: string): boolean {
  return (
    GLOBAL_ATTRIBUTES.has(name) ||
    name.startsWith('aria-') ||
    name.startsWith('data-')
  );
}

function levenshtein(a: string, b: string): number {
  const m = a.length,
    n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

/**
 * Validate an HTML snippet against the component registry.
 * Checks that all attributes on SWC elements are known, flags
 * deprecated attributes as warnings, and suggests corrections for typos.
 */
export function validateHTML(
  html: string,
  registry: ComponentRegistry
): ValidationResult {
  const root = parse(html);
  const diagnostics: ValidationDiagnostic[] = [];

  const elements = root.querySelectorAll('*');

  for (const element of elements) {
    const tagName = element.rawTagName;
    const component = registry.get(tagName);

    if (!component) {
      continue;
    }

    // Build set of known attribute names from the component's attributes list
    const knownAttributes = new Set<string>(
      component.attributes.map((a) => a.name)
    );

    // Also include attribute names from properties that have an attribute mapping
    for (const prop of component.properties) {
      if (prop.attribute) {
        knownAttributes.add(prop.attribute);
      }
    }

    const attrs = element.attributes;

    for (const attrName of Object.keys(attrs)) {
      if (isGlobalAttribute(attrName)) {
        continue;
      }

      if (knownAttributes.has(attrName)) {
        // Check if this attribute is deprecated via properties
        const prop = component.properties.find((p) => p.attribute === attrName);
        if (prop && prop.deprecated !== false) {
          const reason =
            typeof prop.deprecated === 'object' && prop.deprecated.reason
              ? ` ${prop.deprecated.reason}`
              : '';
          diagnostics.push({
            severity: 'warning',
            message: `Attribute "${attrName}" on <${tagName}> is deprecated.${reason}`,
          });
        }
        continue;
      }

      // Unknown attribute — try to suggest a correction
      let suggestion = '';
      let bestDistance = Infinity;

      for (const known of knownAttributes) {
        const distance = levenshtein(attrName, known);
        if (distance <= 3 && distance < bestDistance) {
          bestDistance = distance;
          suggestion = known;
        }
      }

      const suggestionText = suggestion ? ` Did you mean '${suggestion}'?` : '';
      diagnostics.push({
        severity: 'error',
        message: `Unknown attribute "${attrName}" on <${tagName}>.${suggestionText}`,
      });
    }
  }

  return {
    valid: diagnostics.filter((d) => d.severity === 'error').length === 0,
    diagnostics,
  };
}
