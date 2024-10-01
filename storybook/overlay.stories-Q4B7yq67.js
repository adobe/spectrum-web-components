import { Overlay } from './Overlay-Dz9m2EV-.js';
import { V as VirtualTrigger } from './VirtualTrigger-CpG-Ut2t.js';
import './sp-action-button-BGmiWspi.js';
import './sp-action-group-BuA30sND.js';
import './sp-button-BTMm_ibC.js';
import './sp-dialog-jhL1CbyX.js';
import './sp-dialog-wrapper-C_g_oAmA.js';
import './sp-field-label-oZHlTsnx.js';
import './sp-icon-magnify-DY_ErEP2.js';
import './sp-icon-open-in-BYfh-s6j.js';
import './overlay-trigger-CSFKciRj.js';
import './sp-picker-BmWkGHq8.js';
import './sp-overlay-DzkklhP1.js';
import './sp-menu-C-dIukbW.js';
import './sp-menu-item-DOkBCZjF.js';
import './sp-menu-group-ClCEZuuV.js';
import './sp-menu-divider-C_x93ePq.js';
import './sp-popover-BH6yktMg.js';
import './sp-slider-Dpq7_XF2.js';
import './sp-radio-F6kLDUvN.js';
import './sp-radio-group-Lhmw-f6x.js';
import './sp-tooltip-BpGkeKe1.js';
import './scale-large-CM-zOFKe.js';
import './sp-accordion-item-CAZhfIii.js';
import './sp-button-group-i6httwiK.js';
import './overlay-story-components-CbFjgB1U.js';
import { x, j } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './ElementResolution-B9KteuX8.js';
import './random-id-BST1Puzz.js';
import './AbstractOverlay-CPSq4yHG.js';
import './define-element-C_3bgzm7.js';
import './lit-element-BulMEkr1.js';
import './first-focusable-in-BK_DAWOm.js';
import './focusable-selectors-CUZEb4r9.js';
import './strategies-BipNjU_G.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './platform-r3Lf9REX.js';
import './slottable-request-event-DXuuyGoq.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './query-assigned-elements-C9WOp2R6.js';
import './state-DrummH0c.js';
import './style-map-DtKTc8KS.js';
import './directive-Bn5c4u4M.js';
import './sp-icon-corner-triangle300-Df1iqVxq.js';
import './CornerTriangle300-B7hvHiLM.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-BIYWpr2G.js';
import './ButtonBase-Euqk2NbC.js';
import './like-anchor-B3Uz3TFY.js';
import './focusable-w-VMKDtH.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-C6K935AT.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './sizedMixin-BzkTbMb8.js';
import './RovingTabindex-Bi74mHtS.js';
import './FocusGroup-DQHKf855.js';
import './PendingState-BK9ivzsq.js';
import './get-label-from-slot-Cg6mfN40.js';
import './sp-divider-CWUCLHk6.js';
import './divider.css-DO2_iA7o.js';
import './sp-close-button-lUq7Iv6y.js';
import './spectrum-icon-cross.css-NFfmPqwL.js';
import './sp-icon-cross500-CGrmdtVu.js';
import './Cross500-HJNUUNvY.js';
import './sp-icon-alert-Cbypiip7.js';
import './custom-tag-Diwq7nXX.js';
import './AlertDialog-CuH2tq-V.js';
import './resize-controller-BJKfu6ft.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './class-map-DdRvesrq.js';
import './sp-underlay-BD0tMA8s.js';
import './DialogBase-D-UuaMEr.js';
import './modal.css-SkAvNHaG.js';
import './OpenIn-tSs9OqKP.js';
import './Picker-TUMgNVnC.js';
import './spectrum-icon-chevron.css-CeYia-Jd.js';
import './sp-icon-chevron100-BExoFMYC.js';
import './Chevron100-2ZEB0c-t.js';
import './MatchMedia-SZ42m4IA.js';
import './DependencyManger-Dpkh1Bse.js';
import './spectrum-icon-checkmark.css-NuoPlGW7.js';
import './Popover-CdFgwNhh.js';
import './LanguageResolution-BeoILyI5.js';
import './NumberFormatter-D3opD4iN.js';
import './streaming-listener-CmIYw2xv.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './repeat-D5JakrYV.js';
import './FieldGroup-BVt1wOX9.js';
import './manage-help-text-83_bseGo.js';
import './when-DEJm_QN9.js';

