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

export const Cross500Icon = (): TemplateResult => {
  return html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
      <path
        d="m8.457 7 4.54-4.54a1.03 1.03 0 0 0-1.458-1.456L7 5.543l-4.54-4.54a1.03 1.03 0 0 0-1.457 1.458L5.543 7l-4.54 4.54a1.03 1.03 0 1 0 1.457 1.456L7 8.457l4.54 4.54a1.03 1.03 0 0 0 1.456-1.458z"
      />
    </svg>
  `;
};
