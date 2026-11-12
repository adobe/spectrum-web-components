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
  RADIO_GROUP_STATUSES,
  RADIO_VALID_SIZES,
  type RadioGroupLabelPosition,
  type RadioGroupNecessityIndicator,
  type RadioGroupOrientation,
  type RadioGroupStatus,
  type RadioSize,
} from './RadioGroup.types.js';

const DOCS_URL =
  'https://spectrum-web-components.adobe.com/?path=/docs/components-radio-group--docs';

/** The validation message when no `error-text` is supplied. */
const FALLBACK_VALIDATION_MESSAGE = 'Select an option.';

/** Keys that select the focused radio. */
const NAVIGATION_KEYS = new Set([
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
 * @slot error-text - Error text shown while `field-status="invalid"`. Its plain text is also the validation message; supply translated text when needed. Without it the message is "Select an option."
 */
export abstract class RadioGroupBase extends SizedMixin(
  FieldDescriptionMixin(LabellingMixin(SpectrumElement)),
  {
    validSizes: RADIO_VALID_SIZES,
    defaultSize: 'm',
  }
) {
  public static readonly LABEL_POSITIONS: readonly RadioGroupLabelPosition[] =
    RADIO_GROUP_LABEL_POSITIONS;

  public static readonly ORIENTATIONS: readonly RadioGroupOrientation[] =
    RADIO_GROUP_ORIENTATIONS;

  /** Opts the element into native form participation. */
  public static formAssociated = true;

  /**
   * Form participation only. Do not move `role="radiogroup"` or ARIA state
   * here: on the host via `ElementInternals`, item positions and the group
   * name fail to announce in some browser/AT combinations (see
   * {@link roleElement}).
   */
  private readonly internals = this.attachInternals();

  private readonly fieldAssoc = new FieldAssociationController(this.internals, {
    onDisabledChange: () => this.requestUpdate(),
    getStatus: () => this.fieldStatus,
    host: this,
  });

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
   * Sets one interaction or validation status; `undefined` clears it.
   * `disabled` cascades to every slotted item and blocks form participation.
   * `invalid` sets a custom error that blocks form submission even when an
   * item is selected. `readonly` blocks selection changes while keeping focus
   * movement working. `required` is separate.
   */
  @property({
    attribute: 'field-status',
    reflect: true,
    converter: { fromAttribute: (value: string | null) => value ?? undefined },
  })
  public fieldStatus?: RadioGroupStatus;

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
   * Requires a selection for form submission.
   */
  @property({ type: Boolean, reflect: true })
  public required = false;

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
   * Focuses the checked radio, or the first enabled one, like a native radio
   * group. Falls back to the group element when no radio is enabled.
   */
  public override focus(options?: FocusOptions): void {
    if (this.effectiveDisabled) {
      return;
    }
    const target = this.focusTarget ?? this.roleElement;
    if (target instanceof HTMLElement) {
      target.focus(options);
    }
  }

  /**
   * The radio that takes focus and anchors validation: the enabled radio
   * matching `selected`, otherwise the first enabled one. Matches on
   * `selected` rather than `checked` so it's current before the next update.
   */
  private get focusTarget(): RadioBase | undefined {
    const enabled = this.assignedItems().filter(
      (item) => !item.effectiveDisabled
    );
    return (
      enabled.find((item) => this.selected && item.value === this.selected) ??
      enabled[0]
    );
  }

  /** The initial selection (pre-checked item or `selected`), restored on form reset. */
  private defaultSelected = '';

  /** Restores the initial selection and clears custom invalid state on reset. */
  public formResetCallback(): void {
    this.selected = this.defaultSelected;
    if (this.fieldStatus === 'invalid') {
      this.fieldStatus = undefined;
    }
  }

  /** A browser-restored selection received before the first update. */
  private pendingRestoredSelection?: string;

  /**
   * Restores the selection the browser saved for back/forward navigation or
   * autofill. Does not dispatch `change`, matching native radios.
   */
  public formStateRestoreCallback(
    state: string | File | FormData | null
  ): void {
    if (typeof state !== 'string') {
      return;
    }
    // Before the first update, the pre-checked item would overwrite `selected`;
    // apply the restored value after the authored default is captured.
    if (this.hasUpdated) {
      this.selected = state;
    } else {
      this.pendingRestoredSelection = state;
    }
  }

  /** Delegates the ancestor form / fieldset disabled cascade to the controller. */
  public formDisabledCallback(disabled: boolean): void {
    this.fieldAssoc.formDisabledCallback(disabled);
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

  /** Items currently disabled by this group, so removed items can be released. */
  private readonly groupDisabledItems = new Set<RadioBase>();

  /**
   * Proposed selection changes from item activation. When `field-status="readonly"`, reverts
   * the item's `checked` so focus still moves but selection does not.
   */
  private readonly handleItemChange = (event: Event): void => {
    const target = event.target;
    if (!(target instanceof RadioBase)) {
      return;
    }
    event.stopPropagation();
    // A radio upgraded after the group rendered may not know the group is
    // disabled yet, so the group guards selection itself.
    if (this.effectiveDisabled) {
      return;
    }
    if (this.fieldStatus === 'readonly') {
      this.setItemChecked(target, target.value === this.selected);
      return;
    }
    this.proposeSelection(target.value);
  };

  /**
   * Arrow keys move a single roving tab stop, wrapping and skipping disabled
   * items.
   */
  private readonly navigation = new FocusgroupNavigationController(this, {
    direction: 'both',
    wrap: true,
    skipDisabled: true,
    getItems: () => this.assignedItems(),
  });

  private itemStateObserver: MutationObserver | null = null;

  // Slot-presence tracking does not notify when only the message text changes,
  // and a change to the text sets no reactive property, so observe it directly.
  private readonly errorTextObserver = new MutationObserver(() => {
    this.syncValidity();
  });

  /**
   * Only keyboard movement (arrows, Home, End) selects the active item;
   * Tab-entry and `.focus()` do not. The controller dispatches this before it
   * moves focus, so focus moves here first: `change` listeners then see the
   * newly focused radio, as with native radios.
   */
  private readonly handleNavigationActiveChange = (event: Event): void => {
    const { activeElement, source } = (
      event as CustomEvent<FocusgroupNavigationActiveChangeDetail>
    ).detail;
    if (
      source !== 'keyboard' ||
      this.fieldStatus === 'readonly' ||
      this.effectiveDisabled ||
      !(activeElement instanceof RadioBase)
    ) {
      return;
    }
    activeElement.focus();
    this.proposeKeyboardSelection(activeElement);
  };

  /**
   * Selects the focused radio for a navigation key the controller didn't act
   * on because focus didn't move, such as Home on the first radio or an arrow
   * key with only one enabled radio.
   */
  private readonly handleKeydown = (event: KeyboardEvent): void => {
    if (
      event.defaultPrevented ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      !NAVIGATION_KEYS.has(event.key) ||
      this.fieldStatus === 'readonly' ||
      this.effectiveDisabled
    ) {
      return;
    }
    const item = event
      .composedPath()
      .find((node): node is RadioBase => node instanceof RadioBase);
    if (
      !item ||
      item.checked ||
      item.effectiveDisabled ||
      !this.assignedItems().includes(item)
    ) {
      return;
    }
    event.preventDefault();
    this.proposeKeyboardSelection(item);
  };

  /**
   * Proposes `item` as the selection. When a listener cancels the change,
   * focus returns to the roving tab stop so it isn't left on a radio with
   * `tabindex="-1"`. The refocus waits a microtask because the navigation
   * controller focuses the item after its active-change event returns.
   */
  private proposeKeyboardSelection(item: RadioBase): void {
    if (!this.proposeSelection(item.value)) {
      queueMicrotask(() => this.navigation.getActiveItem()?.focus());
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    // An item's `disabled` or `value` changes navigation, checked state, and
    // whether `selected` is submittable. A `checked` change is only checked
    // for having come from outside the group.
    this.itemStateObserver ??= new MutationObserver((records) => {
      const itemRecords = records.filter(
        ({ target }) => target instanceof RadioBase
      );
      this.warnExternalChecked(
        new Set(
          itemRecords
            .filter(({ attributeName }) => attributeName === 'checked')
            .map(({ target }) => target as RadioBase)
        )
      );
      const stateRecords = itemRecords.filter(
        ({ attributeName }) => attributeName !== 'checked'
      );
      if (!stateRecords.length) {
        return;
      }
      this.navigation.refresh();
      if (stateRecords.some(({ attributeName }) => attributeName === 'value')) {
        this.syncCheckedState();
      }
      this.syncFormState();
    });
    this.itemStateObserver.observe(this, {
      attributes: true,
      attributeFilter: ['checked', 'disabled', 'value'],
      subtree: true,
    });
    this.errorTextObserver.observe(this, {
      childList: true,
      characterData: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['slot'],
    });
    this.addEventListener(
      focusgroupNavigationActiveChange,
      this.handleNavigationActiveChange
    );
    this.addEventListener('keydown', this.handleKeydown);
  }

  public override disconnectedCallback(): void {
    this.removeEventListener(
      focusgroupNavigationActiveChange,
      this.handleNavigationActiveChange
    );
    this.removeEventListener('keydown', this.handleKeydown);
    this.itemStateObserver?.disconnect();
    this.errorTextObserver.disconnect();
    super.disconnectedCallback();
  }

  private readonly handleSlotchange = (): void => {
    this.syncSlottedItems();
  };

  /**
   * The authored `disabled` status OR the cascaded form / `<fieldset disabled>`
   * state. Applied to every slotted item without changing the item's own
   * `disabled`.
   */
  protected get effectiveDisabled(): boolean {
    return this.fieldAssoc.disabled;
  }

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    // A slotted item's `change` passes through this shadow root before the
    // host, so stopping it here keeps it from every group listener.
    this.renderRoot.addEventListener('change', this.handleItemChange);
    this.renderRoot
      ?.querySelector('slot:not([name])')
      ?.addEventListener('slotchange', this.handleSlotchange);
    this.syncSlottedItems();
  }

  protected override willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);
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
      if (this.pendingRestoredSelection !== undefined) {
        this.selected = this.pendingRestoredSelection;
        this.pendingRestoredSelection = undefined;
      }
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
    if (this.fieldStatus !== undefined) {
      validateEnum(this, {
        prop: 'field-status',
        value: this.fieldStatus,
        valid: RADIO_GROUP_STATUSES,
        url: DOCS_URL,
      });
    }
    this.fieldAssoc.syncDisabledState();
    super.update(changedProperties);
    const disabledChanged = this.syncDisabledState();
    if (disabledChanged) {
      this.navigation.refresh();
    }
    if (disabledChanged || changedProperties.has('selected')) {
      this.syncCheckedState();
    }
    this.syncFormState();
  }

  /**
   * The value the group submits and validates against: `selected`, but only
   * while an assigned, enabled item has that value. `selected` itself is kept
   * as authored so an item added later can still adopt it.
   */
  private get submittedValue(): string | null {
    if (this.effectiveDisabled || !this.selected) {
      return null;
    }
    const match = this.assignedItems().some(
      (item) => item.value === this.selected && !item.effectiveDisabled
    );
    return match ? this.selected : null;
  }

  /**
   * Pushes validity and the form value. Excludes the value when no enabled
   * item matches `selected`, matching an unchecked or disabled native radio.
   */
  private syncFormState(): void {
    this.syncValidity();
    this.fieldAssoc.setValue(this.submittedValue);
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

  private setItemGroupDisabled(item: RadioBase, disabled: boolean): void {
    item.groupDisabled = disabled;
    // Navigation refreshes before the child's Lit update can reflect this state.
    if (item.effectiveDisabled) {
      item.setAttribute('aria-disabled', 'true');
    } else {
      item.removeAttribute('aria-disabled');
    }
    if (disabled) {
      this.groupDisabledItems.add(item);
    } else {
      this.groupDisabledItems.delete(item);
    }
  }

  /**
   * Applies the group's disabled state to every assigned item without
   * touching the item's own `disabled`. Returns whether any item changed.
   */
  private syncDisabledState(): boolean {
    const items = this.assignedItems();
    const assigned = new Set(items);
    let changed = false;
    for (const item of this.groupDisabledItems) {
      if (!assigned.has(item)) {
        changed ||= !item.disabled;
        this.setItemGroupDisabled(item, false);
      }
    }
    for (const item of items) {
      if (item.groupDisabled !== this.effectiveDisabled) {
        changed ||= !item.disabled;
        this.setItemGroupDisabled(item, this.effectiveDisabled);
      }
    }
    return changed;
  }

  /**
   * Adopts `value` unless already selected, dispatching a cancelable `change`
   * and reverting on `preventDefault()`. Checked state, validity, and the form
   * value are synced before dispatch so listeners read the new state, as with
   * a native radio. Shared by item activation and keyboard navigation.
   * Returns `false` when a listener cancelled the change.
   */
  private proposeSelection(value: string): boolean {
    if (value === this.selected) {
      return true;
    }
    const previous = this.selected;
    this.selected = value;
    this.syncCheckedState();
    this.syncFormState();
    const applyDefault = this.dispatchEvent(
      new Event('change', { cancelable: true, bubbles: true, composed: true })
    );
    if (!applyDefault) {
      this.selected = previous;
      this.syncCheckedState();
      this.syncFormState();
    }
    return applyDefault;
  }

  /**
   * Sets each item's `checked` from `selected` and keeps the roving tab stop
   * on the checked item. With nothing checked, the tab stop moves to the first
   * enabled item, unless focus is already in the group.
   */
  private syncCheckedState(): void {
    let checkedItem: RadioBase | undefined;
    const items = this.assignedItems();
    this.warnExternalChecked(items);
    for (const item of items) {
      this.setItemChecked(
        item,
        this.selected !== '' && item.value === this.selected
      );
      if (item.checked) {
        checkedItem = item;
      }
    }
    this.checkedSynced = true;
    const tabStop =
      checkedItem ??
      (this.matches(':focus-within')
        ? undefined
        : items.find((item) => !item.effectiveDisabled));
    if (tabStop) {
      this.navigation.setActiveItem(tabStop);
    }
  }

  /** The `checked` value the group last wrote to each item. */
  private readonly groupChecked = new WeakMap<RadioBase, boolean>();

  /** Whether the initial checked sync, which adopts pre-checked items, has run. */
  private checkedSynced = false;

  /** The only writer of an item's `checked`, so outside changes can be told apart. */
  private setItemChecked(item: RadioBase, checked: boolean): void {
    this.groupChecked.set(item, checked);
    item.checked = checked;
  }

  /**
   * Warns when an item's `checked` was changed outside the group: set directly
   * on a radio, or on a radio added after the initial sync with a value other
   * than `selected`. The group owns `checked` and overwrites it on its next sync.
   */
  private warnExternalChecked(items: Iterable<RadioBase>): void {
    for (const item of items) {
      const written = this.groupChecked.get(item);
      const external =
        written === undefined
          ? this.checkedSynced && item.checked && item.value !== this.selected
          : item.checked !== written;
      warnIf(
        this,
        external,
        `<${item.localName}> "checked" was changed directly. Set "selected" on <${this.localName}> instead; the group controls which radio is checked.`,
        DOCS_URL,
        { type: 'api', issues: [`value="${item.value}"`] }
      );
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

  private syncSlottedItems(): void {
    this.sizePropagation.propagate();
    this.emphasizedPropagation.propagate();
    this.syncDisabledState();
    this.warnDuplicateValues();
    this.syncItemPositions();
    this.navigation.refresh();
    this.syncCheckedState();
    this.syncFormState();
    this.resyncWhenDefined();
  }

  /** Tag names already being awaited by {@link resyncWhenDefined}. */
  private readonly pendingDefinitions = new Set<string>();

  /**
   * Upgrading a slotted element fires no `slotchange`, so a radio defined
   * after the group renders (a lazy chunk or separate bundle) would never be
   * synced. Resync once each undefined slotted element's tag is defined.
   */
  private resyncWhenDefined(): void {
    const slot =
      this.renderRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
    for (const element of slot?.assignedElements({ flatten: true }) ?? []) {
      const tagName = element.localName;
      if (
        !tagName.includes('-') ||
        element.matches(':defined') ||
        this.pendingDefinitions.has(tagName)
      ) {
        continue;
      }
      this.pendingDefinitions.add(tagName);
      void customElements.whenDefined(tagName).then(() => {
        this.pendingDefinitions.delete(tagName);
        if (this.isConnected) {
          this.syncSlottedItems();
        }
      });
    }
  }

  /** The plain text of the slotted `error-text`, or `''` when there is none. */
  private get errorTextMessage(): string {
    return Array.from(
      this.querySelectorAll(':scope > [slot="error-text"]'),
      (element) => element.textContent ?? ''
    )
      .join(' ')
      .trim();
  }

  /**
   * The only writer of `setValidity()`. A required group with no submittable
   * selection is `valueMissing`; `field-status="invalid"` is `customError`. While
   * invalid, the plain text of `error-text` is the validation message,
   * otherwise a standard fallback. `setValidity` throws on an empty message
   * when a flag is set; the inline UI is rendered elsewhere. The checked or
   * first enabled radio is the validation anchor, so a blocked submit focuses
   * it, as with native radios. Disabled and
   * read-only groups are barred from validation, as native controls are.
   */
  private syncValidity(): void {
    const valueMissing =
      !this.fieldAssoc.barred && this.required && this.submittedValue === null;
    const invalid = this.fieldStatus === 'invalid';
    const anchor = this.focusTarget ?? this.roleElement;
    this.internals.setValidity(
      { valueMissing, customError: invalid },
      valueMissing || invalid
        ? (invalid && this.errorTextMessage) || FALLBACK_VALIDATION_MESSAGE
        : '',
      anchor instanceof HTMLElement ? anchor : undefined
    );
  }
}