async function openOverlay(e,n,r,t){return Overlay.open(e,n,r,t)}

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
            open=${o(open)}
            type=${o(type)}
        >
            <sp-button variant="primary" slot="trigger">Show Popover</sp-button>
            <sp-popover slot="click-content" placement="${placement}" tip>
                <sp-dialog no-divider>
                    <sp-slider
                        value="5"
                        step="0.5"
                        min="0"
                        max="20"
                        label="Awesomeness"
                        default-value="10"
                    ></sp-slider>
                    <div id="styled-div">
                        The background of this div should be blue
                    </div>
                    <overlay-trigger id="inner-trigger" placement="bottom">
                        <sp-button slot="trigger">Press Me</sp-button>
                        <sp-popover slot="click-content" placement="bottom" tip>
                            <sp-dialog size="s" no-divider>
                                Another Popover
                            </sp-dialog>
                        </sp-popover>

                        <sp-tooltip slot="hover-content" delayed tip="bottom">
                            Click to open another popover.
                        </sp-tooltip>
                    </overlay-trigger>
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
        <overlay-trigger type="modal" placement="top-start">
            <style>
                sp-button {
                    margin-top: 70vh;
                }
            </style>
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
        sp-popover {
            --styled-div-background-color: var(
                --spectrum-accent-background-color-default
            );
            --mod-button-background-color-default: rebeccapurple;
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
                    <sp-tooltip self-managed placement="bottom">
                        My Tooltip 1
                    </sp-tooltip>
                    A
                </sp-action-button>
                <sp-action-button>
                    <sp-tooltip self-managed placement="bottom">
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
            system=${window.__swc_hack_knobs__.defaultSystemVariant}
            scale=${window.__swc_hack_knobs__.defaultScale}
            dir=${window.__swc_hack_knobs__.defaultDirection}
        >
            <sp-theme
                color=${color}
                system=${window.__swc_hack_knobs__.defaultSystemVariant}
                scale=${window.__swc_hack_knobs__.defaultScale}
                dir=${window.__swc_hack_knobs__.defaultDirection}
            >
                <recursive-popover
                    tabindex=""
                    style="
                        background-color: var(--spectrum-gray-100);
                        color: var(--spectrum-gray-800);
                        padding: calc(var(--swc-scale-factor) * 22px);
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
    if (!!this.ready) return;
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
            background-color: var(--spectrum-gray-50);
            color: var(--spectrum-gray-800);
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
                    style="margin: calc(var(--spectrum-actiongroup-button-gap-y,calc(var(--swc-scale-factor) * 10px)) / 2);"
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
const modalNoFocus = () => {
  const closeEvent = new Event("close", { bubbles: true, composed: true });
  return x`
        <overlay-trigger type="modal" receives-focus="false">
            <sp-button slot="trigger">Open</sp-button>
            <sp-dialog-wrapper
                underlay
                slot="click-content"
                headline="Wrapped Dialog w/ Hero Image"
                size="s"
            >
                <p>
                    The
                    <code>sp-dialog-wrapper</code>
                    element has been prepared for use in an
                    <code>overlay-trigger</code>
                    element by it's combination of modal, underlay, etc. styles
                    and features.
                </p>
                <sp-button-group style="margin-inline-start: auto">
                    <sp-button
                        data-test-id="dialog-cancel-btn"
                        variant="secondary"
                        treatment="outline"
                        size="l"
                        @click=${(event) => event.target.dispatchEvent(closeEvent)}
                    >
                        ${"Cancel"}
                    </sp-button>
                    <sp-button
                        data-test-id="dialog-override-btn"
                        variant="negative"
                        size="l"
                        @click=${(event) => event.target.dispatchEvent(closeEvent)}
                    >
                        ${"Override"}
                    </sp-button>
                </sp-button-group>
            </sp-dialog-wrapper>
        </overlay-trigger>
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
    j(contextMenuTemplate(id), fragment);
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
    j(contextMenuTemplate(id), fragment);
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
const virtualElementDeclaratively = (args) => {
  const handleContextmenu = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const overlay2 = document.querySelector(
      "sp-overlay:not([open])"
    );
    if (overlay2.triggerElement instanceof VirtualTrigger) {
      overlay2.triggerElement.updateBoundingClientRect(
        event.clientX,
        event.clientY
      );
    }
    overlay2.willPreventClose = true;
    overlay2.open = true;
  };
  const overlay = () => x`
        <sp-overlay
            offset="0"
            type="auto"
            placement=${args.placement}
            .triggerElement=${new VirtualTrigger(0, 0)}
        >
            <sp-popover
                style="width:300px;"
                @change=${(event) => {
    var _a;
    (_a = event.target) == null ? void 0 : _a.dispatchEvent(
      new Event("close", { bubbles: true })
    );
  }}
            >
                <sp-menu>
                    <sp-menu-group>
                        <span slot="header">Menu</span>
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
        </sp-overlay>
    `;
  return x`
        <style>
            .app-root {
                position: absolute;
                inset: 0;
            }
        </style>
        <div
            class="app-root"
            @contextmenu=${{
    capture: true,
    handleEvent: handleContextmenu
  }}
        >
            ${overlay()} ${overlay()}
        </div>
    `;
};
virtualElementDeclaratively.args = {
  placement: "right-start"
};
virtualElementDeclaratively.swc_vrt = {
  skip: true
};
const __namedExportsOrder = ['Default', 'accordion', 'clickAndHoverTargets', 'clickContentClosedOnScroll', 'complexModal', 'customizedClickContent', 'deep', 'deepChildTooltip', 'deepNesting', 'definedOverlayElement', 'detachedElement', 'edges', 'inline', 'longpress', 'modalLoose', 'modalNoFocus', 'modalManaged', 'modalWithinNonModal', 'noCloseOnResize', 'openClickContent', 'openHoverContent', 'replace', 'sideHoverDraggable', 'superComplexModal', 'updated', 'updating', 'virtualElementV1', 'virtualElement', 'virtualElementDeclaratively'];

export { Default, __namedExportsOrder, accordion, clickAndHoverTargets, clickContentClosedOnScroll, complexModal, customizedClickContent, deep, deepChildTooltip, deepNesting, overlay_stories as default, definedOverlayElement, detachedElement, edges, inline, longpress, modalLoose, modalManaged, modalNoFocus, modalWithinNonModal, noCloseOnResize, openClickContent, openHoverContent, replace, sideHoverDraggable, superComplexModal, updated, updating, virtualElement, virtualElementDeclaratively, virtualElementV1 };
