import './sp-card-WE7zJBlD.js';
import { p as portrait, l as landscape } from './images--h1L0gQv.js';
import './sp-icon-file-txt-0Md1hTul.js';
import './sp-textfield-IEiMrNbr.js';
import './sp-action-menu-vf-HeNok.js';
import './sp-menu-FQVYzy9J.js';
import './sp-menu-item-WU5O76xQ.js';
import './sp-menu-divider-_m0GybmG.js';
import './sp-link-d75BcDzT.js';
import { x } from './lit-html-GmIhAbMP.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './mutation-controller-KeE5MDSl.js';
import './like-anchor-njINSPTN.js';
import './define-element-UHExAFdK.js';
import './lit-element-xBOPiTek.js';
import './if-defined-pV6JZKXB.js';
import './sp-asset-T1SWcuDX.js';
import './sp-checkbox-ev6msJli.js';
import './CheckboxMixin-NVpR3c6w.js';
import './query-JMOstM_r.js';
import './base-STdhtiz1.js';
import './sp-icon-checkmark300-n5SEYlCm.js';
import './Checkmark300-lOa7puRL.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-Tav-FzmR.js';
import './spectrum-icon-checkmark.css-QI1dlyU-.js';
import './sp-icon-dash300-g776sv6m.js';
import './Dash300-GtH_7nnW.js';
import './spectrum-icon-dash.css-L9yAhn_w.js';
import './sizedMixin-6sBuja8e.js';
import './sp-quick-actions-fp-aCEAx.js';
import './sp-divider-ciRzsn_p.js';
import './divider.css-w129hLpK.js';
import './heading-AilkxF3X.js';
import './spectrum-lang.css-3hMTHKBE.js';
import './FileTxt-L5CdRS9Q.js';
import './custom-tag-JXLWq-Sj.js';
import './Textfield-xQbGP5yq.js';
import './manage-help-text-kfeeNmRL.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './focusable-p9xQieT8.js';
import './sp-icon-alert-8xHFckqN.js';
import './directive-C1gRZbRe.js';
import './directive-helpers-WPlpPO1F.js';
import './state-FLXW5LJZ.js';
import './sp-action-button-IL4X3jdR.js';
import './sp-icon-corner-triangle300-9DQQh1mD.js';
import './CornerTriangle300-wDtTC9xD.js';
import './ButtonBase-sZHeZCuW.js';
import './observe-slot-text-5oGzzbFn.js';
import './query-assigned-nodes-7fQrqAdh.js';
import './sp-icon-more-8Poneot0.js';
import './More-RXlxfRbl.js';
import './Picker-yxog523o.js';
import './spectrum-icon-chevron.css-nkKXiUlE.js';
import './sp-icon-chevron100-tb9aielX.js';
import './Chevron100-WZwzwvjg.js';
import './MatchMedia-SMh19R1m.js';
import './class-map-Q7DIFm9x.js';
import './style-map-ak5mT6xX.js';
import './random-id-M2k-wjyE.js';

