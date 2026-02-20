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
  html,
  nothing,
  PropertyValues,
  SizedMixin,
  TemplateResult,
} from '@spectrum-web-components/base';
import { state } from '@spectrum-web-components/base/src/decorators.js';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import {
  ifDefined,
  StyleInfo,
  styleMap,
} from '@spectrum-web-components/base/src/directives.js';
import type { FieldLabel } from '@spectrum-web-components/field-label';
import type {
  Menu,
  MenuItem,
  MenuItemChildren,
  MenuItemKeydownEvent,
} from '@spectrum-web-components/menu';
import { SlottableRequestEvent } from '@spectrum-web-components/overlay/src/slottable-request-event.js';
import {
  DESCRIPTION_ID,
  ExpandableElement,
} from '@spectrum-web-components/picker';
import { ObserveSlotPresence } from '@spectrum-web-components/shared/src/observe-slot-presence.js';
import { ObserveSlotText } from '@spectrum-web-components/shared/src/observe-slot-text.js';
import type { Tooltip } from '@spectrum-web-components/tooltip';

import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';

import actionMenuStyles from './action-menu.css.js';

/**
 * An `<sp-action-menu>` is an action button with an attached menu of options.
 * Unlike a standard picker, it does not maintain a selection by default and
 * displays a "more" icon instead of a chevron.
 *
 * @element sp-action-menu
 *
 * @slot - menu items to be listed in the Action Menu
 * @slot icon - The icon to use for the Action Menu
 * @slot label - The label to use for the Action Menu
 * @slot label-only - The label to use for the Action Menu (no icon space reserved)
 * @slot tooltip - Tooltip to be applied to the Action Button
 * @attr selects - By default `sp-action-menu` does not manage a selection. If
 * you'd like for a selection to be held by the `sp-menu` that it presents in
 * its overlay, use `selects="single" to activate this functionality.
 * @fires sp-opened - Announces that the overlay has been opened
 * @fires sp-closed - Announces that the overlay has been closed
 */
