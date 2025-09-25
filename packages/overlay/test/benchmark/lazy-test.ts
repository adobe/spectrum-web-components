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

import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/button/sp-button.js';
import {
    removeSlottableRequest,
    type SlottableRequestEvent,
} from '@spectrum-web-components/overlay/src/slottable-request-event.js';
import { html, render } from '@spectrum-web-components/base';
import { measureFixtureCreation } from '../../../../test/benchmark/helpers.js';

const handleSlottableRequest = (event: SlottableRequestEvent): void => {
    import('@spectrum-web-components/popover/sp-popover.js');
    import('@spectrum-web-components/dialog/sp-dialog.js');
    import('@spectrum-web-components/slider/sp-slider.js');
    import('@spectrum-web-components/tooltip/sp-tooltip.js');
    const template =
        event.data === removeSlottableRequest
            ? undefined
            : html`
                  <sp-popover>
                      <sp-dialog no-divider>
                          <sp-slider
                              value="5"
                              step="0.5"
                              min="0"
                              max="20"
                              label="Awesomeness"
                          ></sp-slider>
                          <div id="styled-div">
                              The background of this div should be blue
                          </div>
                          <sp-button>
                              Press Me
                              <sp-tooltip self-managed delayed>
                                  Click to open another popover.
                              </sp-tooltip>
                          </sp-button>
                      </sp-dialog>
                  </sp-popover>
              `;
    render(template, event.target as HTMLElement);
};

measureFixtureCreation(html`
    <sp-button id="button">Trigger</sp-button>
    <sp-overlay
        trigger="button@click"
        @slottable-request=${handleSlottableRequest}
    ></sp-overlay>
`);
