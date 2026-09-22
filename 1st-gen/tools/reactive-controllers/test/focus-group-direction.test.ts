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
import { elementUpdated, expect, fixture, nextFrame } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import { ActionButton } from '@spectrum-web-components/action-button';
import { ActionGroup } from '@spectrum-web-components/action-group';
import { html } from '@spectrum-web-components/base';

import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-group/sp-action-group.js';

const createGroup = async (dir: 'ltr' | 'rtl'): Promise<ActionGroup> => {
  const wrapper = await fixture<HTMLDivElement>(html`
    <div dir=${dir}>
      <sp-action-group>
        <sp-action-button>Button 1</sp-action-button>
        <sp-action-button>Button 2</sp-action-button>
        <sp-action-button>Button 3</sp-action-button>
      </sp-action-group>
    </div>
  `);
  const group = wrapper.querySelector('sp-action-group') as ActionGroup;
  await elementUpdated(group);
  return group;
};

describe('FocusGroupController text direction', () => {
  it('advances in DOM order with ArrowRight in LTR', async () => {
    const el = await createGroup('ltr');
    const [first, second] = [
      ...el.querySelectorAll('sp-action-button'),
    ] as ActionButton[];

    el.focus();
    await nextFrame();
    expect(document.activeElement === first).to.be.true;

    await sendKeys({ press: 'ArrowRight' });
    expect(document.activeElement === second).to.be.true;

    await sendKeys({ press: 'ArrowLeft' });
    expect(document.activeElement === first).to.be.true;
  });

  it('mirrors ArrowRight and ArrowLeft in RTL', async () => {
    const el = await createGroup('rtl');
    const [first, second, third] = [
      ...el.querySelectorAll('sp-action-button'),
    ] as ActionButton[];

    el.focus();
    await nextFrame();
    expect(document.activeElement === first).to.be.true;

    // The first element renders at the right edge in RTL, so ArrowRight must
    // move focus backwards through the DOM and wrap to the last element.
    await sendKeys({ press: 'ArrowRight' });
    expect(document.activeElement === third).to.be.true;

    await sendKeys({ press: 'ArrowLeft' });
    expect(document.activeElement === first).to.be.true;

    await sendKeys({ press: 'ArrowLeft' });
    expect(document.activeElement === second).to.be.true;
  });

  it('keeps Home and End logical in RTL', async () => {
    const el = await createGroup('rtl');
    const buttons = [
      ...el.querySelectorAll('sp-action-button'),
    ] as ActionButton[];
    const first = buttons[0];
    const last = buttons[buttons.length - 1];

    el.focus();
    await nextFrame();

    await sendKeys({ press: 'End' });
    expect(document.activeElement === last).to.be.true;

    await sendKeys({ press: 'Home' });
    expect(document.activeElement === first).to.be.true;
  });
});
