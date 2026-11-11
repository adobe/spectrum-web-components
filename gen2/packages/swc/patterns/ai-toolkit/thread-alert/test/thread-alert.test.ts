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

import { html } from 'lit';
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../swc-thread-alert.js';

import { getComponent } from '../../../../utils/test-utils.js';

const meta: Meta = {
  title: 'AI Toolkit/Thread alert/Tests',
  component: 'swc-thread-alert',
  render: () => html`
    <swc-thread-alert>
      <h3 slot="heading">Request interrupted</h3>
      <span>Your response could not be completed.</span>
      <button slot="actions">Try again</button>
      <button slot="dismiss">Dismiss message</button>
    </swc-thread-alert>
  `,
  parameters: {
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
};

export default meta;

export const Rendering: Story = {
  play: async ({ canvasElement, step }) => {
    await step('registers the rendering-only pattern', async () => {
      expect(customElements.get('swc-thread-alert')).toBeDefined();
    });

    await step('renders named slots in reading order', async () => {
      const el = await getComponent(canvasElement, 'swc-thread-alert');
      const slots = el?.shadowRoot?.querySelectorAll('slot');
      if (!slots) {
        throw new Error('Expected the thread alert shadow slots');
      }
      expect([...slots].map((slot) => slot.name)).toEqual([
        'heading',
        '',
        'actions',
        'dismiss',
      ]);
    });

    await step(
      'leaves semantics and interaction with the consumer',
      async () => {
        const el = await getComponent(canvasElement, 'swc-thread-alert');
        expect(el.hasAttribute('role')).toBe(false);
        expect(el.hasAttribute('aria-live')).toBe(false);
        expect(el.hasAttribute('tabindex')).toBe(false);
        expect(
          el.shadowRoot?.querySelector('[role], [aria-live], h1, h2, h3')
        ).toBeNull();
        expect('variant' in el).toBe(false);
        expect('closeButtonPlacement' in el).toBe(false);

        const dismiss = el.querySelector<HTMLButtonElement>('[slot="dismiss"]');
        if (!dismiss) {
          throw new Error('Expected the consumer dismiss control');
        }
        let clicks = 0;
        dismiss.addEventListener('click', () => clicks++);
        dismiss.click();
        expect(clicks).toBe(1);
        expect(el.isConnected).toBe(true);
        expect(getComputedStyle(dismiss).position).toBe('static');
      }
    );
  },
};

export const VariantIcons: Story = {
  render: () => html`
    <swc-thread-alert>Request status</swc-thread-alert>
  `,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent(canvasElement, 'swc-thread-alert');
    const icons = el.shadowRoot?.querySelectorAll<HTMLElement>(
      '.swc-ThreadAlert-icon'
    );
    if (!icons) {
      throw new Error('Expected the status icons');
    }

    const visibleIcons = () =>
      [...icons]
        .filter((icon) => getComputedStyle(icon).display !== 'none')
        .map((icon) => icon.dataset.variant);

    await step(
      'defaults to the informative icon without reflecting',
      async () => {
        expect(visibleIcons()).toEqual(['informative']);
        expect(el.hasAttribute('variant')).toBe(false);
        expect(
          [...icons].every(
            (icon) => icon.getAttribute('aria-hidden') === 'true'
          )
        ).toBe(true);
      }
    );

    for (const variant of [
      'positive',
      'notice',
      'negative',
      'neutral',
      'informative',
    ]) {
      await step(`updates the ${variant} appearance through CSS`, async () => {
        el.setAttribute('variant', variant);
        expect(visibleIcons()).toEqual(variant === 'neutral' ? [] : [variant]);
      });
    }
  },
};
VariantIcons.storyName = 'Variant icons';

export const OptionalContent: Story = {
  render: () => html`
    <swc-thread-alert>Message text</swc-thread-alert>
  `,
  play: async ({ canvasElement }) => {
    const el = await getComponent(canvasElement, 'swc-thread-alert');
    const shadow = el.shadowRoot;
    if (!shadow) {
      throw new Error('Expected a rendered thread alert');
    }
    for (const name of ['heading', 'actions', 'dismiss']) {
      const slot = shadow.querySelector<HTMLSlotElement>(
        `slot[name="${name}"]`
      );
      expect(slot?.assignedElements()).toHaveLength(0);
      expect(slot && getComputedStyle(slot).display).toBe('contents');
    }
    expect(el.querySelector('button, swc-close-button')).toBeNull();
    expect(
      shadow.querySelector('swc-close-button, [tabindex], [role], [aria-live]')
    ).toBeNull();
    expect(
      shadow
        .querySelector<HTMLSlotElement>('slot:not([name])')
        ?.assignedNodes()
        .map((node) => node.textContent)
        .join('')
    ).toBe('Message text');
  },
};
OptionalContent.storyName = 'Optional content';

