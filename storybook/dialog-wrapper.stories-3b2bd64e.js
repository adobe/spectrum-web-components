import './sp-button-b85e30a6.js';
import './sp-field-label-b445efc6.js';
import './sp-help-text-b97b22d2.js';
import './sp-textfield-605302de.js';
import './sp-tooltip-0a1fc8b5.js';
import './overlay-trigger-abaf80d3.js';
import './sp-dialog-wrapper-9ef0531a.js';
import { l as landscape } from './images-68360f9e.js';
import { o as overlayTriggerDecorator } from './index-e70970e1.js';
import { x } from './lit-html-126adc72.js';
import { l } from './if-defined-ae83b405.js';
import './ButtonBase-f782d237.js';
import './like-anchor-86192240.js';
import './define-element-617dba69.js';
import './lit-element-9354aa77.js';
import './focusable-c7e64029.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-03ae7746.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-c8b87639.js';
import './base-511c8c11.js';
import './sizedMixin-29c62bc2.js';
import './query-d0113d5a.js';
import './custom-tag-c228386e.js';
import './IconBase-d9572ad8.js';
import './condition-attribute-with-id-62869347.js';
import './ElementResolution-b58a0825.js';
import './sp-icon-alert-4033bfea.js';
import './custom-tag-b5526d41.js';
import './Textfield-773874be.js';
import './manage-help-text-39f4c7ea.js';
import './spectrum-icon-checkmark.css-a8f99d4c.js';
import './directive-2bb7789e.js';
import './directive-helpers-aa9210f2.js';
import './state-59f591cf.js';
import './focusable-selectors-252ae36e.js';
import './sp-underlay-fcec773d.js';
import './sp-dialog-25902d3b.js';
import './sp-divider-2be11f97.js';
import './divider.css-d14b5633.js';
import './sp-close-button-785d4b84.js';
import './spectrum-icon-cross.css-8f837689.js';
import './sp-button-group-b2190db1.js';
import './AlertDialog-888585c7.js';
import './resize-controller-55608b66.js';
import './observe-slot-presence-ae37a9bc.js';
import './class-map-14530ec2.js';
import './DialogBase-4ee96fde.js';
import './modal.css-ad9e835e.js';
import './first-focusable-in-184a26e2.js';

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
form.decorators = [overlayTriggerDecorator];
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
longContent.decorators = [overlayTriggerDecorator];
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
tooltips.decorators = [overlayTriggerDecorator];
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
