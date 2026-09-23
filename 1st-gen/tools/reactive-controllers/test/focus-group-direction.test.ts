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
import { LitElement } from 'lit';
import { elementUpdated, expect, fixture, nextFrame } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import { ActionButton } from '@spectrum-web-components/action-button';
import { ActionGroup } from '@spectrum-web-components/action-group';
import { html } from '@spectrum-web-components/base';
import type { Radio, RadioGroup } from '@spectrum-web-components/radio';
import { FocusGroupController } from '@spectrum-web-components/reactive-controllers/src/FocusGroup.js';
import type { SwatchGroup } from '@spectrum-web-components/swatch';
import type { Tab, Tabs } from '@spectrum-web-components/tabs';
import type { Tags } from '@spectrum-web-components/tags';

import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/radio/sp-radio-group.js';
import '@spectrum-web-components/radio/sp-radio.js';
import '@spectrum-web-components/swatch/sp-swatch-group.js';
import '@spectrum-web-components/swatch/sp-swatch.js';
import '@spectrum-web-components/tabs/sp-tab.js';
import '@spectrum-web-components/tabs/sp-tabs.js';
import '@spectrum-web-components/tags/sp-tag.js';
import '@spectrum-web-components/tags/sp-tags.js';

/**
 * Focuses `host`, then checks that `ArrowRight` and `ArrowLeft` step to the
 * second item and back, in whichever direction `mirrored` implies.
 */
const expectArrowSteps = async (
  host: HTMLElement,
  items: Element[],
  mirrored: boolean
): Promise<void> => {
  const [forward, back] = mirrored
    ? ['ArrowLeft', 'ArrowRight']
    : ['ArrowRight', 'ArrowLeft'];

  host.focus();
  await nextFrame();
  expect(document.activeElement === items[0], 'initial focus').to.be.true;

  await sendKeys({ press: forward });
  expect(document.activeElement === items[1], `${forward} steps forward`).to.be
    .true;

  await sendKeys({ press: back });
  expect(document.activeElement === items[0], `${back} steps back`).to.be.true;
};

