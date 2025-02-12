import './sp-button-nbdGbWXQ.js';
import './sp-checkbox-w0hRi6o1.js';
import './sp-dialog-base-vvpT6NhB.js';
import './sp-dialog-2eCci9wG.js';
import { t as trigger } from './overlay-trigger-directive-Cr9-1H0X.js';
import { alertDestructive } from './dialog.stories-BDVd7Gb7.js';
import { p as portrait } from './images-mTOzd28p.js';
import './sp-overlay-DZqP4Xas.js';
import { x } from './lit-html-COgVUehj.js';
import './ButtonBase-EiAuB8cn.js';
import './like-anchor-C9Xos9l8.js';
import './define-element-JsEeAjlA.js';
import './lit-element-BulMEkr1.js';
import './if-defined-DDJGFaN4.js';
import './focusable-C0Y2600m.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-DKkDovCf.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './PendingState-DrK3DVye.js';
import './get-label-from-slot-Cg6mfN40.js';
import './sizedMixin-CvxKvEie.js';
import './CheckboxMixin-BygidSRL.js';
import './sp-icon-checkmark300-Be7XAEod.js';
import './custom-tag-B5IH9PTE.js';
import './Checkmark300-CQLndXBK.js';
import './IconBase-Bmj8ZYSq.js';
import './state-CJdJtSzk.js';
import './icon-checkmark-overrides.css-BM8JyPpN.js';
import './sp-icon-dash300-DxcfaOtl.js';
import './Dash300-BPmLOKTF.js';
import './icon-dash-overrides.css-3NRKn3SY.js';
import './DialogBase-Cph3ePyf.js';
import './sp-underlay-CoUAJlWY.js';
import './modal.css-fEtfRe6E.js';
import './first-focusable-in-BK_DAWOm.js';
import './focusable-selectors-CUZEb4r9.js';
import './sp-divider-7mSK16ab.js';
import './divider.css-C7PIHskV.js';
import './sp-close-button-BN_0jq3n.js';
import './icon-cross-overrides.css-a6lElF1Q.js';
import './sp-icon-cross500-DoIPFTBh.js';
import './Cross500-Cv8kebkP.js';
import './sp-button-group-D8yZLTSi.js';
import './sp-icon-alert-BIYj3aEh.js';
import './custom-tag-Diwq7nXX.js';
import './AlertDialog-C_VZtHLo.js';
import './random-id-BST1Puzz.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './resize-controller-BJKfu6ft.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './strategies-k5poJ-5A.js';
import './AbstractOverlay-ClYn-_-x.js';
import './platform-r3Lf9REX.js';
import './slottable-request-event-DXuuyGoq.js';
import './slottable-request-directive-BvrOiskA.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './Overlay-DzguzOPx.js';
import './ElementResolution-B9KteuX8.js';
import './VirtualTrigger-By-MnZ6p.js';
import './query-assigned-elements-C9WOp2R6.js';
import './style-map-DtKTc8KS.js';

class CountdownWatcher extends HTMLElement {
  constructor() {
    super(...arguments);
    this.readyPromise = Promise.resolve(false);
  }
  connectedCallback() {
    this.previousElementSibling.addEventListener(
      "countdown-complete",
      () => {
        this.ready(true);
      }
    );
    this.readyPromise = new Promise((res) => {
      this.ready = res;
    });
  }
  get updateComplete() {
    return this.readyPromise;
  }
}
customElements.define("countdown-complete-watcher", CountdownWatcher);
const disabledButtonDecorator = (story) => {
  return x`
        ${story()}
        <countdown-complete-watcher></countdown-complete-watcher>
    `;
};
const withOverlayDecorator = (story) => {
  return x`
        <sp-button variant="primary" id="trigger">Toggle Dialog</sp-button>
        <sp-overlay type="modal" trigger="trigger@click" open>
            ${story()}
        </sp-overlay>
    `;
};
const disabledButtonWithOverlayDecorator = (story) => withOverlayDecorator(() => disabledButtonDecorator(story));

