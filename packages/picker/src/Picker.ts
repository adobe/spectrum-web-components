/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
  CSSResultArray,
  DefaultElementSize,
  html,
  nothing,
  PropertyValues,
  render,
  SizedMixin,
  TemplateResult,
} from '@spectrum-web-components/base';
import {
  classMap,
  ifDefined,
  StyleInfo,
  styleMap,
} from '@spectrum-web-components/base/src/directives.js';
import {
  property,
  query,
  state,
} from '@spectrum-web-components/base/src/decorators.js';
import pickerStyles from './picker.css.js';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import chevronIconOverrides from '@spectrum-web-components/icon/src/icon-chevron-overrides.css.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import type { Tooltip } from '@spectrum-web-components/tooltip';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/menu/sp-menu.js';
import type {
  Menu,
  MenuItem,
  MenuItemChildren,
} from '@spectrum-web-components/menu';
import { Placement } from '@spectrum-web-components/overlay';
import {
  IS_MOBILE,
  MatchMediaController,
} from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';
import { DependencyManagerController } from '@spectrum-web-components/reactive-controllers/src/DependencyManger.js';
import { PendingStateController } from '@spectrum-web-components/reactive-controllers/src/PendingState.js';
import { Overlay } from '@spectrum-web-components/overlay/src/Overlay.js';
import type { SlottableRequestEvent } from '@spectrum-web-components/overlay/src/slottable-request-event.js';
import type { FieldLabel } from '@spectrum-web-components/field-label';
import { DesktopController } from './DesktopController.js';
import { MobileController } from './MobileController.js';
import { strategies } from './strategies.js';

const chevronClass = {
  s: 'spectrum-UIIcon-ChevronDown75',
  m: 'spectrum-UIIcon-ChevronDown100',
  l: 'spectrum-UIIcon-ChevronDown200',
  xl: 'spectrum-UIIcon-ChevronDown300',
};

export const DESCRIPTION_ID = 'option-picker';

