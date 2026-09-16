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

export const Chevron200Icon = (): TemplateResult => {
  return html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
      <path
        d="M3.5625 11.7002c-.21094 0-.42188-.08105-.58301-.24219-.32227-.32227-.32227-.84375 0-1.16602l4.29102-4.29199L2.97949 1.70801c-.32227-.32227-.32227-.84375 0-1.16602s.84375-.32227 1.16602 0l4.875 4.875c.32227.32227.32227.84375 0 1.16602l-4.875 4.875c-.16113.16113-.37207.24219-.58301.24219Z"
      />
    </svg>
  `;
};
