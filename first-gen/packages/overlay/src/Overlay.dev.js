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
  html
} from "@spectrum-web-components/base";
import {
  property,
  query,
  queryAssignedElements,
  state
} from "@spectrum-web-components/base/src/decorators.js";
import {
  ElementResolutionController,
  elementResolverUpdatedSymbol
} from "@spectrum-web-components/reactive-controllers/src/ElementResolution.js";
import {
  ifDefined,
  styleMap
} from "@spectrum-web-components/base/src/directives.js";
import { randomID } from "@spectrum-web-components/shared/src/random-id.js";
import { AbstractOverlay, nextFrame } from "./AbstractOverlay.dev.js";
import { OverlayPopover } from "./OverlayPopover.dev.js";
import { OverlayNoPopover } from "./OverlayNoPopover.dev.js";
import { overlayStack } from "./OverlayStack.dev.js";
import { VirtualTrigger } from "./VirtualTrigger.dev.js";
import { PlacementController } from "./PlacementController.dev.js";
export { LONGPRESS_INSTRUCTIONS } from "./LongpressController.dev.js";
import { strategies } from "./strategies.dev.js";
import {
  removeSlottableRequest,
  SlottableRequestEvent
} from "./slottable-request-event.dev.js";
import styles from "./overlay.css.js";
const browserSupportsPopover = "showPopover" in document.createElement("div");
let ComputedOverlayBase = OverlayPopover(AbstractOverlay);
if (!browserSupportsPopover) {
  ComputedOverlayBase = OverlayNoPopover(AbstractOverlay);
}
const _Overlay = class _Overlay extends ComputedOverlayBase {
  constructor() {
    super(...arguments);
    this._delayed = false;
    this._disabled = false;
    this.offset = 0;
    this._open = false;
    /**
     * The state in which the last `request-slottable` event was dispatched.
     *
     * This property ensures that overlays do not dispatch the same state twice in a row.
     *
     * @type {boolean}
     * @default false
     */
    this.lastRequestSlottableState = false;
    this.receivesFocus = "auto";
    this._state = "closed";
    this.triggerElement = null;
    this.type = "auto";
    /**
     * Tracks whether the overlay was previously open.
     * This is used to restore the open state when re-enabling the overlay.
     *
     * @type {boolean}
     * @default false
     */
    this.wasOpen = false;
    /**
     * Focus trap to keep focus within the dialog
     * @private
     */
    this._focusTrap = null;
    /**
     * Handles the focus out event to close the overlay if the focus moves outside of it.
     *
     * This method ensures that the overlay is closed when the focus moves to an element
     * outside of the overlay, unless the focus is moved to a related element.
     *
     * @private
     * @param {FocusEvent} event - The focus out event.
     */
    this.closeOnFocusOut = (event) => {
      if (!event.relatedTarget) {
        return;
      }
      const relationEvent = new Event("overlay-relation-query", {
        bubbles: true,
        composed: true
      });
      event.relatedTarget.addEventListener(
        relationEvent.type,
        (event2) => {
          const path = event2.composedPath();
          const isWithinOverlay = path.some((el) => el === this);
          if (!isWithinOverlay) {
            this.open = false;
          }
        }
      );
      event.relatedTarget.dispatchEvent(relationEvent);
    };
    this.closeOnCancelEvent = () => {
      this.open = false;
    };
  }
  get delayed() {
    var _a;
    return ((_a = this.elements.at(-1)) == null ? void 0 : _a.hasAttribute("delayed")) || this._delayed;
  }
  set delayed(delayed) {
    this._delayed = delayed;
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(disabled) {
    var _a;
    this._disabled = disabled;
    if (disabled) {
      (_a = this.strategy) == null ? void 0 : _a.abort();
      this.wasOpen = this.open;
      this.open = false;
    } else {
      this.bindEvents();
      this.open = this.open || this.wasOpen;
      this.wasOpen = false;
    }
  }
  /**
   * Determines if the overlay has a non-virtual trigger element.
   *
   * @returns {boolean} `true` if the trigger element is not a virtual trigger, otherwise `false`.
   */
  get hasNonVirtualTrigger() {
    return !!this.triggerElement && !(this.triggerElement instanceof VirtualTrigger);
  }
  /**
   * Provides an instance of the `PlacementController` for managing the positioning
   * of the overlay relative to its trigger element.
   *
   * If the `PlacementController` instance does not already exist, it is created and
   * assigned to the `_placementController` property.
   *
   * @protected
   * @returns {PlacementController} The `PlacementController` instance.
   */
  get placementController() {
    if (!this._placementController) {
      this._placementController = new PlacementController(this);
    }
    return this._placementController;
  }
  get open() {
    return this._open;
  }
  set open(open) {
    var _a;
    if (open && this.disabled) return;
    if (open === this.open) return;
    if (((_a = this.strategy) == null ? void 0 : _a.activelyOpening) && !open) return;
    this._open = open;
    if (this.open) {
      _Overlay.openCount += 1;
    }
    this.requestUpdate("open", !this.open);
    if (this.open) {
      this.requestSlottable();
    }
  }
  get state() {
    return this._state;
  }
  set state(state2) {
    var _a;
    if (state2 === this.state) return;
    const oldState = this.state;
    this._state = state2;
    if (this.state === "opened" || this.state === "closed") {
      (_a = this.strategy) == null ? void 0 : _a.shouldCompleteOpen();
    }
    this.requestUpdate("state", oldState);
  }
  /**
   * Provides an instance of the `ElementResolutionController` for managing the element
   * that the overlay should be associated with. If the instance does not already exist,
   * it is created and assigned to the `_elementResolver` property.
   *
   * @protected
   * @returns {ElementResolutionController} The `ElementResolutionController` instance.
   */
  get elementResolver() {
    if (!this._elementResolver) {
      this._elementResolver = new ElementResolutionController(this);
    }
    return this._elementResolver;
  }
  /**
   * Determines the value for the popover attribute based on the overlay type.
   *
   * @private
   * @returns {'auto' | 'manual' | undefined} The popover value or undefined if not applicable.
   */
  get popoverValue() {
    const hasPopoverAttribute = "popover" in this;
    if (!hasPopoverAttribute) {
      return void 0;
    }
    switch (this.type) {
      case "modal":
        return "auto";
      case "page":
        return "manual";
      case "hint":
        return "manual";
      default:
        return this.type;
    }
  }
  /**
   * Determines if the overlay requires positioning based on its type and state.
   *
   * @protected
   * @returns {boolean} True if the overlay requires positioning, otherwise false.
   */
  get requiresPositioning() {
    if (this.type === "page" || !this.open) return false;
    if (!this.triggerElement || !this.placement && this.type !== "hint")
      return false;
    return true;
  }
  /**
   * Manages the positioning of the overlay relative to its trigger element.
   *
   * This method calculates the necessary parameters for positioning the overlay,
   * such as offset, placement, and tip padding, and then delegates the actual
   * positioning to the `PlacementController`.
   *
   * @protected
   * @override
   */
  managePosition() {
    if (!this.requiresPositioning || !this.open) return;
    const offset = this.offset || 0;
    const trigger = this.triggerElement;
    const placement = this.placement || "right";
    const tipPadding = this.tipPadding;
    this.placementController.placeOverlay(this.dialogEl, {
      offset,
      placement,
      tipPadding,
      trigger,
      type: this.type
    });
  }
  /**
   * Manages the process of opening the popover.
   *
   * This method handles the necessary steps to open the popover, including managing delays,
   * ensuring the popover is in the DOM, making transitions, and applying focus.
   *
   * @protected
   * @override
   * @returns {Promise<void>} A promise that resolves when the popover has been fully opened.
   */
  async managePopoverOpen() {
    super.managePopoverOpen();
    const targetOpenState = this.open;
    if (this.open !== targetOpenState) {
      return;
    }
    await this.manageDelay(targetOpenState);
    if (this.open !== targetOpenState) {
      return;
    }
    if (this.triggerInteraction === "longpress") {
      await nextFrame();
    }
    await this.ensureOnDOM(targetOpenState);
    if (this.open !== targetOpenState) {
      return;
    }
    const focusEl = await this.makeTransition(targetOpenState);
    if (this.open !== targetOpenState) {
      return;
    }
    if (targetOpenState) {
      const focusTrap = await import("focus-trap");
      this._focusTrap = focusTrap.createFocusTrap(this.dialogEl, {
        initialFocus: focusEl || void 0,
        tabbableOptions: {
          getShadowRoot: true
        },
        fallbackFocus: () => {
          this.dialogEl.setAttribute("tabIndex", "-1");
          return this.dialogEl;
        },
        // disable escape key capture to close the overlay, the focus-trap library captures it otherwise
        escapeDeactivates: false
      });
      if (this.type === "modal" || this.type === "page") {
        this._focusTrap.activate();
      }
    }
    await this.applyFocus(targetOpenState, focusEl);
  }
  /**
   * Applies focus to the appropriate element after the popover has been opened.
   *
   * This method handles the focus management for the overlay, ensuring that the correct
   * element receives focus based on the overlay's type and state.
   *
   * @protected
   * @override
   * @param {boolean} targetOpenState - The target open state of the overlay.
   * @param {HTMLElement | null} focusEl - The element to focus after opening the popover.
   * @returns {Promise<void>} A promise that resolves when the focus has been applied.
   */
  async applyFocus(targetOpenState, focusEl) {
    if (this.receivesFocus === "false" || this.type === "hint") {
      return;
    }
    await nextFrame();
    await nextFrame();
    if (targetOpenState === this.open && !this.open) {
      if (this.hasNonVirtualTrigger && this.contains(this.getRootNode().activeElement)) {
        this.triggerElement.focus();
      }
      return;
    }
    focusEl == null ? void 0 : focusEl.focus();
  }
  /**
   * Returns focus to the trigger element if the overlay is closed.
   *
   * This method ensures that focus is returned to the trigger element when the overlay is closed,
   * unless the overlay is of type "hint" or the focus is already outside the overlay.
   *
   * @protected
   * @override
   */
  returnFocus() {
    var _a;
    if (this.open || this.type === "hint") return;
    const getAncestors = () => {
      var _a2, _b;
      const ancestors = [];
      let currentNode = document.activeElement;
      while ((_a2 = currentNode == null ? void 0 : currentNode.shadowRoot) == null ? void 0 : _a2.activeElement) {
        currentNode = currentNode.shadowRoot.activeElement;
      }
      while (currentNode) {
        const ancestor = currentNode.assignedSlot || currentNode.parentElement || ((_b = currentNode.getRootNode()) == null ? void 0 : _b.host);
        if (ancestor) {
          ancestors.push(ancestor);
        }
        currentNode = ancestor;
      }
      return ancestors;
    };
    if (this.receivesFocus !== "false" && !!((_a = this.triggerElement) == null ? void 0 : _a.focus) && (this.contains(this.getRootNode().activeElement) || getAncestors().includes(this) || // eslint-disable-next-line @spectrum-web-components/document-active-element
    document.activeElement === document.body)) {
      this.triggerElement.focus();
    }
  }
  /**
   * Manages the process of opening or closing the overlay.
   *
   * This method handles the necessary steps to open or close the overlay, including updating the state,
   * managing the overlay stack, and handling focus events.
   *
   * @protected
   * @param {boolean} oldOpen - The previous open state of the overlay.
   * @returns {Promise<void>} A promise that resolves when the overlay has been fully managed.
   */
  async manageOpen(oldOpen) {
    var _a;
    if (!this.isConnected && this.open) return;
    if (!this.hasUpdated) {
      await this.updateComplete;
    }
    if (this.open) {
      overlayStack.add(this);
      if (this.willPreventClose) {
        document.addEventListener(
          "pointerup",
          () => {
            this.dialogEl.classList.toggle(
              "not-immediately-closable",
              false
            );
            this.willPreventClose = false;
          },
          { once: true }
        );
        this.dialogEl.classList.toggle(
          "not-immediately-closable",
          true
        );
      }
    } else {
      if (oldOpen) {
        (_a = this._focusTrap) == null ? void 0 : _a.deactivate();
        this._focusTrap = null;
        this.dispose();
      }
      overlayStack.remove(this);
    }
    if (this.open && this.state !== "opened") {
      this.state = "opening";
    } else if (!this.open && this.state !== "closed") {
      this.state = "closing";
    }
    this.managePopoverOpen();
    const listenerRoot = this.getRootNode();
    if (this.type === "auto") {
      if (this.open) {
        listenerRoot.addEventListener(
          "focusout",
          this.closeOnFocusOut,
          { capture: true }
        );
      } else {
        listenerRoot.removeEventListener(
          "focusout",
          this.closeOnFocusOut,
          { capture: true }
        );
      }
    }
    if (this.type === "modal" || this.type === "page") {
      if (this.open) {
        listenerRoot.addEventListener(
          "cancel",
          this.closeOnCancelEvent,
          {
            capture: true
          }
        );
      } else {
        listenerRoot.removeEventListener(
          "cancel",
          this.closeOnCancelEvent,
          {
            capture: true
          }
        );
      }
    }
  }
  /**
   * Binds event handling strategies to the overlay based on the specified trigger interaction.
   *
   * This method sets up the appropriate event handling strategy for the overlay, ensuring that
   * it responds correctly to user interactions such as clicks, hovers, or long presses.
   *
   * @protected
   */
  bindEvents() {
    var _a;
    (_a = this.strategy) == null ? void 0 : _a.abort();
    this.strategy = void 0;
    if (!this.hasNonVirtualTrigger) return;
    if (!this.triggerInteraction) return;
    this.strategy = new strategies[this.triggerInteraction](
      this.triggerElement,
      {
        overlay: this
      }
    );
  }
  /**
   * Handles the `beforetoggle` event to manage the overlay's state.
   *
   * This method checks the new state of the event and calls `handleBrowserClose`
   * if the new state is not 'open'.
   *
   * @protected
   * @param {Event & { newState: string }} event - The `beforetoggle` event with the new state.
   */
  handleBeforetoggle(event) {
    if (event.newState !== "open") {
      this.handleBrowserClose(event);
    }
  }
  /**
   * Handles the browser's close event to manage the overlay's state.
   *
   * This method stops the propagation of the event and closes the overlay if it is not
   * actively opening. If the overlay is actively opening, it calls `manuallyKeepOpen`.
   *
   * @protected
   * @param {Event} event - The browser's close event.
   */
  handleBrowserClose(event) {
    var _a;
    event.stopPropagation();
    if (!((_a = this.strategy) == null ? void 0 : _a.activelyOpening)) {
      this.open = false;
      return;
    }
    this.manuallyKeepOpen();
  }
  /**
   * Manually keeps the overlay open.
   *
   * This method sets the overlay to open, allows placement updates, and manages the open state.
   *
   * @public
   * @override
   */
  manuallyKeepOpen() {
    this.open = true;
    this.placementController.allowPlacementUpdate = true;
    this.manageOpen(false);
  }
  /**
   * Handles the `slotchange` event to manage the overlay's state.
   *
   * This method checks if there are any elements in the slot. If there are no elements,
   * it releases the description from the strategy. If there are elements and the trigger
   * is non-virtual, it prepares the description for the trigger element.
   *
   * @protected
   */
  handleSlotchange() {
    var _a, _b;
    if (!this.elements.length) {
      (_a = this.strategy) == null ? void 0 : _a.releaseDescription();
    } else if (this.hasNonVirtualTrigger) {
      (_b = this.strategy) == null ? void 0 : _b.prepareDescription(
        this.triggerElement
      );
    }
  }
  /**
   * Determines whether the overlay should prevent closing.
   *
   * This method checks the `willPreventClose` flag and resets it to `false`.
   * It returns the value of the `willPreventClose` flag.
   *
   * @public
   * @returns {boolean} `true` if the overlay should prevent closing, otherwise `false`.
   */
  shouldPreventClose() {
    const shouldPreventClose = this.willPreventClose;
    this.willPreventClose = false;
    return shouldPreventClose;
  }
  /**
   * Requests slottable content for the overlay.
   *
   * This method dispatches a `SlottableRequestEvent` to request or remove slottable content
   * based on the current open state of the overlay. It ensures that the same state is not
   * dispatched twice in a row.
   *
   * @protected
   * @override
   */
  requestSlottable() {
    if (this.lastRequestSlottableState === this.open) {
      return;
    }
    if (!this.open) {
      document.body.offsetHeight;
    }
    this.dispatchEvent(
      new SlottableRequestEvent(
        "overlay-content",
        this.open ? {} : removeSlottableRequest
      )
    );
    this.lastRequestSlottableState = this.open;
  }
  /**
   * Lifecycle method called before the component updates.
   *
   * This method handles various tasks before the component updates, such as setting an ID,
   * managing the open state, resolving the trigger element, and binding events.
   *
   * @override
   * @param {PropertyValues} changes - The properties that have changed.
   */
  willUpdate(changes) {
    var _a;
    if (!this.hasAttribute("id")) {
      this.setAttribute(
        "id",
        `${this.tagName.toLowerCase()}-${randomID()}`
      );
    }
    if (changes.has("open") && (this.hasUpdated || this.open)) {
      this.manageOpen(changes.get("open"));
    }
    if (changes.has("trigger")) {
      const [id, interaction] = ((_a = this.trigger) == null ? void 0 : _a.split("@")) || [];
      this.elementResolver.selector = id ? `#${id}` : "";
      this.triggerInteraction = interaction;
    }
    let oldTrigger = false;
    if (changes.has(elementResolverUpdatedSymbol)) {
      oldTrigger = this.triggerElement;
      this.triggerElement = this.elementResolver.element;
    }
    if (changes.has("triggerElement")) {
      oldTrigger = changes.get("triggerElement");
    }
    if (oldTrigger !== false) {
      this.bindEvents();
    }
  }
  /**
   * Lifecycle method called after the component updates.
   *
   * This method handles various tasks after the component updates, such as updating the placement
   * attribute, resetting the overlay position, and clearing the overlay position based on the state.
   *
   * @override
   * @param {PropertyValues} changes - The properties that have changed.
   */
  updated(changes) {
    super.updated(changes);
    if (changes.has("placement")) {
      if (this.placement) {
        this.dialogEl.setAttribute("actual-placement", this.placement);
      } else {
        this.dialogEl.removeAttribute("actual-placement");
      }
      if (this.open && typeof changes.get("placement") !== "undefined") {
        this.placementController.resetOverlayPosition();
      }
    }
    if (changes.has("state") && this.state === "closed" && typeof changes.get("state") !== "undefined") {
      this.placementController.clearOverlayPosition();
    }
  }
  /**
   * Renders the content of the overlay.
   *
   * This method returns a template result containing a slot element. The slot element
   * listens for the `slotchange` event to manage the overlay's state.
   *
   * @protected
   * @returns {TemplateResult} The template result containing the slot element.
   */
  renderContent() {
    return html`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `;
  }
  /**
   * Generates a style map for the dialog element.
   *
   * This method returns an object containing CSS custom properties for the dialog element.
   * The `--swc-overlay-open-count` custom property is set to the current open count of overlays.
   *
   * @private
   * @returns {StyleInfo} The style map for the dialog element.
   */
  get dialogStyleMap() {
    return {
      "--swc-overlay-open-count": _Overlay.openCount.toString()
    };
  }
  /**
   * Renders the popover element for the overlay.
   *
   * This method returns a template result containing a div element styled as a popover.
   * The popover element includes various attributes and event listeners to manage the overlay's state and behavior.
   *
   * @protected
   * @returns {TemplateResult} The template result containing the popover element.
   */
  renderPopover() {
    return html`
            <div
                class="dialog"
                part="dialog"
                role=${ifDefined(
      this.type === "modal" || this.type === "page" ? "dialog" : void 0
    )}
                aria-modal=${ifDefined(
      this.type === "modal" || this.type === "page" ? "true" : void 0
    )}
                placement=${ifDefined(
      this.requiresPositioning ? this.placement || "right" : void 0
    )}
                popover=${ifDefined(this.popoverValue)}
                style=${styleMap(this.dialogStyleMap)}
                @beforetoggle=${this.handleBeforetoggle}
                @close=${this.handleBrowserClose}
                ?is-visible=${this.state !== "closed"}
            >
                ${this.renderContent()}
            </div>
        `;
  }
  /**
   * Renders the overlay component.
   *
   * This method returns a template result containing either a dialog or popover element
   * based on the overlay type. It also includes a slot for longpress descriptors.
   *
   * @override
   * @returns {TemplateResult} The template result containing the overlay content.
   */
  render() {
    return html`
            ${this.renderPopover()}
            <slot name="longpress-describedby-descriptor"></slot>
        `;
  }
  /**
   * Lifecycle method called when the component is added to the DOM.
   *
   * This method sets up event listeners and binds events if the component has already updated.
   *
   * @override
   */
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("close", () => {
      this.open = false;
    });
    if (this.hasUpdated) {
      this.bindEvents();
    }
  }
  /**
   * Lifecycle method called when the component is removed from the DOM.
   *
   * This method releases the description from the strategy and updates the 'open' property.
   *
   * @override
   */
  disconnectedCallback() {
    var _a;
    (_a = this.strategy) == null ? void 0 : _a.releaseDescription();
    this.open = false;
    super.disconnectedCallback();
  }
};
_Overlay.styles = [styles];
/**
 * Tracks the number of overlays that have been opened.
 *
 * This static property is used to manage the stacking context of multiple overlays.
 *
 * @type {number}
 * @default 1
 */
