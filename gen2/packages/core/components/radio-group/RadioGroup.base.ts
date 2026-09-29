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
import { property } from 'lit/decorators.js';

import { FieldAssociationController } from '@adobe/spectrum-wc-core/controllers/field-association-controller/index.js';
import { SlotAttributePropagationController } from '@adobe/spectrum-wc-core/controllers/slot-attribute-propagation-controller/index.js';
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import {
  FieldDescriptionMixin,
  LabellingMixin,
  SizedMixin,
} from '@adobe/spectrum-wc-core/mixins/index.js';
import { validateEnum, warnIf } from '@adobe/spectrum-wc-core/utils/index.js';

import { RadioBase } from './Radio.base.js';
import {
  RADIO_GROUP_LABEL_POSITIONS,
  RADIO_GROUP_ORIENTATIONS,
  RADIO_VALID_SIZES,
  type RadioGroupLabelPosition,
  type RadioGroupOrientation,
  type RadioSize,
} from './RadioGroup.types.js';

const DOCS_URL =
  'https://spectrum-web-components.adobe.com/?path=/docs/components-radio-group--docs';

/**
 * Coordinates a set of `swc-radio` items as a single mutually-exclusive selection.
 * Rendering lives in `swc-radio-group`.
 *
 * @attribute {RadioSize} size - Size applied to all items.
 *
 * @slot - The `swc-radio` items to manage.
 * @slot label - Visible group label.
 * @slot description - Group-level guidance text.
 * @slot error-text - Error message shown when `invalid`.
 */
