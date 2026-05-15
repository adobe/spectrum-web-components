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
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import {
  BUTTON_FILL_STYLES,
  BUTTON_STATIC_COLORS,
  BUTTON_VALID_SIZES,
  BUTTON_VARIANTS,
  type ButtonFillStyle,
  type ButtonSize,
  type ButtonStaticColor,
  type ButtonVariant,
} from '@spectrum-web-components/core/components/button';

import '@adobe/spectrum-wc/components/button/swc-button.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-button');

argTypes.variant = {
  ...argTypes.variant,
  control: { type: 'select' },
  options: BUTTON_VARIANTS,
};

argTypes['fill-style'] = {
  ...argTypes['fill-style'],
  control: { type: 'select' },
  options: BUTTON_FILL_STYLES,
};

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: BUTTON_VALID_SIZES,
};

argTypes['static-color'] = {
  ...argTypes['static-color'],
  control: { type: 'select' },
  options: BUTTON_STATIC_COLORS,
};

args['default-slot'] = 'Button';
args.variant = 'primary';
args['fill-style'] = 'fill';
args.size = 'm';

/**
 * Buttons trigger actions when activated. Use a button when users need to take an
 * action like saving changes or triggering a workflow step.
 *
 * For navigation, [use a link with global button styles](/docs/guides-customization-global-element-styling--readme) instead.
 */
