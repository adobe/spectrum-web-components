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
  LitElement
} from "@spectrum-web-components/base";
import {
  property,
  query
} from "@spectrum-web-components/base/src/decorators.js";
import {
  Overlay
} from "@spectrum-web-components/overlay";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/popover/sp-popover.js";
import "@spectrum-web-components/radio/sp-radio.js";
import "@spectrum-web-components/radio/sp-radio-group.js";
import "@spectrum-web-components/overlay/overlay-trigger.js";
const MAX_DEPTH = 7;
class OverlayTargetIcon extends LitElement {
  static get styles() {
    return css`
            :host {
                position: absolute;
                display: block;
                color: var(--spectrum-magenta-900);
                width: 64px;
                height: 64px;
                top: 0;
                left: 0;
            }
        `;
  }
  render() {
    return html`
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="bullseye"
                class="svg-inline--fa fa-bullseye fa-w-16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
            >
                <path
                    fill="currentColor"
                    d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm0 432c-101.69 0-184-82.29-184-184 0-101.69 82.29-184 184-184 101.69 0 184 82.29 184 184 0 101.69-82.29 184-184 184zm0-312c-70.69 0-128 57.31-128 128s57.31 128 128 128 128-57.31 128-128-57.31-128-128-128zm0 192c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64z"
                ></path>
            </svg>
        `;
  }
}
customElements.define("overlay-target-icon", OverlayTargetIcon);
class OverlayDrag extends LitElement {
  constructor() {
    super(...arguments);
    this.top = 100;
    this.left = 100;
  }
  static get styles() {
    return css`
            :host {
                display: block;
                width: 100%;
                height: 100%;
                position: relative;
            }

            ::slotted(*) {
                display: block;
                width: 100%;
                height: 100%;
            }
        `;
  }
  onSlotChange(event) {
    const slot = event.target;
    this.targetElement = void 0;
    const nodes = slot.assignedNodes();
    const slotElement = nodes.find(
      (node) => node instanceof HTMLElement
    );
    if (!slotElement) return;
    this.targetElement = slotElement.querySelector(
      '[slot="trigger"]'
    );
    if (!this.targetElement) return;
    this.targetElement.addEventListener(
      "pointerdown",
      (event2) => this.onMouseDown(event2)
    );
    this.resetTargetPosition();
  }
  onMouseDown(event) {
    const target = event.target;
    const parent = target.parentElement;
    if (!parent) return;
    target.setPointerCapture(event.pointerId);
    const max = {
      x: parent.offsetWidth - target.offsetWidth,
      y: parent.offsetHeight - target.offsetHeight
    };
    const dragStart = {
      x: event.clientX,
      y: event.clientY
    };
    const originalPos = {
      x: this.left,
      y: this.top
    };
    const onMouseMove = (event2) => {
      const dragDelta = {
        x: event2.clientX - dragStart.x,
        y: event2.clientY - dragStart.y
      };
      const newPosition = {
        x: dragDelta.x + originalPos.x,
        y: dragDelta.y + originalPos.y
      };
      this.left = Math.min(Math.max(newPosition.x, 0), max.x);
      this.top = Math.min(Math.max(newPosition.y, 0), max.y);
      Overlay.update();
    };
    const onMouseUp = (event2) => {
      target.setPointerCapture(event2.pointerId);
      document.removeEventListener("pointermove", onMouseMove);
      document.removeEventListener("pointerup", onMouseUp);
    };
    document.addEventListener("pointermove", onMouseMove);
    document.addEventListener("pointerup", onMouseUp);
  }
  resetTargetPosition() {
    if (!this.targetElement) return;
    const target = this.targetElement;
    const parent = target.parentElement;
    if (!parent) return;
    this.left = (parent.offsetWidth - target.offsetWidth) / 2;
    this.top = (parent.offsetHeight - target.offsetHeight) / 2;
  }
  updated() {
    if (this.targetElement) {
      this.targetElement.style.transform = `translate(${this.left}px, ${this.top}px)`;
    }
  }
  render() {
    return html`
            <slot @slotchange=${this.onSlotChange}></slot>
        `;
  }
}
__decorateClass([
  property({ type: Number })
], OverlayDrag.prototype, "top", 2);
__decorateClass([
  property({ type: Number })
], OverlayDrag.prototype, "left", 2);
customElements.define("overlay-drag", OverlayDrag);
class RecursivePopover extends LitElement {
  constructor() {
    super();
    this.depth = 0;
    this.isShiftTabbing = false;
    this.placement = "right";
    this.depth = 0;
    this.addEventListener("keydown", (event) => {
      const { code } = event;
      if (code === "Enter") {
        this.trigger.click();
      }
    });
    this.addEventListener("focusin", this.handleFocusin);
  }
  static get styles() {
    return [
      css`
                :host {
                    display: block;
                    text-align: center;
                }

                overlay-trigger {
                    display: inline-flex;
                    margin-top: 11px;
                }
            `
    ];
  }
  handleFocusin() {
    this.focus();
  }
  focus() {
    if (this.shadowRoot.activeElement !== null) {
      return;
    }
    const firstFocusable = this.shadowRoot.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (firstFocusable) {
      if (firstFocusable.updateComplete) {
        firstFocusable.updateComplete.then(
          () => firstFocusable.focus()
        );
      } else {
        firstFocusable.focus();
      }
      return;
    }
    super.focus();
  }
  onRadioChange(event) {
    const target = event.target;
    this.placement = target.selected;
  }
  captureEnter(event) {
    const { code } = event;
    if (code === "Enter") {
      event.stopPropagation();
    }
  }
  render() {
    return html`
            <sp-radio-group
                horizontal
                @change=${this.onRadioChange}
                selected="${this.placement}"
                name="group-example"
            >
                <sp-radio value="top">Top</sp-radio>
                <sp-radio value="right">Right</sp-radio>
                <sp-radio value="bottom">Bottom</sp-radio>
                <sp-radio value="left">Left</sp-radio>
            </sp-radio-group>
            <overlay-trigger placement="${this.placement}" type="modal">
                <sp-button
                    slot="trigger"
                    variant="accent"
                    @keydown=${this.captureEnter}
                >
                    Open Popover
                </sp-button>
                <sp-popover
                    slot="click-content"
                    direction="${this.placement}"
                    tip
                >
                    <sp-dialog size="s" no-divider>
                        ${this.depth < MAX_DEPTH ? html`
                                  <recursive-popover
                                      position="${this.placement}"
                                      depth="${this.depth + 1}"
                                      tabindex="0"
                                  ></recursive-popover>
                              ` : html`
                                  <div>Maximum Depth</div>
                              `}
                    </sp-dialog>
                </sp-popover>
            </overlay-trigger>
        `;
  }
}
__decorateClass([
  property({ type: String })
], RecursivePopover.prototype, "placement", 2);
__decorateClass([
  property({ type: Number })
], RecursivePopover.prototype, "depth", 2);
__decorateClass([
  query('[slot="trigger"]')
], RecursivePopover.prototype, "trigger", 2);
customElements.define("recursive-popover", RecursivePopover);
export class PopoverContent extends LitElement {
  render() {
    return html`
            <overlay-trigger type="modal" placement="bottom">
                <sp-button slot="trigger">Open me</sp-button>
                <sp-popover slot="click-content" direction="bottom">
                    <sp-dialog no-divider>
                        <p>This is all the content.</p>
                        <p>This is all the content.</p>
                        <p>This is all the content.</p>
                        <p>This is all the content.</p>
                    </sp-dialog>
                </sp-popover>
            </overlay-trigger>
        `;
  }
}
__decorateClass([
  query('[slot="trigger"]')
], PopoverContent.prototype, "button", 2);
__decorateClass([
  query("overlay-trigger")
], PopoverContent.prototype, "trigger", 2);
customElements.define("popover-content", PopoverContent);
export default class TransientHover extends LitElement {
  constructor() {
    super(...arguments);
    this.open = false;
  }
  render() {
    return html`
            <sp-button variant="primary" id="triggerButton">
                Button popover
            </sp-button>
            <sp-overlay
                type="auto"
                trigger="triggerButton@click"
                @sp-opened=${() => {
      this.open = true;
    }}
            >
                <sp-popover>My Popover</sp-popover>
            </sp-overlay>

            ${!this.open ? html`
                      <sp-overlay trigger="triggerButton@hover" type="hint">
                          <sp-tooltip placement="right">My tooltip</sp-tooltip>
                      </sp-overlay>
                  ` : html``}
        `;
  }
}
__decorateClass([
  property()
], TransientHover.prototype, "open", 2);
customElements.define("transient-hover", TransientHover);
//# sourceMappingURL=overlay-story-components.js.map