_Overlay.openCount = 1;
__decorateClass([
  property({ type: Boolean })
], _Overlay.prototype, "delayed", 1);
__decorateClass([
  query(".dialog")
], _Overlay.prototype, "dialogEl", 2);
__decorateClass([
  property({ type: Boolean })
], _Overlay.prototype, "disabled", 1);
__decorateClass([
  queryAssignedElements({
    flatten: true,
    selector: ':not([slot="longpress-describedby-descriptor"], slot)'
  })
], _Overlay.prototype, "elements", 2);
__decorateClass([
  property({ type: Number })
], _Overlay.prototype, "offset", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], _Overlay.prototype, "open", 1);
__decorateClass([
  property()
], _Overlay.prototype, "placement", 2);
__decorateClass([
  property({ attribute: "receives-focus" })
], _Overlay.prototype, "receivesFocus", 2);
__decorateClass([
  query("slot")
], _Overlay.prototype, "slotEl", 2);
__decorateClass([
  state()
], _Overlay.prototype, "state", 1);
__decorateClass([
  property({ type: Number, attribute: "tip-padding" })
], _Overlay.prototype, "tipPadding", 2);
__decorateClass([
  property()
], _Overlay.prototype, "trigger", 2);
__decorateClass([
  property({ attribute: false })
], _Overlay.prototype, "triggerElement", 2);
__decorateClass([
  property({ attribute: false })
], _Overlay.prototype, "triggerInteraction", 2);
__decorateClass([
  property()
], _Overlay.prototype, "type", 2);
export let Overlay = _Overlay;
//# sourceMappingURL=Overlay.dev.js.map