var card_stories = {
  component: "sp-card",
  title: "Card",
  args: {
    horizontal: false
  },
  argTypes: {
    horizontal: {
      name: "horizontal",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    }
  }
};
const Default = (args) => {
  return x`
        <sp-card
            heading="Card Heading"
            subheading="JPG"
            ?horizontal=${args.horizontal}
            style="width: 200px;"
        >
            <img slot="cover-photo" src=${portrait} alt="Demo Graphic" />
            <div slot="footer">Footer</div>
        </sp-card>
    `;
};
Default.args = {};
const href = (args) => {
  const { onClick } = args;
  return x`
        <sp-card
            heading="Card Heading"
            subheading="JPG"
            toggles
            ?horizontal=${args.horizontal}
            style="width: 200px;"
            href="https://opensource.adobe.com/spectrum-web-components"
            @click=${(event) => {
    const composedTarget = event.composedPath()[0];
    if (composedTarget.id !== "like-anchor")
      return;
    event.stopPropagation();
    event.preventDefault();
    onClick && onClick(event);
  }}
        >
            <div slot="footer">
                Footer with a
                <sp-link href="https://google.com">link to Google</sp-link>
            </div>
            <sp-action-menu slot="actions" placement="bottom-end" quiet>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-action-menu>
            <img slot="cover-photo" src=${portrait} alt="Demo Graphic" />
        </sp-card>
    `;
};
href.argTypes = {
  onClick: { action: "link click" }
};
const actions = (args) => {
  return x`
        <sp-card
            heading="Card Heading"
            subheading="JPG"
            ?horizontal=${args.horizontal}
            style="width: 200px;"
        >
            <img slot="cover-photo" src=${portrait} alt="Demo Graphic" />
            <div slot="footer">Footer</div>
            <sp-action-menu slot="actions" placement="bottom-end" quiet>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-action-menu>
        </sp-card>
    `;
};
const Gallery = (args) => {
  return x`
        <sp-card
            variant="gallery"
            heading="Card Heading"
            subheading="JPG"
            ?horizontal=${args.horizontal}
        >
            <img
                slot="preview"
                src=${landscape}
                style="object-fit: cover"
                alt="Demo Graphic"
            />
            <div slot="description">10/15/18</div>
        </sp-card>
    `;
};
const noPreviewImage = (args) => {
  return x`
        <sp-card
            heading="Card Heading"
            subheading="No preview image"
            ?horizontal=${args.horizontal}
            style="width: 200px;"
        >
            <div slot="footer">Footer</div>
        </sp-card>
    `;
};
const Quiet = (args) => {
  return x`
        <div>
            <sp-card
                variant="quiet"
                heading="Card Heading"
                subheading="JPG"
                ?horizontal=${args.horizontal}
                style="width: 208px; height: 264px"
            >
                <img src=${portrait} alt="Demo Graphic" slot="preview" />
                <div slot="description">10/15/18</div>
            </sp-card>
        </div>
    `;
};
const quietFile = (args) => {
  return x`
        <div>
            <sp-card
                variant="quiet"
                subheading="JPG"
                asset="file"
                ?horizontal=${args.horizontal}
                style="width: 208px; height: 264px"
            >
                <img src=${portrait} alt="Demo Graphic" slot="preview" />
                <div slot="heading">File Name</div>
                <div slot="description">10/15/18</div>
            </sp-card>
        </div>
    `;
};
const quietFolder = (args) => {
  return x`
        <div>
            <sp-card
                variant="quiet"
                subheading="JPG"
                asset="folder"
                ?horizontal=${args.horizontal}
                style="width: 208px; height: 264px"
            >
                <img src=${portrait} alt="Demo Graphic" slot="preview" />
                <div slot="heading">Folder Name</div>
                <div slot="description">10/15/18</div>
            </sp-card>
        </div>
    `;
};
const quietActions = (args) => {
  return x`
        <div>
            <sp-card
                variant="quiet"
                heading="Card Heading"
                subheading="JPG"
                ?horizontal=${args.horizontal}
                style="width: 208px; height: 264px"
            >
                <img src=${portrait} alt="Demo Graphic" slot="preview" />
                <div slot="description">10/15/18</div>
                <sp-action-menu slot="actions" placement="bottom-end" quiet>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-action-menu>
            </sp-card>
        </div>
    `;
};
quietActions.storyName = "Quiet w/ Actions";
const Horizontal = (args) => {
  return x`
        <sp-card
            ?horizontal=${args.horizontal}
            heading="Card Heading"
            subheading="JPG"
        >
            <sp-icon-file-txt
                slot="preview"
                style="width: 36px; height: 36px;"
            ></sp-icon-file-txt>
        </sp-card>
    `;
};
Horizontal.args = {
  horizontal: true
};
const horizontalWithHREF = (args) => {
  return x`
        <sp-card
            ?horizontal=${args.horizontal}
            heading="Card Heading"
            subheading="JPG"
            href="https://opensource.adobe.com/spectrum-web-components"
            target="_blank"
        >
            <sp-icon-file-txt
                slot="preview"
                style="width: 36px; height: 36px;"
            ></sp-icon-file-txt>
        </sp-card>
    `;
};
horizontalWithHREF.args = {
  horizontal: true
};
const smallQuiet = (args) => {
  return x`
        <div>
            <sp-card
                size=${args.size}
                ?horizontal=${args.horizontal}
                heading="Card Heading"
                subheading="JPG"
                variant="quiet"
                style="width: 115px"
            >
                <img src=${portrait} alt="Demo Graphic" slot="preview" />
                <div slot="footer">Footer</div>
                <sp-action-menu slot="actions" placement="bottom-end" quiet>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-action-menu>
            </sp-card>
        </div>
    `;
};
smallQuiet.args = {
  size: "s"
};
const SlottedHeading = (args) => {
  return x`
        <style>
            .slotted-textfield-heading {
                width: 100%;
            }
        </style>
        <sp-card
            style="
                --spectrum-card-title-width: 100%;
                --spectrum-card-title-padding-right: 0;
                --spectrum-card-title-padding-left: 0;
                --spectrum-card-body-header-height: auto;
                --spectrum-alias-single-line-width: 100%;
            "
            ?horizontal=${args.horizontal}
        >
            <img slot="cover-photo" src=${portrait} alt="Demo Graphic" />
            <sp-textfield
                class="slotted-textfield-heading"
                slot="heading"
                value="Apr 23 Project"
                quiet
            ></sp-textfield>
            <div slot="subheading">Last modified on 6/17/2020, 3:37 PM</div>
            <sp-action-menu slot="actions" placement="bottom-end" quiet>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-action-menu>
        </sp-card>
    `;
};
const __namedExportsOrder = ['Default', 'href', 'actions', 'Gallery', 'noPreviewImage', 'Quiet', 'quietFile', 'quietFolder', 'quietActions', 'Horizontal', 'horizontalWithHREF', 'smallQuiet', 'SlottedHeading'];

export { Default, Gallery, Horizontal, Quiet, SlottedHeading, __namedExportsOrder, actions, card_stories as default, horizontalWithHREF, href, noPreviewImage, quietActions, quietFile, quietFolder, smallQuiet };