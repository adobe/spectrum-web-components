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

import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import {
    removeSlottableRequest,
    type SlottableRequestEvent,
} from '@spectrum-web-components/overlay/src/slottable-request-event.js';
import { html, render } from '@spectrum-web-components/base';
import { measureFixtureCreation } from '../../../../test/benchmark/helpers.js';

const handleSlottableRequest = (event: SlottableRequestEvent): void => {
    import('@spectrum-web-components/tooltip/sp-tooltip.js');
    const template =
        event.data === removeSlottableRequest
            ? undefined
            : html`
                  <sp-tooltip>Tip me!</sp-tooltip>
              `;
    render(template, event.target as HTMLElement);
};

measureFixtureCreation(html`
    <sp-action-button id="button">I'm a button...</sp-action-button>
    <sp-overlay
        trigger="button@hover"
        type="hint"
        @slottable-request=${handleSlottableRequest}
    ></sp-overlay>
`);
