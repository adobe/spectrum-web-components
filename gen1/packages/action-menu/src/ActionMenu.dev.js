"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
import {
  html,
  nothing,
  SizedMixin
} from "@spectrum-web-components/base";
import { state } from "@spectrum-web-components/base/src/decorators.js";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import {
  ifDefined,
  styleMap
} from "@spectrum-web-components/base/src/directives.js";
import { SlottableRequestEvent } from "@spectrum-web-components/overlay/src/slottable-request-event.js";
import {
  DESCRIPTION_ID,
  ExpandableElement
} from "@spectrum-web-components/picker";
import { ObserveSlotPresence } from "@spectrum-web-components/shared/src/observe-slot-presence.js";
import { ObserveSlotText } from "@spectrum-web-components/shared/src/observe-slot-text.js";
import "@spectrum-web-components/action-button/sp-action-button.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-more.js";
import actionMenuStyles from "./action-menu.css.js";
export class ActionMenu extends ObserveSlotPresence(
  ObserveSlotText(
    SizedMixin(ExpandableElement, { noDefaultSize: true }),
    "label"
  ),
  '[slot="label-only"]'
) {
  constructor() {
    super(...arguments);
    this.selects = void 0;
    /**
     * @deprecated Reference to a legacy `<sp-menu>` child element.
     * Used for backwards compatibility with older usage patterns.
     */
    this.deprecatedMenu = null;
    this.invalid = false;
    this.pendingLabel = "Pending";
    this.quiet = false;
    this.value = "";
    /** The ARIA role for the menu list element. Uses 'menu' for action menus. */
    this.listRole = "menu";
    /** The ARIA role for individual menu items. Uses 'menuitem' for action menus. */
    this.itemRole = "menuitem";
    /**
     * Handles Escape key press to close the picker overlay.
     *
     * @param event - The keyboard event
     */
    this.handleEscape = (event) => {
      if (event.key === "Escape" && this.open) {
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
    this.handleKeydown = (event) => {
      this.focused = true;
      if (!["ArrowUp", "ArrowDown", "Enter", " ", "Escape"].includes(event.key)) {
        return;
      }
      if (event.key === "Escape") {
        this.handleEscape(event);
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      this.keyboardOpen();
    };
    /**
     * Callback invoked by an associated field label to apply its label value.
     * Sets the applied label and determines label alignment based on the field label's configuration.
     *
     * @param value - The label text value
     * @param labelElement - The field label element providing the label
     */
    this.applyFocusElementLabel = (value, labelElement) => {
      this.appliedLabel = value;
      this.labelAlignment = labelElement.sideAligned ? "inline" : void 0;
    };
    /** Tracks whether the overlay has been rendered at least once. */
    this.hasRenderedOverlay = false;
    /** Tracks whether a selection change is already scheduled for the next frame. */
    this.willManageSelection = false;
    /** Promise that resolves when selection management is complete. */
    this.selectionPromise = Promise.resolve();
    /**
     * Tracks whether the component was recently connected to the DOM.
     * Used to handle timing differences in Safari and Firefox.
     */
    this.recentlyConnected = false;
    /** Tracks the target of an active Enter keydown to prevent double-activation. */
    this.enterKeydownOn = null;
    /**
     * Handles Enter key events to prevent double-activation of menu items.
     * Tracks keydown state and clears it on keyup.
     * Also prevents Enter from triggering submenus that aren't open.
     *
     * @param event - The keyboard event
     */
    this.handleEnterKeydown = (event) => {
      if (event.key !== "Enter") {
        return;
      }
      const target = event == null ? void 0 : event.target;
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
        "keyup",
        async (keyupEvent) => {
          if (keyupEvent.key !== "Enter") {
            return;
          }
          this.enterKeydownOn = null;
        },
        { once: true }
      );
    };
    /**
     * Handles slottable request events by re-dispatching them.
     * Allows parent components to intercept overlay content requests.
     *
     * @param event - The slottable request event
     */
    this.handleSlottableRequest = (event) => {
      this.dispatchEvent(new SlottableRequestEvent(event.name, event.data));
    };
  }
  /**
   * Returns the component's styles including action menu specific styles.
   */
  static get styles() {
    return [actionMenuStyles];
  }
  /**
   * Returns the list of menu items contained in the picker's options menu.
   */
  get menuItems() {
    return this.optionsMenu.childItems;
  }
  /**
   * @deprecated This property always returns true and will be removed in a future version.
   */
  get selfManageFocusElement() {
    return true;
  }
  get selectedItem() {
    return this._selectedItem;
  }
  /**
   * Programmatically applies visible focus styling to the picker.
   * Has no effect when the picker is disabled.
   */
  forceFocusVisible() {
    if (this.disabled) {
      return;
    }
    this.focused = true;
  }
  /**
   * Toggles the picker's open state when called programmatically.
   * Note: Pointer events are handled by the interaction controller.
   */
  click() {
    this.toggle();
  }
  /**
   * Handles click events on the trigger button.
   * Note: Pointer events are typically handled by the interaction controller;
   * this method is called when `this.button.click()` is invoked programmatically.
   */
  handleButtonClick() {
    if (this.disabled) {
      return;
    }
    this.toggle();
  }
  /**
   * Handles blur events on the trigger button, removing focus styling.
   */
  handleButtonBlur() {
    this.focused = false;
  }
  /**
   * @deprecated Use `focus()` instead.
   * Focuses the picker button and applies focus styling.
   */
  handleHelperFocus() {
    this.focused = true;
    this.button.focus();
  }
  /**
   * Handles focus events on the picker, applying visible focus styling
   * only when focus is visible in the tree.
   */
  handleFocus() {
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
  handleChange(event) {
    if (this.strategy) {
      this.strategy.preventNextToggle = "no";
    }
    const target = event.target;
    const [selected] = target.selectedItems;
    event.stopPropagation();
    if (event.cancelable) {
      this.setValueFromItem(selected, event);
    } else {
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
  handleButtonFocus(event) {
    var _a;
    (_a = this.strategy) == null ? void 0 : _a.handleButtonFocus(event);
  }
  /**
   * Opens the picker via keyboard interaction and focuses the first selected item.
   * If already open, focuses the first selected item in the menu.
   */
  async keyboardOpen() {
    var _a;
    if (!this.open || !this.strategy.open) {
      this.addEventListener(
        "sp-opened",
        () => {
          var _a2;
          return (_a2 = this.optionsMenu) == null ? void 0 : _a2.focusOnFirstSelectedItem();
        },
        {
          once: true
        }
      );
      this.toggle(true);
    } else {
      (_a = this.optionsMenu) == null ? void 0 : _a.focusOnFirstSelectedItem();
    }
  }
  /**
   * Sets the picker's value from a menu item selection.
   * Dispatches a cancelable `change` event and reverts the selection if prevented.
   *
   * @param item - The menu item to select
   * @param menuChangeEvent - The original menu change event, if any
   */
  async setValueFromItem(item, menuChangeEvent) {
    var _a;
    this.open = false;
    const oldSelectedItem = this.selectedItem;
    const oldValue = this.value;
    this.selectedItem = item;
    this.value = (_a = item == null ? void 0 : item.value) != null ? _a : "";
    await this.updateComplete;
    const applyDefault = this.dispatchEvent(
      new Event("change", {
        bubbles: true,
        // Allow it to be prevented.
        cancelable: true,
        composed: true
      })
    );
    if (!applyDefault && this.selects) {
      if (menuChangeEvent) {
        menuChangeEvent.preventDefault();
      }
      this.setMenuItemSelected(this.selectedItem, false);
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
  setMenuItemSelected(item, value) {
    if (this.selects == null) {
      return;
    }
    item.selected = value;
  }
  /**
   * Returns inline styles for the overlay container.
   * On mobile, sets full width; on desktop, returns empty styles.
   */
  get containerStyles() {
    if (this.isMobile.matches) {
      return {
        "--swc-menu-width": "100%"
      };
    }
    return {};
  }
  get selectedItemContent() {
    return this._selectedItemContent || { icon: [], content: [] };
  }
  set selectedItemContent(selectedItemContent) {
    if (selectedItemContent === this.selectedItemContent) {
      return;
    }
    const oldContent = this.selectedItemContent;
    this._selectedItemContent = selectedItemContent;
    this.requestUpdate("selectedItemContent", oldContent);
  }
  /**
   * Handles slotchange events for the tooltip slot.
   * Sets up the trigger element for self-managed tooltips.
   *
   * @param event - The slotchange event
   */
  handleTooltipSlotchange(event) {
    const tooltipEl = event.target.assignedElements()[0];
    this.tooltipEl = tooltipEl;
    if (tooltipEl == null ? void 0 : tooltipEl.selfManaged) {
      if (this.button) {
        tooltipEl.triggerElement = this.button;
      }
      this.updateComplete.then(() => {
        if (tooltipEl.selfManaged && this.button) {
          tooltipEl.triggerElement = this.button;
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
  renderLabelContent(content) {
    if (this.value && this.selectedItem) {
      return content;
    }
    return html`
      <slot name="label" id="label">
        <span aria-hidden=${ifDefined(this.appliedLabel ? void 0 : "true")}>
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
  renderLoader() {
    import("@spectrum-web-components/progress-circle/sp-progress-circle.js");
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
  get buttonContent() {
    return [
      html`
        ${this.labelOnly ? nothing : html`
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
      `
    ];
  }
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
  hasAccessibleLabel() {
    return !!this.label || !!this.getAttribute("aria-label") || !!this.getAttribute("aria-labelledby") || !!this.appliedLabel || this.hasLabel || this.labelOnly;
  }
  /**
   * Logs a warning in debug mode when the action menu lacks an accessible label.
   * Provides guidance specific to action menu labeling options.
   */
  warnNoLabel() {
    if (true) {
      window.__swc.warn(
        this,
        `<${this.localName}> needs one of the following to be accessible:`,
        "https://opensource.adobe.com/spectrum-web-components/components/action-menu/#accessibility",
        {
          type: "accessibility",
          issues: [
            `an <sp-field-label> element with a \`for\` attribute referencing the \`id\` of the \`<${this.localName}>\`, or`,
            'value supplied to the "label" attribute, which will be displayed visually as placeholder text',
            'text content supplied in a <span> with slot="label", or, text content supplied in a <span> with slot="label-only"',
            "which will also be displayed visually as placeholder text."
          ]
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
  renderOverlay(menu) {
    var _a;
    const container = this.renderContainer(menu);
    this.dependencyManager.add("sp-overlay");
    import("@spectrum-web-components/overlay/sp-overlay.js");
    return html`
      <sp-overlay
        @slottable-request=${this.handleSlottableRequest}
        @beforetoggle=${this.handleBeforetoggle}
        .triggerElement=${this}
        .offset=${0}
        ?open=${this.open && this.dependencyManager.loaded}
        .placement=${this.isMobile.matches && !this.forcePopover ? void 0 : this.placement}
        .type=${this.isMobile.matches && !this.forcePopover ? "modal" : "auto"}
        .receivesFocus=${"false"}
        .willPreventClose=${((_a = this.strategy) == null ? void 0 : _a.preventNextToggle) !== "no" && this.open && this.dependencyManager.loaded}
      >
        ${container}
      </sp-overlay>
    `;
  }
  /**
   * Renders the description slot for additional picker context.
   * Content is referenced by aria-describedby for accessibility.
   */
  get renderDescriptionSlot() {
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
  render() {
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
        aria-controls=${ifDefined(this.open ? "menu" : void 0)}
        aria-expanded=${this.open ? "true" : "false"}
        aria-label=${ifDefined(this.label || void 0)}
        id="button"
        class="button"
        size=${this.size}
        @blur=${this.handleButtonBlur}
        @focus=${this.handleButtonFocus}
        @keydown=${{
      handleEvent: this.handleEnterKeydown,
      capture: true
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
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    if (changedProperties.has("tabIndex") && !!this.tabIndex) {
      this.button.tabIndex = this.tabIndex;
      this.removeAttribute("tabindex");
    }
  }
  /**
   * Handles property updates.
   * Forces the invalid property to always be false since action menus
   * don't support validation states.
   *
   * @param changedProperties - Map of changed property names to previous values
   */
  update(changedProperties) {
    var _a, _b;
    if (changedProperties.has("invalid")) {
      this.invalid = false;
    }
    if (this.selects) {
      this.selects = "single";
    }
    if (changedProperties.has("disabled") && this.disabled) {
      this.close();
    }
    if (changedProperties.has("pending") && this.pending) {
      this.close();
    }
    if (changedProperties.has("value")) {
      this.shouldScheduleManageSelection();
    }
    if (!this.hasUpdated) {
      this.deprecatedMenu = this.querySelector(":scope > sp-menu");
      (_a = this.deprecatedMenu) == null ? void 0 : _a.toggleAttribute("ignore", true);
      (_b = this.deprecatedMenu) == null ? void 0 : _b.setAttribute("selects", "inherit");
    }
    if (true) {
      if (!this.hasUpdated && this.querySelector(":scope > sp-menu")) {
        const { localName } = this;
        window.__swc.warn(
          this,
          `You no longer need to provide an <sp-menu> child to ${localName}. Any styling or attributes on the <sp-menu> will be ignored.`,
          "https://opensource.adobe.com/spectrum-web-components/components/picker/#sizes",
          { level: "deprecation" }
        );
      }
      this.updateComplete.then(async () => {
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
  bindButtonKeydownListener() {
    this.button.addEventListener("keydown", this.handleKeydown);
  }
  /**
   * Lifecycle callback after the component has updated.
   * Ensures the strategy has a reference to the overlay element when opened.
   *
   * @param changedProperties - Map of changed property names to previous values
   */
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("open") && this.overlayElement && !this.strategy.overlay) {
      this.strategy.overlay = this.overlayElement;
    }
  }
  /**
   * Lifecycle callback after the component's first update.
   * Binds keyboard listeners and initializes the interaction strategy.
   *
   * @param changedProperties - Map of changed property names to previous values
   */
  async firstUpdated(changedProperties) {
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
  get dismissHelper() {
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
  renderContainer(menu) {
    const accessibleMenu = html`
      ${this.dismissHelper} ${menu} ${this.dismissHelper}
    `;
    if (this.isMobile.matches && !this.forcePopover) {
      this.dependencyManager.add("sp-tray");
      import("@spectrum-web-components/tray/sp-tray.js");
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
    this.dependencyManager.add("sp-popover");
    import("@spectrum-web-components/popover/sp-popover.js");
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
  /**
   * Dispatches a scroll event when the menu is scrolled.
   * The event is intentionally non-composed so it fires on the action menu host
   * for consumers but does not cross the shadow DOM boundary into ancestors.
   */
  onScroll() {
    this.dispatchEvent(new Event("scroll"));
  }
  /**
   * Renders the menu and overlay structure.
   * Lazily renders the overlay only after the picker has been focused or opened.
   */
  get renderMenu() {
    const menu = html`
      <sp-menu
        aria-labelledby="applied-label"
        @change=${this.handleChange}
        id="menu"
        @keydown=${{
      handleEvent: this.handleEnterKeydown,
      capture: true
    }}
        ?mobile-view=${this.isMobile.matches && !this.forcePopover}
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
    this.hasRenderedOverlay = this.hasRenderedOverlay || this.focused || this.open || !!this.deprecatedMenu;
    if (this.hasRenderedOverlay) {
      if (this.dependencyManager.loaded) {
        this.dependencyManager.add("sp-overlay");
      }
      return this.renderOverlay(menu);
    }
    return menu;
  }
  /**
   * Schedules selection management for the next animation frame.
   * Called when the value changes or menu slot content changes.
   * Prevents duplicate scheduling if already pending.
   *
   * @param event - Optional event that triggered the scheduling
   */
  shouldScheduleManageSelection(event) {
    if (!this.willManageSelection && (!event || event.target.getRootNode().host === this)) {
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
  shouldManageSelection() {
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
  async manageSelection() {
    if (this.selects == null) {
      return;
    }
    this.selectionPromise = new Promise(
      (res) => this.selectionResolver = res
    );
    let selectedItem;
    await this.optionsMenu.updateComplete;
    if (this.recentlyConnected) {
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
      const hasItemsWithValues = this.menuItems.some(
        (item) => {
          var _a;
          return item.value != null || ((_a = item.getAttribute) == null ? void 0 : _a.call(item, "value")) != null;
        }
      );
      if (this.menuItems.length > 0 && hasItemsWithValues) {
        this.value = "";
        this.selectedItem = void 0;
      }
    }
    if (this.open) {
      await this.optionsMenu.updateComplete;
      this.optionsMenu.updateSelectedItemIndex();
    }
    this.selectionResolver();
    this.willManageSelection = false;
  }
  /**
   * Returns a promise that resolves when the component update is complete,
   * including any pending selection management.
   */
  async getUpdateComplete() {
    const complete = await super.getUpdateComplete();
    await this.selectionPromise;
    return complete;
  }
  /**
   * Lifecycle callback when the element is connected to the DOM.
   * Sets up tooltip trigger elements and focus event listeners.
   */
  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      var _a;
      if (((_a = this.tooltipEl) == null ? void 0 : _a.selfManaged) && this.button) {
        this.tooltipEl.triggerElement = this.button;
      }
    });
    this.recentlyConnected = this.hasUpdated;
    this.addEventListener("focus", this.handleFocus);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("focus", this.handleFocus);
  }
  /**
   * Sets the currently selected menu item and updates the displayed content.
   *
   * @param selectedItem - The menu item to select, or undefined to clear selection
   */
  set selectedItem(selectedItem) {
    this.selectedItemContent = selectedItem ? selectedItem.itemChildren : void 0;
    if (selectedItem === this.selectedItem) {
      return;
    }
    const oldSelectedItem = this.selectedItem;
    this._selectedItem = selectedItem;
    this.requestUpdate("selectedItem", oldSelectedItem);
  }
  /**
   * Whether the label slot has content.
   * Used to determine button layout and icon visibility.
   */
  get hasLabel() {
    return this.slotHasContent;
  }
  get labelOnly() {
    return this.slotContentIsPresent;
  }
}
__decorateClass([
  property({ type: String })
], ActionMenu.prototype, "selects", 2);
__decorateClass([
  state()
], ActionMenu.prototype, "labelAlignment", 2);
__decorateClass([
  state()
], ActionMenu.prototype, "appliedLabel", 2);
__decorateClass([
  property({ type: String, reflect: true })
], ActionMenu.prototype, "icons", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ActionMenu.prototype, "invalid", 2);
__decorateClass([
  property({ type: String, attribute: "pending-label" })
], ActionMenu.prototype, "pendingLabel", 2);
__decorateClass([
  property()
], ActionMenu.prototype, "label", 2);
__decorateClass([
  property({ reflect: true, attribute: "static-color" })
], ActionMenu.prototype, "staticColor", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ActionMenu.prototype, "quiet", 2);
__decorateClass([
  property({ type: String })
], ActionMenu.prototype, "value", 2);
__decorateClass([
  property({ attribute: false })
], ActionMenu.prototype, "selectedItem", 1);
__decorateClass([
  state()
], ActionMenu.prototype, "selectedItemContent", 1);
__decorateClass([
  state()
], ActionMenu.prototype, "labelOnly", 1);
//# sourceMappingURL=ActionMenu.dev.js.map
