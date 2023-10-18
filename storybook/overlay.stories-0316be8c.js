import { O as Overlay } from './sp-overlay-2f9e6847.js';
import { V as VirtualTrigger } from './VirtualTrigger-7996ec8f.js';
import './sp-action-button-a3324e56.js';
import './sp-action-group-dd2ba548.js';
import './sp-button-6534d7a7.js';
import './sp-dialog-bd7cdf06.js';
import './sp-dialog-wrapper-2fd844ce.js';
import './sp-field-label-eb7b786c.js';
import './sp-icon-magnify-b0889d95.js';
import './sp-icon-open-in-75980c55.js';
import './overlay-trigger-9d774ff5.js';
import './sp-picker-c58a11f2.js';
import './sp-menu-6cab5582.js';
import './sp-menu-item-78994077.js';
import './sp-menu-group-afdcc461.js';
import './sp-menu-divider-e02a5ff2.js';
import './sp-popover-a3c74c2f.js';
import './sp-slider-c18aba8b.js';
import './sp-radio-c007bc5e.js';
import './sp-radio-group-74155b41.js';
import './sp-tooltip-fb4d59cd.js';
import './scale-large-acebe95b.js';
import './sp-accordion-item-d89e5233.js';
import { s, i } from './lit-element-9354aa77.js';
import { x, D } from './lit-html-126adc72.js';
import { n } from './define-element-e64f5ea4.js';
import { i as i$1 } from './query-d0113d5a.js';
import { l } from './if-defined-ae83b405.js';
import './platform-a32a5617.js';
import './ElementResolution-7469f128.js';
import './condition-attribute-with-id-62869347.js';
import './first-focusable-in-184a26e2.js';
import './focusable-selectors-252ae36e.js';
import './sizedMixin-43fe982f.js';
import './base-511c8c11.js';
import './state-5175507d.js';
import './style-map-156e3c36.js';
import './directive-2bb7789e.js';
import './sp-icon-corner-triangle300-e41520a7.js';
import './CornerTriangle300-488cc3d0.js';
import './custom-tag-c228386e.js';
import './IconBase-d00b1a4e.js';
import './ButtonBase-997f7a09.js';
import './like-anchor-72ed571c.js';
import './focusable-6cc2c3b2.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-16ab7d67.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-b8bfe193.js';
import './RovingTabindex-ca5f8b64.js';
import './FocusGroup-0f0b800e.js';
import './sp-divider-02e53dcd.js';
import './divider.css-d14b5633.js';
import './sp-close-button-77218317.js';
import './spectrum-icon-cross.css-5810d93c.js';
import './sp-button-group-28fd6c42.js';
import './sp-icon-alert-248f0d52.js';
import './custom-tag-b5526d41.js';
import './AlertDialog-1684188b.js';
import './resize-controller-55608b66.js';
import './observe-slot-presence-ae37a9bc.js';
import './class-map-14530ec2.js';
import './sp-underlay-e0018f00.js';
import './DialogBase-05fb739e.js';
import './modal.css-ad9e835e.js';
import './OpenIn-083e86bc.js';
import './Picker-3f54f663.js';
import './spectrum-icon-chevron.css-6d5a7762.js';
import './sp-icon-chevron100-232e7a83.js';
import './Chevron100-6f55b923.js';
import './MatchMedia-0123f918.js';
import './spectrum-icon-checkmark.css-359949f2.js';
import './LanguageResolution-630dfe34.js';
import './import-76526f12.js';
import './streaming-listener-70cd7ec3.js';
import './async-directive-e6357bae.js';
import './directive-helpers-aa9210f2.js';
import './repeat-c64faecc.js';
import './FieldGroup-10738c40.js';
import './manage-help-text-39f4c7ea.js';
import './when-67eca38c.js';

async function openOverlay(e,n,r,t){return Overlay.open(e,n,r,t)}

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
const MAX_DEPTH = 7;
class OverlayTargetIcon extends s {
  static get styles() {
    return i`
            :host {
                position: absolute;
                display: block;
                color: var(--spectrum-global-color-magenta-700);
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
    if (!slotElement)
      return;
    this.targetElement = slotElement.querySelector(
      '[slot="trigger"]'
    );
    if (!this.targetElement)
      return;
    this.targetElement.addEventListener(
      "pointerdown",
      (event2) => this.onMouseDown(event2)
    );
    this.resetTargetPosition();
  }
  onMouseDown(event) {
    const target = event.target;
    const parent = target.parentElement;
    if (!parent)
      return;
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
    if (!this.targetElement)
      return;
    const target = this.targetElement;
    const parent = target.parentElement;
    if (!parent)
      return;
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
], OverlayDrag.prototype, "top", 2);
__decorateClass([
  n({ type: Number })
], OverlayDrag.prototype, "left", 2);
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
], RecursivePopover.prototype, "placement", 2);
__decorateClass([
  n({ type: Number })
], RecursivePopover.prototype, "depth", 2);
__decorateClass([
  i$1('[slot="trigger"]')
], RecursivePopover.prototype, "trigger", 2);
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
  i$1('[slot="trigger"]')
], PopoverContent.prototype, "button", 2);
__decorateClass([
  i$1("overlay-trigger")
], PopoverContent.prototype, "trigger", 2);
customElements.define("popover-content", PopoverContent);

const storyStyles = x`
    <style>
        html,
        body,
        #root,
        #root-inner,
        sp-story-decorator {
            height: 100%;
            margin: 0;
        }

        sp-story-decorator::part(container) {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
        }

        overlay-trigger {
            flex: none;
        }

        #styled-div {
            background-color: var(--styled-div-background-color, blue);
            color: white;
            padding: 4px 10px;
            margin-bottom: 10px;
        }

