import './sp-button-BozK2kr9.js';
import './sp-field-label-Bbgi80Vq.js';
import './sp-help-text-DY8tY1di.js';
import './sp-textfield-BLWHTfcQ.js';
import './sp-tooltip-Dfsn9E_X.js';
import './overlay-trigger-Do2I98wk.js';
import './sp-dialog-wrapper-BJ7zYYLF.js';
import { l as landscape } from './images-mTOzd28p.js';
import { i as isOverlayOpen } from './index-lhoNpeV0.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './ButtonBase-DcuiXj8E.js';
import './like-anchor-BBONMzyI.js';
import './define-element-2VgsDjbW.js';
import './lit-element-BulMEkr1.js';
import './focusable-D81tHnNY.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-Mz9mFVuX.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './PendingState-DveGeJwu.js';
import './get-label-from-slot-Cg6mfN40.js';
import './sizedMixin-D4VoaNlz.js';
import './random-id-BST1Puzz.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-BC0FCRBc.js';
import './state-ChcedIDn.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './ElementResolution-B9KteuX8.js';
import './sp-icon-alert-2CW9YlXi.js';
import './custom-tag-Diwq7nXX.js';
import './Textfield-DWd10G-B.js';
import './manage-help-text-CQxj8H8g.js';
import './spectrum-icon-checkmark.css-CmBPoiLZ.js';
import './directive-Bn5c4u4M.js';
import './directive-helpers-icdnqxxc.js';
import './focusable-selectors-CUZEb4r9.js';
import './DependencyManger-Dpkh1Bse.js';
import './sp-overlay-6ny-UI-O.js';
import './Overlay-DxIQWcXp.js';
import './VirtualTrigger-bRuJty-j.js';
import './first-focusable-in-BK_DAWOm.js';
import './platform-r3Lf9REX.js';
import './slottable-request-event-DXuuyGoq.js';
import './query-assigned-elements-C9WOp2R6.js';
import './style-map-DtKTc8KS.js';
import './sp-underlay-D2ujj4pU.js';
import './sp-dialog-u9L4qrz_.js';
import './sp-button-group-CUkHWYJO.js';
import './sp-close-button-DcqHdgb9.js';
import './spectrum-icon-cross.css-DNcrOn37.js';
import './sp-icon-cross500-4XY4LloU.js';
import './Cross500-Cv8kebkP.js';
import './sp-divider-CUtJsJal.js';
import './divider.css-CtZfV7_5.js';
import './AlertDialog-BuWnDbhn.js';
import './resize-controller-BJKfu6ft.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './class-map-DdRvesrq.js';
import './DialogBase-DtKkKtgl.js';
import './modal.css-fEtfRe6E.js';

var dialogWrapper_stories = {
  title: "Dialog Wrapper",
  component: "sp-dialog-wrapper",
  argTypes: {
    onClose: { action: "close" },
    onConfirm: { action: "confirm" },
    onSecondary: { action: "secondary" },
    onCancel: { action: "cancel" }
  }
};
const handleClose = ({ onClose }) => (event) => {
  if (onClose) onClose(event);
};
const handleConfirm = ({ onConfirm }) => (event) => {
  if (onConfirm) onConfirm(event);
};
const handleSecondary = ({ onSecondary }) => (event) => {
  if (onSecondary) onSecondary(event);
};
const handleCancel = ({ onCancel }) => (event) => {
  if (onCancel) onCancel(event);
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
            open=${o(open)}
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
                        row-gap: calc(var(--swc-scale-factor) * 12px);
                        grid-template-columns: auto auto;
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
            open=${o(open)}
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
const longHeading = (args = {}, context = {}) => {
  const open = context.viewMode === "docs" ? void 0 : "click";
  return x`
        <overlay-trigger
            type="modal"
            @close=${handleClose(args)}
            open=${o(open)}
        >
            <sp-dialog-wrapper
                slot="click-content"
                underlay
                headline="Dialog long long long long long long long long long long long long title"
                confirm-label="Keep Both"
                secondary-label="Replace"
                cancel-label="Cancel"
                footer="Content for footer"
                size="m"
            >
                Content of the dialog
            </sp-dialog-wrapper>
            <sp-button slot="trigger" variant="primary">
                Toggle Dialog
            </sp-button>
        </overlay-trigger>
    `;
};
longHeading.decorators = [isOverlayOpen];
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
            open=${o(open)}
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
lazyHero.parameters = {
  // Disables Chromatic's snapshotting on a global level
  chromatic: { disableSnapshot: true }
};
const __namedExportsOrder = ['wrapperLabeledHero', 'wrapperDismissable', 'wrapperDismissableUnderlay', 'form', 'longContent', 'longHeading', 'wrapperDismissableUnderlayError', 'wrapperButtons', 'wrapperButtonsUnderlay', 'wrapperFullscreen', 'wrapperWithHeadline', 'wrapperWithHeadlineNoDivider', 'wrapperHeadlineVisibilityNone', 'tooltips', 'lazyHero'];

export { __namedExportsOrder, dialogWrapper_stories as default, form, lazyHero, longContent, longHeading, tooltips, wrapperButtons, wrapperButtonsUnderlay, wrapperDismissable, wrapperDismissableUnderlay, wrapperDismissableUnderlayError, wrapperFullscreen, wrapperHeadlineVisibilityNone, wrapperLabeledHero, wrapperWithHeadline, wrapperWithHeadlineNoDivider };
