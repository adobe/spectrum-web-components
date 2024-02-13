import { O as Overlay } from './sp-overlay-4pHcDtVF.js';
import { V as VirtualTrigger } from './VirtualTrigger-Sqzey4Y2.js';
import './sp-action-button-IL4X3jdR.js';
import './sp-action-group-ng_q_-qr.js';
import './sp-button-idIiKTnO.js';
import './sp-dialog-dkCFsNzA.js';
import './sp-dialog-wrapper-5HhAffuN.js';
import './sp-field-label-50w0r-Gn.js';
import './sp-icon-magnify-k9rbvZPR.js';
import './sp-icon-open-in-y1gwYOvZ.js';
import './overlay-trigger-TPVfGpjp.js';
import './sp-picker-aledI9r6.js';
import './sp-menu-FQVYzy9J.js';
import './sp-menu-item-WU5O76xQ.js';
import './sp-menu-group-Qws1YtKq.js';
import './sp-menu-divider-_m0GybmG.js';
import './sp-popover-OhDGQO09.js';
import './sp-slider-W2As3TbQ.js';
import './sp-radio-9c_SEC31.js';
import './sp-radio-group-bde7qULQ.js';
import './sp-tooltip-5BQ5PqCA.js';
import './scale-large-iNPyY3XN.js';
import './sp-accordion-item-G4n8OGIG.js';
import './overlay-story-components-aBq4HoW-.js';
import { x, D } from './lit-html-GmIhAbMP.js';
import { l } from './if-defined-pV6JZKXB.js';
import './define-element-UHExAFdK.js';
import './lit-element-xBOPiTek.js';
import './platform-c1C9ET3y.js';
import './ElementResolution-TTOqkMM7.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './random-id-M2k-wjyE.js';
import './first-focusable-in-LZ7hcu4z.js';
import './focusable-selectors-VCrFWGqo.js';
import './sizedMixin-6sBuja8e.js';
import './base-STdhtiz1.js';
import './query-JMOstM_r.js';
import './state-FLXW5LJZ.js';
import './style-map-ak5mT6xX.js';
import './directive-C1gRZbRe.js';
import './sp-icon-corner-triangle300-9DQQh1mD.js';
import './CornerTriangle300-wDtTC9xD.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-Tav-FzmR.js';
import './ButtonBase-sZHeZCuW.js';
import './like-anchor-njINSPTN.js';
import './focusable-p9xQieT8.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-5oGzzbFn.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-7fQrqAdh.js';
import './RovingTabindex-LnbiEVTh.js';
import './FocusGroup-TIL3fP6n.js';
import './when-kvvOyHr2.js';
import './sp-divider-ciRzsn_p.js';
import './divider.css-w129hLpK.js';
import './sp-close-button-RT_ZgufS.js';
import './spectrum-icon-cross.css-1cFDaPoP.js';
import './sp-icon-cross500-sf0nDjEl.js';
import './Cross500-CuS5PwKf.js';
import './sp-button-group-c_YOTiHm.js';
import './sp-icon-alert-8xHFckqN.js';
import './custom-tag-JXLWq-Sj.js';
import './AlertDialog-_uLDfnbb.js';
import './resize-controller--ByFn5Jx.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './class-map-Q7DIFm9x.js';
import './sp-underlay-xE0l9xLO.js';
import './DialogBase-qettA4jU.js';
import './modal.css-xwtx-S13.js';
import './OpenIn-9plKOhZS.js';
import './Picker-yxog523o.js';
import './spectrum-icon-chevron.css-nkKXiUlE.js';
import './sp-icon-chevron100-tb9aielX.js';
import './Chevron100-WZwzwvjg.js';
import './MatchMedia-SMh19R1m.js';
import './spectrum-icon-checkmark.css-QI1dlyU-.js';
import './Popover-uavtgZAO.js';
import './LanguageResolution-433GhF-m.js';
import './import-mabg3nA1.js';
import './streaming-listener-99YRN1c8.js';
import './async-directive-cHMFxS7f.js';
import './directive-helpers-WPlpPO1F.js';
import './repeat-ry-ySa1b.js';
import './FieldGroup-WzLJytXU.js';
import './manage-help-text-kfeeNmRL.js';

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
const __namedExportsOrder = ['Default', 'accordion', 'clickAndHoverTargets', 'clickContentClosedOnScroll', 'complexModal', 'customizedClickContent', 'deep', 'deepChildTooltip', 'deepNesting', 'definedOverlayElement', 'detachedElement', 'edges', 'inline', 'longpress', 'modalLoose', 'modalManaged', 'modalWithinNonModal', 'noCloseOnResize', 'openClickContent', 'openHoverContent', 'replace', 'sideHoverDraggable', 'superComplexModal', 'updated', 'updating', 'virtualElementV1', 'virtualElement', 'virtualElementDeclaratively'];

export { Default, __namedExportsOrder, accordion, clickAndHoverTargets, clickContentClosedOnScroll, complexModal, customizedClickContent, deep, deepChildTooltip, deepNesting, overlay_stories as default, definedOverlayElement, detachedElement, edges, inline, longpress, modalLoose, modalManaged, modalWithinNonModal, noCloseOnResize, openClickContent, openHoverContent, replace, sideHoverDraggable, superComplexModal, updated, updating, virtualElement, virtualElementDeclaratively, virtualElementV1 };