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
 */

import { html, nothing, type TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import type {
  ButtonFillStyle,
  ButtonSize,
  ButtonStaticColor,
  ButtonVariant,
} from '@spectrum-web-components/core/components/button';

import type { ButtonVrtState } from '../../../.storybook/pseudo-states-helpers.js';

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
  /** Icon-only cell — omits label; `vrt-icon-only-cell` forces layout before slot detection. */
  iconOnly?: boolean;
  style?: string;
  /** Storybook / VRT only — applied via `applyTestingGridPseudoStates` play helper. */
  'vrt-state'?: ButtonVrtState;
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

  return html`
    <div
      class=${classMap({
        'vrt-button-cell': true,
        'vrt-icon-only-cell': iconOnly,
      })}
      data-vrt-state=${ifDefined(vrtState)}
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
