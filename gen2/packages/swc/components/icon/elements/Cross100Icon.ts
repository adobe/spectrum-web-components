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

export const Cross100Icon = (): TemplateResult => {
  return html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
      <path
        d="M6.06055 5 8.65527 2.40527c.29297-.29297.29297-.76758 0-1.06055s-.76758-.29297-1.06055 0L5 3.93945 2.40527 1.34473c-.29297-.29297-.76758-.29297-1.06055 0s-.29297.76758 0 1.06055L3.93945 5 1.34473 7.59473c-.29297.29297-.29297.76758 0 1.06055.14648.14648.33789.21973.53027.21973s.38379-.07324.53027-.21973L5 6.06055l2.59473 2.59473c.14648.14648.33789.21973.53027.21973s.38379-.07324.53027-.21973c.29297-.29297.29297-.76758 0-1.06055L6.06055 5Z"
      />
    </svg>
  `;
};