/**
 * The `PickerBase` class extends the `SizedMixin` and `Focusable` classes to provide a customizable picker component.
 * It includes various properties and methods to handle the picker's behavior, appearance, and state.
 *
 * @function constructor - Initializes the `PendingStateController` for the Picker component.
 * @function set selectedItem - Sets the selected item of the picker.
 * @function forceFocusVisible - Forces the picker to be focused.
 * @function click - Toggles the picker when clicked.
 * @function handleButtonBlur - Handles the blur event on the button.
 * @function focus - Focuses the picker.
 * @function handleHelperFocus - Handles the focus event on the helper element.
 * @function handleChange - Handles the change event on the menu.
 * @function handleButtonFocus - Handles the focus event on the button.
 * @function handleKeydown - Handles the keydown event on the picker.
 * @function setValueFromItem - Sets the value from the selected item.
 * @function setMenuItemSelected - Sets the selected state of a menu item.
 * @function toggle - Toggles the open state of the picker.
 * @function close - Closes the picker.
 * @function get containerStyles - Gets the styles for the container.
 * @function handleTooltipSlotchange - Handles the slotchange event on the tooltip.
 * @function handleSlottableRequest - Handles the slottable request event.
 * @function renderLabelContent - Renders the label content.
 * @function get buttonContent - Gets the content for the button.
 * @function applyFocusElementLabel - Applies the focus element label.
 * @function renderOverlay - Renders the overlay.
 * @function get renderDescriptionSlot - Gets the description slot.
 * @function render - Renders the picker.
 * @function update - Updates the picker.
 * @function bindButtonKeydownListener - Binds the keydown listener to the button.
 * @function updated - Called when the picker is updated.
 * @function firstUpdated - Called when the picker is first updated.
 * @function get dismissHelper - Gets the dismiss helper.
 * @function renderContainer - Renders the container.
 * @function onScroll - Handles the scroll event.
 * @function get renderMenu - Gets the menu.
 * @function shouldScheduleManageSelection - Schedules the management of the selection.
 * @function shouldManageSelection - Manages the selection.
 * @function manageSelection - Manages the selection.
 * @function getUpdateComplete - Gets the update complete promise.
 * @function handleEnterKeydown - Handles the enter keydown event.
 * @function bindEvents - Binds events to the picker.
 * @function connectedCallback - Called when the picker is connected to the DOM.
 * @function disconnectedCallback - Called when the picker is disconnected from the DOM.
 *
 * @property {MatchMediaController} isMobile - Indicates if the component is being viewed on a mobile device.
 * @property {DesktopController | MobileController} strategy - The strategy used for handling the Picker's behavior on different devices.
 * @property {string} [appliedLabel] - The applied label for the picker.
 * @property {HTMLButtonElement} button - The button element associated with the picker.
 * @property {DependencyManagerController} dependencyManager - Manages dependencies for the picker.
 * @property {Menu | null} deprecatedMenu - A deprecated menu element.
 * @property {boolean} disabled - Indicates if the picker is disabled.
 * @property {boolean} focused - Indicates if the picker is focused.
 * @property {'only' | 'none'} [icons] - Defines the icon display mode for the picker.
 * @property {boolean} invalid - Indicates if the picker is in an invalid state.
 * @property {boolean} pending - Indicates if the items are currently loading.
 * @property {string} pendingLabel - Defines a string value that labels the picker while it is in pending state.
 * @property {string} [label] - The label for the picker.
 * @property {boolean} open - Indicates if the picker is open.
 * @property {boolean} readonly - Indicates if the picker is in a read-only state.
 * @property {'single'} [selects] - Defines the selection mode for the picker.
 * @property {'inline'} [labelAlignment] - Specifies the alignment of the label, with 'inline' aligning the label next to the picker.
 * @property {MenuItem[]} menuItems - An array of menu items that are available for selection in the picker.
 * @property {Menu} optionsMenu - The options menu element.
 * @property {boolean} _selfManageFocusElement - Indicates if the picker manages its own focus element.
 * @property {boolean} selfManageFocusElement - Gets the value of `_selfManageFocusElement`.
 * @property {Overlay} overlayElement - The overlay element for the picker.
 * @property {Tooltip} [tooltipEl] - The tooltip element for the picker.
 * @property {Placement} placement - Defines the placement of the picker's overlay.
 * @property {boolean} quiet - Indicates if the picker should be rendered in a quiet style.
 * @property {string} value - The currently selected value of the picker.
 * @property {MenuItem | undefined} selectedItem - Gets the selected item of the picker.
 * @property {PendingStateController<this>} pendingStateController - Manages the pending state of the picker.
 * @property {MenuItem | undefined} _selectedItem - The selected item of the picker.
 * @property {'listbox' | 'menu'} listRole - Specifies the role attribute for the list element, which can be either 'listbox' or 'menu'.
 * @property {'option'} itemRole - Specifies the role attribute for the item element, which can be 'option'.
 * @property {HTMLElement} focusElement - Gets the focus element of the picker.
 * @property {MenuItemChildren} selectedItemContent - Gets the content of the selected item.
 * @property {MenuItemChildren | undefined} _selectedItemContent - The content of the selected item.
 * @property {boolean} hasRenderedOverlay - Indicates if the overlay has been rendered.
 * @property {boolean} willManageSelection - Indicates if the selection will be managed.
 * @property {Promise<void>} selectionPromise - A promise that resolves when the selection is managed.
 * @property {() => void} selectionResolver - A resolver function for the selection promise.
 * @property {boolean} recentlyConnected - Indicates if the picker was recently connected.
 * @property {EventTarget | null} enterKeydownOn - The target of the enter keydown event.
 *
 * @fires change - Dispatched when the value of the picker changes.
 * @fires scroll - Dispatched when the picker is scrolled.
 * @fires keydown - Dispatched when a keydown event occurs on the picker.
 */