const createGroup = async (
  dir: 'ltr' | 'rtl',
  vertical = false
): Promise<ActionGroup> => {
  const wrapper = await fixture<HTMLDivElement>(html`
    <div dir=${dir}>
      <sp-action-group ?vertical=${vertical}>
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

  it('does not mirror arrow keys in a vertical RTL group', async () => {
    const el = await createGroup('rtl', true);
    const [first, second] = [
      ...el.querySelectorAll('sp-action-button'),
    ] as ActionButton[];

    el.focus();
    await nextFrame();
    expect(document.activeElement === first).to.be.true;

    // There is no inline axis to mirror against, so ArrowRight must agree with
    // ArrowDown and keep stepping forward through the DOM order.
    await sendKeys({ press: 'ArrowRight' });
    expect(document.activeElement === second).to.be.true;

    await sendKeys({ press: 'ArrowLeft' });
    expect(document.activeElement === first).to.be.true;

    await sendKeys({ press: 'ArrowDown' });
    expect(document.activeElement === second).to.be.true;
  });

  it('does not mirror arrow keys in a vertical LTR group', async () => {
    const el = await createGroup('ltr', true);
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

  it('mirrors arrow keys in an RTL group with mixed-width items', async () => {
    const wrapper = await fixture<HTMLDivElement>(html`
      <div dir="rtl">
        <sp-action-group>
          <sp-action-button>A</sp-action-button>
          <sp-action-button>
            A considerably longer button label
          </sp-action-button>
          <sp-action-button>Mid length</sp-action-button>
        </sp-action-group>
      </div>
    `);
    const el = wrapper.querySelector('sp-action-group') as ActionGroup;
    await elementUpdated(el);
    const [first, second, third] = [
      ...el.querySelectorAll('sp-action-button'),
    ] as ActionButton[];

    el.focus();
    await nextFrame();
    expect(document.activeElement === first).to.be.true;

    // Uneven widths must not change which element is "next".
    await sendKeys({ press: 'ArrowLeft' });
    expect(document.activeElement === second).to.be.true;

    await sendKeys({ press: 'ArrowLeft' });
    expect(document.activeElement === third).to.be.true;

    await sendKeys({ press: 'ArrowRight' });
    expect(document.activeElement === second).to.be.true;
  });

  it('mirrors a single-item RTL group without measuring siblings', async () => {
    const wrapper = await fixture<HTMLDivElement>(html`
      <div dir="rtl">
        <sp-action-group>
          <sp-action-button>Only</sp-action-button>
        </sp-action-group>
      </div>
    `);
    const el = wrapper.querySelector('sp-action-group') as ActionGroup;
    await elementUpdated(el);
    const only = el.querySelector('sp-action-button') as ActionButton;

    el.focus();
    await nextFrame();
    expect(document.activeElement === only).to.be.true;

    await sendKeys({ press: 'ArrowRight' });
    expect(document.activeElement === only).to.be.true;
  });

  it('mirrors arrow keys in a horizontal RTL Tabs', async () => {
    const wrapper = await fixture<HTMLDivElement>(html`
      <div dir="rtl">
        <sp-tabs selected="1">
          <sp-tab label="Tab 1" value="1"></sp-tab>
          <sp-tab label="Tab 2" value="2"></sp-tab>
          <sp-tab label="Tab 3" value="3"></sp-tab>
        </sp-tabs>
      </div>
    `);
    const el = wrapper.querySelector('sp-tabs') as Tabs;
    await elementUpdated(el);
    const tabs = [...el.querySelectorAll('sp-tab')] as Tab[];

    el.focus();
    await nextFrame();
    expect(document.activeElement === tabs[0]).to.be.true;

    await sendKeys({ press: 'ArrowLeft' });
    expect(document.activeElement === tabs[1]).to.be.true;
  });

  it('does not mirror arrow keys in a vertical RTL Tabs', async () => {
    const wrapper = await fixture<HTMLDivElement>(html`
      <div dir="rtl">
        <sp-tabs selected="1" direction="vertical">
          <sp-tab label="Tab 1" value="1"></sp-tab>
          <sp-tab label="Tab 2" value="2"></sp-tab>
          <sp-tab label="Tab 3" value="3"></sp-tab>
        </sp-tabs>
      </div>
    `);
    const el = wrapper.querySelector('sp-tabs') as Tabs;
    await elementUpdated(el);
    const tabs = [...el.querySelectorAll('sp-tab')] as Tab[];

    el.focus();
    await nextFrame();
    expect(document.activeElement === tabs[0]).to.be.true;

    await sendKeys({ press: 'ArrowRight' });
    expect(document.activeElement === tabs[1]).to.be.true;

    await sendKeys({ press: 'ArrowLeft' });
    expect(document.activeElement === tabs[0]).to.be.true;
  });

  it('does not mirror arrow keys in a vertical RTL Radio Group', async () => {
    const wrapper = await fixture<HTMLDivElement>(html`
      <div dir="rtl">
        <sp-radio-group vertical selected="1" name="example">
          <sp-radio value="1">Option 1</sp-radio>
          <sp-radio value="2">Option 2</sp-radio>
          <sp-radio value="3">Option 3</sp-radio>
        </sp-radio-group>
      </div>
    `);
    const el = wrapper.querySelector('sp-radio-group') as RadioGroup;
    await elementUpdated(el);
    const radios = [...el.querySelectorAll('sp-radio')] as Radio[];

    el.focus();
    await nextFrame();
    expect(document.activeElement === radios[0]).to.be.true;

    await sendKeys({ press: 'ArrowRight' });
    expect(document.activeElement === radios[1]).to.be.true;

    await sendKeys({ press: 'ArrowLeft' });
    expect(document.activeElement === radios[0]).to.be.true;
  });

  it('does not mirror arrow keys in a default (column) RTL Radio Group', async () => {
    const wrapper = await fixture<HTMLDivElement>(html`
      <div dir="rtl">
        <sp-radio-group selected="1" name="example">
          <sp-radio value="1">Option 1</sp-radio>
          <sp-radio value="2">Option 2</sp-radio>
          <sp-radio value="3">Option 3</sp-radio>
        </sp-radio-group>
      </div>
    `);
    const el = wrapper.querySelector('sp-radio-group') as RadioGroup;
    await elementUpdated(el);
    await expectArrowSteps(el, [...el.querySelectorAll('sp-radio')], false);
  });

  it('mirrors arrow keys in a horizontal RTL Radio Group', async () => {
    const wrapper = await fixture<HTMLDivElement>(html`
      <div dir="rtl">
        <sp-radio-group horizontal selected="1" name="example">
          <sp-radio value="1">Option 1</sp-radio>
          <sp-radio value="2">Option 2</sp-radio>
          <sp-radio value="3">Option 3</sp-radio>
        </sp-radio-group>
      </div>
    `);
    const el = wrapper.querySelector('sp-radio-group') as RadioGroup;
    await elementUpdated(el);
    await expectArrowSteps(el, [...el.querySelectorAll('sp-radio')], true);
  });

  it('does not mirror arrow keys in a vertical-right RTL Tabs', async () => {
    const wrapper = await fixture<HTMLDivElement>(html`
      <div dir="rtl">
        <sp-tabs selected="1" direction="vertical-right">
          <sp-tab label="Tab 1" value="1"></sp-tab>
          <sp-tab label="Tab 2" value="2"></sp-tab>
          <sp-tab label="Tab 3" value="3"></sp-tab>
        </sp-tabs>
      </div>
    `);
    const el = wrapper.querySelector('sp-tabs') as Tabs;
    await elementUpdated(el);
    await expectArrowSteps(el, [...el.querySelectorAll('sp-tab')], false);
  });

  it('mirrors arrow keys in an RTL Swatch Group', async () => {
    const wrapper = await fixture<HTMLDivElement>(html`
      <div dir="rtl">
        <sp-swatch-group aria-label="Colors">
          <sp-swatch color="red" label="Red" value="red"></sp-swatch>
          <sp-swatch color="green" label="Green" value="green"></sp-swatch>
          <sp-swatch color="blue" label="Blue" value="blue"></sp-swatch>
        </sp-swatch-group>
      </div>
    `);
    const el = wrapper.querySelector('sp-swatch-group') as SwatchGroup;
    await elementUpdated(el);
    await expectArrowSteps(el, [...el.querySelectorAll('sp-swatch')], true);
  });

  it('mirrors arrow keys in RTL Tags', async () => {
    const wrapper = await fixture<HTMLDivElement>(html`
      <div dir="rtl">
        <sp-tags>
          <sp-tag deletable>Tag 1</sp-tag>
          <sp-tag deletable>Tag 2</sp-tag>
          <sp-tag deletable>Tag 3</sp-tag>
        </sp-tags>
      </div>
    `);
    const el = wrapper.querySelector('sp-tags') as Tags;
    await elementUpdated(el);
    await expectArrowSteps(el, [...el.querySelectorAll('sp-tag')], true);
  });

  it('only mirrors the unambiguous horizontal direction by default', async () => {
    class TestEl extends LitElement {}
    customElements.define('test-focus-group-direction-el', TestEl);
    const directions = {
      grid: false,
      horizontal: true,
      both: false,
      vertical: false,
    } as const;

    (Object.keys(directions) as (keyof typeof directions)[]).forEach(
      (direction) => {
        const el = new TestEl();
        const controller = new FocusGroupController(
          el as LitElement & { shadowRoot: ShadowRoot },
          { direction, elements: () => [] }
        );
        expect(
          controller.mirrorHorizontalInRTL,
          `default for "${direction}"`
        ).to.equal(directions[direction]);
      }
    );
  });

  it('lets a host opt in to mirroring for the both direction', async () => {
    class TestEl extends LitElement {}
    customElements.define('test-focus-group-direction-opt-in-el', TestEl);
    const el = new TestEl();
    let vertical = false;
    const controller = new FocusGroupController(
      el as LitElement & { shadowRoot: ShadowRoot },
      {
        direction: 'both',
        elements: () => [],
        mirrorHorizontalInRTL: () => !vertical,
      }
    );

    expect(controller.mirrorHorizontalInRTL).to.be.true;

    vertical = true;
    expect(controller.mirrorHorizontalInRTL).to.be.false;
  });
});
