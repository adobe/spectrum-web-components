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
 * Standalone Events table for MDX composition. Reads the current story's
 * `meta.component` tag, looks up its CEM declaration, and renders a row
 * per `@fires` event. Renders nothing when there are no events — safe to
 * drop into any component's `README.mdx`.
 *
 * Mirrors the per-section tables inside `<ApiTable />` but can be
 * imported and placed independently next to narrative prose.
 */
export function EventsTable() {
  const component = useStoryComponent();
  const events = component?.events ?? [];
  if (events.length === 0) return null;

  return (
    <>
      <h3>Events</h3>
      <div style={scrollStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.name}>
                <td>
                  <code>{event.name}</code>
                </td>
                <td>
                  {event.type?.text ? <code>{event.type.text}</code> : '-'}
                </td>
                <td>{event.description ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