export class PickerBase extends SizedMixin(Focusable, { noDefaultSize: true }) {
  /**
   * Indicates if the component is being viewed on a mobile device.
   */
  public isMobile = new MatchMediaController(this, IS_MOBILE);

  /**
   * The strategy used for handling the components's behavior on different devices.
   */
  public strategy!: DesktopController | MobileController;

  /**
   * The label that is applied to the component.
   */
  @state()
  appliedLabel?: string;

  /**
   * The button element associated with the component.
   */
  @query('#button')
  public button!: HTMLButtonElement;

  /**
   * Manages dependencies for the component.
   */
  public dependencyManager = new DependencyManagerController(this);

  /**
   * The deprecated menu element.
   */
  private deprecatedMenu: Menu | null = null;

  /**
   * Indicates if the component is disabled.
   */
  @property({ type: Boolean, reflect: true })
  public override disabled = false;

  /**
   * Indicates if the component is focused.
   */
  @property({ type: Boolean, reflect: true })
  public focused = false;

  /**
   * Defines the icon display mode for the component.
   * - `only`: Only icons are displayed.
   * - `none`: No icons are displayed.
   */
  @property({ type: String, reflect: true })
  public icons?: 'only' | 'none';

  /**
   * Indicates if the component is in an invalid state.
   */
  @property({ type: Boolean, reflect: true })
  public invalid = false;

  /**
   * Whether the items are currently loading.
   */
  @property({ type: Boolean, reflect: true })
  public pending = false;

  /**
   * Defines a string value that labels the component while it is in pending state.
   */
  @property({ type: String, attribute: 'pending-label' })
  public pendingLabel = 'Pending';

  /**
   * The `aria-label` for the component.
   */
  @property()
  public label?: string;

  /**
   * Indicates if the component is open.
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /**
   * Indicates if the component is in a read-only state.
   */
  @property({ type: Boolean, reflect: true })
  public readonly = false;

  /**
   * Defines the selection mode for the component.
   */
  @property({ type: String })
  public selects: undefined | 'single' = 'single';

  /**
   * Specifies the alignment of the label, with 'inline' aligning the label next to the component.
   */
  @state()
  public labelAlignment?: 'inline';

  /**
   * An array of menu items that are available for selection in the component.
   */
  protected get menuItems(): MenuItem[] {
    return this.optionsMenu.childItems;
  }

  /**
   * The options menu element.
   */
  @query('sp-menu')
  public optionsMenu!: Menu;

  private _selfManageFocusElement = false;

  /**
   * Indicates if the component manages its own focus element.
   */
  public override get selfManageFocusElement(): boolean {
    return this._selfManageFocusElement;
  }

  /**
   * The overlay element for the component.
   */
  @query('sp-overlay')
  public overlayElement!: Overlay;

  protected tooltipEl?: Tooltip;

  /**
   * Defines the placement of the Picker's overlay.
   * Possible values: "top", "top-start", "top-end", "right", "right-start", "right-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end".
   */
  @property()
  public placement: Placement = 'bottom-start';

  /**
   * Indicates if the Picker should be rendered in a quiet style.
   */
  @property({ type: Boolean, reflect: true })
  public quiet = false;

  /**
   * The currently selected value of the component.
   */
  @property({ type: String })
  public value = '';

  /**
   * The `PendingStateController` manages the pending state of the component.
   */
  public pendingStateController: PendingStateController<this>;

  /**
   * Initializes the `PendingStateController` for the component.
   */
  constructor() {
    super();
    this.pendingStateController = new PendingStateController(this);
  }

  /**
   * The selected item of the component.
   */
  @property({ attribute: false })
  public get selectedItem(): MenuItem | undefined {
    return this._selectedItem;
  }

