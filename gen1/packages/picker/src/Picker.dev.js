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
  SizedMixin,
  SpectrumElement
} from "@spectrum-web-components/base";
import {
  property,
  query,
  state
} from "@spectrum-web-components/base/src/decorators.js";
import {
  classMap,
  ifDefined,
  styleMap
} from "@spectrum-web-components/base/src/directives.js";
import chevronStyles from "@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js";
import { DependencyManagerController } from "@spectrum-web-components/reactive-controllers/src/DependencyManger.js";
import {
  IS_MOBILE,
  IS_TOUCH_DEVICE,
  MatchMediaController
} from "@spectrum-web-components/reactive-controllers/src/MatchMedia.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js";
import "@spectrum-web-components/menu/sp-menu.js";
import pickerStyles from "./picker.css.js";
import { strategies } from "./strategies.dev.js";
const chevronClass = {
  s: "spectrum-UIIcon-ChevronDown75",
  m: "spectrum-UIIcon-ChevronDown100",
  l: "spectrum-UIIcon-ChevronDown200",
  xl: "spectrum-UIIcon-ChevronDown300"
};
export const DESCRIPTION_ID = "option-picker";
export class ExpandableElement extends SpectrumElement {
  constructor() {
    super(...arguments);
    /** Controller that tracks whether the device is mobile. */
    this.isMobile = new MatchMediaController(this, IS_MOBILE);
    /** Controller that tracks whether the device supports touch input. */
    this.isTouchDevice = new MatchMediaController(this, IS_TOUCH_DEVICE);
    /** Controller that manages lazy-loading of overlay dependencies. */
    this.dependencyManager = new DependencyManagerController(this);
    this.disabled = false;
    this.focused = false;
    this.readonly = false;
    this.pending = false;
    this.forcePopover = false;
    this.open = false;
    this.placement = "bottom-start";
    /**
     * Handles slottable request events from the overlay.
     * Override in subclasses to customize slottable behavior.
     *
     * @param _event - The slottable request event
     */
    this.handleSlottableRequest = (_event) => {
    };
    /**
     * Handles the overlay's beforetoggle event.
     * Manages overlay state and prevents unwanted closures during interaction.
     *
     * @param event - The beforetoggle event with the new state
     */
    this.handleBeforetoggle = (event) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      if (event.composedPath()[0] !== event.target) {
        return;
      }
      if (event.newState === "closed") {
        const shouldRestoreFocus = ((_a = this.optionsMenu) == null ? void 0 : _a.matches(":focus-within")) && !((_b = this.button) == null ? void 0 : _b.matches(":focus"));
        if (!this.open) {
          if (this.strategy) {
            this.strategy.open = false;
          }
        } else if (((_c = this.strategy) == null ? void 0 : _c.preventNextToggle) === "no") {
          this.open = false;
        } else if (!((_d = this.strategy) == null ? void 0 : _d.pointerdownState)) {
          (_e = this.overlayElement) == null ? void 0 : _e.manuallyKeepOpen();
        }
        if (shouldRestoreFocus && !this.open) {
          (_f = this.button) == null ? void 0 : _f.focus();
        }
      }
      if (!this.open) {
        (_g = this.optionsMenu) == null ? void 0 : _g.updateSelectedItemIndex();
        (_h = this.optionsMenu) == null ? void 0 : _h.closeDescendentOverlays();
      }
    };
  }
  /**
   * Returns the element that should receive focus.
   * When open, returns the options menu; otherwise returns the trigger button.
   */
  get focusElement() {
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
  focus(options) {
    var _a;
    (_a = this.focusElement) == null ? void 0 : _a.focus(options);
  }
  /**
   * Closes the component's overlay.
   * Has no effect when the component is readonly.
   */
  close() {
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
  toggle(target) {
    if (this.readonly || this.pending || this.disabled) {
      return;
    }
    const open = typeof target !== "undefined" ? target : !this.open;
    this.open = open;
    if (this.strategy) {
      this.strategy.open = this.open;
    }
  }
  /**
   * Binds the appropriate interaction strategy (desktop or mobile) based on device type.
   * Aborts any existing strategy before creating a new one.
   */
  bindEvents() {
    var _a;
    (_a = this.strategy) == null ? void 0 : _a.abort();
    if (this.isMobile.matches) {
      this.strategy = new strategies["mobile"](
        this.button,
        this
      );
    } else {
      this.strategy = new strategies["desktop"](
        this.button,
        this
      );
    }
  }
  /**
   * Lifecycle callback when the element is disconnected from the DOM.
   * Closes the overlay and releases strategy resources.
   */
  disconnectedCallback() {
    var _a;
    this.close();
    (_a = this.strategy) == null ? void 0 : _a.releaseDescription();
    super.disconnectedCallback();
  }
}
/**
 * Shadow root configuration with delegatesFocus enabled.
 * Allows focus to be delegated to focusable children within the shadow root.
 */
ExpandableElement.shadowRootOptions = {
  ...SpectrumElement.shadowRootOptions,
  delegatesFocus: true
};
__decorateClass([
  query("#button")
], ExpandableElement.prototype, "button", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ExpandableElement.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ExpandableElement.prototype, "focused", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ExpandableElement.prototype, "readonly", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ExpandableElement.prototype, "pending", 2);
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "force-popover" })
], ExpandableElement.prototype, "forcePopover", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ExpandableElement.prototype, "open", 2);
__decorateClass([
  query("sp-menu")
], ExpandableElement.prototype, "optionsMenu", 2);
__decorateClass([
  query("sp-overlay")
], ExpandableElement.prototype, "overlayElement", 2);
__decorateClass([
  property()
], ExpandableElement.prototype, "placement", 2);
export class PickerBase extends SizedMixin(ExpandableElement, {
  noDefaultSize: true
}) {
  constructor() {
    super(...arguments);
    this.deprecatedMenu = null;
    this.invalid = false;
    this.pendingLabel = "Pending";
    /**
     * The selection mode for the picker's menu.
     * Always forced to `'single'` for standard picker behavior.
     */
    this.selects = "single";
    this.quiet = false;
    this.value = "";
    /** The ARIA role for the menu list element. */
    this.listRole = "listbox";
    /** The ARIA role for individual menu items. */
    this.itemRole = "option";
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
    this.selectionPromise = Promise.resolve();
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
  focus(options) {
    var _a;
    (_a = this.focusElement) == null ? void 0 : _a.focus(options);
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
   * Returns the content to render inside the picker button,
   * including the icon, label, validation icon, and chevron.
   */
  get buttonContent() {
    const labelClasses = {
      "visually-hidden": this.icons === "only" && !!this.value,
      placeholder: !this.value,
      label: true
    };
    const appliedLabel = this.appliedLabel || this.label;
    return [
      html`
        <span id="icon" ?hidden=${this.icons === "none"}>
          ${this.selectedItemContent.icon}
        </span>
        <span
          id=${ifDefined(this.value && this.selectedItem ? "label" : void 0)}
          class=${classMap(labelClasses)}
        >
          ${this.renderLabelContent(this.selectedItemContent.content)}
        </span>
        ${this.value && this.selectedItem ? html`
              <span
                aria-hidden="true"
                class="visually-hidden"
                id="applied-label"
              >
                ${appliedLabel}
                <slot name="label"></slot>
              </span>
            ` : html`
              <span hidden id="applied-label">${appliedLabel}</span>
            `}
        ${this.invalid && !this.pending ? html`
              <sp-icon-alert class="validation-icon"></sp-icon-alert>
            ` : nothing}
        ${this.pending ? html`
              ${this.renderLoader()}
              <span
                aria-hidden="true"
                class="visually-hidden"
                id="pending-label"
              >
                ${this.pendingLabel}
              </span>
            ` : nothing}
        <sp-icon-chevron100
          class="picker ${chevronClass[this.size]}"
        ></sp-icon-chevron100>
      `
    ];
  }
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
  hasAccessibleLabel() {
    var _a, _b, _c, _d, _e, _f, _g;
    const slotContent = ((_a = this.querySelector('[slot="label"]')) == null ? void 0 : _a.textContent) && ((_c = (_b = this.querySelector('[slot="label"]')) == null ? void 0 : _b.textContent) == null ? void 0 : _c.trim()) !== "";
    const slotAlt = ((_e = (_d = this.querySelector('[slot="label"]')) == null ? void 0 : _d.getAttribute("alt")) == null ? void 0 : _e.trim()) && ((_g = (_f = this.querySelector('[slot="label"]')) == null ? void 0 : _f.getAttribute("alt")) == null ? void 0 : _g.trim()) !== "";
    return !!this.label || !!this.getAttribute("aria-label") || !!this.getAttribute("aria-labelledby") || !!this.appliedLabel || !!slotContent || !!slotAlt;
  }
  /**
   * Logs a warning in debug mode when the picker lacks an accessible label.
   * Provides guidance on how to make the picker accessible.
   */
  warnNoLabel() {
    if (true) {
      window.__swc.warn(
        this,
        `<${this.localName}> needs one of the following to be accessible:`,
        "https://opensource.adobe.com/spectrum-web-components/components/picker/#accessibility",
        {
          type: "accessibility",
          issues: [
            `an <sp-field-label> element with a \`for\` attribute referencing the \`id\` of the \`<${this.localName}>\`, or`,
            'value supplied to the "label" attribute, which will be displayed visually as placeholder text, or',
            'text content supplied in a <span> with slot="label", which will also be displayed visually as placeholder text.'
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
  // a helper to throw focus to the button is needed because Safari
  // won't include buttons in the tab order even with tabindex="0"
  render() {
    if (this.tooltipEl) {
      this.tooltipEl.disabled = this.open;
    }
    return html`
      <button
        aria-controls=${ifDefined(this.open ? "menu" : void 0)}
        aria-describedby="tooltip ${DESCRIPTION_ID}"
        aria-expanded=${this.open ? "true" : "false"}
        aria-haspopup="true"
        aria-labelledby="icon label applied-label pending-label"
        id="button"
        class=${ifDefined(
      this.labelAlignment ? `label-${this.labelAlignment}` : void 0
    )}
        @focus=${this.handleButtonFocus}
        @blur=${this.handleButtonBlur}
        @keydown=${{
      handleEvent: this.handleEnterKeydown,
      capture: true
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
  willUpdate(changes) {
    super.willUpdate(changes);
    if (changes.has("tabIndex") && !!this.tabIndex) {
      this.button.tabIndex = this.tabIndex;
      this.removeAttribute("tabindex");
    }
  }
  update(changes) {
    var _a, _b;
    if (this.selects) {
      this.selects = "single";
    }
    if (changes.has("disabled") && this.disabled) {
      this.close();
    }
    if (changes.has("pending") && this.pending) {
      this.close();
    }
    if (changes.has("value")) {
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
    super.update(changes);
  }
  /**
   * Binds the keydown event listener to the trigger button.
   * Called during first update to enable keyboard navigation.
   */
  bindButtonKeydownListener() {
    this.button.addEventListener("keydown", this.handleKeydown);
  }
  updated(changes) {
    super.updated(changes);
    if (changes.has("open") && this.overlayElement && !this.strategy.overlay) {
      this.strategy.overlay = this.overlayElement;
    }
  }
  async firstUpdated(changes) {
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
   * The event is intentionally non-composed so it fires on the picker host
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
  async getUpdateComplete() {
    const complete = await super.getUpdateComplete();
    await this.selectionPromise;
    return complete;
  }
  connectedCallback() {
    if (true) {
      window.__swc.warn(
        this,
        `PickerBase class is deprecated and will be removed in a future release. Use the ExpandableElement base class instead.`,
        "https://opensource.adobe.com/spectrum-web-components/components/picker/#deprecation",
        { level: "deprecation" }
      );
    }
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
}
__decorateClass([
  state()
], PickerBase.prototype, "appliedLabel", 2);
__decorateClass([
  property({ type: String, reflect: true })
], PickerBase.prototype, "icons", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], PickerBase.prototype, "invalid", 2);
__decorateClass([
  property({ type: String, attribute: "pending-label" })
], PickerBase.prototype, "pendingLabel", 2);
__decorateClass([
  property()
], PickerBase.prototype, "label", 2);
__decorateClass([
  state()
], PickerBase.prototype, "labelAlignment", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], PickerBase.prototype, "quiet", 2);
__decorateClass([
  property({ type: String })
], PickerBase.prototype, "value", 2);
__decorateClass([
  property({ attribute: false })
], PickerBase.prototype, "selectedItem", 1);
__decorateClass([
  state()
], PickerBase.prototype, "selectedItemContent", 1);
export class Picker extends SizedMixin(ExpandableElement, {
  noDefaultSize: true
}) {
  constructor() {
    super(...arguments);
    this.deprecatedMenu = null;
    this.invalid = false;
    this.pendingLabel = "Pending";
    /**
     * The selection mode for the picker's menu.
     * Always forced to `'single'` for standard picker behavior.
     */
    this.selects = "single";
    this.quiet = false;
    this.value = "";
    /** The ARIA role for the menu list element. */
    this.listRole = "listbox";
    /** The ARIA role for individual menu items. */
    this.itemRole = "option";
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
     * Enhanced keyboard handler that supports arrow key navigation to cycle
     * through options without opening the menu (in addition to base navigation).
     *
     * @param event - The keyboard event
     */
    this.handleKeydown = (event) => {
      var _a;
      const { key } = event;
      const handledKeys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Enter",
        " ",
        "Escape"
      ].includes(key);
      const openKeys = ["ArrowUp", "ArrowDown", "Enter", " "].includes(key);
      const arrowKeys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight"
      ].includes(key);
      this.focused = true;
      if ("Escape" === key) {
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
      const nextItem = (_a = this.optionsMenu) == null ? void 0 : _a.getNeighboringFocusableElement(
        this.selectedItem,
        key === "ArrowLeft"
      );
      if (!this.value || nextItem !== this.selectedItem) {
        if (nextItem) {
          this.setValueFromItem(nextItem);
        }
      }
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
    this.selectionPromise = Promise.resolve();
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
  }
  static get styles() {
    return [pickerStyles, chevronStyles];
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
    const styles = {};
    if (!this.quiet) {
      styles["min-width"] = `${this.offsetWidth}px`;
    }
    if (this.isMobile.matches) {
      styles["--swc-menu-width"] = "100%";
    }
    return styles;
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
   * Returns the content to render inside the picker button,
   * including the icon, label, validation icon, and chevron.
   */
  get buttonContent() {
    const labelClasses = {
      "visually-hidden": this.icons === "only" && !!this.value,
      placeholder: !this.value,
      label: true
    };
    const appliedLabel = this.appliedLabel || this.label;
    return [
      html`
        <span id="icon" ?hidden=${this.icons === "none"}>
          ${this.selectedItemContent.icon}
        </span>
        <span
          id=${ifDefined(this.value && this.selectedItem ? "label" : void 0)}
          class=${classMap(labelClasses)}
        >
          ${this.renderLabelContent(this.selectedItemContent.content)}
        </span>
        ${this.value && this.selectedItem ? html`
              <span
                aria-hidden="true"
                class="visually-hidden"
                id="applied-label"
              >
                ${appliedLabel}
                <slot name="label"></slot>
              </span>
            ` : html`
              <span hidden id="applied-label">${appliedLabel}</span>
            `}
        ${this.invalid && !this.pending ? html`
              <sp-icon-alert class="validation-icon"></sp-icon-alert>
            ` : nothing}
        ${this.pending ? html`
              ${this.renderLoader()}
              <span
                aria-hidden="true"
                class="visually-hidden"
                id="pending-label"
              >
                ${this.pendingLabel}
              </span>
            ` : nothing}
        <sp-icon-chevron100
          class="picker ${chevronClass[this.size]}"
        ></sp-icon-chevron100>
      `
    ];
  }
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
  hasAccessibleLabel() {
    var _a, _b, _c, _d, _e, _f, _g;
    const slotContent = ((_a = this.querySelector('[slot="label"]')) == null ? void 0 : _a.textContent) && ((_c = (_b = this.querySelector('[slot="label"]')) == null ? void 0 : _b.textContent) == null ? void 0 : _c.trim()) !== "";
    const slotAlt = ((_e = (_d = this.querySelector('[slot="label"]')) == null ? void 0 : _d.getAttribute("alt")) == null ? void 0 : _e.trim()) && ((_g = (_f = this.querySelector('[slot="label"]')) == null ? void 0 : _f.getAttribute("alt")) == null ? void 0 : _g.trim()) !== "";
    return !!this.label || !!this.getAttribute("aria-label") || !!this.getAttribute("aria-labelledby") || !!this.appliedLabel || !!slotContent || !!slotAlt;
  }
  /**
   * Logs a warning in debug mode when the picker lacks an accessible label.
   * Provides guidance on how to make the picker accessible.
   */
  warnNoLabel() {
    if (true) {
      window.__swc.warn(
        this,
        `<${this.localName}> needs one of the following to be accessible:`,
        "https://opensource.adobe.com/spectrum-web-components/components/picker/#accessibility",
        {
          type: "accessibility",
          issues: [
            `an <sp-field-label> element with a \`for\` attribute referencing the \`id\` of the \`<${this.localName}>\`, or`,
            'value supplied to the "label" attribute, which will be displayed visually as placeholder text, or',
            'text content supplied in a <span> with slot="label", which will also be displayed visually as placeholder text.'
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
  // a helper to throw focus to the button is needed because Safari
  // won't include buttons in the tab order even with tabindex="0"
  render() {
    if (this.tooltipEl) {
      this.tooltipEl.disabled = this.open;
    }
    return html`
      <button
        aria-controls=${ifDefined(this.open ? "menu" : void 0)}
        aria-describedby="tooltip ${DESCRIPTION_ID}"
        aria-expanded=${this.open ? "true" : "false"}
        aria-haspopup="true"
        aria-labelledby="icon label applied-label pending-label"
        id="button"
        class=${ifDefined(
      this.labelAlignment ? `label-${this.labelAlignment}` : void 0
    )}
        @focus=${this.handleButtonFocus}
        @blur=${this.handleButtonBlur}
        @keydown=${{
      handleEvent: this.handleEnterKeydown,
      capture: true
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
  willUpdate(changes) {
    super.willUpdate(changes);
    if (changes.has("tabIndex") && !!this.tabIndex) {
      this.button.tabIndex = this.tabIndex;
      this.removeAttribute("tabindex");
    }
  }
  update(changes) {
    var _a, _b;
    if (this.selects) {
      this.selects = "single";
    }
    if (changes.has("disabled") && this.disabled) {
      this.close();
    }
    if (changes.has("pending") && this.pending) {
      this.close();
    }
    if (changes.has("value")) {
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
    super.update(changes);
  }
  /**
   * Binds the keydown event listener to the trigger button.
   * Called during first update to enable keyboard navigation.
   */
  bindButtonKeydownListener() {
    this.button.addEventListener("keydown", this.handleKeydown);
  }
  updated(changes) {
    super.updated(changes);
    if (changes.has("open") && this.overlayElement && !this.strategy.overlay) {
      this.strategy.overlay = this.overlayElement;
    }
  }
  async firstUpdated(changes) {
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
   * The event is intentionally non-composed so it fires on the picker host
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
  async getUpdateComplete() {
    const complete = await super.getUpdateComplete();
    await this.selectionPromise;
    return complete;
  }
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
}
__decorateClass([
  state()
], Picker.prototype, "appliedLabel", 2);
__decorateClass([
  property({ type: String, reflect: true })
], Picker.prototype, "icons", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Picker.prototype, "invalid", 2);
__decorateClass([
  property({ type: String, attribute: "pending-label" })
], Picker.prototype, "pendingLabel", 2);
__decorateClass([
  property()
], Picker.prototype, "label", 2);
__decorateClass([
  state()
], Picker.prototype, "labelAlignment", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Picker.prototype, "quiet", 2);
__decorateClass([
  property({ type: String })
], Picker.prototype, "value", 2);
__decorateClass([
  property({ attribute: false })
], Picker.prototype, "selectedItem", 1);
__decorateClass([
  state()
], Picker.prototype, "selectedItemContent", 1);
//# sourceMappingURL=Picker.dev.js.map
