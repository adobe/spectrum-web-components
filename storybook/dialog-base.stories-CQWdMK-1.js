import './sp-dialog-base-B6ucNQF5.js';
import './sp-dialog-jhL1CbyX.js';
import './sp-button-BTMm_ibC.js';
import './sp-overlay-DzkklhP1.js';
import './sp-checkbox-CbcDFwgB.js';
import { alertDestructive } from './dialog.stories-B1waMviB.js';
import { p as portrait } from './images-mTOzd28p.js';
import { x } from './lit-html-COgVUehj.js';
import './DialogBase-D-UuaMEr.js';
import './sp-underlay-BD0tMA8s.js';
import './lit-element-BulMEkr1.js';
import './define-element-C_3bgzm7.js';
import './modal.css-SkAvNHaG.js';
import './first-focusable-in-BK_DAWOm.js';
import './focusable-selectors-CUZEb4r9.js';
import './focus-visible-D29Av9Xb.js';
import './ButtonBase-Euqk2NbC.js';
import './like-anchor-B3Uz3TFY.js';
import './if-defined-DDJGFaN4.js';
import './focusable-w-VMKDtH.js';
import './observe-slot-text-C6K935AT.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './PendingState-BK9ivzsq.js';
import './get-label-from-slot-Cg6mfN40.js';
import './sizedMixin-BzkTbMb8.js';
import './sp-divider-CWUCLHk6.js';
import './divider.css-DO2_iA7o.js';
import './sp-close-button-lUq7Iv6y.js';
import './spectrum-icon-cross.css-NFfmPqwL.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-BIYWpr2G.js';
import './sp-icon-cross500-CGrmdtVu.js';
import './Cross500-HJNUUNvY.js';
import './sp-button-group-i6httwiK.js';
import './sp-icon-alert-Cbypiip7.js';
import './custom-tag-Diwq7nXX.js';
import './AlertDialog-CuH2tq-V.js';
import './random-id-BST1Puzz.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './resize-controller-BJKfu6ft.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './Overlay-Dz9m2EV-.js';
import './ElementResolution-B9KteuX8.js';
import './AbstractOverlay-CPSq4yHG.js';
import './VirtualTrigger-CpG-Ut2t.js';
import './strategies-BipNjU_G.js';
import './platform-r3Lf9REX.js';
import './slottable-request-event-DXuuyGoq.js';
import './query-assigned-elements-C9WOp2R6.js';
import './state-DrummH0c.js';
import './style-map-DtKTc8KS.js';
import './CheckboxMixin-CMl_b79j.js';
import './sp-icon-checkmark300-BDWnUGU2.js';
import './Checkmark300-Cv25Kwxj.js';
import './spectrum-icon-checkmark.css-NuoPlGW7.js';
import './sp-icon-dash300--ZN9FvZF.js';
import './Dash300-DagFK8mn.js';
import './spectrum-icon-dash.css-lElR_d7u.js';

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

var dialogBase_stories = {
  title: "Dialog Base",
  component: "sp-dialog-base",
  decorators: [
    (story) => {
      return x`
                <sp-button variant="primary" id="trigger">
                    Toggle Dialog
                </sp-button>
                <sp-overlay type="modal" trigger="trigger@click" open>
                    ${story()}
                </sp-overlay>
            `;
    }
  ]
};
const Slotted = () => x`
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
disabledButton.decorators = [disabledButtonDecorator];
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
const __namedExportsOrder = ['Slotted', 'disabledButton', 'notAgain', 'moreCustom', 'fullyCustom'];

export { Slotted, __namedExportsOrder, dialogBase_stories as default, disabledButton, fullyCustom, moreCustom, notAgain };
