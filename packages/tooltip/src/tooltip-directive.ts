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
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import {
    OverlayTriggerOptions,
    trigger,
} from '@spectrum-web-components/overlay/src/overlay-trigger-directive.js';

export const tooltip = function tooltip(
    tooltipContent: () => TemplateResult,
    options?: Partial<OverlayTriggerOptions & { variant: string }>
): ReturnType<typeof trigger> {
    return trigger(
        () => {
            import('@spectrum-web-components/tooltip/sp-tooltip.js');
            return html`
                <sp-tooltip variant=${ifDefined(options?.variant)}>
                    ${tooltipContent()}
                </sp-tooltip>
            `;
        },
        {
            ...options,
            triggerInteraction: 'hover',
            overlayOptions: {
                type: 'hint',
                ...options?.overlayOptions,
            },
        }
    );
};
