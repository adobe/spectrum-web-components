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

import {
  CSSResultArray,
  DefaultElementSize,
  html,
  nothing,
  PropertyValues,
  SizedMixin,
  SpectrumElement,
  TemplateResult,
} from '@spectrum-web-components/base';
import {
  property,
  query,
  state,
} from '@spectrum-web-components/base/src/decorators.js';
import {
  classMap,
  ifDefined,
  StyleInfo,
  styleMap,
} from '@spectrum-web-components/base/src/directives.js';
import type { FieldLabel } from '@spectrum-web-components/field-label';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import type {
  Menu,
  MenuItem,
  MenuItemChildren,
  MenuItemKeydownEvent,
} from '@spectrum-web-components/menu';
import { Placement } from '@spectrum-web-components/overlay';
import { Overlay } from '@spectrum-web-components/overlay/src/Overlay.js';
import type { SlottableRequestEvent } from '@spectrum-web-components/overlay/src/slottable-request-event.js';
import { DependencyManagerController } from '@spectrum-web-components/reactive-controllers/src/DependencyManger.js';
import {
  IS_MOBILE,
  IS_TOUCH_DEVICE,
  MatchMediaController,
} from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';
import type { Tooltip } from '@spectrum-web-components/tooltip';

import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/menu/sp-menu.js';

import { DesktopController } from './DesktopController.js';
import { MobileController } from './MobileController.js';
import pickerStyles from './picker.css.js';
import { strategies } from './strategies.js';

const chevronClass = {
  s: 'spectrum-UIIcon-ChevronDown75',
  m: 'spectrum-UIIcon-ChevronDown100',
  l: 'spectrum-UIIcon-ChevronDown200',
  xl: 'spectrum-UIIcon-ChevronDown300',
};

export const DESCRIPTION_ID = 'option-picker';

/**
 * Base class for expandable picker-like components with overlay functionality.
 * Provides common properties and methods for managing an overlay menu,
 * device-specific interaction strategies, and focus management.
 *
 * Extended by Picker, ActionMenu, and other components that display
 * a menu overlay triggered by a button.
 */