export abstract class RadioGroupBase extends SizedMixin(
  FieldDescriptionMixin(LabellingMixin(SpectrumElement)),
  {
    validSizes: RADIO_VALID_SIZES,
    defaultSize: 'm',
  }
) {
  static readonly LABEL_POSITIONS: readonly RadioGroupLabelPosition[] =
    RADIO_GROUP_LABEL_POSITIONS;

  static readonly ORIENTATIONS: readonly RadioGroupOrientation[] =
    RADIO_GROUP_ORIENTATIONS;

  /** Opts the element into native form participation. */
  static formAssociated = true;

  /**
   * `role="radiogroup"` on the host via `ElementInternals`, fixed and never
   * author-overridable: the group has no native container element to render
   * the role on instead (the forms strategy RFC's host-role exception).
   * Shared by `LabellingMixin`/`FieldDescriptionMixin` for the same reason
   * (no inner role element to wire the accessible name/description onto).
   */
  private readonly internals = this.attachInternals();

  private readonly fieldAssoc = new FieldAssociationController(this.internals, {
    onDisabledChange: () => this.requestUpdate(),
  });

  constructor() {
    super();
    this.internals.role = 'radiogroup';
  }

  public override get labelInternals(): ElementInternals | null {
    return this.internals;
  }

  public override get describedByInternals(): ElementInternals | null {
    return this.internals;
  }

  /**
   * Size applied to all items. Defaults to `m`.
   */
  declare public size: RadioSize;

  /**
   * Emphasis applied to all items' checked indicator.
   */
  @property({ type: Boolean, reflect: true })
  public emphasized = false;

  /**
   * Disabled state cascaded to every slotted item. Combined with the ancestor
   * `<form>`/`<fieldset disabled>` cascade via `effectiveDisabled`.
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * The form control name submitted with the group's selected value. Not
   * propagated onto items' inner inputs.
   */
  @property({ type: String, reflect: true })
  public name = '';

  /**
   * The `value` of the currently-selected item. On first update, a slotted
   * item's own declarative `checked` takes precedence over this attribute.
   */
  @property({ type: String, reflect: true })
  public selected = '';

  /**
   * Marks the group's current selection as invalid.
   */
  @property({ type: Boolean, reflect: true })
  public invalid = false;

  /**
   * Requires a selection for form submission.
   */
  @property({ type: Boolean, reflect: true })
  public required = false;

  /**
   * Blocks selection changes while keeping focus movement working.
   */
  @property({ type: Boolean, reflect: true })
  public readonly = false;

  /**
   * Position of the group's label relative to its items.
   *
   * @default top
   */
  @property({ type: String, reflect: true, attribute: 'label-position' })
  public labelPosition: RadioGroupLabelPosition = 'top';

  /**
   * Layout direction of the managed items.
   *
   * @default vertical
   */
  @property({ type: String, reflect: true })
  public orientation: RadioGroupOrientation = 'vertical';

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  /**
   * The host's own `disabled` OR the cascaded form / `<fieldset disabled>`
   * state. Propagated to every slotted item via `disabledPropagation`.
   */
  protected get effectiveDisabled(): boolean {
    return this.disabled || this.fieldAssoc.formDisabled;
  }

  /** The form the group participates in, or `null`. */
  public get form(): HTMLFormElement | null {
    return this.fieldAssoc.form;
  }

  /** The group's constraint-validation state. */
  public get validity(): ValidityState {
    return this.fieldAssoc.validity;
  }

  /** The localized validation message. */
  public get validationMessage(): string {
    return this.fieldAssoc.validationMessage;
  }

  /** Whether the group is a candidate for constraint validation. */
  public get willValidate(): boolean {
    return this.fieldAssoc.willValidate;
  }

  /** Runs constraint validation; returns whether the group is valid. */
  public checkValidity(): boolean {
    return this.fieldAssoc.checkValidity();
  }

  /** Runs constraint validation and reports any problem to the user. */
  public reportValidity(): boolean {
    return this.fieldAssoc.reportValidity();
  }

  /**
   * Restores the authored `selected` attribute on native form reset.
   *
   * @todo Full coordinated reset (re-deriving `selected` from a slotted
   *   item's own declarative `checked`, per the item plan's checked-state-flow
   *   section) awaits the group/item selection-sync behavior, not yet built.
   */
  public formResetCallback(): void {
    this.selected = this.getAttribute('selected') ?? '';
  }

  /** Delegates the ancestor form / fieldset disabled cascade to the controller. */
  public formDisabledCallback(disabled: boolean): void {
    this.fieldAssoc.formDisabledCallback(disabled);
  }

  private assignedItems(): RadioBase[] {
    const slot = this.renderRoot?.querySelector('slot:not([name])');
    if (!slot) {
      return [];
    }
    return (slot as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter((el): el is RadioBase => el instanceof RadioBase);
  }

  private readonly sizePropagation = new SlotAttributePropagationController(
    this,
    {
      attribute: 'size',
      getValue: () => this.size,
    }
  );

  private readonly emphasizedPropagation =
    new SlotAttributePropagationController(this, {
      attribute: 'emphasized',
      getValue: () => (this.emphasized ? '' : null),
    });

  private readonly disabledPropagation = new SlotAttributePropagationController(
    this,
    {
      attribute: 'disabled',
      getValue: () => (this.effectiveDisabled ? '' : null),
    }
  );

  private warnDuplicateValues(): void {
    const seen = new Set<string>();
    for (const item of this.assignedItems()) {
      if (!item.value) {
        continue;
      }
      warnIf(
        this,
        seen.has(item.value),
        `Multiple <swc-radio> items share the value "${item.value}". Selection matching by value will not distinguish between them.`,
        DOCS_URL,
        { type: 'api', issues: [`value="${item.value}"`] }
      );
      seen.add(item.value);
    }
  }

  private readonly handleSlotchange = (): void => {
    this.syncSlottedItems();
  };

  private syncSlottedItems(): void {
    this.sizePropagation.propagate();
    this.emphasizedPropagation.propagate();
    this.disabledPropagation.propagate();
    this.warnDuplicateValues();
  }

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.renderRoot
      ?.querySelector('slot:not([name])')
      ?.addEventListener('slotchange', this.handleSlotchange);
    this.syncSlottedItems();
  }

  protected override update(changedProperties: PropertyValues): void {
    validateEnum(this, {
      prop: 'label-position',
      value: this.labelPosition,
      valid: (this.constructor as typeof RadioGroupBase).LABEL_POSITIONS,
      url: DOCS_URL,
    });
    validateEnum(this, {
      prop: 'orientation',
      value: this.orientation,
      valid: (this.constructor as typeof RadioGroupBase).ORIENTATIONS,
      url: DOCS_URL,
    });
    super.update(changedProperties);
    // Push the current selection into the form; exclude it when nothing is
    // selected or the group is disabled, matching an unchecked native radio set.
    this.fieldAssoc.setValue(
      this.effectiveDisabled || !this.selected ? null : this.selected
    );
  }
}
