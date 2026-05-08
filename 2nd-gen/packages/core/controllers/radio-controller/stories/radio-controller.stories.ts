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
import type { Meta, StoryObj } from '@storybook/web-components';

import './demo-hosts.js';

/**
 * `RadioController` keeps mutually exclusive asserted state (`aria-checked`,
 * [`menuitemradio`](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/), or `aria-expanded`
 * accordion patterns). Item discovery aligns with `{@link FocusgroupNavigationController}` filtering
 * (shadow-inclusive containment, visibility, optional disabled skipping).
 *
 * - **Selecting / deselecting**: supply callbacks that mutate ARIA bookkeeping on sibling elements —
 *   the controller never assumes native `<input type="radio">` wiring.
 * - **Pointers**: captures host `click`, resolves the deepest hit via
 *   `{@link deepestRadioItemContaining}` with the same eligibility list Focusgroup consumes.
 * - **Embedded navigation**: by default nests `{@link FocusgroupNavigationController}` so arrow keys
 *   move roving `tabindex` *and*, when `{@link RadioControllerOptions.selectionFollowsFocus}`
 *   remains true (default), co-selects whichever item earns focus (`Space` activates the focused
 *   entry like the APG rating walkthrough).
 *
 * Dispatches bubbling composed **`swc-radio-controller-selection-change`**
 * (`{@link radioControllerSelectionChange}`) with `{ selectedItem }`, ideal for bridging analytics
 * or higher-level accordion state hosts.
 *
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio-rating/ | APG Rating radio group walkthrough}
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/menubar/ | APG menu / menuitemradio semantics}
 * @see {@link https://opensource.adobe.com/spectrum-web-components/components/accordion/#sizes | Spectrum accordion sizing reference}
 */

const meta: Meta = {
  title: 'Controllers/Radio controller',
  tags: ['migrated', 'controller'],
  parameters: {
    docs: {
      subtitle:
        'Exclusive selection primitives built atop the same sibling discovery rules as Focusgroup navigation.',
      canvas: { sourceState: 'none' },
    },
  },
};

export default meta;

type Story = StoryObj;

/** Autodocs entry plus Playground scaffold for future knobs. */

export const Playground: Story = {
  tags: ['autodocs', 'dev'],
  render: () => html`
    <demo-radio-group-rating></demo-radio-group-rating>
  `,
};

/**
 * ## Radiogroup + `radio` bookkeeping
 *
 * Mirrors the structural expectations from the APG **[Rating radio group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio-rating/)**
 * demonstration: mutually exclusive `{@link HTMLElement.setAttribute}` calls toggle `aria-checked`
 * (`"true"` / `"false"`) whenever the asserted star shifts.
 */

export const RadioGroupAriaCheckedRating: Story = {
  tags: ['overview'],
  render: () => html`
    <demo-radio-group-rating></demo-radio-group-rating>
  `,
};

/**
 * ## `menubar` + `menuitemradio`
 *
 * The APG **[Menu and menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/)** pattern calls for
 * `role="menuitemradio"` siblings with mirrored `aria-checked` strings. Embedding **vertical**
 * `{@link FocusgroupNavigationController}` matches column menus where **ArrowUp / ArrowDown** walk
 * the linearized option list.
 */

export const MenuMenubarAriaCheckedVertical: Story = {
  render: () => html`
    <demo-radio-menu-item-radio></demo-radio-menu-item-radio>
  `,
};

/**
 * ## Accordion-style `aria-expanded`
 *
 * Passing `{@link RadioControllerOptions.navigation}: false` keeps arrow semantics off the accordion
 * headers themselves (panels still rely on authored buttons). Selecting callbacks instead flip `aria-expanded`
 * and synchronize panel `[hidden]` flags, analogous to Spectrum Web Components accordion sizing demos
 * ([reference](https://opensource.adobe.com/spectrum-web-components/components/accordion/#sizes)).
 */

export const AccordionExpandedExclusive: Story = {
  render: () => html`
    <demo-radio-accordion-exclusive></demo-radio-accordion-exclusive>
  `,
};

/**
 * ## Programmatic assertions
 *
 * Host applications can steer exclusive state without synthesized clicks via
 * `{@link RadioController.setSelectedItem}`. Passing `{ focus: true }` mirrors authoring guidance
 * for restoring focus predictably inside composite widgets immediately after scripted selection.
 */

export const ProgrammaticSetSelectedFocus: Story = {
  render: () => html`
    <demo-radio-programmatic-selection></demo-radio-programmatic-selection>
  `,
};