  public set selectedItem(selectedItem: MenuItem | undefined) {
    this.selectedItemContent = selectedItem
      ? selectedItem.itemChildren
      : undefined;

    if (selectedItem === this.selectedItem) return;

    const oldSelectedItem = this.selectedItem;

    this._selectedItem = selectedItem;
    this.requestUpdate('selectedItem', oldSelectedItem);
  }

  /**
   * @private
   */
  _selectedItem?: MenuItem;

  protected listRole: 'listbox' | 'menu' = 'listbox';

  protected itemRole = 'option';

  public override get focusElement(): HTMLElement {
    if (this.open) {
      return this.optionsMenu;
    }

    return this.button;
  }

  public forceFocusVisible(): void {
    if (this.disabled) {
      return;
    }

    this.focused = true;
  }

  public override click(): void {
    if (this.disabled) {
      return;
    }

    this.toggle();
  }

  public handleButtonBlur(): void {
    this.focused = false;
  }

  public override focus(options?: FocusOptions): void {
    super.focus(options);

    if (!this.disabled && this.focusElement) {
      this.focused = this.hasVisibleFocusInTree();
    }
  }

  public handleHelperFocus(): void {
    // set focused to true here instead of handleButtonFocus so clicks don't flash a focus outline
    this.focused = true;
    this.button.focus();
  }

  public handleChange(event: Event): void {
    if (this.strategy) {
      this.strategy.preventNextToggle = 'no';
    }

    const target = event.target as Menu;
    const [selected] = target.selectedItems;

    event.stopPropagation();

    if (event.cancelable) {
      this.setValueFromItem(selected, event);
    } else {
      // Non-cancelable "change" events announce a selection with no value
      // change that should close the Picker element.
      this.open = false;

      if (this.strategy) {
        this.strategy.open = false;
      }
    }
  }

  public handleButtonFocus(event: FocusEvent): void {
    this.strategy?.handleButtonFocus(event);
  }

  protected handleKeydown = (event: KeyboardEvent): void => {
    this.focused = true;

    if (event.code !== 'ArrowDown' && event.code !== 'ArrowUp') {
      return;
    }

    event.stopPropagation();
    event.preventDefault();
    this.toggle(true);
  };

  protected async setValueFromItem(
    item: MenuItem,
    menuChangeEvent?: Event
  ): Promise<void> {
    this.open = false;

    // should always close when "setting" a value
    if (this.strategy) {
      this.strategy.open = false;
    }

    const oldSelectedItem = this.selectedItem;
    const oldValue = this.value;

    // Set a value.
    this.selectedItem = item;
    this.value = item?.value ?? '';
    await this.updateComplete;
    const applyDefault = this.dispatchEvent(
      new Event('change', {
        bubbles: true,
        // Allow it to be prevented.
        cancelable: true,
        composed: true,
      })
    );

    if (!applyDefault && this.selects) {
      if (menuChangeEvent) {
        menuChangeEvent.preventDefault();
      }

      this.setMenuItemSelected(this.selectedItem as MenuItem, false);

      if (oldSelectedItem) {
        this.setMenuItemSelected(oldSelectedItem, true);
      }

      this.selectedItem = oldSelectedItem;
      this.value = oldValue;
      this.open = true;

      if (this.strategy) {
        this.strategy.open = true;
      }

      return;
    } else if (!this.selects) {
      // Unset the value if not carrying a selection
      this.selectedItem = oldSelectedItem;
      this.value = oldValue;

      return;
    }

    if (oldSelectedItem) {
      this.setMenuItemSelected(oldSelectedItem, false);
    }

    this.setMenuItemSelected(item, !!this.selects);
  }

  protected setMenuItemSelected(item: MenuItem, value: boolean): void {
    // matches null | undefined
    if (this.selects == null) return;

    item.selected = value;
  }

