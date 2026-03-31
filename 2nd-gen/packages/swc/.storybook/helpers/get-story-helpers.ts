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

interface CemAttribute {
  name: string;
  fieldName?: string;
}

interface CemMember {
  name: string;
  kind: string;
  attribute?: string;
  reflects?: boolean;
}

interface CemDeclaration {
  tagName?: string;
  attributes?: CemAttribute[];
  members?: CemMember[];
}

interface CemModule {
  declarations?: CemDeclaration[];
}

interface Cem {
  modules?: CemModule[];
}

function findComponentByTagName(
  cem: Cem,
  tagName: string
): CemDeclaration | undefined {
  for (const mod of cem.modules || []) {
    for (const decl of mod.declarations || []) {
      if (decl.tagName === tagName) {
        return decl;
      }
    }
  }
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

  const cem: Cem | undefined = (window as unknown as Record<string, unknown>)
    .__STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__ as Cem | undefined;

  const component = cem ? findComponentByTagName(cem, tagName) : undefined;

  for (const [key, argType] of Object.entries(argTypes)) {
    if (argType?.table?.category === 'attributes') {
      // Look up whether this attribute reflects from the CEM
      const attr = component?.attributes?.find((a) => a.name === key);
      const member = attr?.fieldName
        ? component?.members?.find((m) => m.name === attr.fieldName)
        : undefined;

      const reflects = member?.reflects;

      // Merge into properties category
      argType.table.category = 'properties';

      const reflectsTag = reflects
        ? ` <span style="font-size:0.7em;opacity:0.8">(reflects)</span>`
        : '';
      const attributeLabel = `<b>Attribute:</b> <code>${key}</code>${reflectsTag}`;

      const desc = argType.description
        ? argType.description.replace(/\n/g, '<br/>')
        : '';

      argType.description = [attributeLabel, desc]
        .filter(Boolean)
        .join('<br/><br/>');
    }

    // Add trailing breaks before the type for all properties
    if (argType.description) {
      argType.description += '<br/><br/>';
    }
  }

  return helpers;
}
