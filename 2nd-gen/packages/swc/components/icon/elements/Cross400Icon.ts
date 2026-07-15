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

export const Cross400Icon = (): TemplateResult => {
  return html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
      <path
        d="m7.398 6 3.932-3.932A.989.989 0 0 0 9.932.67L6 4.602 2.068.67A.989.989 0 0 0 .67 2.068L4.602 6 .67 9.932a.989.989 0 1 0 1.398 1.398L6 7.398l3.932 3.932a.989.989 0 0 0 1.398-1.398z"
      />
    </svg>
  `;
};