  /**
   * Toggles the open state of the component.
   */
  public toggle(target?: boolean): void {
    if (this.readonly || this.pending) {
      return;
    }

    this.open = typeof target !== 'undefined' ? target : !this.open;

    if (this.strategy) {
      this.strategy.open = this.open;
    }

    if (this.open) {
      this._selfManageFocusElement = true;
    } else {
      this._selfManageFocusElement = false;
    }
  }

  /**
   * Closes the component.
   */
  public close(): void {
    if (this.readonly) {
      return;
    }

    if (this.strategy) {
      this.open = false;
      this.strategy.open = false;
    }
  }

  protected get containerStyles(): StyleInfo {
    /** @todo test in mobile */
    if (this.isMobile.matches) {
      return {
        '--swc-menu-width': '100%',
      };
    }

    return {};
  }

  @state()
  protected get selectedItemContent(): MenuItemChildren {
    return this._selectedItemContent || { icon: [], content: [] };
  }

  protected set selectedItemContent(
    selectedItemContent: MenuItemChildren | undefined
  ) {
    if (selectedItemContent === this.selectedItemContent) return;

    const oldContent = this.selectedItemContent;

    this._selectedItemContent = selectedItemContent;
    this.requestUpdate('selectedItemContent', oldContent);
  }

  /**
   * @private
   */
  _selectedItemContent?: MenuItemChildren;

  protected handleTooltipSlotchange(
    event: Event & { target: HTMLSlotElement }
  ): void {
    this.tooltipEl = event.target.assignedElements()[0] as Tooltip | undefined;
  }

  public handleSlottableRequest = (_event: SlottableRequestEvent): void => {};

  protected renderLabelContent(content: Node[]): TemplateResult | Node[] {
    if (this.value && this.selectedItem) {
      return content;
    }

    return html`
      <slot name="label" id="label">
        <span
          aria-hidden="${ifDefined(this.appliedLabel ? undefined : 'true')}"
        >
          ${this.label}
        </span>
      </slot>
    `;
  }

  protected get buttonContent(): TemplateResult[] {
    const labelClasses = {
      'visually-hidden': this.icons === 'only' && !!this.value,
      placeholder: !this.value,
      label: true,
    };
    const appliedLabel = this.appliedLabel || this.label;

    return [
      html`
        <span id="icon" ?hidden="${this.icons === 'none'}">
          ${this.selectedItemContent.icon}
        </span>
        <span
          id="${ifDefined(
            this.value && this.selectedItem ? 'label' : undefined
          )}"
          class="${classMap(labelClasses)}"
        >
          ${this.renderLabelContent(this.selectedItemContent.content)}
        </span>
        ${this.value && this.selectedItem
          ? html`
              <span
                aria-hidden="true"
                class="visually-hidden"
                id="applied-label"
              >
                ${appliedLabel}
                <slot name="label"></slot>
              </span>
            `
          : html`
              <span hidden id="applied-label">${appliedLabel}</span>
            `}
        ${this.invalid && !this.pending
          ? html`
              <sp-icon-alert class="validation-icon"></sp-icon-alert>
            `
          : nothing}
        ${this.pendingStateController.renderPendingState()}
        <sp-icon-chevron100
          class="picker ${chevronClass[this.size as DefaultElementSize]}"
        ></sp-icon-chevron100>
        <slot
          aria-hidden="true"
          name="tooltip"
          id="tooltip"
          @slotchange="${this.handleTooltipSlotchange}"
        ></slot>
      `,
    ];
  }

  applyFocusElementLabel = (value: string, labelElement: FieldLabel): void => {
    this.appliedLabel = value;
    this.labelAlignment = labelElement.sideAligned ? 'inline' : undefined;
  };

  protected renderOverlay(menu: TemplateResult): TemplateResult {
    if (this.strategy?.overlay === undefined) {
      return menu;
    }

    const container = this.renderContainer(menu);

    render(container, this.strategy?.overlay as unknown as HTMLElement, {
      host: this,
    });

    return this.strategy?.overlay as unknown as TemplateResult;
  }