export const Styling: Story = {
  render: () => html`
    <swc-thread-alert>Message text</swc-thread-alert>
  `,
  play: async ({ canvasElement }) => {
    const el = await getComponent(canvasElement, 'swc-thread-alert');
    const root = el.shadowRoot?.querySelector<HTMLElement>('.swc-ThreadAlert');
    if (!root) {
      throw new Error('Expected the thread alert surface');
    }
    el.style.setProperty(
      '--swc-thread-alert-background-color',
      'rgb(20, 30, 40)'
    );
    el.style.setProperty(
      '--swc-thread-alert-content-color',
      'rgb(240, 240, 240)'
    );
    el.style.setProperty('--swc-thread-alert-gap', '10px');
    el.style.setProperty('--swc-thread-alert-padding-block', '12px');
    el.style.setProperty('--swc-thread-alert-padding-inline-start', '14px');
    el.style.setProperty('--swc-thread-alert-padding-inline-end', '16px');
    el.style.setProperty('--swc-thread-alert-border-radius', '8px');
    const style = getComputedStyle(root);
    expect(style.backgroundColor).toBe('rgb(20, 30, 40)');
    expect(style.color).toBe('rgb(240, 240, 240)');
    expect(style.rowGap).toBe('10px');
    expect(style.paddingBlockStart).toBe('12px');
    expect(style.paddingInlineStart).toBe('14px');
    expect(style.paddingInlineEnd).toBe('16px');
    expect(style.borderRadius).toBe('8px');
  },
};

export const TranslucentSurface: Story = {
  render: () => html`
    <swc-thread-alert>Your response was saved.</swc-thread-alert>
  `,
  play: async ({ canvasElement }) => {
    const el = await getComponent(canvasElement, 'swc-thread-alert');
    const root = el.shadowRoot?.querySelector('.swc-ThreadAlert');
    if (!root) {
      throw new Error('Expected the thread alert surface');
    }
    for (const [scheme, color] of [
      ['light', '0, 0, 0'],
      ['dark', '255, 255, 255'],
    ]) {
      el.style.colorScheme = scheme;
      const style = getComputedStyle(root);
      expect(style.backgroundColor).toBe(`rgba(${color}, 0.02)`);
      expect(style.borderTopColor).toBe(`rgba(${color}, 0.03)`);
    }
  },
};
TranslucentSurface.storyName = 'Translucent surface';

export const ControlSpacing: Story = {
  play: async ({ canvasElement }) => {
    const el = await getComponent(canvasElement, 'swc-thread-alert');
    const content = el.shadowRoot?.querySelector('.swc-ThreadAlert-content');
    const action = el.querySelector('[slot="actions"]');
    const dismiss = el.querySelector('[slot="dismiss"]');
    const root = el.shadowRoot?.querySelector('.swc-ThreadAlert');
    if (!content || !action || !dismiss || !root) {
      throw new Error('Expected message content and both inline controls');
    }
    el.style.setProperty('--swc-thread-alert-gap', '10px');
    el.style.setProperty('--swc-thread-alert-trailing-gap', '18px');
    expect(
      action.getBoundingClientRect().left -
        content.getBoundingClientRect().right
    ).toBeCloseTo(10, 3);
    expect(
      dismiss.getBoundingClientRect().left -
        action.getBoundingClientRect().right
    ).toBeCloseTo(18, 3);

    action.remove();
    dismiss.remove();
    const style = getComputedStyle(root);
    expect(content.getBoundingClientRect().right).toBeCloseTo(
      root.getBoundingClientRect().right -
        parseFloat(style.paddingInlineEnd) -
        parseFloat(style.borderInlineEndWidth),
      3
    );

    el.append(action, dismiss);
    el.setAttribute('dir', 'rtl');
    expect(
      content.getBoundingClientRect().left -
        action.getBoundingClientRect().right
    ).toBeCloseTo(10, 3);
    expect(
      action.getBoundingClientRect().left -
        dismiss.getBoundingClientRect().right
    ).toBeCloseTo(18, 3);
  },
};
ControlSpacing.storyName = 'Control spacing';
