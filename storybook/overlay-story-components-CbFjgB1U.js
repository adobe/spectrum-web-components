import { Overlay } from './Overlay-Dz9m2EV-.js';
import './sp-button-BTMm_ibC.js';
import './sp-popover-BH6yktMg.js';
import './sp-radio-F6kLDUvN.js';
import './sp-radio-group-Lhmw-f6x.js';
import './overlay-trigger-CSFKciRj.js';
import { s, i } from './lit-element-BulMEkr1.js';
import { x } from './lit-html-COgVUehj.js';
import { n } from './define-element-C_3bgzm7.js';
import { e } from './query-DQF6X5qW.js';

var __defProp = Object.defineProperty;
var __decorateClass = (decorators, target, key, kind) => {
  var result = void 0 ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result) __defProp(target, key, result);
  return result;
};
const MAX_DEPTH = 7;
class OverlayTargetIcon extends s {
  static get styles() {
    return i`
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
    return x`
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
class OverlayDrag extends s {
  constructor() {
    super(...arguments);
    this.top = 100;
    this.left = 100;
  }
  static get styles() {
    return i`
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
    return x`
            <slot @slotchange=${this.onSlotChange}></slot>
        `;
  }
}
__decorateClass([
  n({ type: Number })
], OverlayDrag.prototype, "top");
__decorateClass([
  n({ type: Number })
], OverlayDrag.prototype, "left");
customElements.define("overlay-drag", OverlayDrag);
class RecursivePopover extends s {
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
      i`
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
    return x`
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
                        ${this.depth < MAX_DEPTH ? x`
                                  <recursive-popover
                                      position="${this.placement}"
                                      depth="${this.depth + 1}"
                                      tabindex="0"
                                  ></recursive-popover>
                              ` : x`
                                  <div>Maximum Depth</div>
                              `}
                    </sp-dialog>
                </sp-popover>
            </overlay-trigger>
        `;
  }
}
__decorateClass([
  n({ type: String })
], RecursivePopover.prototype, "placement");
__decorateClass([
  n({ type: Number })
], RecursivePopover.prototype, "depth");
__decorateClass([
  e('[slot="trigger"]')
], RecursivePopover.prototype, "trigger");
customElements.define("recursive-popover", RecursivePopover);
class PopoverContent extends s {
  render() {
    return x`
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
  e('[slot="trigger"]')
], PopoverContent.prototype, "button");
__decorateClass([
  e("overlay-trigger")
], PopoverContent.prototype, "trigger");
customElements.define("popover-content", PopoverContent);
class TransientHover extends s {
  constructor() {
    super(...arguments);
    this.open = false;
  }
  render() {
    return x`
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

            ${!this.open ? x`
                      <sp-overlay trigger="triggerButton@hover" type="hint">
                          <sp-tooltip placement="right">My tooltip</sp-tooltip>
                      </sp-overlay>
                  ` : x``}
        `;
  }
}
__decorateClass([
  n()
], TransientHover.prototype, "open");
customElements.define("transient-hover", TransientHover);
