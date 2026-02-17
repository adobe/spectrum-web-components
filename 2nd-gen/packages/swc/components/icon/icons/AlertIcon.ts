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

import type { IconTemplateOptions } from './Chevron100Icon.js';

export const AlertIcon = ({
    size = 18,
    label = 'Alert',
    hidden = false,
}: IconTemplateOptions = {}): TemplateResult => {
    return html`
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            role="img"
            fill="currentColor"
            width=${size}
            height=${size}
            aria-hidden=${hidden ? 'true' : 'false'}
            aria-label=${label}
        >
            <path
                d="M8.13 2.1a1 1 0 0 1 1.74 0l6.29 10.9A1 1 0 0 1 15.29 14H2.71a1 1 0 0 1-.87-1.5L8.13 2.1zM9 6a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 0 1.5 0v-3.5A.75.75 0 0 0 9 6zm0 6.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
            />
        </svg>
    `;
};
