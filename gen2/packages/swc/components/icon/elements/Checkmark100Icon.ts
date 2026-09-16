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

export const Checkmark100Icon = (): TemplateResult => {
  return html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
      <path
        d="M3.66406 9.24121c-.21484 0-.41992-.0918-.5625-.25391L.48535 6.01855c-.27441-.31055-.24414-.78516.06641-1.05859s.78516-.24414 1.05859.06641l1.99902 2.26855L8.3418.81348c.24316-.33496.71191-.40918 1.04785-.16309.33398.24414.40723.71289.16309 1.04785l-5.2832 7.23535c-.13379.18359-.34375.29688-.57129.30664-.01172.00098-.02246.00098-.03418.00098Z"
      />
    </svg>
  `;
};
