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

export const CornerTriangle300Icon = (): TemplateResult => {
  return html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
      <path
        d="M14 8.001v5.249c0 .41421-.33579.75-.75.75h-5.249c-.44545 0-.66854-.53857-.35355-.85355l5.499-5.499c.31498-.31498.85355-.0919.85355.35355Z"
      />
    </svg>
  `;
};
