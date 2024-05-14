import './sp-card-DVV6jYW8.js';
import { p as portrait, l as landscape } from './images-BaNQTS6P.js';
import './sp-icon-file-txt-CZOy1buZ.js';
import './sp-textfield-CX2BAkJ4.js';
import './sp-action-menu-Bmg1v470.js';
import './sp-menu-CUlDsjuI.js';
import './sp-menu-item-C1UX3rOw.js';
import './sp-menu-divider-C2nPYE43.js';
import './sp-link-Cr5gZ9-1.js';
import { x } from './lit-html-COgVUehj.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './mutation-controller-D2lT1xZk.js';
import './like-anchor-c-omWQV-.js';
import './define-element-9Zj84-C8.js';
import './lit-element-BL-po2DW.js';
import './if-defined-DDJGFaN4.js';
import './sp-asset-VNHsEyxy.js';
import './sp-checkbox-V080ci41.js';
import './CheckboxMixin-pTVheWCu.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './sp-icon-checkmark300-BnoT5Wlj.js';
import './Checkmark300-Cv25Kwxj.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-L76-n75s.js';
import './spectrum-icon-checkmark.css-B4Pvgr0C.js';
import './sp-icon-dash300-BxByyrq0.js';
import './Dash300-DagFK8mn.js';
import './spectrum-icon-dash.css-ClCpXr2r.js';
import './sizedMixin-H6qLwJc0.js';
import './sp-quick-actions-DlKO5z6c.js';
import './sp-divider-BpFfGzVw.js';
import './divider.css-Y7Qapv-N.js';
import './heading-HGbZSp2m.js';
import './spectrum-lang.css-J6J1vfcw.js';
import './FileTxt-DquxLCV0.js';
import './custom-tag-Diwq7nXX.js';
import './Textfield-Ckg-egQR.js';
import './manage-help-text-83_bseGo.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './focusable-CfMGZF2L.js';
import './sp-icon-alert-GYTZvYm3.js';
import './directive-Bn5c4u4M.js';
import './directive-helpers-icdnqxxc.js';
import './state-DdC_O7Nr.js';
import './sp-action-button-tPVQtofG.js';
import './sp-icon-corner-triangle300-Cr7f54D_.js';
import './CornerTriangle300-B7hvHiLM.js';
import './ButtonBase-adwZ7HOt.js';
import './observe-slot-text-Dr0dVrDu.js';
import './query-assigned-nodes-DAYI4epk.js';
import './sp-icon-more-Du-fANFQ.js';
import './More-C2yzfCOG.js';
import './slottable-request-event-DXuuyGoq.js';
import './Picker-sbrTRXP-.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './sp-icon-chevron100-BVn8JicT.js';
import './Chevron100-2ZEB0c-t.js';
import './MatchMedia-pSNe9kbs.js';
import './DependencyManger-Dpkh1Bse.js';
import './class-map-DdRvesrq.js';
import './style-map-DtKTc8KS.js';
import './when-DEJm_QN9.js';

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
    if (composedTarget.id !== "like-anchor") return;
    event.stopPropagation();
    event.preventDefault();
    onClick && onClick(event);
  }}
        >
            <div slot="footer">
                Footer with a
                <sp-link href="https://google.com">link to Google</sp-link>
            </div>
            <sp-action-menu
                label="More Actions"
                slot="actions"
                placement="bottom-end"
                quiet
            >
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
            <sp-action-menu
                label="More Actions"
                slot="actions"
                placement="bottom-end"
                quiet
            >
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
                <sp-action-menu
                    label="More Actions"
                    slot="actions"
                    placement="bottom-end"
                    quiet
                >
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
                <sp-action-menu
                    label="More Actions"
                    slot="actions"
                    placement="bottom-end"
                    quiet
                >
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
            <sp-action-menu
                label="More Actions"
                slot="actions"
                placement="bottom-end"
                quiet
            >
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
