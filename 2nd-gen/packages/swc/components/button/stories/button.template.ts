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
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import type {
  ButtonFillStyle,
  ButtonSize,
  ButtonStaticColor,
  ButtonVariant,
} from '@spectrum-web-components/core/components/button';

import type { ButtonVrtState } from '../Button.js';

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
  /** HTML for the icon slot (must include `slot="icon"` on the root node). */
  'icon-slot'?: string;
  style?: string;
  /** Storybook / VRT only — see `Button.vrtState`. */
  'vrt-state'?: ButtonVrtState;
  /** Storybook / VRT only — see `Button.vrtPendingActive`. */
  'vrt-pending-active'?: boolean;
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
  style,
  'vrt-state': vrtState,
  'vrt-pending-active': vrtPendingActive = false,
}: ButtonTemplateArgs = {}): TemplateResult {
  return html`
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
      vrt-state=${ifDefined(vrtState)}
      ?vrt-pending-active=${vrtPendingActive}
      style=${ifDefined(style)}
    >
      ${iconSlot ? unsafeHTML(iconSlot) : nothing}
      ${defaultSlot ? defaultSlot : nothing}
    </swc-button>
  `;
}
