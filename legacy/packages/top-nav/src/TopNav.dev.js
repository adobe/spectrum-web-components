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
  query
} from "@spectrum-web-components/base/src/decorators.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import { ResizeController } from "@lit-labs/observers/resize-controller.js";
import tabsSizes from "@spectrum-web-components/tabs/src/tabs-sizes.css.js";
import tabStyles from "@spectrum-web-components/tabs/src/tabs.css.js";
import { ScaledIndicator } from "@spectrum-web-components/tabs/src/Tabs.js";
const noSelectionStyle = "transform: translateX(0px) scaleX(0) scaleY(0)";
export class TopNav extends SizedMixin(SpectrumElement) {
  constructor() {
    super(...arguments);
    this.label = "";
    this.ignoreURLParts = "";
    this.selectionIndicatorStyle = noSelectionStyle;
    this.shouldAnimate = false;
    this.quiet = false;
    this.onClick = (event) => {
      const target = event.target;
      this.shouldAnimate = true;
      this.selectTarget(target);
    };
    this._items = [];
    this.resizeController = new ResizeController(this, {
      callback: () => {
        this.updateSelectionIndicator();
      }
    });
    this.updateSelectionIndicator = async () => {
      const selectedItem = this.items.find(
        (item) => item.value === this.selected || item.value === window.location.href
      );
      if (!selectedItem) {
        this.selectionIndicatorStyle = noSelectionStyle;
        return;
      }
      await Promise.all([
        selectedItem.updateComplete,
        document.fonts ? document.fonts.ready : Promise.resolve()
      ]);
      const { width } = selectedItem.getBoundingClientRect();
      this.selectionIndicatorStyle = ScaledIndicator.transformX(
        selectedItem.offsetLeft,
        width
      );
    };
  }
  static get styles() {
    return [tabsSizes, tabStyles, ScaledIndicator.baseStyles()];
  }
  set selected(value) {
    const oldValue = this.selected;
    if (value === oldValue) {
      return;
    }
    this.updateCheckedState(value);
    this._selected = value;
    this.requestUpdate("selected", oldValue);
  }
  get selected() {
    return this._selected;
  }
  get items() {
    return this._items;
  }
  set items(items) {
    if (items === this.items) return;
    this._items.forEach((item) => {
      this.resizeController.unobserve(item);
    });
    items.forEach((item) => {
      this.resizeController.observe(item);
    });
    this._items = items;
  }
  manageItems() {
    this.items = this.slotEl.assignedElements({ flatten: true }).filter((el) => el.localName === "sp-top-nav-item");
    let { href } = window.location;
    const ignoredURLParts = this.ignoreURLParts.split(" ");
    if (ignoredURLParts.includes("hash")) {
      href = href.replace(window.location.hash, "");
    }
    if (ignoredURLParts.includes("search")) {
      href = href.replace(window.location.search, "");
    }
    const selectedChild = this.items.find((item) => item.value === href);
    if (selectedChild) {
      this.selectTarget(selectedChild);
    } else {
      this.selected = "";
    }
  }
  render() {
    return html`
            <div @click=${this.onClick} id="list">
                <slot @slotchange=${this.onSlotChange}></slot>
                <div
                    id="selection-indicator"
                    class=${ifDefined(
      this.shouldAnimate ? void 0 : "first-position"
    )}
                    style=${this.selectionIndicatorStyle}
                ></div>
            </div>
        `;
  }
  firstUpdated(changes) {
    super.firstUpdated(changes);
    this.setAttribute("direction", "horizontal");
    this.setAttribute("role", "navigation");
  }
  updated(changes) {
    super.updated(changes);
    if (changes.has("dir")) {
      this.updateSelectionIndicator();
    }
    if (!this.shouldAnimate && typeof changes.get("shouldAnimate") !== "undefined") {
      this.shouldAnimate = true;
    }
    if (changes.has("label") && (this.label || typeof changes.get("label") !== "undefined")) {
      if (this.label.length) {
        this.setAttribute("aria-label", this.label);
      } else {
        this.removeAttribute("aria-label");
      }
    }
  }
  selectTarget(target) {
    const { value } = target;
    if (value) {
      this.selected = value;
    }
  }
  onSlotChange() {
    this.manageItems();
  }
  updateCheckedState(value) {
    this.items.forEach((item) => {
      item.selected = false;
    });
    requestAnimationFrame(() => {
      if (value && value.length) {
        const currentItem = this.items.find(
          (item) => item.value === value || item.value === window.location.href
        );
        if (currentItem) {
          currentItem.selected = true;
        } else {
          this.selected = "";
        }
      }
      this.updateSelectionIndicator();
    });
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
  property({ reflect: true })
], TopNav.prototype, "dir", 2);
__decorateClass([
  property({ type: String })
], TopNav.prototype, "label", 2);
__decorateClass([
  property({ attribute: "ignore-url-parts" })
], TopNav.prototype, "ignoreURLParts", 2);
__decorateClass([
  property()
], TopNav.prototype, "selectionIndicatorStyle", 2);
__decorateClass([
  property({ attribute: false })
], TopNav.prototype, "shouldAnimate", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], TopNav.prototype, "quiet", 2);
__decorateClass([
  property({ reflect: true })
], TopNav.prototype, "selected", 1);
__decorateClass([
  query("slot")
], TopNav.prototype, "slotEl", 2);
//# sourceMappingURL=TopNav.dev.js.map