        #inner-trigger {
            display: inline-block;
        }
    </style>
`;
var overlay_stories = {
  title: "Overlay",
  argTypes: {
    offset: { control: "number" },
    placement: {
      control: {
        type: "inline-radio",
        options: [
          "top",
          "top-start",
          "top-end",
          "bottom",
          "bottom-start",
          "bottom-end",
          "left",
          "left-start",
          "left-end",
          "right",
          "right-start",
          "right-end",
          "auto",
          "auto-start",
          "auto-end",
          "none"
        ]
      }
    },
    type: {
      control: {
        type: "inline-radio",
        options: ["modal", "replace", "inline"]
      }
    },
    colorStop: {
      control: {
        type: "inline-radio",
        options: ["light", "dark"]
      }
    }
  },
  args: {
    placement: "bottom",
    offset: 0,
    colorStop: "light"
  }
};
const template = ({
  placement,
  offset,
  open,
  type
}) => {
  return x`
        ${storyStyles}
        <overlay-trigger
            content="click hover"
            id="trigger"
            placement="${placement}"
            offset="${offset}"
            open=${l(open)}
            type=${l(type)}
        >
            <sp-button variant="primary" slot="trigger">Show Popover</sp-button>
            <sp-popover
                slot="click-content"
                placement="${placement}"
                tip
            >
                <sp-dialog no-divider>
                    <sp-slider
                        value="5"
                        step="0.5"
                        min="0"
                        max="20"
                        label="Awesomeness"
                    ></sp-slider>
                    <div id="styled-div">
                        The background of this div should be blue
                    </div>
                    <overlay-trigger id="inner-trigger" placement="bottom">
                        <sp-button slot="trigger">Press Me</sp-button>
                        <sp-popover
                            slot="click-content"
                            placement="bottom"
                            tip
                        >
                            <sp-dialog size="s" no-divider>
                                Another Popover
                            </sp-dialog>
                        </sp-popover>

                            <sp-tooltip
                                slot="hover-content"
                                delayed
                                tip="bottom"
                            >
                                Click to open another popover.
                            </sp-tooltip>
                        </overlay-trigger>
                    </div>
                </sp-dialog>
            </sp-popover>
            <sp-tooltip
                slot="hover-content"
                ?delayed=${open !== "hover"}
                tip="bottom"
            >
                Click to open a popover.
            </sp-tooltip>
        </overlay-trigger>
    `;
};
const extraText = x`
    <p>This is some text.</p>
    <p>This is some text.</p>
    <p>
        This is a
        <a href="#anchor">link</a>
        .
    </p>
