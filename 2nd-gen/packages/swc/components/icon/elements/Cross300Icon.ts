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
import { html, TemplateResult } from 'lit';

export const Cross300Icon = (): TemplateResult => {
  return html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
      <path
        d="M8.41406 7 12.20703 3.20703c.39062-.39062.39062-1.02344 0-1.41406s-1.02344-.39062-1.41406 0L7 5.58594 3.20703 1.79297c-.39062-.39062-1.02344-.39062-1.41406 0s-.39062 1.02344 0 1.41406L5.58594 7 1.79297 10.79297c-.39062.39062-.39062 1.02344 0 1.41406.19531.19531.45117.29297.70703.29297s.51172-.09766.70703-.29297L7 8.41406l3.79297 3.79297c.19531.19531.45117.29297.70703.29297s.51172-.09766.70703-.29297c.39062-.39062.39062-1.02344 0-1.41406L8.41406 7Z"
      />
    </svg>
  `;
};
