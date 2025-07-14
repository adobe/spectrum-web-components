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
  render,
  SizedMixin,
  SpectrumElement
} from "@spectrum-web-components/base";
import {
  classMap,
  ifDefined,
  styleMap
} from "@spectrum-web-components/base/src/directives.js";
import {
  property,
  query,
  state
} from "@spectrum-web-components/base/src/decorators.js";
import pickerStyles from "./picker.css.js";
import chevronStyles from "@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js";
import "@spectrum-web-components/menu/sp-menu.js";
import {
  IS_MOBILE,
  MatchMediaController
} from "@spectrum-web-components/reactive-controllers/src/MatchMedia.js";
import { DependencyManagerController } from "@spectrum-web-components/reactive-controllers/src/DependencyManger.js";
import { PendingStateController } from "@spectrum-web-components/reactive-controllers/src/PendingState.js";
import { strategies } from "./strategies.dev.js";
const chevronClass = {
  s: "spectrum-UIIcon-ChevronDown75",
  m: "spectrum-UIIcon-ChevronDown100",
  l: "spectrum-UIIcon-ChevronDown200",
  xl: "spectrum-UIIcon-ChevronDown300"
};
export const DESCRIPTION_ID = "option-picker";
export class PickerBase extends SizedMixin(SpectrumElement, {
  noDefaultSize: true
}) {
  /**
   * Initializes the `PendingStateController` for the Picker component.
   * The `PendingStateController` manages the pending state of the Picker.
   */
  constructor() {
    super();
    this.isMobile = new MatchMediaController(this, IS_MOBILE);
    this.dependencyManager = new DependencyManagerController(this);
    this.deprecatedMenu = null;
    this.disabled = false;
    this.focused = false;
    this.invalid = false;
    this.forcePopover = false;
    this.pending = false;
    this.pendingLabel = "Pending";
    this.open = false;
    this.readonly = false;
    this.selects = "single";
    this.placement = "bottom-start";
    this.quiet = false;
    this.value = "";
    this.listRole = "listbox";
    this.itemRole = "option";
    this.handleEscape = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        event.preventDefault();
        this.toggle(false);
      }
    };
    this.handleKeydown = (event) => {
      this.focused = true;
      if (!["ArrowUp", "ArrowDown", "Enter", " ", "Escape"].includes(
        event.key
      )) {
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
    this.handleSlottableRequest = (_event) => {
    };
    this.applyFocusElementLabel = (value, labelElement) => {
      this.appliedLabel = value;
      this.labelAlignment = labelElement.sideAligned ? "inline" : void 0;
    };
    this.hasRenderedOverlay = false;
    /**
     * whether a selection change is already scheduled
     */
    this.willManageSelection = false;
    this.selectionPromise = Promise.resolve();
    this.recentlyConnected = false;
    this.enterKeydownOn = null;
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
    this.pendingStateController = new PendingStateController(this);
  }
  get menuItems() {
    return this.optionsMenu.childItems;
  }
  /**
   * @deprecated
   * */
  get selfManageFocusElement() {
    return true;
  }
  get selectedItem() {
    return this._selectedItem;
  }
  set selectedItem(selectedItem) {
    this.selectedItemContent = selectedItem ? selectedItem.itemChildren : void 0;
    if (selectedItem === this.selectedItem) return;
    const oldSelectedItem = this.selectedItem;
    this._selectedItem = selectedItem;
    this.requestUpdate("selectedItem", oldSelectedItem);
  }
  get focusElement() {
    if (this.open) {
      return this.optionsMenu;
    }
    return this.button;
  }
  forceFocusVisible() {
    if (this.disabled) {
      return;
    }
    this.focused = true;
  }
  // handled by interaction controller, desktop or mobile; this is only called with a programmatic this.click()
  click() {
    this.toggle();
  }
  // pointer events handled by interaction controller, desktop or mobile; this is only called with a programmatic this.button.click()
  handleButtonClick() {
    if (this.disabled) {
      return;
    }
    this.toggle();
  }
  handleButtonBlur() {
    this.focused = false;
  }
  focus(options) {
    var _a;
    (_a = this.focusElement) == null ? void 0 : _a.focus(options);
  }
  /**
   * @deprecated - Use `focus` instead.
   */
  handleHelperFocus() {
    this.focused = true;
    this.button.focus();
  }
  handleFocus() {
    if (!this.disabled && this.focusElement) {
      this.focused = this.hasVisibleFocusInTree();
    }
  }
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
  handleButtonFocus(event) {
    var _a;
    (_a = this.strategy) == null ? void 0 : _a.handleButtonFocus(event);
  }
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
  setMenuItemSelected(item, value) {
    if (this.selects == null) return;
    item.selected = value;
  }
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
  close() {
    if (this.readonly) {
      return;
    }
    if (this.strategy) {
      this.open = false;
      this.strategy.open = false;
    }
  }
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
    if (selectedItemContent === this.selectedItemContent) return;
    const oldContent = this.selectedItemContent;
    this._selectedItemContent = selectedItemContent;
    this.requestUpdate("selectedItemContent", oldContent);
  }
  handleTooltipSlotchange(event) {
    this.tooltipEl = event.target.assignedElements()[0];
  }
  renderLabelContent(content) {
    if (this.value && this.selectedItem) {
      return content;
    }
    return html`
            <slot name="label" id="label">
                <span
                    aria-hidden=${ifDefined(
      this.appliedLabel ? void 0 : "true"
    )}
                >
                    ${this.label}
                </span>
            </slot>
        `;
  }
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
                    id=${ifDefined(
        this.value && this.selectedItem ? "label" : void 0
      )}
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
                          <sp-icon-alert
                              class="validation-icon"
                          ></sp-icon-alert>
                      ` : nothing}
                ${this.pendingStateController.renderPendingState()}
                <sp-icon-chevron100
                    class="picker ${chevronClass[this.size]}"
                ></sp-icon-chevron100>
            `
    ];
  }
  hasAccessibleLabel() {
    var _a, _b, _c, _d, _e, _f, _g;
    const slotContent = ((_a = this.querySelector('[slot="label"]')) == null ? void 0 : _a.textContent) && ((_c = (_b = this.querySelector('[slot="label"]')) == null ? void 0 : _b.textContent) == null ? void 0 : _c.trim()) !== "";
    const slotAlt = ((_e = (_d = this.querySelector('[slot="label"]')) == null ? void 0 : _d.getAttribute("alt")) == null ? void 0 : _e.trim()) && ((_g = (_f = this.querySelector('[slot="label"]')) == null ? void 0 : _f.getAttribute("alt")) == null ? void 0 : _g.trim()) !== "";
    return !!this.label || !!this.getAttribute("aria-label") || !!this.getAttribute("aria-labelledby") || !!this.appliedLabel || !!slotContent || !!slotAlt;
  }
  warnNoLabel() {
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
  renderOverlay(menu) {
    var _a, _b, _c;
    if (((_a = this.strategy) == null ? void 0 : _a.overlay) === void 0) {
      return menu;
    }
    const container = this.renderContainer(menu);
    render(container, (_b = this.strategy) == null ? void 0 : _b.overlay, {
      host: this
    });
    return (_c = this.strategy) == null ? void 0 : _c.overlay;
  }
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
                aria-labelledby="loader icon label applied-label"
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
  bindButtonKeydownListener() {
    this.button.addEventListener("keydown", this.handleKeydown);
  }
  updated(changes) {
    super.updated(changes);
    if (changes.has("open")) {
      this.strategy.open = this.open;
    }
  }
  firstUpdated(changes) {
    super.firstUpdated(changes);
    this.bindButtonKeydownListener();
    this.bindEvents();
  }
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
  onScroll() {
    this.dispatchEvent(
      new Event("scroll", {
        cancelable: true,
        composed: true
      })
    );
  }
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
   * when the value changes or the menu slot changes, manage the selection on the next frame, if not already scheduled
   * @param event
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
   * when an item is added or updated, manage the selection, if it's not already scheduled
   */
  shouldManageSelection() {
    if (this.willManageSelection) {
      return;
    }
    this.willManageSelection = true;
    this.manageSelection();
  }
  /**
   * updates menu selection based on value
   */
  async manageSelection() {
    if (this.selects == null) return;
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
      this.value = "";
      this.selectedItem = void 0;
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
  bindEvents() {
    var _a;
    (_a = this.strategy) == null ? void 0 : _a.abort();
    if (this.isMobile.matches) {
      this.strategy = new strategies["mobile"](this.button, this);
    } else {
      this.strategy = new strategies["desktop"](this.button, this);
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      var _a;
      if (!((_a = this.tooltipEl) == null ? void 0 : _a.selfManaged)) {
        return;
      }
      const overlayElement = this.tooltipEl.overlayElement;
      if (overlayElement) {
        overlayElement.triggerElement = this.button;
      }
    });
    this.recentlyConnected = this.hasUpdated;
    this.addEventListener("focus", this.handleFocus);
  }
  disconnectedCallback() {
    var _a;
    this.close();
    (_a = this.strategy) == null ? void 0 : _a.releaseDescription();
    super.disconnectedCallback();
  }
}
PickerBase.shadowRootOptions = {
  ...SpectrumElement.shadowRootOptions,
  delegatesFocus: true
};
__decorateClass([
  state()
], PickerBase.prototype, "appliedLabel", 2);
__decorateClass([
  query("#button")
], PickerBase.prototype, "button", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], PickerBase.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], PickerBase.prototype, "focused", 2);
__decorateClass([
  property({ type: String, reflect: true })
], PickerBase.prototype, "icons", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], PickerBase.prototype, "invalid", 2);
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "force-popover" })
], PickerBase.prototype, "forcePopover", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], PickerBase.prototype, "pending", 2);
__decorateClass([
  property({ type: String, attribute: "pending-label" })
], PickerBase.prototype, "pendingLabel", 2);
__decorateClass([
  property()
], PickerBase.prototype, "label", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], PickerBase.prototype, "open", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], PickerBase.prototype, "readonly", 2);
__decorateClass([
  state()
], PickerBase.prototype, "labelAlignment", 2);
__decorateClass([
  query("sp-menu")
], PickerBase.prototype, "optionsMenu", 2);
__decorateClass([
  query("sp-overlay")
], PickerBase.prototype, "overlayElement", 2);
__decorateClass([
  property()
], PickerBase.prototype, "placement", 2);
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
export class Picker extends PickerBase {
  constructor() {
    super(...arguments);
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
        return;
      }
      event.preventDefault();
      const nextItem = (_a = this.optionsMenu) == null ? void 0 : _a.getNeighboringFocusableElement(
        this.selectedItem,
        key === "ArrowLeft"
      );
      if (!this.value || nextItem !== this.selectedItem) {
        if (!!nextItem) this.setValueFromItem(nextItem);
      }
    };
  }
  static get styles() {
    return [pickerStyles, chevronStyles];
  }
  get containerStyles() {
    const styles = super.containerStyles;
    if (!this.quiet) {
      styles["min-width"] = `${this.offsetWidth}px`;
    }
    return styles;
  }
}
//# sourceMappingURL=Picker.dev.js.map
