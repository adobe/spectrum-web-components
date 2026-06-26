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

/**
 * Pure Lit story template for Button VRT grids.
 *
 * Do not use `getStorybookHelpers().template` in testing grids — that helper calls
 * `useArgs()` (via `syncControls`) once per instance and triggers React's
 * "Rendered more hooks than during the previous render" when many cells mount.
 *
 * Each cell is wrapped in a `div.vrt-cell` with `data-vrt-*` attributes for forced
 * pseudo-states and layout patching. See `.storybook/helpers/README.md` (VRT cell wrapper attributes).
 */

import { html, nothing, type TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type {
  ButtonFillStyle,
  ButtonSize,
  ButtonStaticColor,
  ButtonVariant,
} from '@spectrum-web-components/core/components/button';

import type { VrtInteractionState } from '../../../.storybook/helpers/index.js';

/** Workflow "Add" icon for VRT grid cells. */
export const addIconTemplate = html`
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
`;

export type ButtonTemplateArgs = {
  variant?: ButtonVariant;
  'fill-style'?: ButtonFillStyle;
  size?: ButtonSize;
  'static-color'?: ButtonStaticColor;
  disabled?: boolean;
  pending?: boolean;
  'pending-label'?: string;
  truncate?: boolean;
  justified?: boolean;
  'accessible-label'?: string;
  'default-slot'?: string;
  /** Pre-rendered icon slot content (must include `slot="icon"` on the root node). */
  'icon-slot'?: TemplateResult;
  /** Icon-only cell — layout classes are forced before capture via `data-vrt-layout-classes`. */
  iconOnly?: boolean;
  style?: string;
  /** Storybook / VRT only — applied via `applyTestingGridPseudoStates` play helper. */
  'vrt-state'?: VrtInteractionState;
};

export function Template({
  variant = 'primary',
  'fill-style': fillStyle = 'fill',
  size = 'm',
  'static-color': staticColor,
  disabled = false,
  pending = false,
  'pending-label': pendingLabel,
  truncate = false,
  justified = false,
  'accessible-label': accessibleLabel,
  'default-slot': defaultSlot = 'Button',
  'icon-slot': iconSlot,
  iconOnly = false,
  style,
  'vrt-state': vrtState,
}: ButtonTemplateArgs = {}): TemplateResult {
  const labelContent = iconOnly || !defaultSlot ? nothing : defaultSlot;

  // VRT cell wrapper — read by `applyTestingGridPseudoStates` (see helpers/README.md).
  // - data-vrt-host: custom-element tag inside this wrapper (swc-button).
  // - data-vrt-control: shadow-DOM selector for the node that receives forced classes.
  // - data-vrt-state: optional hover / focus / active → .is-hover, .is-focus-visible, .is-active.
  // - data-vrt-layout-classes: optional classes when layout depends on slot detection (icon-only).
  return html`
    <div
      class="vrt-cell"
      data-vrt-host="swc-button"
      data-vrt-control=".swc-Button"
      data-vrt-state=${ifDefined(vrtState)}
      data-vrt-layout-classes=${ifDefined(
        iconOnly ? 'swc-Button--hasIcon swc-Button--iconOnly' : undefined
      )}
    >
      <swc-button
        variant=${variant}
        fill-style=${fillStyle}
        size=${size}
        static-color=${ifDefined(staticColor)}
        ?disabled=${disabled}
        ?pending=${pending}
        pending-label=${ifDefined(pendingLabel)}
        ?truncate=${truncate}
        ?justified=${justified}
        accessible-label=${ifDefined(accessibleLabel)}
        style=${ifDefined(style)}
      >
        ${iconSlot ?? nothing}${labelContent}
      </swc-button>
    </div>
  `;
}
