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

import { scrollStyle, tableStyle, useStoryComponent } from './cem-helpers';

/**
 * Standalone CSS Parts table for MDX composition. Reads the current
 * story's `meta.component` tag, looks up its CEM declaration, and
 * renders a row per `@csspart`. Renders nothing when there are no
 * parts — safe to drop into any component's `README.mdx`.
 */
export function CssPartsTable() {
  const component = useStoryComponent();
  const cssParts = component?.cssParts ?? [];
  if (cssParts.length === 0) return null;

  return (
    <>
      <h3>CSS parts</h3>
      <div style={scrollStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {cssParts.map((part) => (
              <tr key={part.name}>
                <td>
                  <code>{part.name}</code>
                </td>
                <td>{part.description ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
