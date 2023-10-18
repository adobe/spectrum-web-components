import { D as DialogBase } from './DialogBase-05fb739e.js';
import { d as defineElement } from './define-element-e64f5ea4.js';
import './sp-dialog-bd7cdf06.js';
import './sp-button-6534d7a7.js';
import './sp-overlay-2f9e6847.js';
import './sp-checkbox-1a2ad388.js';
import { alertDestructive } from './dialog.stories-1f37ae53.js';
import { p as portrait } from './images-68360f9e.js';
import { d as disabledButtonDecorator } from './index-e70970e1.js';
import { x } from './lit-html-126adc72.js';
import './sp-underlay-e0018f00.js';
import './lit-element-9354aa77.js';
import './modal.css-ad9e835e.js';
import './first-focusable-in-184a26e2.js';
import './focusable-selectors-252ae36e.js';
import './focus-visible-03398d98.js';
import './sp-divider-02e53dcd.js';
import './divider.css-d14b5633.js';
import './sizedMixin-43fe982f.js';
import './base-511c8c11.js';
import './sp-close-button-77218317.js';
import './spectrum-icon-cross.css-5810d93c.js';
import './ButtonBase-997f7a09.js';
import './like-anchor-72ed571c.js';
import './if-defined-ae83b405.js';
import './focusable-6cc2c3b2.js';
import './observe-slot-text-16ab7d67.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-b8bfe193.js';
import './query-d0113d5a.js';
import './custom-tag-c228386e.js';
import './IconBase-d00b1a4e.js';
import './sp-button-group-28fd6c42.js';
import './sp-icon-alert-248f0d52.js';
import './custom-tag-b5526d41.js';
import './AlertDialog-1684188b.js';
import './condition-attribute-with-id-62869347.js';
import './resize-controller-55608b66.js';
import './observe-slot-presence-ae37a9bc.js';
import './class-map-14530ec2.js';
import './directive-2bb7789e.js';
import './platform-a32a5617.js';
import './ElementResolution-7469f128.js';
import './VirtualTrigger-7996ec8f.js';
import './state-5175507d.js';
import './style-map-156e3c36.js';
import './CheckboxBase-dd1db946.js';
import './sp-icon-checkmark300-9608e0ff.js';
import './Checkmark300-0ba007ba.js';
import './spectrum-icon-checkmark.css-359949f2.js';
import './sp-icon-dash300-baefb43f.js';
import './Dash300-2d8f97df.js';
import './spectrum-icon-dash.css-7fdeaf11.js';

defineElement("sp-dialog-base",DialogBase);

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
