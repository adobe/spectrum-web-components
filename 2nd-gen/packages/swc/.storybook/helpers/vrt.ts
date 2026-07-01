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

import { html } from 'lit';

/**
 * Wraps a set of permutations in a single flex-wrap row. Stack multiple
 * `row()` calls inside a VRT story to group permutations (e.g. one row per
 * variant, one column per size) without needing every combination to be its
 * own story/snapshot.
 */
export const row = (children: unknown) => html`
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
    ${children}
  </div>
`;
