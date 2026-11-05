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

import { html, type TemplateResult } from 'lit';

import '@adobe/spectrum-wc-icons/swc-icon-file.js';
import '@adobe/spectrum-wc-icons/swc-icon-file-text.js';

export const renderAttachmentPreview = ({
  fileName,
  src,
}: {
  fileName: string;
  src?: string;
}): TemplateResult =>
  src
    ? html`
        <img slot="thumbnail" src=${src} alt="" style="object-fit: cover;" />
      `
    : html`
        <span
          slot="thumbnail"
          aria-hidden="true"
          style="display: grid; place-items: center; aspect-ratio: 1 / 1;"
        >
          ${/\.(pdf|docx?|odt|rtf|txt|md)$/i.test(fileName)
            ? html`
                <swc-icon-file-text></swc-icon-file-text>
              `
            : html`
                <swc-icon-file></swc-icon-file>
              `}
        </span>
      `;
