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

export const Cross75Icon = (): TemplateResult => {
  return html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
      <path
        d="M5.88477 5 8.19238 2.69238c.24316-.24414.24316-.64062 0-.88477-.24414-.24414-.64062-.24414-.88477 0L5 4.11523 2.69238 1.80762c-.24414-.24414-.64062-.24414-.88477 0-.24316.24414-.24316.64062 0 .88477L4.11523 5 1.80762 7.30762c-.24316.24414-.24316.64062 0 .88477.12207.12207.28223.18262.44238.18262s.32031-.06055.44238-.18262L5 5.88477l2.30762 2.30762c.12207.12207.28223.18262.44238.18262s.32031-.06055.44238-.18262c.24316-.24414.24316-.64062 0-.88477L5.88477 5Z"
      />
    </svg>
  `;
};
