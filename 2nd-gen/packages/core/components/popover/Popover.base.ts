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

import { property } from 'lit/decorators.js';

import type { VirtualTrigger } from '@spectrum-web-components/core/controllers/index.js';
import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import { type Placement, POPOVER_VALID_PLACEMENTS } from './Popover.types.js';

/**
 * Abstract base for the popover component. Declares the public property surface
 * shared by all popover implementations; the concrete SWC subclass owns
 * rendering, the dialog lifecycle, event dispatch, and ARIA wiring.
 *
 * @todo Phase 3 (API): runtime validation of `placement`, lifecycle behavior.
 *
 * @slot - Popover content. Free-form; consumers slot whatever pattern they build.
 */
export abstract class PopoverBase extends SpectrumElement {
  /**
   * @internal
   *
   * The valid placement values for the popover. Narrowed in downstream
   * first-party subclasses per the proxy pattern.
   */
  static readonly VALID_PLACEMENTS: readonly Placement[] =
    POPOVER_VALID_PLACEMENTS;

  /**
   * Whether the popover is open.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /**
   * Opt in to blocking modal behavior (`<dialog>.showModal()`): focus trap,
   * background inert, native `role="dialog"`. When unset, the popover uses
   * `popover="auto"` light-dismiss behavior.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public modal = false;

  /**
   * The placement of the popover relative to its trigger.
   *
   * @default 'bottom'
   */
  @property({ type: String, reflect: true })
  public placement: Placement = 'bottom';

  /**
   * The computed placement after the `flip` middleware reorients the popover.
   * Readonly; not reflected as an attribute.
   */
  @property({ attribute: false })
  public actualPlacement: Placement | null = null;

  /**
   * Render the SVG tip element pointing at the trigger.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public tip = false;

  /**
   * Main-axis offset in pixels from the trigger.
   *
   * @default 0
   */
  @property({ type: Number })
  public offset = 0;

  /**
   * Cross-axis offset in pixels from the trigger.
   *
   * @default 0
   */
  @property({ type: Number, attribute: 'cross-offset' })
  public crossOffset = 0;

  /**
   * Distance from the viewport edge for the `flip` and `shift` middleware.
   *
   * @internal Positioning implementation detail. Set by first-party components;
   * excluded from the public API. Users are not expected to set it.
   * @default 8
   */
  @property({ type: Number, attribute: 'container-padding' })
  public containerPadding = 8;

  /**
   * Allow the popover to flip to the opposite side when constrained. When
   * `false`, the popover stays in the requested placement.
   *
   * @internal Positioning implementation detail. Set by first-party components;
   * excluded from the public API. Users are not expected to set it.
   * @default true
   */
  @property({ type: Boolean, reflect: true, attribute: 'should-flip' })
  public shouldFlip = true;

  /**
   * Minimum inset of the tip from the popover's corners, passed to the
   * `PlacementController`'s `arrow` middleware as its `padding`.
   *
   * @internal Positioning implementation detail. Set by first-party components;
   * excluded from the public API. Users are not expected to set it.
   * @default 8
   */
  @property({ type: Number, attribute: 'tip-padding' })
  public tipPadding = 8;

  /**
   * ID of the trigger element in the same document tree root.
   */
  @property({ type: String })
  public for?: string;

  /**
   * Direct trigger reference. Overrides `for` when both are set. Use for
   * cross-shadow-root triggers or programmatic wiring.
   */
  @property({ attribute: false })
  public triggerElement: HTMLElement | VirtualTrigger | null = null;
}
