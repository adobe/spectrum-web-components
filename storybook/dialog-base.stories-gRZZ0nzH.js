import { D as DialogBase } from './DialogBase-qettA4jU.js';
import { d as defineElement } from './define-element-UHExAFdK.js';
import './sp-dialog-dkCFsNzA.js';
import './sp-button-idIiKTnO.js';
import './sp-overlay-4pHcDtVF.js';
import './sp-checkbox-ev6msJli.js';
import { alertDestructive } from './dialog.stories-jgUPNJvC.js';
import { p as portrait } from './images-WJGovbiS.js';
import { x } from './lit-html-GmIhAbMP.js';
import './sp-underlay-xE0l9xLO.js';
import './lit-element-xBOPiTek.js';
import './modal.css-xwtx-S13.js';
import './first-focusable-in-LZ7hcu4z.js';
import './focusable-selectors-VCrFWGqo.js';
import './focus-visible-68QWcOy-.js';
import './sp-divider-ciRzsn_p.js';
import './divider.css-w129hLpK.js';
import './sizedMixin-6sBuja8e.js';
import './base-STdhtiz1.js';
import './sp-close-button-RT_ZgufS.js';
import './spectrum-icon-cross.css-1cFDaPoP.js';
import './ButtonBase-sZHeZCuW.js';
import './like-anchor-njINSPTN.js';
import './if-defined-pV6JZKXB.js';
import './focusable-p9xQieT8.js';
import './observe-slot-text-5oGzzbFn.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-7fQrqAdh.js';
import './query-JMOstM_r.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-Tav-FzmR.js';
import './sp-icon-cross500-sf0nDjEl.js';
import './Cross500-CuS5PwKf.js';
import './sp-button-group-c_YOTiHm.js';
import './sp-icon-alert-8xHFckqN.js';
import './custom-tag-JXLWq-Sj.js';
import './AlertDialog-_uLDfnbb.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './resize-controller--ByFn5Jx.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './class-map-Q7DIFm9x.js';
import './directive-C1gRZbRe.js';
import './when-kvvOyHr2.js';
import './platform-c1C9ET3y.js';
import './ElementResolution-TTOqkMM7.js';
import './random-id-M2k-wjyE.js';
import './VirtualTrigger-Sqzey4Y2.js';
import './state-FLXW5LJZ.js';
import './style-map-ak5mT6xX.js';
import './CheckboxMixin-NVpR3c6w.js';
import './sp-icon-checkmark300-n5SEYlCm.js';
import './Checkmark300-lOa7puRL.js';
import './spectrum-icon-checkmark.css-QI1dlyU-.js';
import './sp-icon-dash300-g776sv6m.js';
import './Dash300-GtH_7nnW.js';
import './spectrum-icon-dash.css-L9yAhn_w.js';

defineElement("sp-dialog-base",DialogBase);

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