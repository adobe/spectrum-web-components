import './sp-button-idIiKTnO.js';
import './sp-field-label-50w0r-Gn.js';
import './sp-help-text-MQgthQoN.js';
import './sp-textfield-IEiMrNbr.js';
import './sp-tooltip-5BQ5PqCA.js';
import './overlay-trigger-TPVfGpjp.js';
import './sp-dialog-wrapper-5HhAffuN.js';
import { l as landscape } from './images-WJGovbiS.js';
import { i as isOverlayOpen } from './index-X5nIn6KY.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l } from './if-defined-pV6JZKXB.js';
import './ButtonBase-sZHeZCuW.js';
import './like-anchor-njINSPTN.js';
import './define-element-UHExAFdK.js';
import './lit-element-xBOPiTek.js';
import './focusable-p9xQieT8.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-5oGzzbFn.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-7fQrqAdh.js';
import './base-STdhtiz1.js';
import './sizedMixin-6sBuja8e.js';
import './query-JMOstM_r.js';
import './when-kvvOyHr2.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-Tav-FzmR.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './ElementResolution-TTOqkMM7.js';
import './sp-icon-alert-8xHFckqN.js';
import './custom-tag-JXLWq-Sj.js';
import './Textfield-xQbGP5yq.js';
import './manage-help-text-kfeeNmRL.js';
import './spectrum-icon-checkmark.css-QI1dlyU-.js';
import './directive-C1gRZbRe.js';
import './directive-helpers-WPlpPO1F.js';
import './state-FLXW5LJZ.js';
import './focusable-selectors-VCrFWGqo.js';
import './sp-underlay-xE0l9xLO.js';
import './sp-dialog-dkCFsNzA.js';
import './sp-divider-ciRzsn_p.js';
import './divider.css-w129hLpK.js';
import './sp-close-button-RT_ZgufS.js';
import './spectrum-icon-cross.css-1cFDaPoP.js';
import './sp-icon-cross500-sf0nDjEl.js';
import './Cross500-CuS5PwKf.js';
import './sp-button-group-c_YOTiHm.js';
import './AlertDialog-_uLDfnbb.js';
import './resize-controller--ByFn5Jx.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './class-map-Q7DIFm9x.js';
import './DialogBase-qettA4jU.js';
import './modal.css-xwtx-S13.js';
import './first-focusable-in-LZ7hcu4z.js';

