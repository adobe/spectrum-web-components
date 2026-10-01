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
import { expect, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { Radio, RadioGroup } from '@adobe/spectrum-wc/radio-group';

import '@adobe/spectrum-wc/components/radio-group/swc-radio-group.js';
import '@adobe/spectrum-wc/components/radio-group/swc-radio.js';

import { getComponent } from '../../../utils/test-utils.js';
import meta, { Playground } from '../stories/radio-group.stories.js';

/** An element carrying the ARIA element-reflection properties this file asserts on. */
type ReflectedAriaElement = Element & {
  ariaLabelledByElements: Element[] | null;
  ariaDescribedByElements: Element[] | null;
};

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'Radio Group/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Playground,
  play: async ({ canvasElement }) => {
    const radioGroup = await getComponent<RadioGroup>(
      canvasElement,
      'swc-radio-group'
    );

    expect(radioGroup, 'renders a swc-radio-group').toBeInstanceOf(RadioGroup);
    expect(radioGroup.orientation, 'default orientation is vertical').toBe(
      'vertical'
    );
    expect(radioGroup.labelPosition, 'default label-position is top').toBe(
      'top'
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: role="radiogroup" lives on the rendered outer element, not the host
// ──────────────────────────────────────────────────────────────

export const RoleWiringTest: Story = {
  render: () => html`
    <swc-radio-group>
      <span slot="label">Favorite color</span>
      <swc-radio value="1" checked><span slot="label">Red</span></swc-radio>
      <swc-radio value="2"><span slot="label">Green</span></swc-radio>
      <swc-radio value="3"><span slot="label">Blue</span></swc-radio>
    </swc-radio-group>
  `,
  play: async ({ canvasElement }) => {
    const group = await getComponent<RadioGroup>(
      canvasElement,
      'swc-radio-group'
    );
    const items = Array.from(group.querySelectorAll<Radio>('swc-radio'));

    expect(group.getAttribute('role'), 'host carries no role').toBeNull();
    expect(
      group.roleElement?.getAttribute('role'),
      'the internal role element carries role="radiogroup"'
    ).toBe('radiogroup');

    expect(group.roleElement).toBe(
      group.shadowRoot?.querySelector('.swc-RadioGroup')
    );
    const itemsWrapper = group.shadowRoot?.querySelector(
      '.swc-RadioGroup-items'
    );
    expect(itemsWrapper?.getAttribute('role')).toBeNull();
    expect(
      group.roleElement?.contains(
        group.shadowRoot?.querySelector('.swc-FormFieldLabel') ?? null
      )
    ).toBe(true);

    // The layout wrapper slots the light-DOM items inside the role element.
    const itemsSlot = group.roleElement?.querySelector(
      'slot:not([name])'
    ) as HTMLSlotElement | null;
    expect(itemsSlot?.parentElement).toBe(itemsWrapper);
    expect(
      itemsSlot?.assignedElements({ flatten: true }),
      'the layout wrapper slots the items inside the role element'
    ).toEqual(items);

    expect(items.map((item) => item.posInSet)).toEqual([1, 2, 3]);
    expect(items.every((item) => item.setSize === 3)).toBe(true);
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: group label/description wiring precedence
// ──────────────────────────────────────────────────────────────

export const GroupLabelWiringTest: Story = {
  render: () => html`
    <div>
      <span id="external-label">External label</span>
      <swc-radio-group id="slotted-label">
        <span slot="label">Slotted label</span>
        <span slot="description">Slotted description</span>
        <swc-radio value="1"><span slot="label">Red</span></swc-radio>
      </swc-radio-group>
      <swc-radio-group
        id="accessible-label-only"
        accessible-label="String label"
      >
        <swc-radio value="1"><span slot="label">Red</span></swc-radio>
      </swc-radio-group>
      <swc-radio-group
        id="accessible-labelledby-wins"
        accessible-labelledby="external-label"
      >
        <span slot="label">Slotted label (should be outranked)</span>
        <swc-radio value="1"><span slot="label">Red</span></swc-radio>
      </swc-radio-group>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const slotted = await getComponent<RadioGroup>(
      canvasElement,
      '#slotted-label'
    );
    const slottedRole = slotted.roleElement as ReflectedAriaElement | null;
    // The referenced element is the wrapper span in the role element's shadow
    // root, not the slotted element itself.
    const renderedLabelSpan = slotted.shadowRoot?.querySelector(
      '.swc-FormFieldLabel'
    );
    const slottedDescSpan = slotted.shadowRoot?.querySelector(
      '.swc-FormFieldDescription'
    );
    expect(
      slottedRole?.ariaLabelledByElements,
      'a slotted label wires onto the role element via ariaLabelledByElements'
    ).toEqual([renderedLabelSpan]);
    expect(
      slottedRole?.ariaDescribedByElements,
      'a slotted description wires onto the role element via ariaDescribedByElements'
    ).toEqual([slottedDescSpan]);

    const labelOnly = await getComponent<RadioGroup>(
      canvasElement,
      '#accessible-label-only'
    );
    expect(
      (labelOnly.roleElement as ReflectedAriaElement | null)?.getAttribute(
        'aria-label'
      ),
      'accessible-label with no slotted label sets aria-label on the role element'
    ).toBe('String label');

    const labelledbyWins = await getComponent<RadioGroup>(
      canvasElement,
      '#accessible-labelledby-wins'
    );
    const external = canvasElement.querySelector('#external-label');
    expect(
      (labelledbyWins.roleElement as ReflectedAriaElement | null)
        ?.ariaLabelledByElements,
      'accessible-labelledby (external reference) outranks a slotted label'
    ).toEqual([external]);
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: group labeling responds to name-source and slot changes
// ──────────────────────────────────────────────────────────────

export const GroupLabelLifecycleTest: Story = {
  render: () => html`
    <div>
      <span id="dynamic-radio-label">External label</span>
      <swc-radio-group accessible-labelledby="missing-radio-label">
        <span slot="label">Slotted label</span>
        <swc-radio value="1"><span slot="label">Red</span></swc-radio>
      </swc-radio-group>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const group = await getComponent<RadioGroup>(
      canvasElement,
      'swc-radio-group'
    );
    const target = group.roleElement as ReflectedAriaElement;
    const label = group.shadowRoot?.querySelector('.swc-FormFieldLabel');

    expect(target.ariaLabelledByElements).toEqual([label]);

    group.accessibleLabel = 'String label';
    await group.updateComplete;
    expect(target.ariaLabelledByElements).toBeNull();
    expect(target.getAttribute('aria-label')).toBe('String label');

    group.accessibleLabelledby = 'dynamic-radio-label';
    await group.updateComplete;
    expect(target.ariaLabelledByElements).toEqual([
      canvasElement.querySelector('#dynamic-radio-label'),
    ]);

    group.accessibleLabelledby = '';
    group.accessibleLabel = '';
    await group.updateComplete;
    expect(target.ariaLabelledByElements).toEqual([label]);
    expect(target.getAttribute('aria-label')).toBeNull();

    group.querySelector('[slot="label"]')?.remove();
    await waitFor(() => {
      expect(target.ariaLabelledByElements).toBeNull();
    });
  },
};

export const GroupStateLifecycleTest: Story = {
  render: () => html`
    <swc-radio-group>
      <span slot="label">Favorite color</span>
      <swc-radio value="1" checked><span slot="label">Red</span></swc-radio>
    </swc-radio-group>
  `,
  play: async ({ canvasElement }) => {
    const group = await getComponent<RadioGroup>(
      canvasElement,
      'swc-radio-group'
    );
    const target = group.roleElement;
    const attributes = ['aria-required', 'aria-invalid', 'aria-readonly'];

    for (const attribute of attributes) {
      expect(target?.getAttribute(attribute)).toBe('false');
    }

    group.selected = '1';
    group.required = true;
    group.invalid = true;
    group.readonly = true;
    await group.updateComplete;
    for (const attribute of attributes) {
      expect(target?.getAttribute(attribute)).toBe('true');
      expect(group.getAttribute(attribute)).toBeNull();
    }

    group.required = false;
    group.invalid = false;
    group.readonly = false;
    await group.updateComplete;
    for (const attribute of attributes) {
      expect(target?.getAttribute(attribute)).toBe('false');
    }
  },
};

export const DisabledCascadeTest: Story = {
  render: () => html`
    <swc-radio-group disabled>
      <span slot="label">Favorite color</span>
      <swc-radio value="1"><span slot="label">Red</span></swc-radio>
      <swc-radio value="2"><span slot="label">Green</span></swc-radio>
    </swc-radio-group>
  `,
  play: async ({ canvasElement }) => {
    const group = await getComponent<RadioGroup>(
      canvasElement,
      'swc-radio-group'
    );
    const items = Array.from(group.querySelectorAll<Radio>('swc-radio'));

    expect(
      items.every((item) => item.disabled),
      'group-level disabled cascades to every item'
    ).toBe(true);
  },
};