  protected get renderDescriptionSlot(): TemplateResult {
    return html`
      <div id="${DESCRIPTION_ID}">
        <slot name="description"></slot>
      </div>
    `;
  }
  // a helper to throw focus to the button is needed because Safari
  // won't include buttons in the tab order even with tabindex="0"
  protected override render(): TemplateResult {
    if (this.tooltipEl) {
      this.tooltipEl.disabled = this.open;
    }

    return html`
      <span
        id="focus-helper"
        tabindex="${this.focused || this.open ? '-1' : '0'}"
        @focus="${this.handleHelperFocus}"
        aria-describedby="${DESCRIPTION_ID}"
      ></span>
      <button
        aria-controls="${ifDefined(this.open ? 'menu' : undefined)}"
        aria-describedby="tooltip"
        aria-expanded="${this.open ? 'true' : 'false'}"
        aria-haspopup="true"
        aria-labelledby="loader icon label applied-label"
        id="button"
        class="${ifDefined(
          this.labelAlignment ? `label-${this.labelAlignment}` : undefined
        )}"
        @blur="${this.handleButtonBlur}"
        @keydown="${{
          handleEvent: this.handleEnterKeydown,
          capture: true,
        }}"
        ?disabled="${this.disabled}"
        tabindex="-1"
      >
        ${this.buttonContent}
      </button>
      ${this.renderMenu} ${this.renderDescriptionSlot}
    `;
  }

  protected override update(changes: PropertyValues<this>): void {
    if (this.selects) {
      // Always force `selects` to "single" when set.
      // TODO: Add support functionally and visually for "multiple"
      this.selects = 'single';
    }

    if (changes.has('disabled') && this.disabled) {
      if (this.strategy) {
        this.open = false;
        this.strategy.open = false;
      }
    }

    if (changes.has('pending') && this.pending) {
      if (this.strategy) {
        this.open = false;
        this.strategy.open = false;
      }
    }

    if (changes.has('value')) {
      // MenuItems update a frame late for <slot> management,
      // await the same here.
      this.shouldScheduleManageSelection();
    }

    // Maybe it's finally time to remove this support?
    if (!this.hasUpdated) {
      this.deprecatedMenu = this.querySelector(':scope > sp-menu');
      this.deprecatedMenu?.toggleAttribute('ignore', true);
      this.deprecatedMenu?.setAttribute('selects', 'inherit');
    }

    if (window.__swc.DEBUG) {
      if (!this.hasUpdated && this.querySelector(':scope > sp-menu')) {
        const { localName } = this;

        window.__swc.warn(
          this,
          `You no longer need to provide an <sp-menu> child to ${localName}. Any styling or attributes on the <sp-menu> will be ignored.`,
          'https://opensource.adobe.com/spectrum-web-components/components/picker/#sizes',
          { level: 'deprecation' }
        );
      }

      this.updateComplete.then(async () => {
        // Attributes should be user supplied, making them available before first update.
        // However, `appliesLabel` is applied by external elements that must be update complete as well to be bound appropriately.
        await new Promise((res) => requestAnimationFrame(res));
        await new Promise((res) => requestAnimationFrame(res));

        if (
          !this.label &&
          !this.getAttribute('aria-label') &&
          !this.getAttribute('aria-labelledby') &&
          !this.appliedLabel
        ) {
          window.__swc.warn(
            this,
            `<${this.localName}> needs one of the following to be accessible:`,
            'https://opensource.adobe.com/spectrum-web-components/components/picker/#accessibility',
            {
              type: 'accessibility',
              issues: [
                `an <sp-field-label> element with a \`for\` attribute referencing the \`id\` of the \`<${this.localName}>\`, or`,
                'value supplied to the "label" attribute, which will be displayed visually as placeholder text, or',
                'text content supplied in a <span> with slot="label", which will also be displayed visually as placeholder text.',
              ],
            }
          );
        }
      });
    }

    super.update(changes);
  }

