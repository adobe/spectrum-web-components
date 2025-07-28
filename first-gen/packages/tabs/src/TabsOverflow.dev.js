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
  SizedMixin,
  SpectrumElement
} from "@spectrum-web-components/base";
import {
  property,
  query,
  queryAssignedElements,
  state
} from "@spectrum-web-components/base/src/decorators.js";
import { classMap } from "@spectrum-web-components/base/src/directives.js";
import { ResizeController } from "@lit-labs/observers/resize-controller.js";
import "@spectrum-web-components/action-button/sp-action-button.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js";
import chevronIconStyles from "@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js";
import tabSizes from "./tabs-sizes.css.js";
import styles from "./tabs-overflow.css.js";
export class TabsOverflow extends SizedMixin(SpectrumElement) {
  constructor() {
    super();
    this.compact = false;
    this.labelPrevious = "Scroll to previous tabs";
    this.labelNext = "Scroll to next tabs";
    this.overflowState = {
      canScrollLeft: false,
      canScrollRight: false
    };
    this.scrollFactor = 0.5;
    this.resizeController = new ResizeController(this, {
      target: this,
      callback: () => {
        this._updateScrollState();
      }
    });
  }
  static get styles() {
    return [styles, tabSizes, chevronIconStyles];
  }
  get scrollContent() {
    return this.tabs;
  }
  firstUpdated(changes) {
    super.firstUpdated(changes);
    const [tabs] = this.scrollContent;
    if (tabs) {
      tabs.enableTabsScroll = true;
    }
    this.resizeController.observe(this.overflowContainer);
  }
  async _handleSlotChange() {
    const [tabsElement] = this.scrollContent;
    await (tabsElement == null ? void 0 : tabsElement.updateComplete);
    this._updateScrollState();
  }
  _updateScrollState() {
    const { scrollContent, overflowState } = this;
    if (scrollContent) {
      const [tabsElement] = this.scrollContent;
      const { canScrollLeft, canScrollRight } = (tabsElement == null ? void 0 : tabsElement.scrollState) || {
        canScrollLeft: false,
        canScrollRight: false
      };
      this.overflowState = {
        ...overflowState,
        canScrollLeft,
        canScrollRight
      };
    }
  }
  _handleScrollClick(event) {
    const currentTarget = event.currentTarget;
    const [tabsElement] = this.scrollContent;
    const dist = tabsElement.clientWidth * this.scrollFactor;
    const left = currentTarget.classList.contains("left-scroll") ? -dist : dist;
    tabsElement.scrollTabs(left, "smooth");
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("dir")) {
      this._updateScrollState();
    }
  }
  render() {
    const { canScrollRight, canScrollLeft } = this.overflowState;
    const ariaLabelPrevious = this.labelPrevious;
    const ariaLabelNext = this.labelNext;
    return html`
            <div
                class=${classMap({
      "tabs-overflow-container": true,
      "left-shadow": canScrollLeft,
      "right-shadow": canScrollRight
    })}
            >
                <sp-action-button
                    class=${classMap({
      "left-scroll": true,
      show: canScrollLeft
    })}
                    aria-label=${ariaLabelPrevious}
                    quiet
                    dir="rtl"
                    tabindex="-1"
                    @click=${this._handleScrollClick}
                >
                    <sp-icon-chevron100
                        slot="icon"
                        class="spectrum-UIIcon-ChevronLeft300"
                    ></sp-icon-chevron100>
                </sp-action-button>
                <sp-action-button
                    class=${classMap({
      "right-scroll": true,
      show: canScrollRight
    })}
                    aria-label=${ariaLabelNext}
                    quiet
                    tabindex="-1"
                    @click=${this._handleScrollClick}
                >
                    <sp-icon-chevron100
                        slot="icon"
                        class="spectrum-UIIcon-ChevronRight300"
                    ></sp-icon-chevron100>
                </sp-action-button>
                <slot
                    @slotchange=${this._handleSlotChange}
                    @sp-tabs-scroll=${this._updateScrollState}
                ></slot>
            </div>
        `;
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], TabsOverflow.prototype, "compact", 2);
__decorateClass([
  property({ type: String, attribute: "label-previous" })
], TabsOverflow.prototype, "labelPrevious", 2);
__decorateClass([
  property({ type: String, attribute: "label-next" })
], TabsOverflow.prototype, "labelNext", 2);
__decorateClass([
  property({ reflect: true })
], TabsOverflow.prototype, "dir", 2);
__decorateClass([
  state()
], TabsOverflow.prototype, "overflowState", 2);
__decorateClass([
  queryAssignedElements({ selector: "sp-tabs", flatten: true })
], TabsOverflow.prototype, "tabs", 2);
__decorateClass([
  query(".tabs-overflow-container")
], TabsOverflow.prototype, "overflowContainer", 2);
//# sourceMappingURL=TabsOverflow.dev.js.map
