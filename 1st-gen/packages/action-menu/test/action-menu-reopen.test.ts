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
import { resetMouse, setViewport } from '@web/test-runner-commands';

import { ActionMenu } from '@spectrum-web-components/action-menu';

import '@spectrum-web-components/action-menu/sync/sp-action-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';

import { mouseClickAway, mouseClickOn } from '../../../test/testing-helpers.js';

describe('ActionMenu, mobile Tray reopen', () => {
  afterEach(async () => {
    await resetMouse();
    await setViewport({ width: 800, height: 600 });
  });

  // regression test for https://github.com/adobe/spectrum-web-components/issues/6678
  it('reopens the Tray after it is dismissed by an outside tap', async () => {
    const test = await fixture<HTMLDivElement>(html`
      <sp-theme scale="medium" color="light" system="spectrum">
        <sp-action-menu label="Action Menu">
          <sp-menu-item>Deselect</sp-menu-item>
          <sp-menu-item>Select Inverse</sp-menu-item>
        </sp-action-menu>
      </sp-theme>
    `);
    const el = test.querySelector('sp-action-menu') as ActionMenu;
    await elementUpdated(el);

    // Force the MobileController so the menu renders in a Tray.
    el.isMobile.matches = true;
    el.bindEvents();
    await setViewport({ width: 360, height: 640 });
    await nextFrame();

    // Tap the action button: the menu opens in a Tray.
    let opened = oneEvent(el, 'sp-opened');
    await mouseClickOn(el.button);
    await opened;
    expect(el.open, 'open after first tap').to.be.true;
    expect(el.shadowRoot.querySelector('sp-tray'), 'has tray').to.not.be.null;

    // Dismiss the Tray by tapping outside of it (no selection).
    const closed = oneEvent(el, 'sp-closed');
    await mouseClickAway(el.button);
    await closed;
    expect(el.open, 'closed by outside tap').to.be.false;
    await elementUpdated(el);

    // Tapping the action button again must reopen the Tray.
    opened = oneEvent(el, 'sp-opened');
    await mouseClickOn(el.button);
    await opened;
    expect(el.open, 'reopened after second tap').to.be.true;
  });
});