  protected bindButtonKeydownListener(): void {
    this.button.addEventListener('keydown', this.handleKeydown);
  }

  protected override updated(changes: PropertyValues<this>): void {
    super.updated(changes);

    if (changes.has('open')) {
      this.strategy.open = this.open;
    }
  }

  protected override firstUpdated(changes: PropertyValues<this>): void {
    super.firstUpdated(changes);
    this.bindButtonKeydownListener();
    this.bindEvents();
  }

  protected get dismissHelper(): TemplateResult {
    return html`
      <div class="visually-hidden">
        <button
          tabindex="-1"
          aria-label="Dismiss"
          @click="${this.close}"
        ></button>
      </div>
    `;
  }

  protected renderContainer(menu: TemplateResult): TemplateResult {
    const accessibleMenu = html`
      ${this.dismissHelper} ${menu} ${this.dismissHelper}
    `;

    /** @todo test in mobile */
    if (this.isMobile.matches) {
      this.dependencyManager.add('sp-tray');
      import('@spectrum-web-components/tray/sp-tray.js');

      return html`
        <sp-tray
          id="popover"
          role="presentation"
          style="${styleMap(this.containerStyles)}"
        >
          ${accessibleMenu}
        </sp-tray>
      `;
    }

    this.dependencyManager.add('sp-popover');
    import('@spectrum-web-components/popover/sp-popover.js');

    return html`
      <sp-popover
        id="popover"
        role="presentation"
        style="${styleMap(this.containerStyles)}"
        placement="${this.placement}"
      >
        ${accessibleMenu}
      </sp-popover>
    `;
  }

  protected hasRenderedOverlay = false;

  /**
   * Dispatches the the scroll event.
   */
  private onScroll(): void {
    this.dispatchEvent(
      new Event('scroll', {
        cancelable: true,
        composed: true,
      })
    );
  }

  protected get renderMenu(): TemplateResult {
    const menu = html`
      <sp-menu
        aria-labelledby="applied-label"
        @change="${this.handleChange}"
        id="menu"
        @keydown="${{
          handleEvent: this.handleEnterKeydown,
          capture: true,
        }}"
        @scroll="${this.onScroll}"
        role="${this.listRole}"
        .selects="${this.selects}"
        .selected="${this.value ? [this.value] : []}"
        size="${this.size}"
        @sp-menu-item-added-or-updated="${this.shouldManageSelection}"
      >
        <slot @slotchange="${this.shouldScheduleManageSelection}"></slot>
      </sp-menu>
    `;

    this.hasRenderedOverlay =
      this.hasRenderedOverlay ||
      this.focused ||
      this.open ||
      !!this.deprecatedMenu;

    if (this.hasRenderedOverlay) {
      if (this.dependencyManager.loaded) {
        this.dependencyManager.add('sp-overlay');
      }

      return this.renderOverlay(menu);
    }

    return menu;
  }

  private willManageSelection = false;

