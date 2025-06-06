/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { html, TemplateResult } from '@spectrum-web-components/base';

import { AlertBannerVariants } from '@spectrum-web-components/alert-banner';
import '@spectrum-web-components/alert-banner/sp-alert-banner.js';
import '@spectrum-web-components/button/sp-button.js';

export const AlertBannerMarkup = ({
    text = 'Your trial has expired',
    variant = 'neutral',
    dismissible = true,
    open = false,
    actionLabel = 'Action',
}): TemplateResult => html`
    <sp-alert-banner
        variant=${variant as AlertBannerVariants}
        ?dismissible=${dismissible}
        ?open=${open}
    >
        ${text}
        <sp-button treatment="outline" static-color="white" slot="action">
            ${actionLabel}
        </sp-button>
    </sp-alert-banner>
`;