var dialogBase_stories = {
  title: "Dialog Base",
  component: "sp-dialog-base"
};
const slotted = () => x`
    <sp-dialog-base
        underlay
        @click=${(event) => {
  if (event.target.localName === "sp-button") {
    event.target.dispatchEvent(
      new Event("close", { bubbles: true, composed: true })
    );
  }
}}
    >
        ${alertDestructive()}
    </sp-dialog-base>
`;
slotted.decorators = [withOverlayDecorator];
const disabledButton = () => {
  return x`
        <sp-dialog-base
            underlay
            @click=${(event) => {
    if (event.target.localName === "sp-button") {
      event.target.dispatchEvent(
        new Event("close", { bubbles: true, composed: true })
      );
    }
  }}
            @sp-opened=${({ target }) => {
    let count = 5;
    const timer = setInterval(() => {
      count -= 1;
      if (!count) {
        document.querySelector(
          "#changing-header"
        ).textContent = "The button in this dialog is now enabled";
        document.querySelector(
          "#changing-button"
        ).disabled = false;
        clearInterval(timer);
        target.dispatchEvent(new Event("countdown-complete"));
      }
      document.querySelector(".time").textContent = count.toString();
    }, 1e3);
  }}
            @close=${() => {
    document.querySelector("#changing-header").textContent = "The button in this dialog is disabled";
    document.querySelector(
      "#changing-button"
    ).disabled = true;
    document.querySelector(".time").textContent = "5";
  }}
        >
            <sp-dialog size="s">
                <h2 slot="heading" id="changing-header">
                    The button in this dialog is disabled
                </h2>
                <p>
                    After about
                    <span class="time">5</span>
                    seconds the button with be enabled.
                </p>
                <sp-button disabled slot="button" id="changing-button">
                    Ok
                </sp-button>
            </sp-dialog>
        </sp-dialog-base>
    `;
};
disabledButton.decorators = [disabledButtonWithOverlayDecorator];
const notAgain = () => x`
    <sp-dialog-base
        underlay
        @click=${(event) => {
  if (event.target.localName === "sp-button") {
    event.target.dispatchEvent(
      new Event("close", { bubbles: true, composed: true })
    );
  }
}}
    >
        <sp-dialog size="s">
            <h2 slot="heading">A thing is about to happen</h2>
            <p>Something that might happen a lot is about to happen.</p>
            <p>
                The click events for the "OK" button are bound to the story not
                to the components in specific.
            </p>
            <sp-button variant="secondary" treatment="fill" slot="button">
                Ok
            </sp-button>
            <sp-checkbox slot="footer">Don't show me this again</sp-checkbox>
        </sp-dialog>
    </sp-dialog-base>
`;
notAgain.decorators = [withOverlayDecorator];
const moreCustom = () => x`
    <sp-dialog-base
        underlay
        @click=${(event) => {
  if (event.target.localName === "sp-button") {
    event.target.dispatchEvent(
      new Event("close", { bubbles: true, composed: true })
    );
  }
}}
    >
        <div style="display: flex;">
            <div
                style="
                display: grid;
                place-content: center;
                grid-template-columns: calc(100% - 40px);
                grid-template-rows: calc(100% - 40px);
            "
            >
                <img
                    src=${portrait}
                    alt=""
                    style="
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                        object-placement: center;
                    "
                />
            </div>
            <sp-dialog size="s">
                <h2 slot="heading">Look at that image</h2>
                <p>
                    Its position has been customized beyond the language of
                    Spectrum. Be careful with all this power. There's no
                    "mobile" default for delivering content like this.
                </p>
                <sp-button variant="accent" treatment="outline" slot="button">
                    Ok
                </sp-button>
            </sp-dialog>
        </div>
    </sp-dialog-base>
`;
moreCustom.decorators = [withOverlayDecorator];
const fullyCustom = () => x`
    <sp-dialog-base
        underlay
        @click=${(event) => {
  if (event.target.localName === "button") {
    event.target.dispatchEvent(
      new Event("close", { bubbles: true, composed: true })
    );
  }
}}
    >
        <div id="fully-custom-dialog">
            <style>
                #fully-custom-dialog {
                    margin: 1em;
                }
            </style>
            <h2>Custom headline</h2>
            <p>
                The click events for the "Done" button are bound to the story
                not to the components in specific.
            </p>
            <p>
                This is a demonstration of what is possible with
                &lt;sp-dialog-base&gt;, only, and should not be seen as an
                endorsement for fully custom dialog UIs.
            </p>
            <p>Fully open content area, for whatever DOM you would like.</p>
            <button>Done</button>
        </div>
    </sp-dialog-base>
`;
fullyCustom.decorators = [withOverlayDecorator];
const lazyLoaded = () => {
  const template = () => x`
        <sp-dialog-base
            underlay
            @click=${(event) => {
    if (event.target.localName === "sp-button") {
      event.target.dispatchEvent(
        new Event("close", { bubbles: true, composed: true })
      );
    }
  }}
        >
            <sp-dialog size="m">
                <h2 slot="heading">This is a heading</h2>
                <p>
                    The click on the "OK" button should close the overlay with
                    the correct animation (duration).
                </p>
                <sp-button variant="secondary" treatment="fill" slot="button">
                    Ok
                </sp-button>
            </sp-dialog>
        </sp-dialog-base>
    `;
  return x`
        <sp-button
            variant="primary"
            ${trigger(template, {
    open: false,
    triggerInteraction: "click"
  })}
        >
            Open dialog
        </sp-button>
    `;
};
lazyLoaded.swc_vrt = {
  skip: true
};
const __namedExportsOrder = ['slotted', 'disabledButton', 'notAgain', 'moreCustom', 'fullyCustom', 'lazyLoaded'];

export { __namedExportsOrder, dialogBase_stories as default, disabledButton, fullyCustom, lazyLoaded, moreCustom, notAgain, slotted };