`;
function nextFrame() {
  return new Promise((res) => requestAnimationFrame(() => res()));
}
const Default = (args) => template(args);
const accordion = () => {
  return x`
        <overlay-trigger type="modal" placement="right">
            <sp-button variant="primary" slot="trigger">
                Open overlay w/ accordion
            </sp-button>
            <sp-popover
                slot="click-content"
                style="overflow-y: scroll;position: static;"
            >
                <sp-dialog size="s" no-divider>
                    <sp-accordion allow-multiple>
                        <sp-accordion-item label="Some things">
                            <p>
                                Thing
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                more things
                            </p>
                        </sp-accordion-item>
                        <sp-accordion-item label="Other things">
                            <p>
                                Thing
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                more things
                            </p>
                        </sp-accordion-item>
                        <sp-accordion-item label="More things">
                            <p>
                                Thing
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                more things
                            </p>
                        </sp-accordion-item>
                        <sp-accordion-item label="Additional things">
                            <p>
                                Thing
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                more things
                            </p>
                        </sp-accordion-item>
                    </sp-accordion>
                </sp-dialog>
            </sp-popover>
        </overlay-trigger>
    `;
};
accordion.swc_vrt = {
  skip: true
};
const clickAndHoverTargets = () => {
  return x`
        <div>
            ${storyStyles}
            <style>
                .friendly-target {
                    padding: 4px;
                    margin: 6px;
                    border: 2px solid black;
                    border-radius: 6px;
                    cursor: default;
                }
            </style>
            <overlay-trigger placement="right">
                <div class="friendly-target" slot="trigger" tabindex="0">
                    Click me
                </div>
                <sp-tooltip slot="click-content" tip="right">
                    Ok, now hover the other trigger
                </sp-tooltip>
            </overlay-trigger>
            <overlay-trigger placement="left">
                <div class="friendly-target" slot="trigger" tabindex="0">
                    Then hover me
                </div>
                <sp-tooltip slot="hover-content" tip="right">
                    Now click my trigger -- I should stay open, but the other
                    overlay should close
                </sp-tooltip>
            </overlay-trigger>
        </div>
    `;
};
clickAndHoverTargets.swc_vrt = {
  skip: true
};
class ScrollForcer extends HTMLElement {
  constructor() {
    super();
    this.doScroll = async () => {
      var _a;
      (_a = this.previousElementSibling) == null ? void 0 : _a.addEventListener(
        "sp-opened",
        this.doScroll
      );
      await nextFrame();
      await nextFrame();
      await nextFrame();
      await nextFrame();
      if (document.scrollingElement) {
        document.scrollingElement.scrollTop = 100;
      }
      await nextFrame();
      await nextFrame();
      this.ready(true);
    };
    this.readyPromise = Promise.resolve(false);
    this.readyPromise = new Promise((res) => {
      this.ready = res;
    });
    this.setup();
  }
  async setup() {
    var _a, _b;
    await nextFrame();
    await nextFrame();
    (_a = this.previousElementSibling) == null ? void 0 : _a.addEventListener(
      "sp-opened",
      this.doScroll
    );
    await nextFrame();
    await nextFrame();
    ((_b = this.previousElementSibling) == null ? void 0 : _b.lastElementChild).open = "click";
  }
  get updateComplete() {
    return this.readyPromise;
  }
}
customElements.define("scroll-forcer", ScrollForcer);
const clickContentClosedOnScroll = (args) => x`
    <div style="margin: 50vh 0 100vh;">
        ${template({
  ...args
})}
    </div>