export class ActionMenu extends ObserveSlotPresence(
  ObserveSlotText(
    SizedMixin(ExpandableElement, { noDefaultSize: true }),
    'label'
  ),
  '[slot="label-only"]'
) {
  /**
   * Returns the component's styles including action menu specific styles.
   */
  public static override get styles(): CSSResultArray {
    return [actionMenuStyles];
  }

  /**
   * The selection mode for the action menu.
   * Unlike Picker, defaults to `undefined` (no selection management).
   * Set to `'single'` to maintain a selected item.
   */
  @property({ type: String })
  public selects: undefined | 'single' = undefined;

  /** The alignment of the associated label, set by an external field label component. */
  @state()
  public labelAlignment?: 'inline';

  /**
   * Returns the list of menu items contained in the picker's options menu.
   */
  protected get menuItems(): MenuItem[] {
    return this.optionsMenu.childItems;
  }

  /** The label applied to the picker, typically from an associated field label. */
  @state()
  appliedLabel?: string;

  /**
   * @deprecated Reference to a legacy `<sp-menu>` child element.
   * Used for backwards compatibility with older usage patterns.
   */
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
   * Applies static color styling for use on colored backgrounds.
   * - `'white'`: Use on dark backgrounds
   * - `'black'`: Use on light backgrounds
   */
  @property({ reflect: true, attribute: 'static-color' })
  public staticColor?: 'white' | 'black';

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

  /** The ARIA role for the menu list element. Uses 'menu' for action menus. */
  protected listRole: 'listbox' | 'menu' = 'menu';

  /** The ARIA role for individual menu items. Uses 'menuitem' for action menus. */
  protected itemRole = 'menuitem';

  /**
   * The currently selected menu item, or undefined if no item is selected.
   */
  @property({ attribute: false })
  public get selectedItem(): MenuItem | undefined {
    return this._selectedItem;
  }

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
    // @todo test in mobile
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

  /** Private backing field for selectedItemContent getter/setter. */
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
   * Returns the content to render inside the action button.
   * Includes the icon slot (with "more" icon default), label slot, and label-only slot.
   */
  protected get buttonContent(): TemplateResult[] {
    return [
      html`
        ${this.labelOnly
          ? nothing
          : html`
              <slot
                name="icon"
                slot="icon"
                ?icon-only=${!this.hasLabel}
                ?hidden=${this.labelOnly}
              >
                <sp-icon-more class="icon" size=${this.size}></sp-icon-more>
              </slot>
            `}
        <slot name="label" ?hidden=${!this.hasLabel}></slot>
        <slot name="label-only"></slot>
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
   * Checks whether the action menu has an accessible label through any supported method:
   * Extends base check to include label slot content and label-only slot.
   * - `label` attribute
   * - `aria-label` attribute
   * - `aria-labelledby` attribute
   * - Applied label from a field label
   * - Slotted label content
   *
   * @returns True if an accessible label is present
   */
  protected hasAccessibleLabel(): boolean {
    return (
      !!this.label ||
      !!this.getAttribute('aria-label') ||
      !!this.getAttribute('aria-labelledby') ||
      !!this.appliedLabel ||
      this.hasLabel ||
      this.labelOnly
    );
  }

  /**
   * Logs a warning in debug mode when the action menu lacks an accessible label.
   * Provides guidance specific to action menu labeling options.
   */
  protected warnNoLabel(): void {
    if (window.__swc?.DEBUG) {
      window.__swc.warn(
        this,
        `<${this.localName}> needs one of the following to be accessible:`,
        'https://opensource.adobe.com/spectrum-web-components/components/action-menu/#accessibility',
        {
          type: 'accessibility',
          issues: [
            `an <sp-field-label> element with a \`for\` attribute referencing the \`id\` of the \`<${this.localName}>\`, or`,
            'value supplied to the "label" attribute, which will be displayed visually as placeholder text',
            'text content supplied in a <span> with slot="label", or, text content supplied in a <span> with slot="label-only"',
            'which will also be displayed visually as placeholder text.',
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

  /**
   * Renders the action menu component.
   * Uses an action button as the trigger instead of a standard button.
   */
  protected override render(): TemplateResult {
    if (this.tooltipEl) {
      this.tooltipEl.disabled = this.open;
    }
    return html`
      <sp-action-button
        aria-describedby=${DESCRIPTION_ID}
        ?quiet=${this.quiet}
        ?selected=${this.open}
        static-color=${ifDefined(this.staticColor)}
        aria-haspopup="true"
        aria-controls=${ifDefined(this.open ? 'menu' : undefined)}
        aria-expanded=${this.open ? 'true' : 'false'}
        aria-label=${ifDefined(this.label || undefined)}
        id="button"
        class="button"
        size=${this.size}
        @blur=${this.handleButtonBlur}
        @focus=${this.handleButtonFocus}
        @keydown=${{
          handleEvent: this.handleEnterKeydown,
          capture: true,
        }}
        ?disabled=${this.disabled}
      >
        ${this.buttonContent}
      </sp-action-button>
      <slot name="tooltip" @slotchange=${this.handleTooltipSlotchange}></slot>
      ${this.renderMenu} ${this.renderDescriptionSlot}
    `;
  }

  /**
   * Lifecycle callback before the component updates.
   * Transfers tabIndex from the host element to the internal button.
   *
   * @param changedProperties - Map of changed property names to previous values
   */
  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('tabIndex') && !!this.tabIndex) {
      this.button.tabIndex = this.tabIndex;
      this.removeAttribute('tabindex');
    }
  }

  /**
   * Handles property updates.
   * Forces the invalid property to always be false since action menus
   * don't support validation states.
   *
   * @param changedProperties - Map of changed property names to previous values
   */
  protected override update(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('invalid')) {
      this.invalid = false;
    }
    if (this.selects) {
      /**
       * Always force `selects` to "single" when set.
       *
       * @todo Add support functionally and visually for "multiple"
       */
      this.selects = 'single';
    }
    if (changedProperties.has('disabled') && this.disabled) {
      this.close();
    }
    if (changedProperties.has('pending') && this.pending) {
      this.close();
    }
    if (changedProperties.has('value')) {
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
    super.update(changedProperties);
  }

  /**
   * Binds the keydown event listener to the trigger button.
   * Called during first update to enable keyboard navigation.
   */
  protected bindButtonKeydownListener(): void {
    this.button.addEventListener('keydown', this.handleKeydown);
  }

  /**
   * Lifecycle callback after the component has updated.
   * Ensures the strategy has a reference to the overlay element when opened.
   *
   * @param changedProperties - Map of changed property names to previous values
   */
  protected override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);
    if (
      changedProperties.has('open') &&
      this.overlayElement &&
      !this.strategy.overlay
    ) {
      this.strategy.overlay = this.overlayElement;
    }
  }

  /**
   * Lifecycle callback after the component's first update.
   * Binds keyboard listeners and initializes the interaction strategy.
   *
   * @param changedProperties - Map of changed property names to previous values
   */
  protected override async firstUpdated(
    changedProperties: PropertyValues<this>
  ): Promise<void> {
    super.firstUpdated(changedProperties);
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

  /** Promise that resolves when selection management is complete. */
  private selectionPromise = Promise.resolve();

  /** Resolver function for the selectionPromise. */
  private selectionResolver!: () => void;

  /**
   * Returns a promise that resolves when the component update is complete,
   * including any pending selection management.
   */
  protected override async getUpdateComplete(): Promise<boolean> {
    const complete = (await super.getUpdateComplete()) as boolean;
    await this.selectionPromise;
    return complete;
  }

  /**
   * Tracks whether the component was recently connected to the DOM.
   * Used to handle timing differences in Safari and Firefox.
   */
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

  /**
   * Lifecycle callback when the element is connected to the DOM.
   * Sets up tooltip trigger elements and focus event listeners.
   */
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

  /**
   * Sets the currently selected menu item and updates the displayed content.
   *
   * @param selectedItem - The menu item to select, or undefined to clear selection
   */
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

  /** Private backing field for selectedItem getter/setter. */
  _selectedItem?: MenuItem;

  /**
   * Whether the label slot has content.
   * Used to determine button layout and icon visibility.
   */
  private get hasLabel(): boolean {
    return this.slotHasContent;
  }

  /**
   * Whether the label-only slot is being used.
   * When true, no icon space is reserved.
   */
  @state()
  private get labelOnly(): boolean {
    return this.slotContentIsPresent;
  }

  /**
   * Handles slottable request events by re-dispatching them.
   * Allows parent components to intercept overlay content requests.
   *
   * @param event - The slottable request event
   */
  public override handleSlottableRequest = (
    event: SlottableRequestEvent
  ): void => {
    this.dispatchEvent(new SlottableRequestEvent(event.name, event.data));
  };
}