  protected shouldScheduleManageSelection(event?: Event): void {
    if (
      !this.willManageSelection &&
      (!event ||
        ((event.target as HTMLElement).getRootNode() as ShadowRoot).host ===
          this)
    ) {
      this.willManageSelection = true;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.manageSelection();
        });
      });
    }
  }

  protected shouldManageSelection(): void {
    if (this.willManageSelection) {
      return;
    }

    this.willManageSelection = true;
    this.manageSelection();
  }

  protected async manageSelection(): Promise<void> {
    if (this.selects == null) return;

    this.selectionPromise = new Promise(
      (res) => (this.selectionResolver = res)
    );
    let selectedItem: MenuItem | undefined;

    await this.optionsMenu.updateComplete;

    if (this.recentlyConnected) {
      // Work around for attach timing differences in Safari and Firefox.
      // Remove when refactoring to Menu passthrough wrapper.
      await new Promise((res) => requestAnimationFrame(() => res(true)));
      this.recentlyConnected = false;
    }

    this.menuItems.forEach((item) => {
      if (this.value === item.value && !item.disabled) {
        selectedItem = item;
      } else {
        item.selected = false;
      }
    });

    if (selectedItem) {
      selectedItem.selected = !!this.selects;
      this.selectedItem = selectedItem;
    } else {
      this.value = '';
      this.selectedItem = undefined;
    }

    if (this.open) {
      await this.optionsMenu.updateComplete;
      this.optionsMenu.updateSelectedItemIndex();
    }

    this.selectionResolver();
    this.willManageSelection = false;
  }

  private selectionPromise = Promise.resolve();
  private selectionResolver!: () => void;

  protected override async getUpdateComplete(): Promise<boolean> {
    const complete = (await super.getUpdateComplete()) as boolean;

    await this.selectionPromise;

    // if (this.overlayElement) {
    //     await this.overlayElement.updateComplete;
    // }
    return complete;
  }

  private recentlyConnected = false;

  private enterKeydownOn: EventTarget | null = null;

  protected handleEnterKeydown = (event: KeyboardEvent): void => {
    if (event.code !== 'Enter') {
      return;
    }

    if (this.enterKeydownOn) {
      event.preventDefault();

      return;
    }

    this.enterKeydownOn = event.target;
    this.addEventListener(
      'keyup',
      async (keyupEvent: KeyboardEvent) => {
        if (keyupEvent.code !== 'Enter') {
          return;
        }

        this.enterKeydownOn = null;
      },
      { once: true }
    );
  };

  public bindEvents(): void {
    this.strategy?.abort();

    if (this.isMobile.matches) {
      this.strategy = new strategies['mobile'](this.button, this);
    } else {
      this.strategy = new strategies['desktop'](this.button, this);
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.recentlyConnected = this.hasUpdated;
  }

  public override disconnectedCallback(): void {
    this.close();
    this.strategy?.releaseDescription();
    super.disconnectedCallback();
  }
}

/**
 * @element sp-picker
 *
 * @slot label - The placeholder content for the Picker
 * @slot description - The description content for the Picker
 * @slot tooltip - Tooltip to to be applied to the the Picker Button
 * @slot default - menu items to be listed in the Picker
 *
 * @fires change - Announces that the `value` of the element has changed
 * @fires sp-opened - Announces that the overlay has been opened
 * @fires sp-closed - Announces that the overlay has been closed
 */
export class Picker extends PickerBase {
  public static override get styles(): CSSResultArray {
    return [pickerStyles, chevronStyles, chevronIconOverrides];
  }

  protected override get containerStyles(): StyleInfo {
    const styles = super.containerStyles;

    if (!this.quiet) {
      styles['min-width'] = `${this.offsetWidth}px`;
    }

    return styles;
  }

  protected override handleKeydown = (event: KeyboardEvent): void => {
    const { code } = event;

    this.focused = true;

    if (!code.startsWith('Arrow') || this.readonly || this.pending) {
      return;
    }

    if (code === 'ArrowUp' || code === 'ArrowDown') {
      this.toggle(true);
      event.preventDefault();

      return;
    }

    event.preventDefault();
    const selectedIndex = this.selectedItem
      ? this.menuItems.indexOf(this.selectedItem)
      : -1;
    // use a positive offset to find the first non-disabled item when no selection is available.
    const nextOffset = selectedIndex < 0 || code === 'ArrowRight' ? 1 : -1;
    let nextIndex = selectedIndex + nextOffset;

    while (this.menuItems[nextIndex] && this.menuItems[nextIndex].disabled) {
      nextIndex += nextOffset;
    }

    if (!this.menuItems[nextIndex] || this.menuItems[nextIndex].disabled) {
      return;
    }

    if (!this.value || nextIndex !== selectedIndex) {
      this.setValueFromItem(this.menuItems[nextIndex]);
    }
  };
}
