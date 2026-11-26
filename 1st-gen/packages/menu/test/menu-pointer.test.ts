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

import { aTimeout, elementUpdated, expect, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import type { Menu, MenuItem } from '@spectrum-web-components/menu';

import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu.js';

import { fixture, mouseMoveOver } from '../../../test/testing-helpers.js';

describe('Menu pointer interaction', () => {
  it('keeps keyboard focus while scrolling under a stationary pointer', async () => {
    const el = await fixture<Menu>(html`
      <sp-menu style="height: 160px; overflow: auto; width: 200px;">
        ${Array.from(
          { length: 20 },
          (_, index) => html`
            <sp-menu-item>Item ${index}</sp-menu-item>
          `
        )}
      </sp-menu>
    `);
    await elementUpdated(el);
    const items = [...el.querySelectorAll<MenuItem>('sp-menu-item')];

    await mouseMoveOver(items[0]);
    expect(items.indexOf(document.activeElement as MenuItem)).to.equal(0);

    for (let index = 1; index < 10; index++) {
      await sendKeys({ press: 'ArrowDown' });
      await elementUpdated(el);
      // Let native hover events caused by scrolling reach the menu.
      await aTimeout(50);
      expect(items.indexOf(document.activeElement as MenuItem)).to.equal(index);
    }
    expect(el.scrollTop).to.be.greaterThan(0);
    for (let index = 8; index >= 0; index--) {
      await sendKeys({ press: 'ArrowUp' });
      await elementUpdated(el);
      await aTimeout(50);
      expect(items.indexOf(document.activeElement as MenuItem)).to.equal(index);
    }
  });

  it('resumes pointer focus when moving within an already hovered item', async () => {
    const el = await fixture<Menu>(html`
      <sp-menu style="width: 200px;">
        <sp-menu-item>First item</sp-menu-item>
        <sp-menu-item>Second item</sp-menu-item>
      </sp-menu>
    `);
    await elementUpdated(el);
    const items = [...el.querySelectorAll<MenuItem>('sp-menu-item')];

    await mouseMoveOver(items[0]);
    await sendKeys({ press: 'ArrowDown' });
    expect(items.indexOf(document.activeElement as MenuItem)).to.equal(1);

    await mouseMoveOver(items[0], 'top-right');
    expect(items.indexOf(document.activeElement as MenuItem)).to.equal(0);
  });

  it('does not focus disabled items when the pointer moves', async () => {
    const el = await fixture<Menu>(html`
      <sp-menu style="width: 200px;">
        <sp-menu-item>First item</sp-menu-item>
        <sp-menu-item disabled>Disabled item</sp-menu-item>
      </sp-menu>
    `);
    await elementUpdated(el);
    const items = [...el.querySelectorAll<MenuItem>('sp-menu-item')];

    items[0].focus();
    await mouseMoveOver(items[1]);
    expect(items.indexOf(document.activeElement as MenuItem)).to.equal(0);
  });

  it('restores hover focus after leaving and reentering at the same position', async () => {
    const el = await fixture<Menu>(html`
      <sp-menu style="width: 200px;">
        <sp-menu-item>First item</sp-menu-item>
        <sp-menu-item>Second item</sp-menu-item>
      </sp-menu>
    `);
    await elementUpdated(el);
    const items = [...el.querySelectorAll<MenuItem>('sp-menu-item')];

    await mouseMoveOver(items[0]);
    await sendKeys({ press: 'ArrowDown' });
    await mouseMoveOver(el, 'outside');
    await mouseMoveOver(items[0]);

    expect(items.indexOf(document.activeElement as MenuItem)).to.equal(0);
  });
});
