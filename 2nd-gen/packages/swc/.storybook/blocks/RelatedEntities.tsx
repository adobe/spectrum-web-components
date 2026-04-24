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

import React from 'react';

import { useStoryComponent } from './cem-helpers';

/**
 * Render a list of sibling-entity cross-links, sourced from the current
 * component's `@related` JSDoc tag (a comma-separated list of element
 * tag names). Each entry links to the sibling's Storybook docs page.
 *
 * Example JSDoc:
 *
 * ```ts
 * /**
 *  * @element swc-badge
 *  * @related status-light,tag
 *  *\/
 * ```
 *
 * Renders nothing when `@related` is absent.
 */
export function RelatedEntities() {
  const component = useStoryComponent();
  const related = component?.related ?? [];
  if (related.length === 0) return null;

  return (
    <>
      <h3>Related</h3>
      <ul>
        {related.map((name) => {
          const slug = name.startsWith('swc-') ? name.slice(4) : name;
          const label = slug
            .split('-')
            .map((p) => (p.length > 0 ? p[0].toUpperCase() + p.slice(1) : p))
            .join(' ');
          return (
            <li key={name}>
              <a href={`../?path=/docs/components-${slug}--readme`}>{label}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
