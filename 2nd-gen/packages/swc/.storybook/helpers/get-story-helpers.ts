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

/**
 * Wraps `getStorybookHelpers` to merge the "attributes" category into
 * "properties" and annotate each property's description with its
 * reflected HTML attribute name when applicable.
 */
export function getStoryHelpers<T>(tagName: string) {
  const helpers = getStorybookHelpers<T>(tagName);
  const { argTypes } = helpers;

  // Merge attribute entries into properties — the custom API table
  // handles the attribute/reflects columns separately.
  for (const [, argType] of Object.entries(argTypes)) {
    if (argType?.table?.category === 'attributes') {
      argType.table.category = 'properties';
    }
  }

  return helpers;
}