export class ExpandableElement extends SpectrumElement {
  /**
   * Shadow root configuration with delegatesFocus enabled.
   * Allows focus to be delegated to focusable children within the shadow root.
   */
  static override shadowRootOptions = {
    ...SpectrumElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** Controller that tracks whether the device is mobile. */
  public isMobile = new MatchMediaController(this, IS_MOBILE);

  /** Controller that tracks whether the device supports touch input. */
  public isTouchDevice = new MatchMediaController(this, IS_TOUCH_DEVICE);

  /** The interaction strategy controller (desktop or mobile) managing pointer and keyboard events. */
  public strategy!: DesktopController | MobileController;

  /** Reference to the component's trigger button element. */
  @query('#button')
  public button!: HTMLButtonElement;

  /** Controller that manages lazy-loading of overlay dependencies. */
  public dependencyManager = new DependencyManagerController(this);

  /** Whether the component is disabled. When disabled, the component cannot be interacted with. */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /** Whether the component currently has visible focus. */
  @property({ type: Boolean, reflect: true })
  public focused = false;

  /** Whether the component is read-only. When read-only, the component displays its value but cannot be changed. */
  @property({ type: Boolean, reflect: true })
  public readonly = false;

  /** Whether the items are currently loading. */
  @property({ type: Boolean, reflect: true })
  public pending = false;

  /**
   * Forces the component to render as a popover on mobile instead of a tray.
   */
  @property({ type: Boolean, reflect: true, attribute: 'force-popover' })
  public forcePopover = false;

  /** Whether the component's menu overlay is currently open. */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /** Reference to the component's internal menu element. */
  @query('sp-menu')
  public optionsMenu!: Menu;

  /** Reference to the component's overlay element. */
  @query('sp-overlay')
  public overlayElement!: Overlay;

  /**
   * The preferred placement of the component's overlay relative to the trigger button.
   *
   * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"}
   * @attr
   */

  @property()
  public placement: Placement = 'bottom-start';

  /**
   * Returns the element that should receive focus.
   * When open, returns the options menu; otherwise returns the trigger button.
   */
  public get focusElement(): HTMLElement {
    if (this.open) {
      return this.optionsMenu;
    }
    return this.button;
  }

  /**
   * Focuses the appropriate element (button or menu) based on the picker's state.
   *
   * @param options - Standard focus options
   */
  public override focus(options?: FocusOptions): void {
    this.focusElement?.focus(options);
  }

  /**
   * Closes the component's overlay.
   * Has no effect when the component is readonly.
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

  /**
   * Toggles the component's open state.
   * Has no effect when the component is readonly, pending, or disabled.
   *
   * @param target - Optional explicit open state. If not provided, toggles the current state.
   */
  public toggle(target?: boolean): void {
    if (this.readonly || this.pending || this.disabled) {
      return;
    }
    const open = typeof target !== 'undefined' ? target : !this.open;

    this.open = open;
    if (this.strategy) {
      this.strategy.open = this.open;
    }
  }

  /**
   * Handles slottable request events from the overlay.
   * Override in subclasses to customize slottable behavior.
   *
   * @param _event - The slottable request event
   */
  public handleSlottableRequest = (_event: SlottableRequestEvent): void => {};

  /**
   * Handles the overlay's beforetoggle event.
   * Manages overlay state and prevents unwanted closures during interaction.
   *
   * @param event - The beforetoggle event with the new state
   */
  protected handleBeforetoggle = (
    event: Event & {
      target: Overlay;
      newState: 'open' | 'closed';
    }
  ): void => {
    if (event.composedPath()[0] !== event.target) {
      return;
    }
    if (event.newState === 'closed') {
      // Track if we should restore focus before the overlay fully closes.
      // This must happen now (in beforetoggle) because by the time sp-closed fires,
      // the overlay animation will be complete and focus will have moved elsewhere.
      const shouldRestoreFocus =
        this.optionsMenu?.matches(':focus-within') &&
        !this.button?.matches(':focus');

      // Handle three cases:
      // 1. open was already set to false externally (e.g., via setValueFromItem
      //    from a programmatic click) - allow overlay to close
      // 2. preventNextToggle is 'no' - normal close, set open to false
      // 3. Otherwise, prevent browser-driven closure while opening
      if (!this.open) {
        // Already closed externally, sync controller state if present
        if (this.strategy) {
          this.strategy.open = false;
        }
      } else if (this.strategy?.preventNextToggle === 'no') {
        this.open = false;
      } else if (!this.strategy?.pointerdownState) {
        // Prevent browser driven closure while opening the Picker
        // and the expected event series has not completed.
        this.overlayElement?.manuallyKeepOpen();
      }

      // Restore focus to the button if focus was in the menu.
      if (shouldRestoreFocus && !this.open) {
        this.button?.focus();
      }
    }
    if (!this.open) {
      this.optionsMenu?.updateSelectedItemIndex();
      this.optionsMenu?.closeDescendentOverlays();
    }
  };

  /**
   * Binds the appropriate interaction strategy (desktop or mobile) based on device type.
   * Aborts any existing strategy before creating a new one.
   */
  public bindEvents(): void {
    this.strategy?.abort();
    if (this.isMobile.matches) {
      this.strategy = new strategies['mobile'](
        this.button,
        this as ExpandableElement
      );
    } else {
      this.strategy = new strategies['desktop'](
        this.button,
        this as ExpandableElement
      );
    }
  }

  /**
   * Lifecycle callback when the element is disconnected from the DOM.
   * Closes the overlay and releases strategy resources.
   */
  public override disconnectedCallback(): void {
    this.close();
    this.strategy?.releaseDescription();
    super.disconnectedCallback();
  }
}

/**
 * @slot label - The placeholder content for the Picker
 * @slot description - The description content for the Picker
 * @slot tooltip - Tooltip to to be applied to the the Picker Button
 * @slot - menu items to be listed in the Picker
 * @fires change - Announces that the `value` of the element has changed
 * @fires sp-opened - Announces that the overlay has been opened
 * @fires sp-closed - Announces that the overlay has been closed
 * @deprecated This class is deprecated and will be removed in a future major release. Use the ExpandableElement base class instead.
 * @see https://opensource.adobe.com/spectrum-web-components/components/picker/#deprecation
 */
export class PickerBase extends SizedMixin(ExpandableElement, {
  noDefaultSize: true,
}) {
  /** The label applied to the picker, typically from an associated field label. */
  @state()
  appliedLabel?: string;

  private deprecatedMenu: Menu | null = null;

  /**
   * Controls how icons are displayed in the picker button.
   * - `'only'`: Shows only the icon, hiding the label visually.
   * - `'none'`: Hides the icon entirely.
   */
  @property({ type: String, reflect: true })
  public icons?: 'only' | 'none';

  /** Whether the picker is in an invalid state. Displays a validation icon when true. */
  @property({ type: Boolean, reflect: true })
  public invalid = false;

  /** Defines a string value that labels the Picker while it is in pending state. */
  @property({ type: String, attribute: 'pending-label' })
  public pendingLabel = 'Pending';

  /** The placeholder label displayed when no item is selected. */
  @property()
  public label?: string;

  /**
   * The selection mode for the picker's menu.
   * Always forced to `'single'` for standard picker behavior.
   */
  public selects: undefined | 'single' = 'single';

  /** The alignment of the associated label, set by an external field label component. */
  @state()
  public labelAlignment?: 'inline';

  /**
   * Returns the list of menu items contained in the picker's options menu.
   */
  protected get menuItems(): MenuItem[] {
    return this.optionsMenu.childItems;
  }

  /**
   * @deprecated This property always returns true and will be removed in a future version.
   */
  public get selfManageFocusElement(): boolean {
    return true;
  }

  /** Reference to the tooltip element, if one is slotted. */
  protected tooltipEl?: Tooltip;

  /** Whether to render the picker in quiet mode with minimal visual styling. */
  @property({ type: Boolean, reflect: true })
  public quiet = false;

  /** The current value of the picker, corresponding to the selected menu item's value. */
  @property({ type: String })
  public value = '';

  /**
   * The currently selected menu item, or undefined if no item is selected.
   */
  @property({ attribute: false })
  public get selectedItem(): MenuItem | undefined {
    return this._selectedItem;
  }

  public set selectedItem(selectedItem: MenuItem | undefined) {
    this.selectedItemContent = selectedItem
      ? selectedItem.itemChildren
      : undefined;

    if (selectedItem === this.selectedItem) {
      return;
    }
    const oldSelectedItem = this.selectedItem;
    this._selectedItem = selectedItem;
    this.requestUpdate('selectedItem', oldSelectedItem);
  }

  _selectedItem?: MenuItem;

  /** The ARIA role for the menu list element. */
  protected listRole: 'listbox' | 'menu' = 'listbox';

  /** The ARIA role for individual menu items. */
  protected itemRole = 'option';

  /**
   * Programmatically applies visible focus styling to the picker.
   * Has no effect when the picker is disabled.
   */
  public forceFocusVisible(): void {
    if (this.disabled) {
      return;
    }

    this.focused = true;
  }

  /**
   * Toggles the picker's open state when called programmatically.
   * Note: Pointer events are handled by the interaction controller.
   */
  public override click(): void {
    this.toggle();
  }

  /**
   * Handles click events on the trigger button.
   * Note: Pointer events are typically handled by the interaction controller;
   * this method is called when `this.button.click()` is invoked programmatically.
   */
  public handleButtonClick(): void {
    if (this.disabled) {
      return;
    }
    this.toggle();
  }

  /**
   * Handles blur events on the trigger button, removing focus styling.
   */
  public handleButtonBlur(): void {
    this.focused = false;
  }

  public override focus(options?: FocusOptions): void {
    this.focusElement?.focus(options);
  }

  /**
   * @deprecated Use `focus()` instead.
   * Focuses the picker button and applies focus styling.
   */
  public handleHelperFocus(): void {
    // set focused to true here instead of handleButtonFocus so clicks don't flash a focus outline
    this.focused = true;
    this.button.focus();
  }

  /**
   * Handles focus events on the picker, applying visible focus styling
   * only when focus is visible in the tree.
   */
  public handleFocus(): void {
    if (!this.disabled && this.focusElement) {
      this.focused = this.hasVisibleFocusInTree();
    }
  }

  /**
   * Handles change events from the menu, updating the selected value.
   * Dispatches a `change` event that can be prevented to cancel the selection.
   *
   * @param event - The change event from the menu
   */
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

  /**
   * Handles focus events on the trigger button, delegating to the interaction strategy.
   *
   * @param event - The focus event
   */
  public handleButtonFocus(event: FocusEvent): void {
    this.strategy?.handleButtonFocus(event);
  }

  /**
   * Handles Escape key press to close the picker overlay.
   *
   * @param event - The keyboard event
   */
  protected handleEscape = (
    event: MenuItemKeydownEvent | KeyboardEvent
  ): void => {
    if (event.key === 'Escape' && this.open) {
      event.stopPropagation();
      event.preventDefault();
      this.toggle(false);
    }
  };

  /**
   * Handles keyboard navigation on the picker button.
   * Opens the menu on Arrow keys, Enter, or Space.
   *
   * @param event - The keyboard event
   */
  protected handleKeydown = (event: KeyboardEvent): void => {
    this.focused = true;
    if (!['ArrowUp', 'ArrowDown', 'Enter', ' ', 'Escape'].includes(event.key)) {
      return;
    }
    if (event.key === 'Escape') {
      this.handleEscape(event);
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    this.keyboardOpen();
  };

  /**
   * Opens the picker via keyboard interaction and focuses the first selected item.
   * If already open, focuses the first selected item in the menu.
   */
  protected async keyboardOpen(): Promise<void> {
    // if the menu is not open, we need to toggle it and wait for it to open to focus on the first selected item
    if (!this.open || !this.strategy.open) {
      this.addEventListener(
        'sp-opened',
        () => this.optionsMenu?.focusOnFirstSelectedItem(),
        {
          once: true,
        }
      );
      this.toggle(true);
    } else {
      // if the menu is already open, we need to focus on the first selected item
      this.optionsMenu?.focusOnFirstSelectedItem();
    }
  }

  /**
   * Sets the picker's value from a menu item selection.
   * Dispatches a cancelable `change` event and reverts the selection if prevented.
   *
   * @param item - The menu item to select
   * @param menuChangeEvent - The original menu change event, if any
   */
  protected async setValueFromItem(
    item: MenuItem,
    menuChangeEvent?: Event
  ): Promise<void> {
    this.open = false;
    // should always close when "setting" a value
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

  /**
   * Updates the selected state of a menu item.
   *
   * @param item - The menu item to update
   * @param value - Whether the item should be selected
   */
  protected setMenuItemSelected(item: MenuItem, value: boolean): void {
    // matches null | undefined
    if (this.selects == null) {
      return;
    }
    item.selected = value;
  }

  /**
   * Returns inline styles for the overlay container.
   * On mobile, sets full width; on desktop, returns empty styles.
   */
  protected get containerStyles(): StyleInfo {
    // @todo: test in mobile
    /* c8 ignore next 5 */
    if (this.isMobile.matches) {
      return {
        '--swc-menu-width': '100%',
      };
    }
    return {};
  }

  /**
   * The content (icon and text) of the currently selected menu item.
   * Used to render the selected item's display in the picker button.
   */
  @state()
  protected get selectedItemContent(): MenuItemChildren {
    return this._selectedItemContent || { icon: [], content: [] };
  }

  protected set selectedItemContent(
    selectedItemContent: MenuItemChildren | undefined
  ) {
    if (selectedItemContent === this.selectedItemContent) {
      return;
    }

    const oldContent = this.selectedItemContent;
    this._selectedItemContent = selectedItemContent;
    this.requestUpdate('selectedItemContent', oldContent);
  }

  _selectedItemContent?: MenuItemChildren;

  /**
   * Handles slotchange events for the tooltip slot.
   * Sets up the trigger element for self-managed tooltips.
   *
   * @param event - The slotchange event
   */
  protected handleTooltipSlotchange(
    event: Event & { target: HTMLSlotElement }
  ): void {
    this.tooltipEl = event.target.assignedElements()[0] as Tooltip | undefined;

    // Set up trigger element for self-managed tooltips
    if (this.tooltipEl?.selfManaged) {
      // Wait for the tooltip to be fully initialized
      this.updateComplete.then(() => {
        if (this.tooltipEl?.overlayElement && this.button) {
          this.tooltipEl.overlayElement.triggerElement = this.button;
        }
      });
    }
  }

  /**
   * Renders the label content for the picker button.
   * Shows the selected item's content if available, otherwise renders the placeholder label.
   *
   * @param content - The content nodes from the selected item
   * @returns The rendered label content
   */
  protected renderLabelContent(content: Node[]): TemplateResult | Node[] {
    if (this.value && this.selectedItem) {
      return content;
    }
    return html`
      <slot name="label" id="label">
        <span aria-hidden=${ifDefined(this.appliedLabel ? undefined : 'true')}>
          ${this.label}
        </span>
      </slot>
    `;
  }

  /**
   * Renders the loading indicator shown during pending state.
   * Dynamically imports the progress-circle component.
   *
   * @returns The rendered progress circle template
   */
  protected renderLoader(): TemplateResult {
    import('@spectrum-web-components/progress-circle/sp-progress-circle.js');
    return html`
      <sp-progress-circle
        size="s"
        indeterminate
        role="presentation"
        class="progress-circle"
      ></sp-progress-circle>
    `;
  }

  /**
   * Returns the content to render inside the picker button,
   * including the icon, label, validation icon, and chevron.
   */
  protected get buttonContent(): TemplateResult[] {
    const labelClasses = {
      'visually-hidden': this.icons === 'only' && !!this.value,
      placeholder: !this.value,
      label: true,
    };
    const appliedLabel = this.appliedLabel || this.label;
    return [
      html`
        <span id="icon" ?hidden=${this.icons === 'none'}>
          ${this.selectedItemContent.icon}
        </span>
        <span
          id=${ifDefined(this.value && this.selectedItem ? 'label' : undefined)}
          class=${classMap(labelClasses)}
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
        ${this.pending
          ? html`
              ${this.renderLoader()}
              <span
                aria-hidden="true"
                class="visually-hidden"
                id="pending-label"
              >
                ${this.pendingLabel}
              </span>
            `
          : nothing}
        <sp-icon-chevron100
          class="picker ${chevronClass[this.size as DefaultElementSize]}"
        ></sp-icon-chevron100>
      `,
    ];
  }

  /**
   * Callback invoked by an associated field label to apply its label value.
   * Sets the applied label and determines label alignment based on the field label's configuration.
   *
   * @param value - The label text value
   * @param labelElement - The field label element providing the label
   */
  applyFocusElementLabel = (value: string, labelElement: FieldLabel): void => {
    this.appliedLabel = value;
    this.labelAlignment = labelElement.sideAligned ? 'inline' : undefined;
  };

  /**
   * Checks whether the picker has an accessible label through any supported method:
   * - `label` attribute
   * - `aria-label` attribute
   * - `aria-labelledby` attribute
   * - Applied label from a field label
   * - Slotted label content
   *
   * @returns True if an accessible label is present
   */
  protected hasAccessibleLabel(): boolean {
    const slotContent =
      this.querySelector('[slot="label"]')?.textContent &&
      this.querySelector('[slot="label"]')?.textContent?.trim() !== '';
    const slotAlt =
      this.querySelector('[slot="label"]')?.getAttribute('alt')?.trim() &&
      this.querySelector('[slot="label"]')?.getAttribute('alt')?.trim() !== '';
    return (
      !!this.label ||
      !!this.getAttribute('aria-label') ||
      !!this.getAttribute('aria-labelledby') ||
      !!this.appliedLabel ||
      !!slotContent ||
      !!slotAlt
    );
  }

  /**
   * Logs a warning in debug mode when the picker lacks an accessible label.
   * Provides guidance on how to make the picker accessible.
   */
  protected warnNoLabel(): void {
    if (window.__swc?.DEBUG) {
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
  }

  /**
   * Renders the overlay element containing the menu.
   * Configures the overlay with appropriate placement, type, and event handlers.
   *
   * @param menu - The menu template to render inside the overlay
   * @returns The rendered overlay template
   */
  protected renderOverlay(menu: TemplateResult): TemplateResult {
    const container = this.renderContainer(menu);
    this.dependencyManager.add('sp-overlay');
    import('@spectrum-web-components/overlay/sp-overlay.js');
    return html`
      <sp-overlay
        @slottable-request=${this.handleSlottableRequest}
        @beforetoggle=${this.handleBeforetoggle}
        .triggerElement=${this as HTMLElement}
        .offset=${0}
        ?open=${this.open && this.dependencyManager.loaded}
        .placement=${this.isMobile.matches && !this.forcePopover
          ? undefined
          : this.placement}
        .type=${this.isMobile.matches && !this.forcePopover ? 'modal' : 'auto'}
        .receivesFocus=${'false'}
        .willPreventClose=${this.strategy?.preventNextToggle !== 'no' &&
        this.open &&
        this.dependencyManager.loaded}
      >
        ${container}
      </sp-overlay>
    `;
  }

  /**
   * Renders the description slot for additional picker context.
   * Content is referenced by aria-describedby for accessibility.
   */
  protected get renderDescriptionSlot(): TemplateResult {
    return html`
      <div id=${DESCRIPTION_ID}>
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
      <button
        aria-controls=${ifDefined(this.open ? 'menu' : undefined)}
        aria-describedby="tooltip ${DESCRIPTION_ID}"
        aria-expanded=${this.open ? 'true' : 'false'}
        aria-haspopup="true"
        aria-labelledby="icon label applied-label pending-label"
        id="button"
        class=${ifDefined(
          this.labelAlignment ? `label-${this.labelAlignment}` : undefined
        )}
        @focus=${this.handleButtonFocus}
        @blur=${this.handleButtonBlur}
        @keydown=${{
          handleEvent: this.handleEnterKeydown,
          capture: true,
        }}
        ?disabled=${this.disabled}
      >
        ${this.buttonContent}
      </button>
      <slot
        aria-hidden="true"
        name="tooltip"
        id="tooltip"
        @keydown=${this.handleKeydown}
        @slotchange=${this.handleTooltipSlotchange}
      ></slot>
      ${this.renderMenu} ${this.renderDescriptionSlot}
    `;
  }

  protected override willUpdate(changes: PropertyValues<this>): void {
    super.willUpdate(changes);
    if (changes.has('tabIndex') && !!this.tabIndex) {
      this.button.tabIndex = this.tabIndex;
      this.removeAttribute('tabindex');
    }
  }

  protected override update(changes: PropertyValues<this>): void {
    if (this.selects) {
      // Always force `selects` to "single" when set.
      // @todo: Add support functionally and visually for "multiple"
      this.selects = 'single';
    }
    if (changes.has('disabled') && this.disabled) {
      this.close();
    }
    if (changes.has('pending') && this.pending) {
      this.close();
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
    if (window.__swc?.DEBUG) {
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
        if (!this.hasAccessibleLabel()) {
          this.warnNoLabel();
        }
      });
    }
    super.update(changes);
  }

  /**
   * Binds the keydown event listener to the trigger button.
   * Called during first update to enable keyboard navigation.
   */
  protected bindButtonKeydownListener(): void {
    this.button.addEventListener('keydown', this.handleKeydown);
  }

  protected override updated(changes: PropertyValues<this>): void {
    super.updated(changes);
    if (changes.has('open') && this.overlayElement && !this.strategy.overlay) {
      this.strategy.overlay = this.overlayElement;
    }
  }

  protected override async firstUpdated(
    changes: PropertyValues<this>
  ): Promise<void> {
    super.firstUpdated(changes);
    this.bindButtonKeydownListener();
    this.bindEvents();

    await this.updateComplete;
    if (this.overlayElement && !this.strategy.overlay) {
      this.strategy.overlay = this.overlayElement;
    }
  }

  /**
   * Renders a visually hidden dismiss button for accessibility.
   * Allows screen reader users to dismiss the overlay.
   */
  protected get dismissHelper(): TemplateResult {
    return html`
      <div class="visually-hidden">
        <button
          tabindex="-1"
          aria-label="Dismiss"
          @click=${this.close}
        ></button>
      </div>
    `;
  }

  /**
   * Renders the overlay container (popover or tray) based on device type.
   * On mobile, uses a tray; on desktop, uses a popover.
   *
   * @param menu - The menu template to wrap in the container
   * @returns The rendered container template
   */
  protected renderContainer(menu: TemplateResult): TemplateResult {
    const accessibleMenu = html`
      ${this.dismissHelper} ${menu} ${this.dismissHelper}
    `;
    // @todo: test in mobile
    if (this.isMobile.matches && !this.forcePopover) {
      this.dependencyManager.add('sp-tray');
      import('@spectrum-web-components/tray/sp-tray.js');
      return html`
        <sp-tray
          id="popover"
          role="presentation"
          style=${styleMap(this.containerStyles)}
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
        style=${styleMap(this.containerStyles)}
        placement=${this.placement}
      >
        ${accessibleMenu}
      </sp-popover>
    `;
  }

  /** Tracks whether the overlay has been rendered at least once. */
  protected hasRenderedOverlay = false;

  /**
   * Dispatches a scroll event when the menu is scrolled.
   * Allows parent components to react to menu scroll events.
   */
  private onScroll(): void {
    this.dispatchEvent(
      new Event('scroll', {
        cancelable: true,
        composed: true,
      })
    );
  }

  /**
   * Renders the menu and overlay structure.
   * Lazily renders the overlay only after the picker has been focused or opened.
   */
  protected get renderMenu(): TemplateResult {
    const menu = html`
      <sp-menu
        aria-labelledby="applied-label"
        @change=${this.handleChange}
        id="menu"
        @keydown=${{
          handleEvent: this.handleEnterKeydown,
          capture: true,
        }}
        @scroll=${this.onScroll}
        role=${this.listRole}
        .selects=${this.selects}
        .selected=${this.value ? [this.value] : []}
        .shouldSupportDragAndSelect=${!this.isTouchDevice.matches}
        size=${this.size}
        @sp-menu-item-keydown=${this.handleEscape}
        @sp-menu-item-added-or-updated=${this.shouldManageSelection}
      >
        <slot @slotchange=${this.shouldScheduleManageSelection}></slot>
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

  /** Tracks whether a selection change is already scheduled for the next frame. */
  public willManageSelection = false;

  /**
   * Schedules selection management for the next animation frame.
   * Called when the value changes or menu slot content changes.
   * Prevents duplicate scheduling if already pending.
   *
   * @param event - Optional event that triggered the scheduling
   */
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

  /**
   * Immediately manages selection when a menu item is added or updated.
   * Skips if selection management is already scheduled.
   */
  protected shouldManageSelection(): void {
    if (this.willManageSelection) {
      return;
    }
    this.willManageSelection = true;
    this.manageSelection();
  }

  /**
   * Synchronizes the menu selection state with the picker's current value.
   * Finds and selects the menu item matching the current value,
   * and deselects all other items.
   */
  protected async manageSelection(): Promise<void> {
    if (this.selects == null) {
      return;
    }

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
      // Only clear value when items exist with real values but none match.
      // Preserve value if items are pending (lazy loaded, async render, incomplete upgrade).
      const hasItemsWithValues = this.menuItems.some(
        (item) => item.value != null || item.getAttribute?.('value') != null
      );
      if (this.menuItems.length > 0 && hasItemsWithValues) {
        this.value = '';
        this.selectedItem = undefined;
      }
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
    return complete;
  }

  private recentlyConnected = false;

  /** Tracks the target of an active Enter keydown to prevent double-activation. */
  private enterKeydownOn: EventTarget | null = null;

  /**
   * Handles Enter key events to prevent double-activation of menu items.
   * Tracks keydown state and clears it on keyup.
   * Also prevents Enter from triggering submenus that aren't open.
   *
   * @param event - The keyboard event
   */
  protected handleEnterKeydown = (event: KeyboardEvent): void => {
    if (event.key !== 'Enter') {
      return;
    }
    const target = event?.target as MenuItem;
    if (!target.open && target.hasSubmenu) {
      event.preventDefault();
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
        if (keyupEvent.key !== 'Enter') {
          return;
        }
        this.enterKeydownOn = null;
      },
      { once: true }
    );
  };

  public override connectedCallback(): void {
    if (window.__swc?.DEBUG) {
      window.__swc.warn(
        this,
        `PickerBase class is deprecated and will be removed in a future release. Use the ExpandableElement base class instead.`,
        'https://opensource.adobe.com/spectrum-web-components/components/picker/#deprecation',
        { level: 'deprecation' }
      );
    }
    super.connectedCallback();
    this.updateComplete.then(() => {
      if (!this.tooltipEl?.selfManaged) {
        return;
      }
      const overlayElement = this.tooltipEl.overlayElement;
      if (overlayElement) {
        overlayElement.triggerElement = this.button;
      }
    });

    this.recentlyConnected = this.hasUpdated;
    this.addEventListener('focus', this.handleFocus);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('focus', this.handleFocus);
  }
}

/**
 * An `<sp-picker>` is a dropdown selection component that allows users to choose
 * a single option from a list of menu items. It supports keyboard navigation,
 * including arrow keys to cycle through options without opening the menu.
 *
 * @element sp-picker
 *
 * @slot label - The placeholder content for the Picker
 * @slot description - The description content for the Picker
 * @slot tooltip - Tooltip to to be applied to the the Picker Button
 * @slot - menu items to be listed in the Picker
 * @fires change - Announces that the `value` of the element has changed
 * @fires sp-opened - Announces that the overlay has been opened
 * @fires sp-closed - Announces that the overlay has been closed
 */
export class Picker extends SizedMixin(ExpandableElement, {
  noDefaultSize: true,
}) {
  public static override get styles(): CSSResultArray {
    return [pickerStyles, chevronStyles];
  }

  /** The label applied to the picker, typically from an associated field label. */
  @state()
  appliedLabel?: string;
  private deprecatedMenu: Menu | null = null;

  /**
   * Controls how icons are displayed in the picker button.
   * - `'only'`: Shows only the icon, hiding the label visually.
   * - `'none'`: Hides the icon entirely.
   */
  @property({ type: String, reflect: true })
  public icons?: 'only' | 'none';

  /** Whether the picker is in an invalid state. Displays a validation icon when true. */
  @property({ type: Boolean, reflect: true })
  public invalid = false;

  /** Defines a string value that labels the Picker while it is in pending state. */
  @property({ type: String, attribute: 'pending-label' })
  public pendingLabel = 'Pending';

  /** The placeholder label displayed when no item is selected. */
  @property()
  public label?: string;

  /**
   * The selection mode for the picker's menu.
   * Always forced to `'single'` for standard picker behavior.
   */
  public selects: undefined | 'single' = 'single';

  /** The alignment of the associated label, set by an external field label component. */
  @state()
  public labelAlignment?: 'inline';

  /**
   * Returns the list of menu items contained in the picker's options menu.
   */
  protected get menuItems(): MenuItem[] {
    return this.optionsMenu.childItems;
  }

  /**
   * @deprecated This property always returns true and will be removed in a future version.
   */
  public get selfManageFocusElement(): boolean {
    return true;
  }

  /** Reference to the tooltip element, if one is slotted. */
  protected tooltipEl?: Tooltip;

  /** Whether to render the picker in quiet mode with minimal visual styling. */
  @property({ type: Boolean, reflect: true })
  public quiet = false;

  /** The current value of the picker, corresponding to the selected menu item's value. */
  @property({ type: String })
  public value = '';

  /**
   * The currently selected menu item, or undefined if no item is selected.
   */
  @property({ attribute: false })
  public get selectedItem(): MenuItem | undefined {
    return this._selectedItem;
  }

  public set selectedItem(selectedItem: MenuItem | undefined) {
    this.selectedItemContent = selectedItem
      ? selectedItem.itemChildren
      : undefined;

    if (selectedItem === this.selectedItem) {
      return;
    }
    const oldSelectedItem = this.selectedItem;
    this._selectedItem = selectedItem;
    this.requestUpdate('selectedItem', oldSelectedItem);
  }

  _selectedItem?: MenuItem;

  /** The ARIA role for the menu list element. */
  protected listRole: 'listbox' | 'menu' = 'listbox';

  /** The ARIA role for individual menu items. */
  protected itemRole = 'option';

  /**
   * Programmatically applies visible focus styling to the picker.
   * Has no effect when the picker is disabled.
   */
  public forceFocusVisible(): void {
    if (this.disabled) {
      return;
    }

    this.focused = true;
  }

  /**
   * Toggles the picker's open state when called programmatically.
   * Note: Pointer events are handled by the interaction controller.
   */
  public override click(): void {
    this.toggle();
  }

  /**
   * Handles click events on the trigger button.
   * Note: Pointer events are typically handled by the interaction controller;
   * this method is called when `this.button.click()` is invoked programmatically.
   */
  public handleButtonClick(): void {
    if (this.disabled) {
      return;
    }
    this.toggle();
  }

  /**
   * Handles blur events on the trigger button, removing focus styling.
   */
  public handleButtonBlur(): void {
    this.focused = false;
  }

  /**
   * @deprecated Use `focus()` instead.
   * Focuses the picker button and applies focus styling.
   */
  public handleHelperFocus(): void {
    // set focused to true here instead of handleButtonFocus so clicks don't flash a focus outline
    this.focused = true;
    this.button.focus();
  }

  /**
   * Handles focus events on the picker, applying visible focus styling
   * only when focus is visible in the tree.
   */
  public handleFocus(): void {
    if (!this.disabled && this.focusElement) {
      this.focused = this.hasVisibleFocusInTree();
    }
  }

  /**
   * Handles change events from the menu, updating the selected value.
   * Dispatches a `change` event that can be prevented to cancel the selection.
   *
   * @param event - The change event from the menu
   */
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

  /**
   * Handles focus events on the trigger button, delegating to the interaction strategy.
   *
   * @param event - The focus event
   */
  public handleButtonFocus(event: FocusEvent): void {
    this.strategy?.handleButtonFocus(event);
  }

  /**
   * Handles Escape key press to close the picker overlay.
   *
   * @param event - The keyboard event
   */
  protected handleEscape = (
    event: MenuItemKeydownEvent | KeyboardEvent
  ): void => {
    if (event.key === 'Escape' && this.open) {
      event.stopPropagation();
      event.preventDefault();
      this.toggle(false);
    }
  };

  /**
   * Enhanced keyboard handler that supports arrow key navigation to cycle
   * through options without opening the menu (in addition to base navigation).
   *
   * @param event - The keyboard event
   */
  protected handleKeydown = (event: KeyboardEvent): void => {
    const { key } = event;
    const handledKeys = [
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'Enter',
      ' ',
      'Escape',
    ].includes(key);
    const openKeys = ['ArrowUp', 'ArrowDown', 'Enter', ' '].includes(key);
    const arrowKeys = [
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
    ].includes(key);
    this.focused = true;
    if ('Escape' === key) {
      this.handleEscape(event);
      return;
    }
    if (!handledKeys || this.readonly || this.pending) {
      return;
    }
    if (openKeys) {
      this.keyboardOpen();
      event.preventDefault();
      if (arrowKeys) {
        event.stopPropagation();
      }
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const nextItem = this.optionsMenu?.getNeighboringFocusableElement(
      this.selectedItem,
      key === 'ArrowLeft'
    );
    if (!this.value || nextItem !== this.selectedItem) {
      // updates picker text but does not fire change event until action is completed
      if (nextItem) {
        this.setValueFromItem(nextItem as MenuItem);
      }
    }
  };

  /**
   * Opens the picker via keyboard interaction and focuses the first selected item.
   * If already open, focuses the first selected item in the menu.
   */
  protected async keyboardOpen(): Promise<void> {
    // if the menu is not open, we need to toggle it and wait for it to open to focus on the first selected item
    if (!this.open || !this.strategy.open) {
      this.addEventListener(
        'sp-opened',
        () => this.optionsMenu?.focusOnFirstSelectedItem(),
        {
          once: true,
        }
      );
      this.toggle(true);
    } else {
      // if the menu is already open, we need to focus on the first selected item
      this.optionsMenu?.focusOnFirstSelectedItem();
    }
  }

  /**
   * Sets the picker's value from a menu item selection.
   * Dispatches a cancelable `change` event and reverts the selection if prevented.
   *
   * @param item - The menu item to select
   * @param menuChangeEvent - The original menu change event, if any
   */
  protected async setValueFromItem(
    item: MenuItem,
    menuChangeEvent?: Event
  ): Promise<void> {
    this.open = false;
    // should always close when "setting" a value
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

  /**
   * Updates the selected state of a menu item.
   *
   * @param item - The menu item to update
   * @param value - Whether the item should be selected
   */
  protected setMenuItemSelected(item: MenuItem, value: boolean): void {
    // matches null | undefined
    if (this.selects == null) {
      return;
    }
    item.selected = value;
  }

  /**
   * Returns inline styles for the overlay container.
   * On mobile, sets full width; on desktop, returns empty styles.
   */
  protected get containerStyles(): StyleInfo {
    const styles: StyleInfo = {};
    if (!this.quiet) {
      styles['min-width'] = `${this.offsetWidth}px`;
    }
    // @todo test in mobile
    /* c8 ignore next 5 */
    if (this.isMobile.matches) {
      styles['--swc-menu-width'] = '100%';
    }
    return styles;
  }

  /**
   * The content (icon and text) of the currently selected menu item.
   * Used to render the selected item's display in the picker button.
   */
  @state()
  protected get selectedItemContent(): MenuItemChildren {
    return this._selectedItemContent || { icon: [], content: [] };
  }

  protected set selectedItemContent(
    selectedItemContent: MenuItemChildren | undefined
  ) {
    if (selectedItemContent === this.selectedItemContent) {
      return;
    }

    const oldContent = this.selectedItemContent;
    this._selectedItemContent = selectedItemContent;
    this.requestUpdate('selectedItemContent', oldContent);
  }

  _selectedItemContent?: MenuItemChildren;

  /**
   * Handles slotchange events for the tooltip slot.
   * Sets up the trigger element for self-managed tooltips.
   *
   * @param event - The slotchange event
   */
  protected handleTooltipSlotchange(
    event: Event & { target: HTMLSlotElement }
  ): void {
    this.tooltipEl = event.target.assignedElements()[0] as Tooltip | undefined;

    // Set up trigger element for self-managed tooltips
    if (this.tooltipEl?.selfManaged) {
      // Wait for the tooltip to be fully initialized
      this.updateComplete.then(() => {
        if (this.tooltipEl?.overlayElement && this.button) {
          this.tooltipEl.overlayElement.triggerElement = this.button;
        }
      });
    }
  }

  /**
   * Renders the label content for the picker button.
   * Shows the selected item's content if available, otherwise renders the placeholder label.
   *
   * @param content - The content nodes from the selected item
   * @returns The rendered label content
   */
  protected renderLabelContent(content: Node[]): TemplateResult | Node[] {
    if (this.value && this.selectedItem) {
      return content;
    }
    return html`
      <slot name="label" id="label">
        <span aria-hidden=${ifDefined(this.appliedLabel ? undefined : 'true')}>
          ${this.label}
        </span>
      </slot>
    `;
  }

  /**
   * Renders the loading indicator shown during pending state.
   * Dynamically imports the progress-circle component.
   *
   * @returns The rendered progress circle template
   */
  protected renderLoader(): TemplateResult {
    import('@spectrum-web-components/progress-circle/sp-progress-circle.js');
    return html`
      <sp-progress-circle
        size="s"
        indeterminate
        role="presentation"
        class="progress-circle"
      ></sp-progress-circle>
    `;
  }

  /**
   * Returns the content to render inside the picker button,
   * including the icon, label, validation icon, and chevron.
   */
  protected get buttonContent(): TemplateResult[] {
    const labelClasses = {
      'visually-hidden': this.icons === 'only' && !!this.value,
      placeholder: !this.value,
      label: true,
    };
    const appliedLabel = this.appliedLabel || this.label;
    return [
      html`
        <span id="icon" ?hidden=${this.icons === 'none'}>
          ${this.selectedItemContent.icon}
        </span>
        <span
          id=${ifDefined(this.value && this.selectedItem ? 'label' : undefined)}
          class=${classMap(labelClasses)}
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
        ${this.pending
          ? html`
              ${this.renderLoader()}
              <span
                aria-hidden="true"
                class="visually-hidden"
                id="pending-label"
              >
                ${this.pendingLabel}
              </span>
            `
          : nothing}
        <sp-icon-chevron100
          class="picker ${chevronClass[this.size as DefaultElementSize]}"
        ></sp-icon-chevron100>
      `,
    ];
  }

  /**
   * Callback invoked by an associated field label to apply its label value.
   * Sets the applied label and determines label alignment based on the field label's configuration.
   *
   * @param value - The label text value
   * @param labelElement - The field label element providing the label
   */
  applyFocusElementLabel = (value: string, labelElement: FieldLabel): void => {
    this.appliedLabel = value;
    this.labelAlignment = labelElement.sideAligned ? 'inline' : undefined;
  };

  /**
   * Checks whether the picker has an accessible label through any supported method:
   * - `label` attribute
   * - `aria-label` attribute
   * - `aria-labelledby` attribute
   * - Applied label from a field label
   * - Slotted label content
   *
   * @returns True if an accessible label is present
   */
  protected hasAccessibleLabel(): boolean {
    const slotContent =
      this.querySelector('[slot="label"]')?.textContent &&
      this.querySelector('[slot="label"]')?.textContent?.trim() !== '';
    const slotAlt =
      this.querySelector('[slot="label"]')?.getAttribute('alt')?.trim() &&
      this.querySelector('[slot="label"]')?.getAttribute('alt')?.trim() !== '';
    return (
      !!this.label ||
      !!this.getAttribute('aria-label') ||
      !!this.getAttribute('aria-labelledby') ||
      !!this.appliedLabel ||
      !!slotContent ||
      !!slotAlt
    );
  }

  /**
   * Logs a warning in debug mode when the picker lacks an accessible label.
   * Provides guidance on how to make the picker accessible.
   */
  protected warnNoLabel(): void {
    if (window.__swc?.DEBUG) {
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
  }

  /**
   * Renders the overlay element containing the menu.
   * Configures the overlay with appropriate placement, type, and event handlers.
   *
   * @param menu - The menu template to render inside the overlay
   * @returns The rendered overlay template
   */
  protected renderOverlay(menu: TemplateResult): TemplateResult {
    const container = this.renderContainer(menu);
    this.dependencyManager.add('sp-overlay');
    import('@spectrum-web-components/overlay/sp-overlay.js');
    return html`
      <sp-overlay
        @slottable-request=${this.handleSlottableRequest}
        @beforetoggle=${this.handleBeforetoggle}
        .triggerElement=${this as HTMLElement}
        .offset=${0}
        ?open=${this.open && this.dependencyManager.loaded}
        .placement=${this.isMobile.matches && !this.forcePopover
          ? undefined
          : this.placement}
        .type=${this.isMobile.matches && !this.forcePopover ? 'modal' : 'auto'}
        .receivesFocus=${'false'}
        .willPreventClose=${this.strategy?.preventNextToggle !== 'no' &&
        this.open &&
        this.dependencyManager.loaded}
      >
        ${container}
      </sp-overlay>
    `;
  }

  /**
   * Renders the description slot for additional picker context.
   * Content is referenced by aria-describedby for accessibility.
   */
  protected get renderDescriptionSlot(): TemplateResult {
    return html`
      <div id=${DESCRIPTION_ID}>
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
      <button
        aria-controls=${ifDefined(this.open ? 'menu' : undefined)}
        aria-describedby="tooltip ${DESCRIPTION_ID}"
        aria-expanded=${this.open ? 'true' : 'false'}
        aria-haspopup="true"
        aria-labelledby="icon label applied-label pending-label"
        id="button"
        class=${ifDefined(
          this.labelAlignment ? `label-${this.labelAlignment}` : undefined
        )}
        @focus=${this.handleButtonFocus}
        @blur=${this.handleButtonBlur}
        @keydown=${{
          handleEvent: this.handleEnterKeydown,
          capture: true,
        }}
        ?disabled=${this.disabled}
      >
        ${this.buttonContent}
      </button>
      <slot
        aria-hidden="true"
        name="tooltip"
        id="tooltip"
        @keydown=${this.handleKeydown}
        @slotchange=${this.handleTooltipSlotchange}
      ></slot>
      ${this.renderMenu} ${this.renderDescriptionSlot}
    `;
  }

  protected override willUpdate(changes: PropertyValues<this>): void {
    super.willUpdate(changes);
    if (changes.has('tabIndex') && !!this.tabIndex) {
      this.button.tabIndex = this.tabIndex;
      this.removeAttribute('tabindex');
    }
  }

  protected override update(changes: PropertyValues<this>): void {
    if (this.selects) {
      /**
       * Always force `selects` to "single" when set.
       *
       * @todo Add support functionally and visually for "multiple"
       */
      this.selects = 'single';
    }
    if (changes.has('disabled') && this.disabled) {
      this.close();
    }
    if (changes.has('pending') && this.pending) {
      this.close();
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
    if (window.__swc?.DEBUG) {
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
        if (!this.hasAccessibleLabel()) {
          this.warnNoLabel();
        }
      });
    }
    super.update(changes);
  }

  /**
   * Binds the keydown event listener to the trigger button.
   * Called during first update to enable keyboard navigation.
   */
  protected bindButtonKeydownListener(): void {
    this.button.addEventListener('keydown', this.handleKeydown);
  }

  protected override updated(changes: PropertyValues<this>): void {
    super.updated(changes);
    if (changes.has('open') && this.overlayElement && !this.strategy.overlay) {
      this.strategy.overlay = this.overlayElement;
    }
  }

  protected override async firstUpdated(
    changes: PropertyValues<this>
  ): Promise<void> {
    super.firstUpdated(changes);
    this.bindButtonKeydownListener();
    this.bindEvents();

    await this.updateComplete;
    if (this.overlayElement && !this.strategy.overlay) {
      this.strategy.overlay = this.overlayElement;
    }
  }

  /**
   * Renders a visually hidden dismiss button for accessibility.
   * Allows screen reader users to dismiss the overlay.
   */
  protected get dismissHelper(): TemplateResult {
    return html`
      <div class="visually-hidden">
        <button
          tabindex="-1"
          aria-label="Dismiss"
          @click=${this.close}
        ></button>
      </div>
    `;
  }

  /**
   * Renders the overlay container (popover or tray) based on device type.
   * On mobile, uses a tray; on desktop, uses a popover.
   *
   * @param menu - The menu template to wrap in the container
   * @returns The rendered container template
   */
  protected renderContainer(menu: TemplateResult): TemplateResult {
    const accessibleMenu = html`
      ${this.dismissHelper} ${menu} ${this.dismissHelper}
    `;
    // @todo: test in mobile
    if (this.isMobile.matches && !this.forcePopover) {
      this.dependencyManager.add('sp-tray');
      import('@spectrum-web-components/tray/sp-tray.js');
      return html`
        <sp-tray
          id="popover"
          role="presentation"
          style=${styleMap(this.containerStyles)}
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
        style=${styleMap(this.containerStyles)}
        placement=${this.placement}
      >
        ${accessibleMenu}
      </sp-popover>
    `;
  }

  /** Tracks whether the overlay has been rendered at least once. */
  protected hasRenderedOverlay = false;

  /**
   * Dispatches a scroll event when the menu is scrolled.
   * Allows parent components to react to menu scroll events.
   */
  private onScroll(): void {
    this.dispatchEvent(
      new Event('scroll', {
        cancelable: true,
        composed: true,
      })
    );
  }

  /**
   * Renders the menu and overlay structure.
   * Lazily renders the overlay only after the picker has been focused or opened.
   */
  protected get renderMenu(): TemplateResult {
    const menu = html`
      <sp-menu
        aria-labelledby="applied-label"
        @change=${this.handleChange}
        id="menu"
        @keydown=${{
          handleEvent: this.handleEnterKeydown,
          capture: true,
        }}
        @scroll=${this.onScroll}
        role=${this.listRole}
        .selects=${this.selects}
        .selected=${this.value ? [this.value] : []}
        .shouldSupportDragAndSelect=${!this.isTouchDevice.matches}
        size=${this.size}
        @sp-menu-item-keydown=${this.handleEscape}
        @sp-menu-item-added-or-updated=${this.shouldManageSelection}
      >
        <slot @slotchange=${this.shouldScheduleManageSelection}></slot>
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

  /** Tracks whether a selection change is already scheduled for the next frame. */
  public willManageSelection = false;

  /**
   * Schedules selection management for the next animation frame.
   * Called when the value changes or menu slot content changes.
   * Prevents duplicate scheduling if already pending.
   *
   * @param event - Optional event that triggered the scheduling
   */
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

  /**
   * Immediately manages selection when a menu item is added or updated.
   * Skips if selection management is already scheduled.
   */
  protected shouldManageSelection(): void {
    if (this.willManageSelection) {
      return;
    }
    this.willManageSelection = true;
    this.manageSelection();
  }

  /**
   * Synchronizes the menu selection state with the picker's current value.
   * Finds and selects the menu item matching the current value,
   * and deselects all other items.
   */
  protected async manageSelection(): Promise<void> {
    if (this.selects == null) {
      return;
    }

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
      // Only clear value when items exist with real values but none match.
      // Preserve value if items are pending (lazy loaded, async render, incomplete upgrade).
      const hasItemsWithValues = this.menuItems.some(
        (item) => item.value != null || item.getAttribute?.('value') != null
      );
      if (this.menuItems.length > 0 && hasItemsWithValues) {
        this.value = '';
        this.selectedItem = undefined;
      }
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
    return complete;
  }

  private recentlyConnected = false;

  /** Tracks the target of an active Enter keydown to prevent double-activation. */
  private enterKeydownOn: EventTarget | null = null;

  /**
   * Handles Enter key events to prevent double-activation of menu items.
   * Tracks keydown state and clears it on keyup.
   * Also prevents Enter from triggering submenus that aren't open.
   *
   * @param event - The keyboard event
   */
  protected handleEnterKeydown = (event: KeyboardEvent): void => {
    if (event.key !== 'Enter') {
      return;
    }
    const target = event?.target as MenuItem;
    if (!target.open && target.hasSubmenu) {
      event.preventDefault();
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
        if (keyupEvent.key !== 'Enter') {
          return;
        }
        this.enterKeydownOn = null;
      },
      { once: true }
    );
  };

  public override connectedCallback(): void {
    super.connectedCallback();
    this.updateComplete.then(() => {
      if (!this.tooltipEl?.selfManaged) {
        return;
      }
      const overlayElement = this.tooltipEl.overlayElement;
      if (overlayElement) {
        overlayElement.triggerElement = this.button;
      }
    });

    this.recentlyConnected = this.hasUpdated;
    this.addEventListener('focus', this.handleFocus);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('focus', this.handleFocus);
  }
}
