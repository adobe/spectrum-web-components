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
import {
  focusgroupNavigationActiveChange,
  type FocusgroupNavigationActiveChangeDetail,
  FocusgroupNavigationController,
} from '@adobe/spectrum-wc-core/controllers/focusgroup-navigation-controller/index.js';
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
  RADIO_GROUP_NECESSITY_INDICATORS,
  RADIO_GROUP_ORIENTATIONS,
  RADIO_VALID_SIZES,
  type RadioGroupLabelPosition,
  type RadioGroupNecessityIndicator,
  type RadioGroupOrientation,
  type RadioSize,
} from './RadioGroup.types.js';

const DOCS_URL =
  'https://spectrum-web-components.adobe.com/?path=/docs/components-radio-group--docs';

const READONLY_BLOCKED_KEYS: ReadonlySet<string> = new Set([
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Home',
  'End',
]);

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
   * Form participation only. Do not move `role="radiogroup"` or ARIA state
   * here: on the host via `ElementInternals`, item positions and the group
   * name fail to announce in some browser/AT combinations (see
   * {@link roleElement}).
   */
  private readonly internals = this.attachInternals();

  private readonly fieldAssoc = new FieldAssociationController(this.internals, {
    onDisabledChange: () => this.requestUpdate(),
  });

  constructor() {
    super();
    // Items dispatch a composed `change` on activation.
    this.addEventListener('change', this.handleItemChange);
    this.addEventListener('keydown', this.handleReadonlyKeydown);
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
   * The form control name submitted with the group's selected value.
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
   * Marks the group's current selection as invalid and blocks form submission.
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

  /**
   * How the group's necessity is marked in the visible label. `icon` shows an
   * asterisk only when `required`. `label` appends `(required)` when required
   * and `(optional)` when not required. Requires a visible label to show.
   *
   * @default icon
   */
  @property({
    type: String,
    reflect: true,
    attribute: 'necessity-indicator',
  })
  public necessityIndicator: RadioGroupNecessityIndicator = 'icon';

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  /**
   * The host's own `disabled` OR the cascaded form / `<fieldset disabled>`
   * state. Cascaded to every slotted item while preserving its own disabled state.
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

  /** The initial selection (pre-checked item or `selected`), restored on form reset. */
  private defaultSelected = '';

  /** Restores the initial selection on native form reset. */
  public formResetCallback(): void {
    this.selected = this.defaultSelected;
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

  private readonly disabledItemStates = new Map<RadioBase, boolean>();

  private syncDisabledState(): boolean {
    const items = this.assignedItems();
    const assigned = new Set(items);
    let changed = false;
    for (const [item, disabled] of this.disabledItemStates) {
      if (!this.effectiveDisabled || !assigned.has(item)) {
        changed ||= item.disabled !== disabled;
        item.disabled = disabled;
        this.disabledItemStates.delete(item);
      }
    }
    if (!this.effectiveDisabled) {
      return changed;
    }
    for (const item of items) {
      if (!this.disabledItemStates.has(item)) {
        this.disabledItemStates.set(item, item.disabled);
      }
      changed ||= !item.disabled;
      item.disabled = true;
    }
    return changed;
  }

  /**
   * Adopts `value` unless already selected, dispatching a cancelable `change`
   * and reverting on `preventDefault()`. Shared by item activation and
   * keyboard navigation.
   */
  private proposeSelection(value: string): void {
    if (value === this.selected) {
      return;
    }
    const previous = this.selected;
    this.selected = value;
    const applyDefault = this.dispatchEvent(
      new Event('change', { cancelable: true, bubbles: true, composed: true })
    );
    if (!applyDefault) {
      this.selected = previous;
    }
  }

  /**
   * Proposed selection changes from item activation. When `readonly`, reverts
   * the item's `checked` so selection does not change.
   */
  private readonly handleItemChange = (event: Event): void => {
    const target = event.target;
    if (!(target instanceof RadioBase)) {
      return;
    }
    event.stopPropagation();
    if (this.readonly) {
      target.checked = target.value === this.selected;
      return;
    }
    this.proposeSelection(target.value);
  };

  /**
   * With navigation suspended, the keys it would handle fall through to page
   * scroll; prevent that so a readonly group behaves like a native radio set.
   */
  private readonly handleReadonlyKeydown = (event: KeyboardEvent): void => {
    if (
      this.readonly &&
      !event.defaultPrevented &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.metaKey &&
      READONLY_BLOCKED_KEYS.has(event.key)
    ) {
      event.preventDefault();
    }
  };

  /**
   * Arrow keys move a single roving tab stop, wrapping and skipping disabled
   * items. Suspended while `readonly`.
   */
  private readonly navigation = new FocusgroupNavigationController(this, {
    direction: 'both',
    wrap: true,
    skipDisabled: true,
    getItems: () => this.assignedItems(),
  });

  /**
   * Only keyboard movement (arrows, Home, End) selects the active item;
   * Tab-entry and `.focus()` do not.
   */
  private readonly handleNavigationActiveChange = (event: Event): void => {
    const { activeElement, source } = (
      event as CustomEvent<FocusgroupNavigationActiveChangeDetail>
    ).detail;
    if (
      source !== 'keyboard' ||
      this.readonly ||
      !(activeElement instanceof RadioBase)
    ) {
      return;
    }
    this.proposeSelection(activeElement.value);
  };

  public override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener(
      focusgroupNavigationActiveChange,
      this.handleNavigationActiveChange
    );
  }

  public override disconnectedCallback(): void {
    this.removeEventListener(
      focusgroupNavigationActiveChange,
      this.handleNavigationActiveChange
    );
    super.disconnectedCallback();
  }

  /** Sets each item's `checked` from `selected` and keeps the roving tab stop on the checked item. */
  private syncCheckedState(): void {
    let checkedItem: RadioBase | undefined;
    for (const item of this.assignedItems()) {
      item.checked = this.selected !== '' && item.value === this.selected;
      if (item.checked) {
        checkedItem = item;
      }
    }
    if (checkedItem) {
      this.navigation.setActiveItem(checkedItem);
    }
  }

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

  /**
   * Sets each item's `posInSet`/`setSize`. Items have separate shadow roots,
   * so the browser can't compute position; without this, some AT
   * announces every item as "1 of 1".
   */
  private syncItemPositions(): void {
    const items = this.assignedItems();
    items.forEach((item, index) => {
      item.posInSet = index + 1;
      item.setSize = items.length;
    });
  }

  private readonly handleSlotchange = (): void => {
    this.syncSlottedItems();
  };

  private syncSlottedItems(): void {
    this.sizePropagation.propagate();
    this.emphasizedPropagation.propagate();
    this.syncDisabledState();
    this.warnDuplicateValues();
    this.syncItemPositions();
    this.navigation.refresh();
    this.syncCheckedState();
  }

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.renderRoot
      ?.querySelector('slot:not([name])')
      ?.addEventListener('slotchange', this.handleSlotchange);
    this.syncSlottedItems();
  }

  protected override willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('readonly')) {
      this.navigation.setOptions({ enabled: !this.readonly });
    }
    if (!this.hasUpdated) {
      // A pre-checked item takes precedence over `selected` on first render.
      // Check the attribute and the property: items may be un-upgraded, or have
      // `checked` set as a property that has not reflected yet.
      const checkedItems = Array.from(this.children)
        .filter(
          (child) =>
            (child instanceof RadioBase || child.localName === 'swc-radio') &&
            !child.getAttribute('slot')
        )
        .filter((child) =>
          child instanceof RadioBase
            ? child.checked
            : child.hasAttribute('checked')
        );
      warnIf(
        this,
        checkedItems.length > 1,
        'Multiple <swc-radio> items are initially checked; the first checked item takes precedence.',
        DOCS_URL,
        { type: 'api' }
      );
      const preChecked = checkedItems[0];
      if (preChecked) {
        this.selected =
          (preChecked instanceof RadioBase
            ? preChecked.value
            : preChecked.getAttribute('value')) ?? '';
      }
      this.defaultSelected = this.selected;
    }
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
    validateEnum(this, {
      prop: 'necessity-indicator',
      value: this.necessityIndicator,
      valid: RADIO_GROUP_NECESSITY_INDICATORS,
      url: DOCS_URL,
    });
    super.update(changedProperties);
    const disabledChanged = this.syncDisabledState();
    if (disabledChanged) {
      this.navigation.refresh();
    }
    if (disabledChanged || changedProperties.has('selected')) {
      this.syncCheckedState();
    }
    // Constraint validity: a required group with nothing selected is
    // `valueMissing`; an invalid selection is `customError`. The message is
    // required by `setValidity` (it throws if empty); the UI is rendered elsewhere.
    const valueMissing = this.required && !this.selected;
    this.internals.setValidity(
      { valueMissing, customError: this.invalid },
      valueMissing || this.invalid ? 'error' : ''
    );
    // Push the current selection into the form; exclude it when nothing is
    // selected or the group is disabled, matching an unchecked native radio set.
    this.fieldAssoc.setValue(
      this.effectiveDisabled || !this.selected ? null : this.selected
    );
  }
}
