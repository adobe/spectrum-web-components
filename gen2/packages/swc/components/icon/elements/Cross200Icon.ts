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

export const Cross200Icon = (): TemplateResult => {
  return html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
      <path
        d="M7.16602 6l3.54199-3.54199c.32227-.32227.32227-.84375 0-1.16602s-.84375-.32227-1.16602 0l-3.54199 3.54199L2.45801 1.29199c-.32227-.32227-.84375-.32227-1.16602 0s-.32227.84375 0 1.16602l3.54199 3.54199-3.54199 3.54199c-.32227.32227-.32227.84375 0 1.16602.16113.16113.37207.24219.58301.24219s.42188-.08105.58301-.24219l3.54199-3.54199 3.54199 3.54199c.16113.16113.37207.24219.58301.24219s.42188-.08105.58301-.24219c.32227-.32227.32227-.84375 0-1.16602l-3.54199-3.54199Z"
      />
    </svg>
  `;
};