`;
clickContentClosedOnScroll.decorators = [
  (story) => x`
        <style>
            html,
            body,
            #root,
            #root-inner,
            sp-story-decorator {
                height: auto !important;
            }
        </style>
        ${story()}
        <scroll-forcer></scroll-forcer>
    `
];
class ComplexModalReady extends HTMLElement {
  constructor() {
    super();
    this.handleTriggerOpened = async () => {
      await nextFrame();
      const picker = document.querySelector("#test-picker");
      picker.addEventListener("sp-opened", this.handlePickerOpen);
      picker.open = true;
    };
    this.handlePickerOpen = async () => {
      const picker = document.querySelector("#test-picker");
      const actions = [nextFrame, picker.updateComplete];
      await Promise.all(actions);
      this.ready(true);
    };
    this.readyPromise = Promise.resolve(false);
    this.readyPromise = new Promise((res) => {
      this.ready = res;
      this.setup();
    });
  }
  async setup() {
    await nextFrame();
    const overlay = document.querySelector(
      `overlay-trigger`
    );
    overlay.addEventListener("sp-opened", this.handleTriggerOpened);
  }
  get updateComplete() {
    return this.readyPromise;
  }
}
customElements.define("complex-modal-ready", ComplexModalReady);
const complexModalDecorator = (story) => {
  return x`
        ${story()}
        <complex-modal-ready></complex-modal-ready>
    `;
};
const complexModal = () => {
  return x`
        <style>
            body {
                --swc-margin-test: 10px;
                margin: var(--swc-margin-test);
            }
            sp-story-decorator::part(container) {
                min-height: calc(100vh - (2 * var(--swc-margin-test)));
                padding: 0;
                display: grid;
                place-content: center;
            }
            active-overlay > * {
                --spectrum-global-animation-duration-100: 0ms;
                --spectrum-global-animation-duration-200: 0ms;
                --spectrum-global-animation-duration-300: 0ms;
                --spectrum-global-animation-duration-400: 0ms;
                --spectrum-global-animation-duration-500: 0ms;
                --spectrum-global-animation-duration-600: 0ms;
                --spectrum-global-animation-duration-700: 0ms;
                --spectrum-global-animation-duration-800: 0ms;
                --spectrum-global-animation-duration-900: 0ms;
                --spectrum-global-animation-duration-1000: 0ms;
                --spectrum-global-animation-duration-2000: 0ms;
                --spectrum-global-animation-duration-4000: 0ms;
                --spectrum-animation-duration-0: 0ms;
                --spectrum-animation-duration-100: 0ms;
                --spectrum-animation-duration-200: 0ms;
                --spectrum-animation-duration-300: 0ms;
                --spectrum-animation-duration-400: 0ms;
                --spectrum-animation-duration-500: 0ms;
                --spectrum-animation-duration-600: 0ms;
                --spectrum-animation-duration-700: 0ms;
                --spectrum-animation-duration-800: 0ms;
                --spectrum-animation-duration-900: 0ms;
                --spectrum-animation-duration-1000: 0ms;
                --spectrum-animation-duration-2000: 0ms;
                --spectrum-animation-duration-4000: 0ms;
                --spectrum-coachmark-animation-indicator-ring-duration: 0ms;
                --swc-test-duration: 1ms;
            }
        </style>
        <overlay-trigger type="modal" open="click">
            <sp-dialog-wrapper
                slot="click-content"
                headline="Dialog title"
                dismissable
                underlay
                footer="Content for footer"
            >
                <sp-field-label for="test-picker">
                    Selection type:
                </sp-field-label>
                <sp-picker id="test-picker">
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save selection</sp-menu-item>
                    <sp-menu-item disabled>Make work path</sp-menu-item>
                </sp-picker>
            </sp-dialog-wrapper>
            <sp-button slot="trigger" variant="primary">
                Toggle Dialog
            </sp-button>
        </overlay-trigger>
    `;
};
complexModal.decorators = [complexModalDecorator];
const customizedClickContent = (args) => x`
    <style>
        overlay-trigger {
            --styled-div-background-color: var(
                --spectrum-semantic-cta-background-color-default
            );
            --spectrum-button-m-accent-fill-texticon-background-color: rebeccapurple;
        }
    </style>
    ${template({
  ...args,
  open: "click"
})}
`;
const deep = () => x`
    <overlay-trigger>
        <sp-button variant="primary" slot="trigger">
            Open popover 1 with buttons + selfmanaged Tooltips
        </sp-button>
        <sp-popover slot="click-content" direction="bottom" tip>
            <sp-dialog size="s" no-divider>
                <sp-action-button>
                    <sp-tooltip self-managed placement="bottom" offset="0">
                        My Tooltip 1
                    </sp-tooltip>
                    A
                </sp-action-button>
                <sp-action-button>
                    <sp-tooltip self-managed placement="bottom" offset="0">
                        My Tooltip 1
                    </sp-tooltip>
                    B
                </sp-action-button>
            </sp-dialog>
        </sp-popover>
    </overlay-trigger>

    <overlay-trigger>
        <sp-button variant="primary" slot="trigger">
            Open popover 2 with buttons without ToolTips
        </sp-button>
        <sp-popover slot="click-content" direction="bottom" tip>
            <sp-dialog size="s" no-divider>
                <sp-action-button>X</sp-action-button>
                <sp-action-button>Y</sp-action-button>
            </sp-dialog>
        </sp-popover>
    </overlay-trigger>
`;
deep.swc_vrt = {
  skip: true
};
const deepChildTooltip = () => x`
    <overlay-trigger>
        <sp-button variant="primary" slot="trigger">Open popover</sp-button>
        <sp-popover slot="click-content" direction="bottom" tip>
            <sp-dialog no-divider>
                <p>Let us open another overlay here</p>
                <overlay-trigger>
                    <sp-button variant="primary" slot="trigger">
                        Open sub popover
                    </sp-button>
                    <sp-popover slot="click-content" direction="bottom" tip>
                        <sp-dialog no-divider>
                            <p>
                                Render an action button with tooltips. Clicking
                                the action button shouldn't close everything
                            </p>
                            <sp-action-button>
                                Button with self-managed tooltip
                                <sp-tooltip self-managed placement="top">
                                    Deep Child ToolTip
                                </sp-tooltip>
                            </sp-action-button>
                            <sp-action-button>Just a button</sp-action-button>
                        </sp-dialog>
                    </sp-popover>
                </overlay-trigger>
            </sp-dialog>
        </sp-popover>
    </overlay-trigger>