const meta: Meta = {
  title: 'Button',
  component: 'swc-button',
  parameters: {
    docs: {
      subtitle: `Buttons trigger actions when activated.`,
    },
    stackblitz: {
      url: 'https://stackblitz.com/edit/vitejs-vite-efws3xzp?file=src%2Fmy-element.ts',
    },
  },
  args,
  argTypes,
  render: (args) => template(args),
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

const sizeLabels = {
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra-large',
} as const satisfies Record<ButtonSize, string>;

const variantLabels = {
  primary: 'Primary',
  secondary: 'Secondary',
  accent: 'Accent',
  negative: 'Negative',
} as const satisfies Record<ButtonVariant, string>;

const fillStyleLabels = {
  fill: 'Fill',
  outline: 'Outline',
} as const satisfies Record<ButtonFillStyle, string>;

const staticColorLabels = {
  white: 'Static white',
  black: 'Static black',
} as const satisfies Record<ButtonStaticColor, string>;

const addIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" aria-hidden="true" focusable="false"><path d="M31.5 17H19V4.5a1 1 0 0 0-2 0V17H4.5a1 1 0 0 0 0 2H17v12.5a1 1 0 0 0 2 0V19h12.5a1 1 0 0 0 0-2z"/></svg>`;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  tags: ['autodocs', 'dev'],
  args: {
    variant: 'primary',
    'fill-style': 'fill',
    size: 'm',
    'default-slot': 'Button',
  },
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  tags: ['overview'],
  args: {
    variant: 'primary',
    'fill-style': 'fill',
    size: 'm',
    'default-slot': 'Save',
  },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

/**
 * A button consists of:
 *
 * - **Default slot**: Visible text label
 * - **icon slot**: Optional leading icon
 *
 * When only an icon is provided (no label), the button renders as a circular
 * icon-only button. Icon-only buttons must include an `accessible-label` attribute
 * so the action is announced to screen reader users.
 */
export const Anatomy: Story = {
  render: (args) => html`
    ${template({ ...args, 'default-slot': 'Label only' })}
    ${template({
      ...args,
      'default-slot': 'Icon and label',
      'icon-slot': addIconSvg,
    })}
    <swc-button
      variant=${args.variant}
      fill-style=${args['fill-style'] ?? 'fill'}
      size=${args.size}
      accessible-label="Add"
    >
      <svg
        slot="icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
        height="18"
        width="18"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M31.5 17H19V4.5a1 1 0 0 0-2 0V17H4.5a1 1 0 0 0 0 2H17v12.5a1 1 0 0 0 2 0V19h12.5a1 1 0 0 0 0-2z"
        />
      </svg>
    </swc-button>
  `,
  tags: ['anatomy'],
  args: {
    variant: 'primary',
    size: 'm',
  },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Buttons come in four sizes: small (`s`), medium (`m`), large (`l`), and
 * extra-large (`xl`). Medium is the default.
 */
export const Sizes: Story = {
  render: (args) => html`
    ${BUTTON_VALID_SIZES.map((size) =>
      template({ ...args, size, 'default-slot': sizeLabels[size] })
    )}
  `,
  parameters: { flexLayout: 'row-wrap', 'section-order': 1 },
  tags: ['options'],
};

/**
 * Four variants are available: `primary` (default), `secondary`, `accent`,
 * and `negative`.
 *
 * `accent` and `negative` are fill-only; `fill-style="outline"` is not
 * supported for these variants.
 */
export const Variants: Story = {
  render: (args) => html`
    ${BUTTON_VARIANTS.map((variant: ButtonVariant) =>
      template({ ...args, variant, 'default-slot': variantLabels[variant] })
    )}
  `,
  parameters: { flexLayout: 'row-wrap', 'section-order': 2 },
  tags: ['options'],
};

/**
 * The `outline` fill style renders a transparent background with a visible
 * border. `fill-style="outline"` is only supported with `primary` and
 * `secondary` variants. Combining it with `accent` or `negative` emits a
 * development warning and falls back to the fill appearance.
 */
export const Outline: Story = {
  render: (args) => html`
    ${['primary', 'secondary'].map((variant) =>
      template({
        ...args,
        variant,
        'fill-style': 'outline',
        'default-slot': `${fillStyleLabels['outline']} ${variantLabels[variant as ButtonVariant]}`,
      })
    )}
  `,
  parameters: { flexLayout: 'row-wrap', 'section-order': 3 },
  tags: ['options'],
};

/**
 * The `static-color` attribute pins the button's color to either `"white"` or
 * `"black"` regardless of the active theme. `static-color` is only supported
 * with `primary` and `secondary` variants. Both fill styles are supported.
 *
 * When combining a `static-color` with `fill-style="outline"`, verify that the
 * background color maintains sufficient contrast on hover.
 */
export const StaticColors: Story = {
  render: (args) => html`
    <div
      style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;"
    >
      ${BUTTON_FILL_STYLES.map((fillStyle) =>
        template({
          ...args,
          'static-color': 'white',
          'fill-style': fillStyle,
          'default-slot': `${staticColorLabels['white']} ${fillStyleLabels[fillStyle]}`,
        })
      )}
    </div>
    <div
      style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;"
    >
      ${BUTTON_FILL_STYLES.map((fillStyle) =>
        template({
          ...args,
          'static-color': 'black',
          'fill-style': fillStyle,
          'default-slot': `${staticColorLabels['black']} ${fillStyleLabels[fillStyle]}`,
        })
      )}
    </div>
  `,
  parameters: {
    staticColorsDemo: true,
    'section-order': 4,
  },
  tags: ['options', '!test'],
};
StaticColors.storyName = 'Static colors';

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

/**
 * Buttons support three interaction states:
 *
 * - **Default**: The button is active and can be interacted with.
 * - **Disabled**: The button is removed from the tab order and cannot be
 *   activated.
 * - **Pending**: The button remains focusable but activation is suppressed
 *   while an asynchronous operation is in progress. See the [Pending story
 *   in Behaviors](#pending) for the full behavioral details.
 *
 * Do not set both `disabled` and `pending` simultaneously.
 */
export const States: Story = {
  render: (args) => html`
    ${template({ ...args, 'default-slot': 'Default' })}
    ${template({ ...args, disabled: true, 'default-slot': 'Disabled' })}
    ${template({ ...args, pending: true, 'default-slot': 'Save' })}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['states'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

/**
 * When `pending` is set, the button remains focusable but click events are
 * suppressed. After a 1-second delay, the button enters its active pending
 * appearance: disabled colors and an animated inline spinner. The delay
 * prevents the pending appearance from flashing for operations that resolve
 * quickly.
 *
 * The accessible name during pending defaults to the visible label plus
 * `", busy"`. For example, a button labeled "Saving" announces as
 * `"Saving, busy"`. Provide `pending-label` to override this with a more
 * specific description of the in-progress operation. When pending clears, the
 * accessible name reverts to the original label.
 *
 * Use the **Pending** checkbox above the buttons to trigger and clear the
 * state interactively. This lets you observe the 1-second activation delay
 * and verify the accessible name switch in browser DevTools.
 */
export const Pending: Story = {
  render: (args) => {
    let pending = false;

    function handleTogglePending(event: Event) {
      pending = (event.target as HTMLInputElement).checked;
      const host = (event.target as HTMLElement).closest('div')!;
      host.querySelectorAll('swc-button').forEach((btn) => {
        btn.toggleAttribute('pending', pending);
      });
    }

    return html`
      <div
        style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;"
      >
        <label
          style="display: flex; gap: 8px; align-items: center; cursor: pointer;"
        >
          <input type="checkbox" @change=${handleTogglePending} />
          Toggle pending
        </label>
        <div
          style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;"
        >
          ${template({ ...args, pending, 'default-slot': 'Saving' })}
          ${template({
            ...args,
            pending,
            'pending-label': 'Upload in-progress',
            'default-slot': 'Upload',
          })}
        </div>
      </div>
    `;
  },
  tags: ['behaviors', '!test'],
  parameters: { 'section-order': 1 },
};

/**
 * When a button's label is too long to fit on one line, text wraps to
 * multiple lines by default. When a leading icon is present, the label
 * aligns to the start edge so wrapped lines stay visually anchored to the
 * icon rather than centering under it.
 *
 * Text wrapping is the default behavior; no attribute is needed. To
 * suppress it, use the `truncate` attribute instead.
 */
export const TextWrapping: Story = {
  render: (args) => html`
    ${template({
      ...args,
      'default-slot': 'Submit and notify all stakeholders',
      style: 'max-inline-size: 180px',
    })}
    ${template({
      ...args,
      'default-slot': 'Submit and notify all stakeholders',
      'icon-slot': addIconSvg,
      style: 'max-inline-size: 180px',
    })}
  `,
  tags: ['behaviors'],
  parameters: { flexLayout: 'row-wrap', 'section-order': 2 },
};
TextWrapping.storyName = 'Text wrapping';

/**
 * When `truncate` is set, overflowing label text is clipped to a single line
 * and an ellipsis (`...`) is shown rather than wrapping. The focus ring uses
 * `outline` rather than `box-shadow` so it remains fully visible even though
 * `overflow: hidden` is required for truncation.
 *
 * Because the full text is not visible, consider pairing a truncated button
 * with a tooltip or accessible description so users can discover the complete
 * label when needed. This is not built into the component; it is a
 * consumer responsibility.
 */
export const Truncate: Story = {
  render: (args) =>
    template({
      ...args,
      truncate: true,
      'default-slot': 'This is a very long button label that will be truncated',
      style: 'max-inline-size: 200px',
    }),
  tags: ['behaviors'],
  parameters: { 'section-order': 3 },
};

/**
 * The `justified` attribute makes the button stretch to fill the available
 * inline space of its container. This is useful for full-width actions in
 * constrained layouts such as a form footer or a narrow sidebar.
 *
 * The container must permit the button to grow. If the container uses
 * `justify-content: center` (on a flex or grid layout), that may override
 * the stretch and force the button to its intrinsic size. In that case,
 * remove the centering constraint or wrap the button in a full-width block.
 */
export const Justified: Story = {
  render: (args) => html`
    <div style="inline-size: min(40ch, 100%); margin-inline: auto;">
      ${template({
        ...args,
        justified: true,
        'default-slot': 'This button can fill the container',
      })}
    </div>
  `,
  parameters: { layout: 'padded', 'section-order': 4 },
  tags: ['behaviors'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<swc-button>` element implements several accessibility features:
 *
 * 1. **Native button semantics**: A real `<button>` inside shadow DOM provides the role, so
 *    assistive technologies see a genuine button, not a host with `role="button"`.
 * 2. **Focus delegation**: `delegatesFocus: true` routes Tab focus and programmatic focus to
 *    the internal `<button>`, keeping the host out of the tab order.
 * 3. **Keyboard activation**: Enter and Space both activate the button via native browser
 *    behavior; no custom keyboard handling is needed or added.
 * 4. **Pending state**: When `pending` is true, `aria-disabled="true"` is set on the internal
 *    `<button>` and the accessible name becomes `"[label], busy"` (e.g., `"Save, busy"`).
 *    The button remains focusable so users can discover it is unavailable rather than losing
 *    track of it entirely. A custom `pending-label` overrides the derived busy name.
 * 5. **Icon-only labeling**: When there is no visible text, the `accessible-label` attribute
 *    is forwarded as `aria-label` on the internal `<button>`. A debug warning is emitted in
 *    development when an icon-only button is missing `accessible-label`.
 *
 * ### Best practices
 *
 * - Always provide an `accessible-label` for icon-only buttons so screen readers can
 *   announce the button's purpose.
 * - Prefer `accessible-label` over placing `aria-label` directly on the `<swc-button>` host,
 *   as it is intentionally forwarded to the internal native control.
 * - Do not set both `pending` and `disabled` at the same time. Use `pending` to keep the
 *   button focusable while unavailable, or `disabled` to remove it from the tab order entirely.
 * - For navigation, use a native `<a>` element and leverage [global element styles](/docs/guides-customization-global-element-styling--readme), not `<swc-button>`. The
 *   button element activates on both Enter and Space; links activate on Enter only.
 *
 * ### Host event contract
 *
 * The `<swc-button>` host dispatches or forwards the following events:
 *
 * - **`click`**: Bubbles from the internal `<button>`. Suppressed while `pending`.
 * - **`focusin` / `focusout`**: Bubble naturally from the internal `<button>` through
 *   the shadow boundary. Attach listeners to the host to observe focus changes.
 *
 * Host-level `focus` and `blur` compatibility events are not part of the initial
 * 2nd-gen Button scope.
 *
 * ### Deferred support
 *
 * The following features are outside the initial 2nd-gen Button scope:
 *
 * - **Cross-root ARIA** (`aria-labelledby` / `aria-describedby` from outside the
 *   shadow root).
 * - **Form-associated `submit` / `reset` types**: the button currently behaves as
 *   `type="button"` only. Use native `<button type="submit">` or [global button styles](/docs/guides-customization-global-element-styling--readme)
 *   for form submission until this lands.
 */
export const Accessibility: Story = {
  render: (args) => html`
    ${template({ ...args, 'default-slot': 'Save document' })}
    <swc-button
      variant=${args.variant ?? 'primary'}
      fill-style=${args['fill-style'] ?? 'fill'}
      size=${args.size ?? 'm'}
      accessible-label="Add item"
    >
      <svg
        slot="icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M31.5 17H19V4.5a1 1 0 0 0-2 0V17H4.5a1 1 0 0 0 0 2H17v12.5a1 1 0 0 0 2 0V19h12.5a1 1 0 0 0 0-2z"
        />
      </svg>
    </swc-button>
    ${template({
      ...args,
      'default-slot': 'Upload',
      pending: true,
      'pending-label': 'Upload in-progress',
    })}
  `,
  tags: ['a11y'],
  parameters: { flexLayout: 'row-wrap' },
};

// ────────────────────────────────────
//    UPCOMING FEATURES STORIES
// ────────────────────────────────────

/**
 * The following features are planned for future releases:
 *
 * - **Form submission** (`type="submit"` / `type="reset"`): Native form participation.
 *   Until then, use a native `<button type="submit">` with
 *   [global button styles](/docs/guides-customization-global-element-styling--readme).
 * - **`genai` variant**: For generative AI actions.
 * - **`premium` variant**: For premium or upgrade flows.
 */
export const UpcomingFeatures: Story = {
  tags: ['upcoming', 'description-only'],
};
UpcomingFeatures.storyName = 'Upcoming features';