var dialogWrapper_stories = {
  title: "Dialog Wrapped",
  component: "sp-dialog-wrapper",
  argTypes: {
    onClose: { action: "close" },
    onConfirm: { action: "confirm" },
    onSecondary: { action: "secondary" },
    onCancel: { action: "cancel" }
  }
};
const handleClose = ({ onClose }) => (event) => {
  if (onClose)
    onClose(event);
};
const handleConfirm = ({ onConfirm }) => (event) => {
  if (onConfirm)
    onConfirm(event);
};
const handleSecondary = ({ onSecondary }) => (event) => {
  if (onSecondary)
    onSecondary(event);
};
const handleCancel = ({ onCancel }) => (event) => {
  if (onCancel)
    onCancel(event);
};
const wrapperLabeledHero = (args = {}, context = {}) => {
  const open = context.viewMode === "docs" ? false : true;
  return x`
        <style>
            sp-story-decorator {
                inset: 0;
                position: absolute;
                overflow: hidden;
            }
        </style>
        <sp-dialog-wrapper
            ?open=${open}
            hero=${landscape}
            hero-label="Hero Image Alt Text"
            dismissable
            headline="Wrapped Dialog w/ Hero Image"
            @close=${handleClose(args)}
            size="s"
        >
            Content of the dialog
        </sp-dialog-wrapper>
        <sp-button
            onClick="
                this.previousElementSibling.open = !this.previousElementSibling.open;
                if (this.previousElementSibling.open) {
                    this.previousElementSibling.focus();
                }
            "
            variant="primary"
        >
            Toggle Dialog
        </sp-button>
    `;
};
const wrapperDismissable = (args = {}, context = {}) => {
  const open = context.viewMode === "docs" ? false : true;
  return x`
        <sp-dialog-wrapper
            ?open=${open}
            .hero=${landscape}
            dismissable
            headline="Wrapped Dialog w/ Hero Image"
            @close=${handleClose(args)}
            size="s"
            tabindex="0"
        >
            Content of the dialog
        </sp-dialog-wrapper>
        <sp-button
            onClick="
                this.previousElementSibling.open = !this.previousElementSibling.open;
                if (this.previousElementSibling.open) {
                    this.previousElementSibling.focus();
                }
            "
            variant="primary"
        >
            Toggle Dialog
        </sp-button>
    `;
};
const wrapperDismissableUnderlay = (args = {}, context = {}) => {
  const open = context.viewMode === "docs" ? false : true;
  return x`
        <sp-dialog-wrapper
            ?open=${open}
            hero=${landscape}
            dismissable
            headline="Wrapped Dialog w/ Hero Image"
            underlay
            @close=${handleClose(args)}
            size="s"
        >
            Content of the dialog
        </sp-dialog-wrapper>
        <sp-button
            onClick="
                this.previousElementSibling.open = !this.previousElementSibling.open;
                if (this.previousElementSibling.open) {
                    this.previousElementSibling.focus();
                }
            "
            variant="primary"
        >
            Toggle Dialog
        </sp-button>
    `;
};
const form = (args = {}, context = {}) => {
  const open = context.viewMode === "docs" ? void 0 : "click";
  return x`
        <overlay-trigger
            type="modal"
            @close=${handleClose(args)}
            open=${l(open)}
        >
            <sp-button slot="trigger" variant="primary">
                Toggle Dialog
            </sp-button>
            <sp-dialog-wrapper
                id="form-fields"
                slot="click-content"
                headline="Add Delivery Address"
                underlay
                size="m"
                confirm-label="Verify Address"
                secondary-label="Add"
                cancel-label="Cancel"
                @close=${handleClose(args)}
                @confirm=${({ target }) => {
    target.dispatchEvent(
      new Event("close", { bubbles: true, composed: true })
    );
  }}
                @secondary=${({ target }) => {
    target.dispatchEvent(
      new Event("close", { bubbles: true, composed: true })
    );
  }}
                @cancel=${({ target }) => {
    target.dispatchEvent(
      new Event("close", { bubbles: true, composed: true })
    );
  }}
            >
                <style>
                    #form-fields div {
                        display: grid;
                        row-gap: var(--spectrum-global-dimension-size-150);
                        grid-template-columns: auto auto;

                        --spectrum-fieldlabel-m-side-padding-right: 0;
                    }
                </style>
                <div>
                    <sp-field-label side-aligned="end" for="street">
                        Street:
                    </sp-field-label>
                    <sp-textfield id="street" autofocus></sp-textfield>
                    <sp-field-label side-aligned="end" for="city">
                        City:
                    </sp-field-label>
                    <sp-textfield id="city"></sp-textfield>
                    <sp-field-label side-aligned="end" for="state">
                        State:
                    </sp-field-label>
                    <sp-textfield id="state"></sp-textfield>
                    <sp-field-label side-aligned="end" for="zip">
                        Zip:
                    </sp-field-label>
                    <sp-textfield id="zip"></sp-textfield>
                    <sp-field-label side-aligned="end" for="instructions">
                        Special instructions:
                    </sp-field-label>
                    <sp-textfield id="instructions" multiline>
                        <sp-help-text slot="help-text">
                            For example, gate code or other information to help
                            the driver find you
                        </sp-help-text>
                    </sp-textfield>
                </div>
            </sp-dialog-wrapper>
        </overlay-trigger>
    `;
};
form.decorators = [isOverlayOpen];
const longContent = (args = {}, context = {}) => {
  const open = context.viewMode === "docs" ? void 0 : "click";
  return x`
        <overlay-trigger
            type="modal"
            @close=${handleClose(args)}
            open=${l(open)}
        >
            <sp-button slot="trigger" variant="primary">
                Toggle Dialog
            </sp-button>
            <sp-dialog-wrapper
                slot="click-content"
                headline="Dialog title"
                dismissable
                underlay
                size="s"
            >
                <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Sed ac dolor sit amet purus malesuada congue. Donec quis
                    nibh at felis congue commodo. Ut enim ad minima veniam, quis
                    nostrum exercitationem ullam corporis suscipit laboriosam,
                    nisi ut aliquid ex ea commodi consequatur? Sed ac dolor sit
                    amet purus malesuada congue. Nam libero tempore, cum soluta
                    nobis est eligendi optio cumque nihil impedit quo minus id
                    quod maxime placeat facere possimus, omnis voluptas
                    assumenda est, omnis dolor repellendus. Nullam sit amet
                    magna in magna gravida vehicula. Itaque earum rerum hic
                    tenetur a sapiente delectus, ut aut reiciendis voluptatibus
                    maiores alias consequatur aut perferendis doloribus
                    asperiores repellat. Neque porro quisquam est, qui dolorem
                    ipsum quia dolor sit amet, consectetur, adipisci velit, sed
                    quia non numquam eius modi tempora incidunt ut labore et
                    dolore magnam aliquam quaerat voluptatem. Phasellus faucibus
                    molestie nisl. Vestibulum fermentum tortor id mi. Integer
                    rutrum, orci vestibulum ullamcorper ultricies, lacus quam
                    ultricies odio, vitae placerat pede sem sit amet enim.
                    Maecenas sollicitudin. Nullam rhoncus aliquam metus.
                </p>
                <p>
                    Curabitur ligula sapien, pulvinar a vestibulum quis,
                    facilisis vel sapien. Fusce nibh. Proin pede metus,
                    vulputate nec, fermentum fringilla, vehicula vitae, justo.
                    Aenean placerat. Aliquam erat volutpat. Et harum quidem
                    rerum facilis est et expedita distinctio. Fusce nibh.
                    Temporibus autem quibusdam et aut officiis debitis aut rerum
                    necessitatibus saepe eveniet ut et voluptates repudiandae
                    sint et molestiae non recusandae. Vestibulum erat nulla,
                    ullamcorper nec, rutrum non, nonummy ac, erat. Etiam posuere
                    lacus quis dolor. Mauris elementum mauris vitae tortor.
                    Nulla turpis magna, cursus sit amet, suscipit a, interdum
                    id, felis. Nam libero tempore, cum soluta nobis est eligendi
                    optio cumque nihil impedit quo minus id quod maxime placeat
                    facere possimus, omnis voluptas assumenda est, omnis dolor
                    repellendus. Nulla accumsan, elit sit amet varius semper,
                    nulla mauris mollis quam, tempor suscipit diam nulla vel
                    leo. Pellentesque sapien.
                </p>
                <p>
                    Curabitur vitae diam non enim vestibulum interdum. Sed elit
                    dui, pellentesque a, faucibus vel, interdum nec, diam.
                    Praesent vitae arcu tempor neque lacinia pretium. Ut tempus
                    purus at lorem. Phasellus rhoncus. Temporibus autem
                    quibusdam et aut officiis debitis aut rerum necessitatibus
                    saepe eveniet ut et voluptates repudiandae sint et molestiae
                    non recusandae. Duis ante orci, molestie vitae vehicula
                    venenatis, tincidunt ac pede. Integer vulputate sem a nibh
                    rutrum consequat. Aenean placerat. Cum sociis natoque
                    penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Sed vel lectus. Donec odio tempus molestie,
                    porttitor ut, iaculis quis, sem. Class aptent taciti
                    sociosqu ad litora torquent per conubia nostra, per inceptos
                    hymenaeos. Integer in sapien. Nullam dapibus fermentum
                    ipsum.
                </p>
                <p>
                    Integer vulputate sem a nibh rutrum consequat. Class aptent
                    taciti sociosqu ad litora torquent per conubia nostra, per
                    inceptos hymenaeos. Duis bibendum, lectus ut viverra
                    rhoncus, dolor nunc faucibus libero, eget facilisis enim
                    ipsum id lacus. Aliquam erat volutpat. Aenean id metus id
                    velit ullamcorper pulvinar. Morbi scelerisque luctus velit.
                    Aliquam erat volutpat. Temporibus autem quibusdam et aut
                    officiis debitis aut rerum necessitatibus saepe eveniet ut
                    et voluptates repudiandae sint et molestiae non recusandae.
                    Fusce dui leo, imperdiet in, aliquam sit amet, feugiat eu,
                    orci. Suspendisse sagittis ultrices augue. Nullam justo
                    enim, consectetuer nec, ullamcorper ac, vestibulum in, elit.
                    Praesent vitae arcu tempor neque lacinia pretium. Nullam
                    faucibus mi quis velit. Maecenas aliquet accumsan leo. Morbi
                    scelerisque luctus velit. Aliquam ornare wisi eu metus.
                </p>
                <p>
                    Sed elit dui, pellentesque a, faucibus vel, interdum nec,
                    diam. Praesent vitae arcu tempor neque lacinia pretium.
                    Etiam dictum tincidunt diam. Et harum quidem rerum facilis
                    est et expedita distinctio. Duis ante orci, molestie vitae
                    vehicula venenatis, tincidunt ac pede. Integer lacinia.
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                    Mauris tincidunt sem sed arcu. Praesent in mauris eu tortor
                    porttitor accumsan. Aenean id metus id velit ullamcorper
                    pulvinar. Donec iaculis gravida nulla. Duis bibendum, lectus
                    ut viverra rhoncus, dolor nunc faucibus libero, eget
                    facilisis enim ipsum id lacus. Nulla quis diam. Quisque
                    porta. Integer rutrum, orci vestibulum ullamcorper
                    ultricies, lacus quam ultricies odio, vitae placerat pede
                    sem sit amet enim. Nam sed tellus id magna elementum
                    tincidunt. In enim a arcu imperdiet malesuada.
                </p>
            </sp-dialog-wrapper>
        </overlay-trigger>
    `;
};
longContent.decorators = [isOverlayOpen];
const wrapperDismissableUnderlayError = (args = {}, context = {}) => {
  const open = context.viewMode === "docs" ? false : true;
  return x`
        <div>
            <sp-dialog-wrapper
                ?open=${open}
                hero=${landscape}
                dismissable
                error
                headline="Wrapped Dialog w/ Hero Image"
                underlay
                @close=${handleClose(args)}
                size="s"
            >
                Content of the dialog
            </sp-dialog-wrapper>
            <sp-button
                onClick="
                    this.previousElementSibling.open = !this.previousElementSibling.open;
                    if (this.previousElementSibling.open) {
                        this.previousElementSibling.focus();
                    }
                "
                variant="primary"
            >
                Toggle Dialog
            </sp-button>
        </div>
    `;
};
const wrapperButtons = (args = {}, context = {}) => {
  const open = context.viewMode === "docs" ? false : true;
  return x`
        <sp-dialog-wrapper
            ?open=${open}
            size="l"
            headline="Wrapped Dialog w/ Buttons"
            confirm-label="Keep Both"
            secondary-label="Replace"
            cancel-label="Cancel"
            footer="Content for footer"
            @close=${handleClose(args)}
            @confirm=${handleConfirm(args)}
            @secondary=${handleSecondary(args)}
            @cancel=${handleCancel(args)}
        >
            Content of the dialog
        </sp-dialog-wrapper>
    `;
};
const wrapperButtonsUnderlay = (args = {}, context = {}) => {
  const open = context.viewMode === "docs" ? false : true;
  return x`
        <sp-dialog-wrapper
            ?open=${open}
            underlay
            size="l"
            headline="Wrapped Dialog w/ Buttons"
            confirm-label="Keep Both"
            secondary-label="Replace"
            cancel-label="Cancel"
            footer="Content for footer"
            @close=${handleClose(args)}
            @confirm=${handleConfirm(args)}
            @secondary=${handleSecondary(args)}
            @cancel=${handleCancel(args)}
        >
            Content of the dialog
        </sp-dialog-wrapper>
    `;
};
const wrapperFullscreen = (args = {}, context = {}) => {
  const open = context.viewMode === "docs" ? false : true;
  return x`
        <sp-dialog-wrapper
            ?open=${open}
            headline="Wrapped Dialog - Fullscreen"
            mode="fullscreen"
            confirm-label="Keep Both"
            secondary-label="Replace"
            cancel-label="Cancel"
            @close=${handleClose(args)}
            @confirm=${handleConfirm(args)}
            @secondary=${handleSecondary(args)}
            @cancel=${handleCancel(args)}
        >
            Content of the dialog
        </sp-dialog-wrapper>
    `;
};
const wrapperWithHeadline = (args = {}, context = {}) => {
  const open = context.viewMode === "docs" ? false : true;
  return x`
        <sp-dialog-wrapper
            ?open=${open}
            headline="Headline for dialog"
            @close=${handleClose(args)}
        >
            Content of the dialog
        </sp-dialog-wrapper>
    `;
};
const wrapperWithHeadlineNoDivider = (args = {}, context = {}) => {
  const open = context.viewMode === "docs" ? false : true;
  return x`
        <sp-dialog-wrapper
            ?open=${open}
            headline="Headline for dialog"
            no-divider=${true}
            @close=${handleClose(args)}
        >
            Content of the dialog
        </sp-dialog-wrapper>
    `;
};
const wrapperHeadlineVisibilityNone = (args = {}, context = {}) => {
  const open = context.viewMode === "docs" ? false : true;
  return x`
        <sp-dialog-wrapper
            headline="Accessible headline"
            .headlineVisibility=${"none"}
            ?open=${open}
            @close=${handleClose(args)}
        >
            Content of the dialog
        </sp-dialog-wrapper>
    `;
};
const tooltips = (args = {}, context = {}) => {
  const open = context.viewMode === "docs" ? void 0 : "click";
  return x`
        <overlay-trigger
            type="modal"
            @close=${handleClose(args)}
            open=${l(open)}
        >
            <sp-button slot="trigger" variant="primary">
                Toggle Dialog
            </sp-button>
            <sp-dialog-wrapper
                slot="click-content"
                headline="Dialog title"
                dismissable
                underlay
                size="s"
            >
                ${[1, 2, 3, 4].map(
    (index) => x`
                        <overlay-trigger>
                            <sp-button slot="trigger">
                                Button with Tooltip ${index}
                            </sp-button>
                            <sp-tooltip slot="hover-content">
                                Tooltip ${index}
                            </sp-tooltip>
                        </overlay-trigger>
                    `
  )}
            </sp-dialog-wrapper>
        </overlay-trigger>
    `;
};
tooltips.decorators = [isOverlayOpen];
const lazyHero = ({ src }) => {
  const handleOpened = () => {
    document.querySelector("sp-dialog-wrapper").hero = src;
  };
  return x`
        <overlay-trigger content="click" @sp-opened=${handleOpened}>
            <sp-button slot="trigger">Toggle Dialog</sp-button>
            <sp-dialog-wrapper
                slot="click-content"
                headline="Dialog title"
                confirm-label="Primary"
            >
                <p>Content of the dialog</p>
                <ol>
                    <li>
                        Select the following checkbox to have the dialog close
                        when clicking one of its buttons.
                    </li>
                    <li>
                        Select the following checkbox to have the dialog close
                        when clicking one of its buttons.
                    </li>
                    <li>
                        Select the following checkbox to have the dialog close
                        when clicking one of its buttons.
                    </li>
                    <li>
                        Select the following checkbox to have the dialog close
                        when clicking one of its buttons.
                    </li>
                    <li>
                        Select the following checkbox to have the dialog close
                        when clicking one of its buttons.
                    </li>
                    <li>
                        Select the following checkbox to have the dialog close
                        when clicking one of its buttons.
                    </li>
                    <li>
                        Select the following checkbox to have the dialog close
                        when clicking one of its buttons.
                    </li>
                    <li>
                        Select the following checkbox to have the dialog close
                        when clicking one of its buttons.
                    </li>
                    <li>
                        Select the following checkbox to have the dialog close
                        when clicking one of its buttons.
                    </li>
                    <li>
                        Select the following checkbox to have the dialog close
                        when clicking one of its buttons.
                    </li>
                    <li>
                        Select the following checkbox to have the dialog close
                        when clicking one of its buttons.
                    </li>
                </ol>
            </sp-dialog-wrapper>
        </overlay-trigger>
    `;
};
lazyHero.args = {
  src: "https://dummyimage.com/800x400/000/fff"
};
lazyHero.swc_vrt = {
  skip: true
};
const __namedExportsOrder = ['wrapperLabeledHero', 'wrapperDismissable', 'wrapperDismissableUnderlay', 'form', 'longContent', 'wrapperDismissableUnderlayError', 'wrapperButtons', 'wrapperButtonsUnderlay', 'wrapperFullscreen', 'wrapperWithHeadline', 'wrapperWithHeadlineNoDivider', 'wrapperHeadlineVisibilityNone', 'tooltips', 'lazyHero'];

export { __namedExportsOrder, dialogWrapper_stories as default, form, lazyHero, longContent, tooltips, wrapperButtons, wrapperButtonsUnderlay, wrapperDismissable, wrapperDismissableUnderlay, wrapperDismissableUnderlayError, wrapperFullscreen, wrapperHeadlineVisibilityNone, wrapperLabeledHero, wrapperWithHeadline, wrapperWithHeadlineNoDivider };