`;
const deepNesting = () => {
  const color = window.__swc_hack_knobs__.defaultColor;
  const outter = color === "light" ? "dark" : "light";
  return x`
        ${storyStyles}
        <sp-theme
            color=${outter}
            theme=${window.__swc_hack_knobs__.defaultThemeVariant}
            scale=${window.__swc_hack_knobs__.defaultScale}
            dir=${window.__swc_hack_knobs__.defaultDirection}
        >
            <sp-theme
                color=${color}
                theme=${window.__swc_hack_knobs__.defaultThemeVariant}
                scale=${window.__swc_hack_knobs__.defaultScale}
                dir=${window.__swc_hack_knobs__.defaultDirection}
            >
                <recursive-popover
                    tabindex=""
                    style="
                        background-color: var(--spectrum-global-color-gray-100);
                        color: var(--spectrum-global-color-gray-800);
                        padding: var(--spectrum-global-dimension-size-225);
                    "
                ></recursive-popover>
            </sp-theme>
        </sp-theme>
    `;
};
class DefinedOverlayReady extends HTMLElement {
  constructor() {
    super(...arguments);
    this.handleTriggerOpened = async () => {
      this.overlayElement.removeEventListener(
        "sp-opened",
        this.handleTriggerOpened
      );
      await nextFrame();
      await nextFrame();
      await nextFrame();
      await nextFrame();
      this.popoverElement = document.querySelector(
        "popover-content"
      );
      if (!this.popoverElement) {
        return;
      }
      this.popoverElement.addEventListener(
        "sp-opened",
        this.handlePopoverOpen
      );
      await nextFrame();
      await nextFrame();
      this.popoverElement.button.click();
    };
    this.handlePopoverOpen = async () => {
      await nextFrame();
      this.ready(true);
    };
    this.readyPromise = Promise.resolve(false);
  }
  connectedCallback() {
    if (!!this.ready)
      return;
    this.readyPromise = new Promise((res) => {
      this.ready = res;
      this.setup();
    });
  }
  async setup() {
    await nextFrame();
    await nextFrame();
    this.overlayElement = document.querySelector(
      `overlay-trigger`
    );
    const button = document.querySelector(
      `[slot="trigger"]`
    );
    this.overlayElement.addEventListener(
      "sp-opened",
      this.handleTriggerOpened
    );
    await nextFrame();
    await nextFrame();
    button.click();
  }
  disconnectedCallback() {
    this.overlayElement.removeEventListener(
      "sp-opened",
      this.handleTriggerOpened
    );
    this.popoverElement.removeEventListener(
      "sp-opened",
      this.handlePopoverOpen
    );
  }
  get updateComplete() {
    return this.readyPromise;
  }
}
customElements.define("defined-overlay-ready", DefinedOverlayReady);
const definedOverlayDecorator = (story) => {
  return x`
        ${story()}
        <defined-overlay-ready></defined-overlay-ready>
    `;
};
const definedOverlayElement = () => {
  return x`
        <overlay-trigger placement="bottom" type="modal">
            <sp-button variant="primary" slot="trigger">Open popover</sp-button>
            <sp-popover slot="click-content" direction="bottom">
                <sp-dialog no-divider>
                    <popover-content></popover-content>
                </sp-dialog>
            </sp-popover>
        </overlay-trigger>
    `;
};
definedOverlayElement.decorators = [definedOverlayDecorator];
const detachedElement = () => {
  let overlay;
  const openDetachedOverlayContent = async ({
    target
  }) => {
    if (overlay) {
      overlay.open = false;
      overlay = void 0;
      return;
    }
    const div = document.createElement("div");
    div.open = false;
    div.textContent = "This div is overlaid";
    div.setAttribute(
      "style",
      `
            background-color: var(--spectrum-global-color-gray-50);
            color: var(--spectrum-global-color-gray-800);
            border: 1px solid;
            padding: 2em;
        `
    );
    overlay = await Overlay.open(div, {
      type: "auto",
      trigger: target,
      receivesFocus: "auto",
      placement: "bottom",
      offset: 0
    });
    overlay.addEventListener("sp-closed", () => {
      overlay = void 0;
    });
    target.insertAdjacentElement("afterend", overlay);
  };
  requestAnimationFrame(() => {
    openDetachedOverlayContent({
      target: document.querySelector(
        "#detached-content-trigger"
      )
    });
  });
  return x`
        <style>
            sp-overlay div:not([placement]) {
                visibility: hidden;
            }
        </style>
        <sp-action-button
            id="detached-content-trigger"
            @click=${openDetachedOverlayContent}
        >
            <sp-icon-open-in
                slot="icon"
                label="Open in overlay"
            ></sp-icon-open-in>
        </sp-action-button>
    `;
};
const edges = () => {
  return x`
        <style>
            .demo {
                position: absolute;
            }
            .top-left {
                top: 0;
                left: 0;
            }
            .top-right {
                top: 0;
                right: 0;
            }
            .bottom-right {
                bottom: 0;
                right: 0;
            }
            .bottom-left {
                bottom: 0;
                left: 0;
            }
        </style>
        <overlay-trigger class="demo top-left" placement="bottom">
            <sp-button slot="trigger">
                Top/
                <br />
                Left
            </sp-button>
            <sp-tooltip slot="hover-content" delayed tip="bottom">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
        <overlay-trigger class="demo top-right" placement="bottom">
            <sp-button slot="trigger">
                Top/
                <br />
                Right
            </sp-button>
            <sp-tooltip slot="hover-content" delayed tip="bottom">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
        <overlay-trigger class="demo bottom-left" placement="top">
            <sp-button slot="trigger">
                Bottom/
                <br />
                Left
            </sp-button>
            <sp-tooltip slot="hover-content" delayed tip="top">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
        <overlay-trigger placement="top" class="demo bottom-right">
            <sp-button slot="trigger">
                Bottom/
                <br />
                Right
            </sp-button>
            <sp-tooltip slot="hover-content" delayed tip="top">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
    `;
};
const inline = () => {
  const closeEvent = new Event("close", { bubbles: true, composed: true });
  return x`
        <overlay-trigger type="inline">
            <sp-button slot="trigger">Open</sp-button>
            <sp-popover slot="click-content">
                <sp-button
                    @click=${(event) => {
    event.target.dispatchEvent(closeEvent);
  }}
                >
                    Close
                </sp-button>
            </sp-popover>
        </overlay-trigger>
        ${extraText}
    `;
};
const longpress = () => {
  return x`
        <overlay-trigger placement="right-start">
            <sp-action-button slot="trigger" hold-affordance>
                <sp-icon-magnify slot="icon"></sp-icon-magnify>
            </sp-action-button>
            <sp-tooltip slot="hover-content">Search real hard...</sp-tooltip>
            <sp-popover slot="longpress-content" tip>
                <sp-action-group
                    @change=${(event) => event.target.dispatchEvent(
    new Event("close", { bubbles: true })
  )}
                    selects="single"
                    vertical
                    style="margin: calc(var(--spectrum-actiongroup-button-gap-y,var(--spectrum-global-dimension-size-100)) / 2);"
                >
                    <sp-action-button>
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                </sp-action-group>
            </sp-popover>
        </overlay-trigger>
    `;
};
const modalLoose = () => {
  const closeEvent = new Event("close", { bubbles: true, composed: true });
  return x`
        <overlay-trigger type="modal">
            <sp-button slot="trigger">Open</sp-button>
            <sp-dialog
                size="s"
                dismissable
                slot="click-content"
                @closed=${(event) => event.target.dispatchEvent(closeEvent)}
            >
                <h2 slot="heading">Loose Dialog</h2>
                <p>
                    The
                    <code>sp-dialog</code>
                    element is not "meant" to be a modal alone. In that way it
                    does not manage its own
                    <code>open</code>
                    attribute or outline when it should have
                    <code>pointer-events: auto</code>
                    . It's a part of this test suite to prove that content in
                    this way can be used in an
                    <code>overlay-trigger</code>
                    element.
                </p>
            </sp-dialog>
        </overlay-trigger>
        ${extraText}
    `;
};
const modalManaged = () => {
  const closeEvent = new Event("close", { bubbles: true, composed: true });
  return x`
        <overlay-trigger type="modal">
            <sp-button slot="trigger">Open</sp-button>
            <sp-dialog-wrapper
                underlay
                slot="click-content"
                headline="Wrapped Dialog w/ Hero Image"
                confirm-label="Keep Both"
                secondary-label="Replace"
                cancel-label="Cancel"
                footer="Content for footer"
                @confirm=${(event) => {
    event.target.dispatchEvent(closeEvent);
  }}
                @secondary=${(event) => {
    event.target.dispatchEvent(closeEvent);
  }}
                @cancel=${(event) => {
    event.target.dispatchEvent(closeEvent);
  }}
            >
                <p>
                    The
                    <code>sp-dialog-wrapper</code>
                    element has been prepared for use in an
                    <code>overlay-trigger</code>
                    element by it's combination of modal, underlay, etc. styles
                    and features.
                </p>
            </sp-dialog-wrapper>
        </overlay-trigger>
        ${extraText}
    `;
};
const modalWithinNonModal = () => {
  return x`
        <overlay-trigger type="inline">
            <sp-button variant="primary" slot="trigger">
                Open inline overlay
            </sp-button>
            <sp-popover slot="click-content">
                <sp-dialog size="s" no-divider>
                    <overlay-trigger type="modal">
                        <sp-button variant="primary" slot="trigger">
                            Open modal overlay
                        </sp-button>
                        <sp-popover slot="click-content">
                            <sp-dialog size="s" no-divider>
                                Modal overlay
                            </sp-dialog>
                        </sp-popover>
                    </overlay-trigger>
                </sp-dialog>
            </sp-popover>
        </overlay-trigger>
    `;
};
const noCloseOnResize = (args) => x`
    <style>
        sp-button:hover {
            border: 10px solid;
            width: 100px;
        }
    </style>
    ${template({
  ...args,
  open: "click"
})}
`;
noCloseOnResize.swc_vrt = {
  skip: true
};
const openClickContent = (args) => template({
  ...args,
  open: "click"
});
const openHoverContent = (args) => template({
  ...args,
  open: "hover"
});
const replace = () => {
  const closeEvent = new Event("close", { bubbles: true, composed: true });
  return x`
        <overlay-trigger type="replace">
            <sp-button slot="trigger">Open</sp-button>
            <sp-popover slot="click-content">
                <sp-button
                    @click=${(event) => {
    event.target.dispatchEvent(closeEvent);
  }}
                >
                    Close
                </sp-button>
            </sp-popover>
        </overlay-trigger>
        ${extraText}
    `;
};
const sideHoverDraggable = () => {
  return x`
        ${storyStyles}
        <style>
            sp-tooltip {
                transition: none;
            }
        </style>
        <overlay-drag>
            <overlay-trigger placement="right">
                <overlay-target-icon slot="trigger"></overlay-target-icon>
                <sp-tooltip slot="hover-content" delayed tip="right">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus egestas sed enim sed condimentum. Nunc facilisis
                    scelerisque massa sed luctus. Orci varius natoque penatibus
                    et magnis dis parturient montes, nascetur ridiculus mus.
                    Suspendisse sagittis sodales purus vitae ultricies. Integer
                    at dui sem. Sed quam tortor, ornare in nisi et, rhoncus
                    lacinia mauris. Sed vel rutrum mauris, ac pellentesque nibh.
                    Sed feugiat semper libero, sit amet vehicula orci fermentum
                    id. Vivamus imperdiet egestas luctus. Mauris tincidunt
                    malesuada ante, faucibus viverra nunc blandit a. Fusce et
                    nisl nisi. Aenean dictum quam id mollis faucibus. Nulla a
                    ultricies dui. In hac habitasse platea dictumst. Curabitur
                    gravida lobortis vestibulum.
                </sp-tooltip>
            </overlay-trigger>
        </overlay-drag>
    `;
};
const superComplexModal = () => {
  return x`
        <overlay-trigger type="modal">
            <sp-button slot="trigger" variant="accent">Toggle Dialog</sp-button>
            <sp-popover slot="click-content">
                <sp-dialog size="s">
                    <overlay-trigger>
                        <sp-button slot="trigger" variant="primary">
                            Toggle Dialog
                        </sp-button>
                        <sp-popover slot="click-content">
                            <sp-dialog size="s" no-divider>
                                <overlay-trigger type="modal">
                                    <sp-button
                                        slot="trigger"
                                        variant="secondary"
                                    >
                                        Toggle Dialog
                                    </sp-button>
                                    <sp-popover slot="click-content">
                                        <sp-dialog size="s" no-divider>
                                            <p>
                                                When you get this deep, this
                                                ActiveOverlay should be the only
                                                one in [slot="open"].
                                            </p>
                                            <p>
                                                All of the rest of the
                                                ActiveOverlay elements should
                                                have had their [slot] attribute
                                                removed.
                                            </p>
                                            <p>
                                                Closing this ActiveOverlay
                                                should replace them...
                                            </p>
                                        </sp-dialog>
                                    </sp-popover>
                                </overlay-trigger>
                            </sp-dialog>
                        </sp-popover>
                    </overlay-trigger>
                </sp-dialog>
            </sp-popover>
        </overlay-trigger>
    `;
};
const updated = () => {
  return x`
        ${storyStyles}
        <style>
            sp-tooltip {
                transition: none;
            }
        </style>
        <overlay-drag>
            <overlay-trigger class="demo top-left" placement="bottom">
                <overlay-target-icon
                    slot="trigger"
                    style="translate(400px, 300px)"
                ></overlay-target-icon>
                <sp-tooltip slot="hover-content" delayed tip="bottom">
                    Click to open popover
                </sp-tooltip>
                <sp-popover slot="click-content" position="bottom" tip>
                    <sp-dialog size="s" no-divider>
                        <sp-slider
                            value="5"
                            step="0.5"
                            min="0"
                            max="20"
                            label="Awesomeness"
                        ></sp-slider>
                        <div id="styled-div">
                            The background of this div should be blue
                        </div>
                        <overlay-trigger id="inner-trigger" placement="bottom">
                            <sp-button slot="trigger">Press Me</sp-button>
                            <sp-popover
                                slot="click-content"
                                placement="bottom"
                                tip
                            >
                                <sp-dialog size="s" no-divider>
                                    Another Popover
                                </sp-dialog>
                            </sp-popover>

                            <sp-tooltip
                                slot="hover-content"
                                delayed
                                tip="bottom"
                            >
                                Click to open another popover.
                            </sp-tooltip>
                        </overlay-trigger>
                    </sp-dialog>
                </sp-popover>
            </overlay-trigger>
        </overlay-drag>
    `;
};
const updating = () => {
  const update = () => {
    const button = document.querySelector('[slot="trigger"]');
    button.style.left = `${Math.floor(Math.random() * 200)}px`;
    button.style.top = `${Math.floor(Math.random() * 200)}px`;
    button.style.position = "fixed";
  };
  return x`
        <overlay-trigger type="click">
            <sp-button variant="primary" slot="trigger">
                Open inline overlay
            </sp-button>
            <sp-popover slot="click-content">
                <sp-dialog size="s" no-divider>
                    <sp-button variant="primary" @click=${update}>
                        Update trigger location.
                    </sp-button>
                </sp-dialog>
            </sp-popover>
        </overlay-trigger>
    `;
};
updating.swc_vrt = {
  skip: true
};
class StartEndContextmenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    align-items: stretch;
                }
                div {
                    width: 50%;
                    height: 100%;
                }
            </style>
            <div id="start"></div>
            <div id="end"></div>
        `;
  }
}
customElements.define("start-end-contextmenu", StartEndContextmenu);
const virtualElementV1 = (args) => {
  const contextMenuTemplate = (kind = "") => x`
        <sp-popover
            style="width:300px;"
            @click=${(event) => {
    var _a;
    if (event.target.localName === "sp-menu-item") {
      (_a = event.target) == null ? void 0 : _a.dispatchEvent(
        new Event("close", { bubbles: true })
      );
    }
  }}
        >
            <sp-menu>
                <sp-menu-group>
                    <span slot="header">Menu source: ${kind}</span>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save selection</sp-menu-item>
                    <sp-menu-item disabled>Make work path</sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        </sp-popover>
    `;
  const handleContextmenu = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const source = event.composedPath()[0];
    const { id } = source;
    const trigger = event.target;
    const virtualTrigger = new VirtualTrigger(event.clientX, event.clientY);
    const fragment = document.createDocumentFragment();
    D(contextMenuTemplate(id), fragment);
    const popover = fragment.querySelector("sp-popover");
    openOverlay(trigger, "click", popover, {
      placement: args.placement,
      receivesFocus: "auto",
      virtualTrigger,
      offset: 0,
      notImmediatelyClosable: true
    });
  };
  return x`
        <style>
            .app-root {
                position: absolute;
                inset: 0;
            }
        </style>
        <start-end-contextmenu
            class="app-root"
            @contextmenu=${{
    capture: true,
    handleEvent: handleContextmenu
  }}
        ></start-end-contextmenu>
    `;
};
virtualElementV1.args = {
  placement: "right-start"
};
const virtualElement = (args) => {
  const contextMenuTemplate = (kind = "") => x`
        <sp-popover
            style="width:300px;"
            @click=${(event) => {
    var _a;
    if (event.target.localName === "sp-menu-item") {
      (_a = event.target) == null ? void 0 : _a.dispatchEvent(
        new Event("close", { bubbles: true })
      );
    }
  }}
        >
            <sp-menu>
                <sp-menu-group>
                    <span slot="header">Menu source: ${kind}</span>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save selection</sp-menu-item>
                    <sp-menu-item disabled>Make work path</sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        </sp-popover>
    `;
  const handleContextmenu = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const source = event.composedPath()[0];
    const { id } = source;
    const trigger = event.target;
    const virtualTrigger = new VirtualTrigger(event.clientX, event.clientY);
    const fragment = document.createDocumentFragment();
    D(contextMenuTemplate(id), fragment);
    const popover = fragment.querySelector("sp-popover");
    const overlay = await openOverlay(popover, {
      trigger: virtualTrigger,
      placement: args.placement,
      offset: 0,
      notImmediatelyClosable: true,
      type: "auto"
    });
    trigger.insertAdjacentElement("afterend", overlay);
  };
  return x`
        <style>
            .app-root {
                position: absolute;
                inset: 0;
            }
        </style>
        <start-end-contextmenu
            class="app-root"
            @contextmenu=${{
    capture: true,
    handleEvent: handleContextmenu
  }}
        ></start-end-contextmenu>
    `;
};
virtualElement.args = {
  placement: "right-start"
};
const __namedExportsOrder = ['Default', 'accordion', 'clickAndHoverTargets', 'clickContentClosedOnScroll', 'complexModal', 'customizedClickContent', 'deep', 'deepChildTooltip', 'deepNesting', 'definedOverlayElement', 'detachedElement', 'edges', 'inline', 'longpress', 'modalLoose', 'modalManaged', 'modalWithinNonModal', 'noCloseOnResize', 'openClickContent', 'openHoverContent', 'replace', 'sideHoverDraggable', 'superComplexModal', 'updated', 'updating', 'virtualElementV1', 'virtualElement'];

export { Default, __namedExportsOrder, accordion, clickAndHoverTargets, clickContentClosedOnScroll, complexModal, customizedClickContent, deep, deepChildTooltip, deepNesting, overlay_stories as default, definedOverlayElement, detachedElement, edges, inline, longpress, modalLoose, modalManaged, modalWithinNonModal, noCloseOnResize, openClickContent, openHoverContent, replace, sideHoverDraggable, superComplexModal, updated, updating, virtualElement, virtualElementV1 };
