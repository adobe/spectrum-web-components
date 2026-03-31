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

import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import type {
  ClassMember,
  CustomElement,
  Declaration,
  Package,
} from 'custom-elements-manifest/schema';

/**
 * The 2nd-gen `custom-elements-manifest` schema lacks `reflects` and
 * `attribute` on class members. This type adds them so we can read
 * reflection metadata from the actual manifest data.
 */
type CustomElementMember = ClassMember & {
  attribute?: string;
  reflects?: boolean;
};

declare global {
  interface Window {
    __STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__?: Package;
  }
}

function isCustomElement(
  decl: Declaration
): decl is Declaration & CustomElement {
  return 'tagName' in decl;
}

/** Lazily-populated lookup from tagName → declaration. */
const componentCache = new Map<
  string,
  (Declaration & CustomElement) | undefined
>();

function findComponentByTagName(
  cem: Package,
  tagName: string
): (Declaration & CustomElement) | undefined {
  if (componentCache.has(tagName)) {
    return componentCache.get(tagName);
  }

  for (const mod of cem.modules) {
    for (const decl of mod.declarations ?? []) {
      if (isCustomElement(decl) && decl.tagName === tagName) {
        componentCache.set(tagName, decl);
        return decl;
      }
    }
  }
  componentCache.set(tagName, undefined);
  return undefined;
}

/**
 * Wraps `getStorybookHelpers` to merge the "attributes" category into
 * "properties" and annotate each property's description with its
 * reflected HTML attribute name when applicable.
 */
export function getStoryHelpers<T>(tagName: string) {
  const helpers = getStorybookHelpers<T>(tagName);
  const { argTypes } = helpers;

  const cem = window.__STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__;

  const component = cem ? findComponentByTagName(cem, tagName) : undefined;

  for (const [key, argType] of Object.entries(argTypes)) {
    if (argType?.table?.category === 'attributes') {
      // Look up whether this attribute reflects from the CEM
      const attr = component?.attributes?.find((a) => a.name === key);
      const member = attr?.fieldName
        ? (component?.members?.find((m) => m.name === attr.fieldName) as
            | CustomElementMember
            | undefined)
        : undefined;

      const reflects = member?.reflects;

      // Merge into properties category
      argType.table.category = 'properties';

      const reflectsTag = reflects
        ? ' <span style="font-size:0.75em;opacity:0.7">(reflects)</span>'
        : '';
      const attributeLabel = `**Attribute:** \`${key}\`${reflectsTag}`;

      const desc = argType.description ?? '';

      argType.description = [attributeLabel, desc].filter(Boolean).join('\n\n');
    }
  }

  return helpers;
}
