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

import {
  elementUpdated,
  expect,
  fixture,
  html,
  nextFrame,
  oneEvent,
} from '@open-wc/testing';

import { Overlay } from '@spectrum-web-components/overlay';
import { isWebKit } from '@spectrum-web-components/shared';

import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/popover/sp-popover.js';

/**
 * Regression coverage for the iOS WebKit visual-viewport positioning fix
 * in `PlacementController`. The fix has two parts:
 *
 * 1. Subtract `visualViewport.offsetLeft / offsetTop` from the computed
 *    overlay translate on WebKit, so the overlay anchors to its trigger
 *    in the visual viewport (the coordinate system the popover top layer
 *    is actually painted in on iOS).
 * 2. Subscribe to `visualViewport`'s `resize` and `scroll` events while
 *    the overlay is open so it re-anchors when the viewports realign
 *    (URL bar, virtual keyboard, host-app bottom sheet, pinch-zoom).
 *
 * The arithmetic in (1) is two trivial lines and can only meaningfully be
 * verified on a real iOS device — the Storybook story
 * `overlay-ios-positioning.stories.ts` exists for that. Trying to assert
 * it in a headless WebKit run is fragile because Floating UI's `shift`
 * middleware reads the same `visualViewport` offsets to compute its
 * viewport boundary, so any stub we apply also moves the boundary and
 * `shift` cancels out our compensation in unpredictable ways.
 *
 * What we *can* test reliably here is (2): if the WebKit branch of
 * `placeOverlay` ever stops attaching the `visualViewport` listeners (or
 * stops removing them on close), the runtime fix becomes a no-op for
 * mid-life viewport changes and we leak listeners. That's the regression
 * this test guards against.
 */
describe('PlacementController visualViewport listeners', () => {
  before(function () {
    if (!isWebKit()) {
      this.skip();
    }
  });

  it('attaches and cleans up visualViewport listeners across the open/close lifecycle', async () => {
    const vv = window.visualViewport!;
    const addCalls: string[] = [];
    const removeCalls: string[] = [];
    const originalAdd = vv.addEventListener.bind(vv);
    const originalRemove = vv.removeEventListener.bind(vv);
    vv.addEventListener = ((
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ) => {
      addCalls.push(type);
      return originalAdd(type, listener, options);
    }) as typeof vv.addEventListener;
    vv.removeEventListener = ((
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | EventListenerOptions
    ) => {
      removeCalls.push(type);
      return originalRemove(type, listener, options);
    }) as typeof vv.removeEventListener;

    try {
      const container = await fixture<HTMLDivElement>(html`
        <div>
          <sp-button id="trigger">Open</sp-button>
          <sp-overlay
            trigger="trigger@click"
            type="auto"
            placement="bottom"
            offset="0"
          >
            <sp-popover>
              <p>positioned popover content</p>
            </sp-popover>
          </sp-overlay>
        </div>
      `);
      const trigger = container.querySelector('#trigger') as HTMLElement;
      const overlay = container.querySelector('sp-overlay') as Overlay;
      await elementUpdated(overlay);

      const opened = oneEvent(overlay, 'sp-opened');
      trigger.click();
      await opened;
      await nextFrame();

      // `placeOverlay` ran while the overlay opened, so the WebKit
      // branch should have subscribed to both visualViewport events.
      expect(
        addCalls,
        'addEventListener should have been called for resize'
      ).to.include('resize');
      expect(
        addCalls,
        'addEventListener should have been called for scroll'
      ).to.include('scroll');

      const closed = oneEvent(overlay, 'sp-closed');
      overlay.open = false;
      await closed;
      await nextFrame();

      expect(
        removeCalls,
        'removeEventListener should have been called for resize'
      ).to.include('resize');
      expect(
        removeCalls,
        'removeEventListener should have been called for scroll'
      ).to.include('scroll');
    } finally {
      vv.addEventListener = originalAdd;
      vv.removeEventListener = originalRemove;
    }
  });
});
