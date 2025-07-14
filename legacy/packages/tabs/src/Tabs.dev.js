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
  css,
  html,
  SizedMixin
} from "@spectrum-web-components/base";
import {
  property,
  query
} from "@spectrum-web-components/base/src/decorators.js";
import {
  classMap,
  ifDefined
} from "@spectrum-web-components/base/src/directives.js";
import { IntersectionController } from "@lit-labs/observers/intersection-controller.js";
import { ResizeController } from "@lit-labs/observers/resize-controller.js";
import { Focusable } from "@spectrum-web-components/shared";
import { RovingTabindexController } from "@spectrum-web-components/reactive-controllers/src/RovingTabindex.js";
import tabStyles from "./tabs.css.js";
import tabSizes from "./tabs-sizes.css.js";
export const ScaledIndicator = {
  baseSize: 100,
  noSelectionStyle: "transform: translateX(0px) scaleX(0) scaleY(0)",
  transformX(left, width) {
    const scale = width / this.baseSize;
    return `transform: translateX(${left}px) scaleX(${scale});`;
  },
  transformY(top, height) {
    const scale = height / this.baseSize;
    return `transform: translateY(${top}px) scaleY(${scale});`;
  },
  baseStyles() {
    return css`
            :host([direction='vertical-right']) #selection-indicator,
            :host([direction='vertical']) #selection-indicator {
                height: ${this.baseSize}px;
            }
            :host([dir][direction='horizontal']) #selection-indicator {
                width: ${this.baseSize}px;
            }
        `;
  }
};
export function calculateScrollTargetForRightSide(index, direction, tabs, container) {
  const nextIndex = index + (direction === "rtl" ? -1 : 1);
  const nextTab = tabs[nextIndex];
  const viewportEnd = container.scrollLeft + container.offsetWidth;
  return nextTab ? nextTab.offsetLeft - container.offsetWidth : viewportEnd;
}
export function calculateScrollTargetForLeftSide(index, direction, tabs, container) {
  const prevIndex = index + (direction === "rtl" ? 1 : -1);
  const prevTab = tabs[prevIndex];
  const leftmostElement = direction === "rtl" ? -container.offsetWidth : 0;
  return prevTab ? prevTab.offsetLeft + prevTab.offsetWidth : leftmostElement;
}
export class Tabs extends SizedMixin(Focusable, { noDefaultSize: true }) {
  constructor() {
    super();
    this.auto = false;
    this.compact = false;
    this.direction = "horizontal";
    this.emphasized = false;
    this.label = "";
    this.enableTabsScroll = false;
    this.quiet = false;
    this.selectionIndicatorStyle = ScaledIndicator.noSelectionStyle;
    this.shouldAnimate = false;
    this.selected = "";
    this._tabs = [];
    this.resizeController = new ResizeController(this, {
      callback: () => {
        this.updateSelectionIndicator();
      }
    });
    this.rovingTabindexController = new RovingTabindexController(this, {
      focusInIndex: (elements) => {
        let focusInIndex = 0;
        const firstFocusableElement = elements.find((el, index) => {
          const focusInElement = this.selected ? el.value === this.selected : !el.disabled;
          focusInIndex = index;
          return focusInElement;
        });
        return firstFocusableElement ? focusInIndex : -1;
      },
      direction: () => "both",
      elementEnterAction: (el) => {
        if (!this.auto) return;
        this.shouldAnimate = true;
        this.selectTarget(el);
      },
      elements: () => this.tabs,
      isFocusableElement: (el) => !this.disabled && !el.disabled,
      listenerScope: () => this.tabList
    });
    this.onTabsScroll = () => {
      this.dispatchEvent(
        new Event("sp-tabs-scroll", {
          bubbles: true,
          composed: true
        })
      );
    };
    this.onClick = (event) => {
      if (this.disabled) {
        return;
      }
      const target = event.composedPath().find((el) => el.parentElement === this);
      if (!target || target.disabled) {
        return;
      }
      this.shouldAnimate = true;
      this.selectTarget(target);
    };
    this.onKeyDown = (event) => {
      if (event.code === "Enter" || event.code === "Space") {
        event.preventDefault();
        const target = event.target;
        if (target) {
          this.selectTarget(target);
        }
      }
    };
    this.updateCheckedState = () => {
      this.tabs.forEach((element) => {
        element.removeAttribute("selected");
      });
      if (this.selected) {
        const currentChecked = this.tabs.find(
          (el) => el.value === this.selected
        );
        if (currentChecked) {
          currentChecked.selected = true;
        } else {
          this.selected = "";
        }
      } else {
        const firstTab = this.tabs[0];
        if (firstTab) {
          firstTab.setAttribute("tabindex", "0");
        }
      }
      this.updateSelectionIndicator();
    };
    this.updateSelectionIndicator = async () => {
      const selectedElement = this.tabs.find((el) => el.selected);
      if (!selectedElement) {
        this.selectionIndicatorStyle = ScaledIndicator.noSelectionStyle;
        return;
      }
      await Promise.all([
        selectedElement.updateComplete,
        document.fonts ? document.fonts.ready : Promise.resolve()
      ]);
      const { width, height } = selectedElement.getBoundingClientRect();
      this.selectionIndicatorStyle = this.direction === "horizontal" ? ScaledIndicator.transformX(selectedElement.offsetLeft, width) : ScaledIndicator.transformY(selectedElement.offsetTop, height);
    };
    new IntersectionController(this, {
      config: {
        root: null,
        rootMargin: "0px",
        threshold: [0, 1]
      },
      callback: () => {
        this.updateSelectionIndicator();
      }
    });
  }
  static get styles() {
    return [tabSizes, tabStyles, ScaledIndicator.baseStyles()];
  }
  set tabs(tabs) {
    if (tabs === this.tabs) return;
    this._tabs.forEach((tab) => {
      this.resizeController.unobserve(tab);
    });
    tabs.forEach((tab) => {
      this.resizeController.observe(tab);
    });
    this._tabs = tabs;
    this.rovingTabindexController.clearElementCache();
  }
  get tabs() {
    return this._tabs;
  }
  /**
   * @private
   */
  get focusElement() {
    return this.rovingTabindexController.focusInElement || this;
  }
  limitDeltaToInterval(min, max) {
    return (delta) => {
      if (delta < min) return min;
      if (delta > max) return max;
      return delta;
    };
  }
  /**
   * Scrolls through the tabs component, on the X-axis, by a given ammount of pixels/ delta. The given delta is limited to the scrollable area of the tabs component.
   * @param {number} delta - The ammount of pixels to scroll by. If the value is positive, the tabs will scroll to the right. If the value is negative, the tabs will scroll to the left.
   * @param {ScrollBehavior} behavior - The scroll behavior to use. Defaults to 'smooth'.
   */
  scrollTabs(delta, behavior = "smooth") {
    var _a;
    if (delta === 0) return;
    const { scrollLeft, clientWidth, scrollWidth } = this.tabList;
    const dirLimit = scrollWidth - clientWidth - Math.abs(scrollLeft);
    const limitDelta = this.dir === "ltr" ? this.limitDeltaToInterval(-scrollLeft, dirLimit) : this.limitDeltaToInterval(-dirLimit, Math.abs(scrollLeft));
    (_a = this.tabList) == null ? void 0 : _a.scrollBy({
      left: limitDelta(delta),
      top: 0,
      behavior
    });
  }
  get scrollState() {
    if (this.tabList) {
      const { scrollLeft, clientWidth, scrollWidth } = this.tabList;
      const canScrollLeft = Math.abs(scrollLeft) > 0;
      const canScrollRight = Math.ceil(Math.abs(scrollLeft)) < scrollWidth - clientWidth;
      return {
        canScrollLeft: this.dir === "ltr" ? canScrollLeft : canScrollRight,
        canScrollRight: this.dir === "ltr" ? canScrollRight : canScrollLeft
      };
    }
    return {};
  }
  async getUpdateComplete() {
    const complete = await super.getUpdateComplete();
    const tabs = [...this.children];
    const tabUpdateCompletes = tabs.map((tab) => {
      if (typeof tab.updateComplete !== "undefined") {
        return tab.updateComplete;
      }
      return Promise.resolve(true);
    });
    await Promise.all(tabUpdateCompletes);
    return complete;
  }
  getNecessaryAutoScroll(index) {
    const selectedTab = this.tabs[index];
    const selectionEnd = selectedTab.offsetLeft + selectedTab.offsetWidth;
    const viewportEnd = this.tabList.scrollLeft + this.tabList.offsetWidth;
    const selectionStart = selectedTab.offsetLeft;
    const viewportStart = this.tabList.scrollLeft;
    if (selectionEnd > viewportEnd) {
      return calculateScrollTargetForRightSide(
        index,
        this.dir,
        this.tabs,
        this.tabList
      );
    } else if (selectionStart < viewportStart) {
      return calculateScrollTargetForLeftSide(
        index,
        this.dir,
        this.tabs,
        this.tabList
      );
    }
    return -1;
  }
  async scrollToSelection() {
    if (!this.enableTabsScroll || !this.selected) {
      return;
    }
    await this.updateComplete;
    const selectedIndex = this.tabs.findIndex(
      (tab) => tab.value === this.selected
    );
    if (selectedIndex !== -1 && this.tabList) {
      const scrollTarget = this.getNecessaryAutoScroll(selectedIndex);
      if (scrollTarget !== -1) {
        this.tabList.scrollTo({ left: scrollTarget });
      }
    }
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("selected")) {
      this.scrollToSelection();
    }
  }
  managePanels({
    target
  }) {
    const panels = target.assignedElements();
    panels.map((panel) => {
      const { value, id } = panel;
      const tab = this.querySelector(`[role="tab"][value="${value}"]`);
      if (tab) {
        tab.setAttribute("aria-controls", id);
        panel.setAttribute("aria-labelledby", tab.id);
      }
      panel.selected = value === this.selected;
    });
  }
  render() {
    return html`
            <div
                class=${classMap({ scroll: this.enableTabsScroll })}
                aria-label=${ifDefined(this.label ? this.label : void 0)}
                @click=${this.onClick}
                @keydown=${this.onKeyDown}
                @scroll=${this.onTabsScroll}
                id="list"
                role="tablist"
                part="tablist"
            >
                <slot @slotchange=${this.onSlotChange}></slot>
                <div
                    id="selection-indicator"
                    class=${ifDefined(
      this.shouldAnimate ? void 0 : "first-position"
    )}
                    style=${this.selectionIndicatorStyle}
                    role="presentation"
                ></div>
            </div>
            <slot name="tab-panel" @slotchange=${this.managePanels}></slot>
        `;
  }
  willUpdate(changes) {
    if (!this.hasUpdated) {
      const selectedChild = this.querySelector(
        ":scope > [selected]"
      );
      if (selectedChild) {
        this.selectTarget(selectedChild);
      }
    }
    super.willUpdate(changes);
    if (changes.has("selected")) {
      if (this.tabs.length) {
        this.updateCheckedState();
      }
      if (changes.get("selected")) {
        const previous = this.querySelector(
          `[role="tabpanel"][value="${changes.get("selected")}"]`
        );
        if (previous) previous.selected = false;
      }
      const next = this.querySelector(
        `[role="tabpanel"][value="${this.selected}"]`
      );
      if (next) next.selected = true;
    }
    if (changes.has("direction")) {
      if (this.direction === "horizontal") {
        this.removeAttribute("aria-orientation");
      } else {
        this.setAttribute("aria-orientation", "vertical");
      }
    }
    if (changes.has("dir")) {
      this.updateSelectionIndicator();
    }
    if (changes.has("disabled")) {
      if (this.disabled) {
        this.setAttribute("aria-disabled", "true");
      } else {
        this.removeAttribute("aria-disabled");
      }
    }
    if (!this.shouldAnimate && typeof changes.get("shouldAnimate") !== "undefined") {
      this.shouldAnimate = true;
    }
  }
  selectTarget(target) {
    const value = target.getAttribute("value");
    if (value) {
      const selected = this.selected;
      this.selected = value;
      const applyDefault = this.dispatchEvent(
        new Event("change", {
          cancelable: true
        })
      );
      if (!applyDefault) {
        this.selected = selected;
      }
    }
  }
  onSlotChange() {
    this.tabs = this.slotEl.assignedElements().filter((el) => el.getAttribute("role") === "tab");
    this.updateCheckedState();
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("resize", this.updateSelectionIndicator);
    if ("fonts" in document) {
      document.fonts.addEventListener(
        "loadingdone",
        this.updateSelectionIndicator
      );
    }
  }
  disconnectedCallback() {
    window.removeEventListener("resize", this.updateSelectionIndicator);
    if ("fonts" in document) {
      document.fonts.removeEventListener(
        "loadingdone",
        this.updateSelectionIndicator
      );
    }
    super.disconnectedCallback();
  }
}
__decorateClass([
  property({ type: Boolean })
], Tabs.prototype, "auto", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Tabs.prototype, "compact", 2);
__decorateClass([
  property({ reflect: true })
], Tabs.prototype, "dir", 2);
__decorateClass([
  property({ reflect: true })
], Tabs.prototype, "direction", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Tabs.prototype, "emphasized", 2);
__decorateClass([
  property()
], Tabs.prototype, "label", 2);
__decorateClass([
  property({ type: Boolean })
], Tabs.prototype, "enableTabsScroll", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Tabs.prototype, "quiet", 2);
__decorateClass([
  property({ attribute: false })
], Tabs.prototype, "selectionIndicatorStyle", 2);
__decorateClass([
  property({ attribute: false })
], Tabs.prototype, "shouldAnimate", 2);
__decorateClass([
  query("slot")
], Tabs.prototype, "slotEl", 2);
__decorateClass([
  query("#list")
], Tabs.prototype, "tabList", 2);
__decorateClass([
  property({ reflect: true })
], Tabs.prototype, "selected", 2);
//# sourceMappingURL=Tabs.dev.js.map
