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
 * Standalone CSS custom properties table for MDX composition. Reads the
 * current story's `meta.component` tag, looks up its CEM declaration,
 * and renders a row per `@cssprop`. Renders nothing when there are no
 * custom properties.
 *
 * Per the 2nd-gen styling contract, every exposed custom property name
 * is expected to begin with `--swc-` — `--mod-*` and `--spectrum-*` are
 * 1st-gen-only and should not be surfaced here.
 */
export function CssPropsTable() {
  const component = useStoryComponent();
  const cssProps = component?.cssProperties ?? [];
  if (cssProps.length === 0) return null;

  return (
    <>
      <h3>CSS custom properties</h3>
      <div style={scrollStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {cssProps.map((prop) => (
              <tr key={prop.name}>
                <td>
                  <code>{prop.name}</code>
                </td>
                <td>
                  {prop.default != null ? <code>{prop.default}</code> : '-'}
                </td>
                <td>{prop.description ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
