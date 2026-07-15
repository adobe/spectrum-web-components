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

import { PropertyValues } from 'lit';
import { property, queryAssignedElements } from 'lit/decorators.js';

import type { ButtonBase } from '@spectrum-web-components/core/components/button';
import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';
import { SizedMixin } from '@spectrum-web-components/core/mixins/index.js';
import { validateEnum } from '@spectrum-web-components/core/utils/index.js';

import { SlotAttributePropagationController } from '../../controllers/slot-attribute-propagation/index.js';
import {
  BUTTON_GROUP_ALIGNMENTS,
  BUTTON_GROUP_ORIENTATIONS,
  BUTTON_GROUP_SIZES,
  type ButtonGroupAlignment,
  type ButtonGroupOrientation,
  type ButtonGroupSize,
} from './ButtonGroup.types.js';

/**
 * A button group clusters related actions together, providing consistent
 * spacing, sizing, and orientation. The host exposes `role="group"` and
 * propagates `size` and `disabled` to slotted button children.
 *
 * This base class owns shared logic and accessibility semantics. Rendering
 * and styling live in the concrete SWC subclass.
 *
 * @slot - One or more `swc-button` elements.
 *
 * @attribute {ElementSize} size - The size of the button group and its children.
 */
export abstract class ButtonGroupBase extends SizedMixin(SpectrumElement, {
  validSizes: BUTTON_GROUP_SIZES,
}) {
  /**
   * The size of the button group. Propagated to all slotted button children.
   *
   * @default m
   */
  declare public size: ButtonGroupSize;

  // ──────────────────
  //     SHARED API
  // ──────────────────

  /**
   * @internal
   *
   * Valid orientation values for validation.
   */
  static readonly ORIENTATIONS: readonly string[] = BUTTON_GROUP_ORIENTATIONS;

  /**
   * @internal
   *
   * Valid alignment values for validation.
   */
  static readonly ALIGNMENTS: readonly string[] = BUTTON_GROUP_ALIGNMENTS;

  /**
   * The layout direction of the button group.
   *
   * Note: this property does NOT set `aria-orientation` on the host because
   * `aria-orientation` is only meaningful for roles that manage arrow-key
   * navigation (e.g. `toolbar`, `listbox`). Since button-group uses
   * sequential Tab navigation (not roving tabindex), the attribute would
   * be invalid.
   */
  @property({ type: String, reflect: true })
  public orientation: ButtonGroupOrientation = 'horizontal';

  /**
   * Whether all buttons in the group are disabled. When `true`, forces
   * every slotted button child to `disabled`. When `false`, children
   * retain their individual disabled state — a button slotted with
   * `disabled` remains disabled even when the group is enabled.
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * The alignment of buttons within the group along the main axis.
   */
  @property({ type: String, reflect: true })
  public align: ButtonGroupAlignment = 'start';

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  @queryAssignedElements({ flatten: true })
  private buttons!: ButtonBase[];

  /**
   * Tracks buttons that were individually disabled before the group
   * forced all children disabled. Used to restore their state when
   * the group becomes enabled again.
   */
  private individuallyDisabled = new WeakSet<ButtonBase>();

  private readonly _sizePropagation = new SlotAttributePropagationController(
    this,
    {
      attribute: 'size',
      getValue: () => this.size,
    }
  );

  protected override firstUpdated(changed: PropertyValues<this>): void {
    super.firstUpdated(changed);
    this.setAttribute('role', 'group');
  }

  protected override update(changedProperties: PropertyValues): void {
    const constructor = this.constructor as typeof ButtonGroupBase;
    validateEnum(this, {
      prop: 'orientation',
      value: this.orientation,
      valid: constructor.ORIENTATIONS,
      url: 'https://spectrum-web-components.adobe.com/?path=/docs/components-button-group--docs',
    });
    validateEnum(this, {
      prop: 'align',
      value: this.align,
      valid: constructor.ALIGNMENTS,
      url: 'https://spectrum-web-components.adobe.com/?path=/docs/components-button-group--docs',
    });
    super.update(changedProperties);
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);

    if (changed.has('disabled')) {
      const wasDisabled = changed.get('disabled');
      if (this.disabled || wasDisabled) {
        this.propagateDisabledToChildren();
      }
    }
  }

  /**
   * Handles slotchange events from the default slot. Ensures newly slotted
   * children receive the current size and disabled state.
   */
  protected handleSlotchange(): void {
    this._sizePropagation.propagate();

    if (this.disabled) {
      this.propagateDisabledToChildren();
    }
  }

  /**
   * Propagates disabled state to slotted button children.
   *
   * Uses a one-directional model: when the group is disabled, all children
   * are forced disabled (tracking which were already individually disabled).
   * When the group is enabled, children are restored to their individual
   * disabled state — a button slotted with `disabled` remains disabled.
   *
   * On slotchange when the group is enabled, buttons are not touched so
   * their declarative `disabled` attribute is preserved.
   */
  private propagateDisabledToChildren(): void {
    for (const button of this.buttons) {
      if (this.disabled) {
        if (button.disabled) {
          this.individuallyDisabled.add(button);
        }
        button.disabled = true;
      } else {
        button.disabled = this.individuallyDisabled.has(button);
      }
    }

    if (!this.disabled) {
      this.individuallyDisabled = new WeakSet();
    }
  }
}
