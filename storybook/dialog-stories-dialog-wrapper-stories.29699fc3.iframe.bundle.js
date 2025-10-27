"use strict";(self.webpackChunk_adobe_spectrum_web_components=self.webpackChunk_adobe_spectrum_web_components||[]).push([[1082,6314,8701],{"./packages/dialog/sp-dialog-wrapper.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),DialogBase_dev=(__webpack_require__("./packages/button/sp-button.dev.js"),__webpack_require__("./packages/underlay/sp-underlay.dev.js"),__webpack_require__("./packages/dialog/sp-dialog.dev.js"),__webpack_require__("./packages/dialog/src/DialogBase.dev.js")),__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class DialogWrapper extends DialogBase_dev.u{constructor(){super(...arguments),this.error=!1,this.cancelLabel="",this.confirmLabel="",this.dismissLabel="Close",this.footer="",this.hero="",this.heroLabel="",this.noDivider=!1,this.secondaryLabel="",this.headline=""}static get styles(){return[...super.styles]}get dialog(){return this.shadowRoot.querySelector("sp-dialog")}clickSecondary(){this.dispatchEvent(new Event("secondary",{bubbles:!0}))}clickCancel(){this.dispatchEvent(new Event("cancel",{bubbles:!0}))}clickConfirm(){this.dispatchEvent(new Event("confirm",{bubbles:!0}))}renderDialog(){const hideDivider=this.noDivider||!this.headline||"none"===this.headlineVisibility;return this.headline||window.__swc.warn(this,`<${this.localName}> elements will not be accessible to screen readers without a "headline" attribute or property.`,"https://opensource.adobe.com/spectrum-web-components/components/dialog-wrapper/#accessibility",{type:"accessibility"}),index_dev.qy`
            <sp-dialog
                ?dismissable=${this.dismissable}
                dismiss-label=${this.dismissLabel}
                ?no-divider=${hideDivider}
                ?error=${this.error}
                mode=${(0,directives_dev.JR)(this.mode)}
                size=${(0,directives_dev.JR)(this.size)}
            >
                ${this.hero?index_dev.qy`
                          <img
                              src="${this.hero}"
                              slot="hero"
                              aria-hidden=${(0,directives_dev.JR)(this.heroLabel?void 0:"true")}
                              alt=${(0,directives_dev.JR)(this.heroLabel?this.heroLabel:void 0)}
                          />
                      `:index_dev.s6}
                ${this.headline?index_dev.qy`
                          <h2
                              slot="heading"
                              ?hidden=${"none"===this.headlineVisibility}
                          >
                              ${this.headline}
                          </h2>
                      `:index_dev.s6}
                <slot></slot>
                ${this.footer?index_dev.qy`
                          <div slot="footer">${this.footer}</div>
                      `:index_dev.s6}
                ${this.cancelLabel?index_dev.qy`
                          <sp-button
                              variant="secondary"
                              treatment="outline"
                              slot="button"
                              @click=${this.clickCancel}
                          >
                              ${this.cancelLabel}
                          </sp-button>
                      `:index_dev.s6}
                ${this.secondaryLabel?index_dev.qy`
                          <sp-button
                              variant="primary"
                              treatment="outline"
                              slot="button"
                              @click=${this.clickSecondary}
                          >
                              ${this.secondaryLabel}
                          </sp-button>
                      `:index_dev.s6}
                ${this.confirmLabel?index_dev.qy`
                          <sp-button
                              variant="accent"
                              slot="button"
                              @click=${this.clickConfirm}
                          >
                              ${this.confirmLabel}
                          </sp-button>
                      `:index_dev.s6}
            </sp-dialog>
        `}}__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],DialogWrapper.prototype,"error",2),__decorateClass([(0,decorators_dev.MZ)({attribute:"cancel-label"})],DialogWrapper.prototype,"cancelLabel",2),__decorateClass([(0,decorators_dev.MZ)({attribute:"confirm-label"})],DialogWrapper.prototype,"confirmLabel",2),__decorateClass([(0,decorators_dev.MZ)({attribute:"dismiss-label"})],DialogWrapper.prototype,"dismissLabel",2),__decorateClass([(0,decorators_dev.MZ)()],DialogWrapper.prototype,"footer",2),__decorateClass([(0,decorators_dev.MZ)()],DialogWrapper.prototype,"hero",2),__decorateClass([(0,decorators_dev.MZ)({attribute:"hero-label"})],DialogWrapper.prototype,"heroLabel",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0,attribute:"no-divider"})],DialogWrapper.prototype,"noDivider",2),__decorateClass([(0,decorators_dev.MZ)({type:String,reflect:!0})],DialogWrapper.prototype,"size",2),__decorateClass([(0,decorators_dev.MZ)({attribute:"secondary-label"})],DialogWrapper.prototype,"secondaryLabel",2),__decorateClass([(0,decorators_dev.MZ)()],DialogWrapper.prototype,"headline",2),__decorateClass([(0,decorators_dev.MZ)({type:String,attribute:"headline-visibility"})],DialogWrapper.prototype,"headlineVisibility",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-dialog-wrapper",DialogWrapper)},"./packages/dialog/stories/dialog-wrapper.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},form:function(){return form},lazyHero:function(){return lazyHero},longContent:function(){return longContent},longHeading:function(){return longHeading},tooltips:function(){return tooltips},wrapperButtons:function(){return wrapperButtons},wrapperButtonsUnderlay:function(){return wrapperButtonsUnderlay},wrapperDismissable:function(){return wrapperDismissable},wrapperDismissableUnderlay:function(){return wrapperDismissableUnderlay},wrapperDismissableUnderlayError:function(){return wrapperDismissableUnderlayError},wrapperFullscreen:function(){return wrapperFullscreen},wrapperHeadlineVisibilityNone:function(){return wrapperHeadlineVisibilityNone},wrapperLabeledHero:function(){return wrapperLabeledHero},wrapperWithHeadline:function(){return wrapperWithHeadline},wrapperWithHeadlineNoDivider:function(){return wrapperWithHeadlineNoDivider}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./tools/base/src/directives.dev.js"),_images_js__WEBPACK_IMPORTED_MODULE_9__=(__webpack_require__("./packages/button/sp-button.dev.js"),__webpack_require__("./packages/field-label/sp-field-label.dev.js"),__webpack_require__("./packages/help-text/sp-help-text.dev.js"),__webpack_require__("./packages/textfield/sp-textfield.dev.js"),__webpack_require__("./packages/tooltip/sp-tooltip.dev.js"),__webpack_require__("./packages/overlay/overlay-trigger.dev.js"),__webpack_require__("./packages/dialog/sp-dialog-wrapper.dev.js"),__webpack_require__("./packages/dialog/stories/images.js")),_overlay_stories_index_js__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./packages/overlay/stories/index.js");__webpack_exports__.default={title:"Dialog Wrapper",component:"sp-dialog-wrapper",argTypes:{onClose:{action:"close"},onConfirm:{action:"confirm"},onSecondary:{action:"secondary"},onCancel:{action:"cancel"}}};const handleClose=({onClose:onClose})=>event=>{onClose&&onClose(event)},handleConfirm=({onConfirm:onConfirm})=>event=>{onConfirm&&onConfirm(event)},handleSecondary=({onSecondary:onSecondary})=>event=>{onSecondary&&onSecondary(event)},handleCancel=({onCancel:onCancel})=>event=>{onCancel&&onCancel(event)},wrapperLabeledHero=(args={},context={})=>{const open="docs"!==context.viewMode;return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <style>
            sp-story-decorator {
                inset: 0;
                position: absolute;
                overflow: hidden;
            }
        </style>
        <sp-dialog-wrapper
            ?open=${open}
            hero=${_images_js__WEBPACK_IMPORTED_MODULE_9__.e}
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
    `},wrapperDismissable=(args={},context={})=>{const open="docs"!==context.viewMode;return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-dialog-wrapper
            ?open=${open}
            .hero=${_images_js__WEBPACK_IMPORTED_MODULE_9__.e}
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
    `},wrapperDismissableUnderlay=(args={},context={})=>{const open="docs"!==context.viewMode;return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-dialog-wrapper
            ?open=${open}
            hero=${_images_js__WEBPACK_IMPORTED_MODULE_9__.e}
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
    `},form=(args={},context={})=>{const open="docs"===context.viewMode?void 0:"click";return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <overlay-trigger
            type="modal"
            @close=${handleClose(args)}
            open=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)(open)}
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
                @confirm=${({target:target})=>{target.dispatchEvent(new Event("close",{bubbles:!0,composed:!0})),handleConfirm(args)}}
                @secondary=${({target:target})=>{target.dispatchEvent(new Event("close",{bubbles:!0,composed:!0})),handleSecondary(args)}}
                @cancel=${({target:target})=>{target.dispatchEvent(new Event("close",{bubbles:!0,composed:!0})),handleCancel(args)}}
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
    `};form.decorators=[_overlay_stories_index_js__WEBPACK_IMPORTED_MODULE_10__.Z];const longContent=(args={},context={})=>{const open="docs"===context.viewMode?void 0:"click";return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <overlay-trigger
            type="modal"
            @close=${handleClose(args)}
            open=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)(open)}
            triggered-by="click hover"
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
    `};longContent.decorators=[_overlay_stories_index_js__WEBPACK_IMPORTED_MODULE_10__.Z];const longHeading=(args={},context={})=>{const open="docs"===context.viewMode?void 0:"click";return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <overlay-trigger
            type="modal"
            @close=${handleClose(args)}
            open=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)(open)}
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
    `};longHeading.decorators=[_overlay_stories_index_js__WEBPACK_IMPORTED_MODULE_10__.Z];const wrapperDismissableUnderlayError=(args={},context={})=>{const open="docs"!==context.viewMode;return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <div>
            <sp-dialog-wrapper
                ?open=${open}
                hero=${_images_js__WEBPACK_IMPORTED_MODULE_9__.e}
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
    `},wrapperButtons=(args={},context={})=>{const open="docs"!==context.viewMode;return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
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
    `},wrapperButtonsUnderlay=(args={},context={})=>{const open="docs"!==context.viewMode;return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
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
    `},wrapperFullscreen=(args={},context={})=>{const open="docs"!==context.viewMode;return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
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
    `},wrapperWithHeadline=(args={},context={})=>{const open="docs"!==context.viewMode;return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-dialog-wrapper
            ?open=${open}
            headline="Headline for dialog"
            @close=${handleClose(args)}
        >
            Content of the dialog
        </sp-dialog-wrapper>
    `},wrapperWithHeadlineNoDivider=(args={},context={})=>{const open="docs"!==context.viewMode;return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-dialog-wrapper
            ?open=${open}
            headline="Headline for dialog"
            no-divider=${!0}
            @close=${handleClose(args)}
        >
            Content of the dialog
        </sp-dialog-wrapper>
    `},wrapperHeadlineVisibilityNone=(args={},context={})=>{const open="docs"!==context.viewMode;return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-dialog-wrapper
            headline="Accessible headline"
            .headlineVisibility=${"none"}
            ?open=${open}
            @close=${handleClose(args)}
        >
            Content of the dialog
        </sp-dialog-wrapper>
    `},tooltips=(args={},context={})=>{const open="docs"===context.viewMode?void 0:"click";return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <overlay-trigger
            type="modal"
            @close=${handleClose(args)}
            open=${(0,_spectrum_web_components_base_src_directives_js__WEBPACK_IMPORTED_MODULE_1__.JR)(open)}
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
                ${[1,2,3,4].map(index=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
                        <overlay-trigger>
                            <sp-button slot="trigger">
                                Button with Tooltip ${index}
                            </sp-button>
                            <sp-tooltip slot="hover-content">
                                Tooltip ${index}
                            </sp-tooltip>
                        </overlay-trigger>
                    `)}
            </sp-dialog-wrapper>
        </overlay-trigger>
    `};tooltips.decorators=[_overlay_stories_index_js__WEBPACK_IMPORTED_MODULE_10__.Z];const lazyHero=({src:src})=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <overlay-trigger content="click" @sp-opened=${()=>{document.querySelector("sp-dialog-wrapper").hero=src}}>
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
    `;lazyHero.args={src:"https://dummyimage.com/800x400/000/fff"},lazyHero.swc_vrt={skip:!0},lazyHero.parameters={chromatic:{disableSnapshot:!0}};const __namedExportsOrder=["wrapperLabeledHero","wrapperDismissable","wrapperDismissableUnderlay","form","longContent","longHeading","wrapperDismissableUnderlayError","wrapperButtons","wrapperButtonsUnderlay","wrapperFullscreen","wrapperWithHeadline","wrapperWithHeadlineNoDivider","wrapperHeadlineVisibilityNone","tooltips","lazyHero"];wrapperLabeledHero.parameters={...wrapperLabeledHero.parameters,docs:{...wrapperLabeledHero.parameters?.docs,source:{originalSource:'(args = {}, context = {}) => {\n  const open = context.viewMode === "docs" ? false : true;\n  return html`\n        <style>\n            sp-story-decorator {\n                inset: 0;\n                position: absolute;\n                overflow: hidden;\n            }\n        </style>\n        <sp-dialog-wrapper\n            ?open=${open}\n            hero=${landscape}\n            hero-label="Hero Image Alt Text"\n            dismissable\n            headline="Wrapped Dialog w/ Hero Image"\n            @close=${handleClose(args)}\n            size="s"\n        >\n            Content of the dialog\n        </sp-dialog-wrapper>\n        <sp-button\n            onClick="\n                this.previousElementSibling.open = !this.previousElementSibling.open;\n                if (this.previousElementSibling.open) {\n                    this.previousElementSibling.focus();\n                }\n            "\n            variant="primary"\n        >\n            Toggle Dialog\n        </sp-button>\n    `;\n}',...wrapperLabeledHero.parameters?.docs?.source}}},wrapperDismissable.parameters={...wrapperDismissable.parameters,docs:{...wrapperDismissable.parameters?.docs,source:{originalSource:'(args = {}, context = {}) => {\n  const open = context.viewMode === "docs" ? false : true;\n  return html`\n        <sp-dialog-wrapper\n            ?open=${open}\n            .hero=${landscape}\n            dismissable\n            headline="Wrapped Dialog w/ Hero Image"\n            @close=${handleClose(args)}\n            size="s"\n            tabindex="0"\n        >\n            Content of the dialog\n        </sp-dialog-wrapper>\n        <sp-button\n            onClick="\n                this.previousElementSibling.open = !this.previousElementSibling.open;\n                if (this.previousElementSibling.open) {\n                    this.previousElementSibling.focus();\n                }\n            "\n            variant="primary"\n        >\n            Toggle Dialog\n        </sp-button>\n    `;\n}',...wrapperDismissable.parameters?.docs?.source}}},wrapperDismissableUnderlay.parameters={...wrapperDismissableUnderlay.parameters,docs:{...wrapperDismissableUnderlay.parameters?.docs,source:{originalSource:'(args = {}, context = {}) => {\n  const open = context.viewMode === "docs" ? false : true;\n  return html`\n        <sp-dialog-wrapper\n            ?open=${open}\n            hero=${landscape}\n            dismissable\n            headline="Wrapped Dialog w/ Hero Image"\n            underlay\n            @close=${handleClose(args)}\n            size="s"\n        >\n            Content of the dialog\n        </sp-dialog-wrapper>\n        <sp-button\n            onClick="\n                this.previousElementSibling.open = !this.previousElementSibling.open;\n                if (this.previousElementSibling.open) {\n                    this.previousElementSibling.focus();\n                }\n            "\n            variant="primary"\n        >\n            Toggle Dialog\n        </sp-button>\n    `;\n}',...wrapperDismissableUnderlay.parameters?.docs?.source}}},form.parameters={...form.parameters,docs:{...form.parameters?.docs,source:{originalSource:'(args = {}, context = {}) => {\n  const open = context.viewMode === "docs" ? void 0 : "click";\n  return html`\n        <overlay-trigger\n            type="modal"\n            @close=${handleClose(args)}\n            open=${ifDefined(open)}\n        >\n            <sp-button slot="trigger" variant="primary">\n                Toggle Dialog\n            </sp-button>\n            <sp-dialog-wrapper\n                id="form-fields"\n                slot="click-content"\n                headline="Add Delivery Address"\n                underlay\n                size="m"\n                confirm-label="Verify Address"\n                secondary-label="Add"\n                cancel-label="Cancel"\n                @close=${handleClose(args)}\n                @confirm=${({\n    target\n  }) => {\n    target.dispatchEvent(new Event("close", {\n      bubbles: true,\n      composed: true\n    }));\n    handleConfirm(args);\n  }}\n                @secondary=${({\n    target\n  }) => {\n    target.dispatchEvent(new Event("close", {\n      bubbles: true,\n      composed: true\n    }));\n    handleSecondary(args);\n  }}\n                @cancel=${({\n    target\n  }) => {\n    target.dispatchEvent(new Event("close", {\n      bubbles: true,\n      composed: true\n    }));\n    handleCancel(args);\n  }}\n            >\n                <style>\n                    #form-fields div {\n                        display: grid;\n                        row-gap: calc(var(--swc-scale-factor) * 12px);\n                        grid-template-columns: auto auto;\n                    }\n                </style>\n                <div>\n                    <sp-field-label side-aligned="end" for="street">\n                        Street:\n                    </sp-field-label>\n                    <sp-textfield id="street" autofocus></sp-textfield>\n                    <sp-field-label side-aligned="end" for="city">\n                        City:\n                    </sp-field-label>\n                    <sp-textfield id="city"></sp-textfield>\n                    <sp-field-label side-aligned="end" for="state">\n                        State:\n                    </sp-field-label>\n                    <sp-textfield id="state"></sp-textfield>\n                    <sp-field-label side-aligned="end" for="zip">\n                        Zip:\n                    </sp-field-label>\n                    <sp-textfield id="zip"></sp-textfield>\n                    <sp-field-label side-aligned="end" for="instructions">\n                        Special instructions:\n                    </sp-field-label>\n                    <sp-textfield id="instructions" multiline>\n                        <sp-help-text slot="help-text">\n                            For example, gate code or other information to help\n                            the driver find you\n                        </sp-help-text>\n                    </sp-textfield>\n                </div>\n            </sp-dialog-wrapper>\n        </overlay-trigger>\n    `;\n}',...form.parameters?.docs?.source}}},longContent.parameters={...longContent.parameters,docs:{...longContent.parameters?.docs,source:{originalSource:'(args = {}, context = {}) => {\n  const open = context.viewMode === "docs" ? void 0 : "click";\n  return html`\n        <overlay-trigger\n            type="modal"\n            @close=${handleClose(args)}\n            open=${ifDefined(open)}\n            triggered-by="click hover"\n        >\n            <sp-button slot="trigger" variant="primary">\n                Toggle Dialog\n            </sp-button>\n            <sp-dialog-wrapper\n                slot="click-content"\n                headline="Dialog title"\n                dismissable\n                underlay\n                size="s"\n            >\n                <p>\n                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n                    Sed ac dolor sit amet purus malesuada congue. Donec quis\n                    nibh at felis congue commodo. Ut enim ad minima veniam, quis\n                    nostrum exercitationem ullam corporis suscipit laboriosam,\n                    nisi ut aliquid ex ea commodi consequatur? Sed ac dolor sit\n                    amet purus malesuada congue. Nam libero tempore, cum soluta\n                    nobis est eligendi optio cumque nihil impedit quo minus id\n                    quod maxime placeat facere possimus, omnis voluptas\n                    assumenda est, omnis dolor repellendus. Nullam sit amet\n                    magna in magna gravida vehicula. Itaque earum rerum hic\n                    tenetur a sapiente delectus, ut aut reiciendis voluptatibus\n                    maiores alias consequatur aut perferendis doloribus\n                    asperiores repellat. Neque porro quisquam est, qui dolorem\n                    ipsum quia dolor sit amet, consectetur, adipisci velit, sed\n                    quia non numquam eius modi tempora incidunt ut labore et\n                    dolore magnam aliquam quaerat voluptatem. Phasellus faucibus\n                    molestie nisl. Vestibulum fermentum tortor id mi. Integer\n                    rutrum, orci vestibulum ullamcorper ultricies, lacus quam\n                    ultricies odio, vitae placerat pede sem sit amet enim.\n                    Maecenas sollicitudin. Nullam rhoncus aliquam metus.\n                </p>\n                <p>\n                    Curabitur ligula sapien, pulvinar a vestibulum quis,\n                    facilisis vel sapien. Fusce nibh. Proin pede metus,\n                    vulputate nec, fermentum fringilla, vehicula vitae, justo.\n                    Aenean placerat. Aliquam erat volutpat. Et harum quidem\n                    rerum facilis est et expedita distinctio. Fusce nibh.\n                    Temporibus autem quibusdam et aut officiis debitis aut rerum\n                    necessitatibus saepe eveniet ut et voluptates repudiandae\n                    sint et molestiae non recusandae. Vestibulum erat nulla,\n                    ullamcorper nec, rutrum non, nonummy ac, erat. Etiam posuere\n                    lacus quis dolor. Mauris elementum mauris vitae tortor.\n                    Nulla turpis magna, cursus sit amet, suscipit a, interdum\n                    id, felis. Nam libero tempore, cum soluta nobis est eligendi\n                    optio cumque nihil impedit quo minus id quod maxime placeat\n                    facere possimus, omnis voluptas assumenda est, omnis dolor\n                    repellendus. Nulla accumsan, elit sit amet varius semper,\n                    nulla mauris mollis quam, tempor suscipit diam nulla vel\n                    leo. Pellentesque sapien.\n                </p>\n                <p>\n                    Curabitur vitae diam non enim vestibulum interdum. Sed elit\n                    dui, pellentesque a, faucibus vel, interdum nec, diam.\n                    Praesent vitae arcu tempor neque lacinia pretium. Ut tempus\n                    purus at lorem. Phasellus rhoncus. Temporibus autem\n                    quibusdam et aut officiis debitis aut rerum necessitatibus\n                    saepe eveniet ut et voluptates repudiandae sint et molestiae\n                    non recusandae. Duis ante orci, molestie vitae vehicula\n                    venenatis, tincidunt ac pede. Integer vulputate sem a nibh\n                    rutrum consequat. Aenean placerat. Cum sociis natoque\n                    penatibus et magnis dis parturient montes, nascetur\n                    ridiculus mus. Sed vel lectus. Donec odio tempus molestie,\n                    porttitor ut, iaculis quis, sem. Class aptent taciti\n                    sociosqu ad litora torquent per conubia nostra, per inceptos\n                    hymenaeos. Integer in sapien. Nullam dapibus fermentum\n                    ipsum.\n                </p>\n                <p>\n                    Integer vulputate sem a nibh rutrum consequat. Class aptent\n                    taciti sociosqu ad litora torquent per conubia nostra, per\n                    inceptos hymenaeos. Duis bibendum, lectus ut viverra\n                    rhoncus, dolor nunc faucibus libero, eget facilisis enim\n                    ipsum id lacus. Aliquam erat volutpat. Aenean id metus id\n                    velit ullamcorper pulvinar. Morbi scelerisque luctus velit.\n                    Aliquam erat volutpat. Temporibus autem quibusdam et aut\n                    officiis debitis aut rerum necessitatibus saepe eveniet ut\n                    et voluptates repudiandae sint et molestiae non recusandae.\n                    Fusce dui leo, imperdiet in, aliquam sit amet, feugiat eu,\n                    orci. Suspendisse sagittis ultrices augue. Nullam justo\n                    enim, consectetuer nec, ullamcorper ac, vestibulum in, elit.\n                    Praesent vitae arcu tempor neque lacinia pretium. Nullam\n                    faucibus mi quis velit. Maecenas aliquet accumsan leo. Morbi\n                    scelerisque luctus velit. Aliquam ornare wisi eu metus.\n                </p>\n                <p>\n                    Sed elit dui, pellentesque a, faucibus vel, interdum nec,\n                    diam. Praesent vitae arcu tempor neque lacinia pretium.\n                    Etiam dictum tincidunt diam. Et harum quidem rerum facilis\n                    est et expedita distinctio. Duis ante orci, molestie vitae\n                    vehicula venenatis, tincidunt ac pede. Integer lacinia.\n                    Excepteur sint occaecat cupidatat non proident, sunt in\n                    culpa qui officia deserunt mollit anim id est laborum.\n                    Mauris tincidunt sem sed arcu. Praesent in mauris eu tortor\n                    porttitor accumsan. Aenean id metus id velit ullamcorper\n                    pulvinar. Donec iaculis gravida nulla. Duis bibendum, lectus\n                    ut viverra rhoncus, dolor nunc faucibus libero, eget\n                    facilisis enim ipsum id lacus. Nulla quis diam. Quisque\n                    porta. Integer rutrum, orci vestibulum ullamcorper\n                    ultricies, lacus quam ultricies odio, vitae placerat pede\n                    sem sit amet enim. Nam sed tellus id magna elementum\n                    tincidunt. In enim a arcu imperdiet malesuada.\n                </p>\n            </sp-dialog-wrapper>\n        </overlay-trigger>\n    `;\n}',...longContent.parameters?.docs?.source}}},longHeading.parameters={...longHeading.parameters,docs:{...longHeading.parameters?.docs,source:{originalSource:'(args = {}, context = {}) => {\n  const open = context.viewMode === "docs" ? void 0 : "click";\n  return html`\n        <overlay-trigger\n            type="modal"\n            @close=${handleClose(args)}\n            open=${ifDefined(open)}\n        >\n            <sp-dialog-wrapper\n                slot="click-content"\n                underlay\n                headline="Dialog long long long long long long long long long long long long title"\n                confirm-label="Keep Both"\n                secondary-label="Replace"\n                cancel-label="Cancel"\n                footer="Content for footer"\n                size="m"\n            >\n                Content of the dialog\n            </sp-dialog-wrapper>\n            <sp-button slot="trigger" variant="primary">\n                Toggle Dialog\n            </sp-button>\n        </overlay-trigger>\n    `;\n}',...longHeading.parameters?.docs?.source}}},wrapperDismissableUnderlayError.parameters={...wrapperDismissableUnderlayError.parameters,docs:{...wrapperDismissableUnderlayError.parameters?.docs,source:{originalSource:'(args = {}, context = {}) => {\n  const open = context.viewMode === "docs" ? false : true;\n  return html`\n        <div>\n            <sp-dialog-wrapper\n                ?open=${open}\n                hero=${landscape}\n                dismissable\n                error\n                headline="Wrapped Dialog w/ Hero Image"\n                underlay\n                @close=${handleClose(args)}\n                size="s"\n            >\n                Content of the dialog\n            </sp-dialog-wrapper>\n            <sp-button\n                onClick="\n                    this.previousElementSibling.open = !this.previousElementSibling.open;\n                    if (this.previousElementSibling.open) {\n                        this.previousElementSibling.focus();\n                    }\n                "\n                variant="primary"\n            >\n                Toggle Dialog\n            </sp-button>\n        </div>\n    `;\n}',...wrapperDismissableUnderlayError.parameters?.docs?.source}}},wrapperButtons.parameters={...wrapperButtons.parameters,docs:{...wrapperButtons.parameters?.docs,source:{originalSource:'(args = {}, context = {}) => {\n  const open = context.viewMode === "docs" ? false : true;\n  return html`\n        <sp-dialog-wrapper\n            ?open=${open}\n            size="l"\n            headline="Wrapped Dialog w/ Buttons"\n            confirm-label="Keep Both"\n            secondary-label="Replace"\n            cancel-label="Cancel"\n            footer="Content for footer"\n            @close=${handleClose(args)}\n            @confirm=${handleConfirm(args)}\n            @secondary=${handleSecondary(args)}\n            @cancel=${handleCancel(args)}\n        >\n            Content of the dialog\n        </sp-dialog-wrapper>\n    `;\n}',...wrapperButtons.parameters?.docs?.source}}},wrapperButtonsUnderlay.parameters={...wrapperButtonsUnderlay.parameters,docs:{...wrapperButtonsUnderlay.parameters?.docs,source:{originalSource:'(args = {}, context = {}) => {\n  const open = context.viewMode === "docs" ? false : true;\n  return html`\n        <sp-dialog-wrapper\n            ?open=${open}\n            underlay\n            size="l"\n            headline="Wrapped Dialog w/ Buttons"\n            confirm-label="Keep Both"\n            secondary-label="Replace"\n            cancel-label="Cancel"\n            footer="Content for footer"\n            @close=${handleClose(args)}\n            @confirm=${handleConfirm(args)}\n            @secondary=${handleSecondary(args)}\n            @cancel=${handleCancel(args)}\n        >\n            Content of the dialog\n        </sp-dialog-wrapper>\n    `;\n}',...wrapperButtonsUnderlay.parameters?.docs?.source}}},wrapperFullscreen.parameters={...wrapperFullscreen.parameters,docs:{...wrapperFullscreen.parameters?.docs,source:{originalSource:'(args = {}, context = {}) => {\n  const open = context.viewMode === "docs" ? false : true;\n  return html`\n        <sp-dialog-wrapper\n            ?open=${open}\n            headline="Wrapped Dialog - Fullscreen"\n            mode="fullscreen"\n            confirm-label="Keep Both"\n            secondary-label="Replace"\n            cancel-label="Cancel"\n            @close=${handleClose(args)}\n            @confirm=${handleConfirm(args)}\n            @secondary=${handleSecondary(args)}\n            @cancel=${handleCancel(args)}\n        >\n            Content of the dialog\n        </sp-dialog-wrapper>\n    `;\n}',...wrapperFullscreen.parameters?.docs?.source}}},wrapperWithHeadline.parameters={...wrapperWithHeadline.parameters,docs:{...wrapperWithHeadline.parameters?.docs,source:{originalSource:'(args = {}, context = {}) => {\n  const open = context.viewMode === "docs" ? false : true;\n  return html`\n        <sp-dialog-wrapper\n            ?open=${open}\n            headline="Headline for dialog"\n            @close=${handleClose(args)}\n        >\n            Content of the dialog\n        </sp-dialog-wrapper>\n    `;\n}',...wrapperWithHeadline.parameters?.docs?.source}}},wrapperWithHeadlineNoDivider.parameters={...wrapperWithHeadlineNoDivider.parameters,docs:{...wrapperWithHeadlineNoDivider.parameters?.docs,source:{originalSource:'(args = {}, context = {}) => {\n  const open = context.viewMode === "docs" ? false : true;\n  return html`\n        <sp-dialog-wrapper\n            ?open=${open}\n            headline="Headline for dialog"\n            no-divider=${true}\n            @close=${handleClose(args)}\n        >\n            Content of the dialog\n        </sp-dialog-wrapper>\n    `;\n}',...wrapperWithHeadlineNoDivider.parameters?.docs?.source}}},wrapperHeadlineVisibilityNone.parameters={...wrapperHeadlineVisibilityNone.parameters,docs:{...wrapperHeadlineVisibilityNone.parameters?.docs,source:{originalSource:'(args = {}, context = {}) => {\n  const open = context.viewMode === "docs" ? false : true;\n  return html`\n        <sp-dialog-wrapper\n            headline="Accessible headline"\n            .headlineVisibility=${"none"}\n            ?open=${open}\n            @close=${handleClose(args)}\n        >\n            Content of the dialog\n        </sp-dialog-wrapper>\n    `;\n}',...wrapperHeadlineVisibilityNone.parameters?.docs?.source}}},tooltips.parameters={...tooltips.parameters,docs:{...tooltips.parameters?.docs,source:{originalSource:'(args = {}, context = {}) => {\n  const open = context.viewMode === "docs" ? void 0 : "click";\n  return html`\n        <overlay-trigger\n            type="modal"\n            @close=${handleClose(args)}\n            open=${ifDefined(open)}\n        >\n            <sp-button slot="trigger" variant="primary">\n                Toggle Dialog\n            </sp-button>\n            <sp-dialog-wrapper\n                slot="click-content"\n                headline="Dialog title"\n                dismissable\n                underlay\n                size="s"\n            >\n                ${[1, 2, 3, 4].map(index => html`\n                        <overlay-trigger>\n                            <sp-button slot="trigger">\n                                Button with Tooltip ${index}\n                            </sp-button>\n                            <sp-tooltip slot="hover-content">\n                                Tooltip ${index}\n                            </sp-tooltip>\n                        </overlay-trigger>\n                    `)}\n            </sp-dialog-wrapper>\n        </overlay-trigger>\n    `;\n}',...tooltips.parameters?.docs?.source}}},lazyHero.parameters={...lazyHero.parameters,docs:{...lazyHero.parameters?.docs,source:{originalSource:'({\n  src\n}) => {\n  const handleOpened = () => {\n    document.querySelector("sp-dialog-wrapper").hero = src;\n  };\n  return html`\n        <overlay-trigger content="click" @sp-opened=${handleOpened}>\n            <sp-button slot="trigger">Toggle Dialog</sp-button>\n            <sp-dialog-wrapper\n                slot="click-content"\n                headline="Dialog title"\n                confirm-label="Primary"\n            >\n                <p>Content of the dialog</p>\n                <ol>\n                    <li>\n                        Select the following checkbox to have the dialog close\n                        when clicking one of its buttons.\n                    </li>\n                    <li>\n                        Select the following checkbox to have the dialog close\n                        when clicking one of its buttons.\n                    </li>\n                    <li>\n                        Select the following checkbox to have the dialog close\n                        when clicking one of its buttons.\n                    </li>\n                    <li>\n                        Select the following checkbox to have the dialog close\n                        when clicking one of its buttons.\n                    </li>\n                    <li>\n                        Select the following checkbox to have the dialog close\n                        when clicking one of its buttons.\n                    </li>\n                    <li>\n                        Select the following checkbox to have the dialog close\n                        when clicking one of its buttons.\n                    </li>\n                    <li>\n                        Select the following checkbox to have the dialog close\n                        when clicking one of its buttons.\n                    </li>\n                    <li>\n                        Select the following checkbox to have the dialog close\n                        when clicking one of its buttons.\n                    </li>\n                    <li>\n                        Select the following checkbox to have the dialog close\n                        when clicking one of its buttons.\n                    </li>\n                    <li>\n                        Select the following checkbox to have the dialog close\n                        when clicking one of its buttons.\n                    </li>\n                    <li>\n                        Select the following checkbox to have the dialog close\n                        when clicking one of its buttons.\n                    </li>\n                </ol>\n            </sp-dialog-wrapper>\n        </overlay-trigger>\n    `;\n}',...lazyHero.parameters?.docs?.source}}}},"./packages/help-text/sp-help-text.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");__webpack_require__("./packages/icons-workflow/icons/sp-icon-alert.js");var help_text_css=index_dev.AH`
    @media (forced-colors:active){:host{--highcontrast-helptext-content-color-default:CanvasText;--highcontrast-helptext-icon-color-default:CanvasText}:host,.text,.icon{forced-color-adjust:none}}:host{--spectrum-helptext-content-color-default:var(--spectrum-neutral-subdued-content-color-default);--spectrum-helptext-icon-color-default:var(--spectrum-neutral-subdued-content-color-default);color:var(--highcontrast-helptext-content-color-default,var(--mod-helptext-content-color-default,var(--spectrum-helptext-content-color-default)));font-size:var(--mod-helptext-font-size,var(--spectrum-helptext-font-size));min-block-size:var(--mod-helptext-min-height,var(--spectrum-helptext-min-height));display:flex}:host([size=s]){--spectrum-helptext-min-height:var(--spectrum-component-height-75);--spectrum-helptext-icon-size:var(--spectrum-workflow-icon-size-75);--spectrum-helptext-font-size:var(--spectrum-font-size-75);--spectrum-helptext-text-to-visual:var(--spectrum-text-to-visual-75);--spectrum-helptext-top-to-workflow-icon:var(--spectrum-help-text-top-to-workflow-icon-small);--spectrum-helptext-bottom-to-workflow-icon:var(--spectrum-helptext-top-to-workflow-icon)}:host,:host{--spectrum-helptext-min-height:var(--spectrum-component-height-75);--spectrum-helptext-icon-size:var(--spectrum-workflow-icon-size-100);--spectrum-helptext-font-size:var(--spectrum-font-size-75);--spectrum-helptext-text-to-visual:var(--spectrum-text-to-visual-75);--spectrum-helptext-top-to-workflow-icon:var(--spectrum-help-text-top-to-workflow-icon-medium);--spectrum-helptext-bottom-to-workflow-icon:var(--spectrum-helptext-top-to-workflow-icon)}:host([size=l]){--spectrum-helptext-min-height:var(--spectrum-component-height-100);--spectrum-helptext-icon-size:var(--spectrum-workflow-icon-size-200);--spectrum-helptext-font-size:var(--spectrum-font-size-100);--spectrum-helptext-text-to-visual:var(--spectrum-text-to-visual-100);--spectrum-helptext-top-to-workflow-icon:var(--spectrum-help-text-top-to-workflow-icon-large);--spectrum-helptext-bottom-to-workflow-icon:var(--spectrum-helptext-top-to-workflow-icon)}:host([size=xl]){--spectrum-helptext-min-height:var(--spectrum-component-height-200);--spectrum-helptext-icon-size:var(--spectrum-workflow-icon-size-300);--spectrum-helptext-font-size:var(--spectrum-font-size-200);--spectrum-helptext-text-to-visual:var(--spectrum-text-to-visual-200);--spectrum-helptext-top-to-workflow-icon:var(--spectrum-help-text-top-to-workflow-icon-extra-large);--spectrum-helptext-bottom-to-workflow-icon:var(--spectrum-helptext-top-to-workflow-icon)}:host([variant=neutral]){--spectrum-helptext-content-color-default:var(--spectrum-neutral-subdued-content-color-default);--spectrum-helptext-icon-color-default:var(--spectrum-neutral-subdued-content-color-default)}:host([variant=negative]){--spectrum-helptext-content-color-default:var(--spectrum-negative-color-900);--spectrum-helptext-icon-color-default:var(--spectrum-negative-color-900)}:host([disabled]){--spectrum-helptext-content-color-default:var(--spectrum-disabled-content-color);--spectrum-helptext-icon-color-default:var(--spectrum-disabled-content-color)}:host(:lang(ja)),:host(:lang(ko)),:host(:lang(zh)){--mod-helptext-line-height:var(--mod-helptext-line-height-cjk,var(--spectrum-cjk-line-height-100))}.icon{block-size:var(--mod-helptext-icon-size,var(--spectrum-helptext-icon-size));inline-size:var(--mod-helptext-icon-size,var(--spectrum-helptext-icon-size));flex-shrink:0;margin-inline-end:var(--mod-helptext-text-to-visual,var(--spectrum-helptext-text-to-visual));padding-block-start:var(--mod-helptext-top-to-workflow-icon,var(--spectrum-helptext-top-to-workflow-icon));padding-block-end:var(--mod-helptext-bottom-to-workflow-icon,var(--spectrum-helptext-bottom-to-workflow-icon))}.text{line-height:var(--mod-helptext-line-height,var(--spectrum-line-height-100));padding-block-start:var(--mod-helptext-top-to-text,var(--spectrum-helptext-top-to-text));padding-block-end:var(--mod-helptext-bottom-to-text,var(--spectrum-helptext-bottom-to-text))}:host([variant=neutral]) .text{color:var(--highcontrast-helptext-content-color-default,var(--mod-helptext-content-color-default,var(--spectrum-helptext-content-color-default)))}:host([variant=neutral]) .icon{color:var(--highcontrast-helptext-icon-color-default,var(--mod-helptext-icon-color-default,var(--spectrum-helptext-icon-color-default)))}:host([variant=negative]) .text{color:var(--highcontrast-helptext-content-color-default,var(--mod-helptext-content-color-default,var(--spectrum-helptext-content-color-default)))}:host([variant=negative]) .icon{color:var(--highcontrast-helptext-icon-color-default,var(--mod-helptext-icon-color-default,var(--spectrum-helptext-icon-color-default)))}:host([disabled]) .text{color:var(--highcontrast-helptext-content-color-default,var(--mod-helptext-content-color-default,var(--spectrum-helptext-content-color-default)))}:host([disabled]) .icon{color:var(--highcontrast-helptext-icon-color-default,var(--mod-helptext-icon-color-default,var(--spectrum-helptext-icon-color-default)))}:host{--spectrum-helptext-top-to-text:var(--system-helptext-top-to-text);--spectrum-helptext-bottom-to-text:var(--system-helptext-bottom-to-text)}:host([size=s]){--spectrum-helptext-top-to-text:var(--system-helptext-top-to-text-small);--spectrum-helptext-bottom-to-text:var(--system-helptext-bottom-to-text-small)}:host([size=l]){--spectrum-helptext-top-to-text:var(--system-helptext-top-to-text-large);--spectrum-helptext-bottom-to-text:var(--system-helptext-bottom-to-text-large)}:host([size=xl]){--spectrum-helptext-top-to-text:var(--system-helptext-top-to-text-extra-large);--spectrum-helptext-bottom-to-text:var(--system-helptext-bottom-to-text-extra-large)}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class HelpText extends((0,index_dev.ZG)(index_dev.wG,{noDefaultSize:!0})){constructor(){super(...arguments),this.icon=!1,this.variant="neutral"}static get styles(){return[help_text_css]}render(){return index_dev.qy`
            ${"negative"===this.variant&&this.icon?index_dev.qy`
                      <sp-icon-alert class="icon"></sp-icon-alert>
                  `:index_dev.s6}
            <div class="text"><slot></slot></div>
        `}}__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],HelpText.prototype,"icon",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],HelpText.prototype,"variant",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-help-text",HelpText)},"./packages/overlay/overlay-trigger.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _spectrum_web_components_base_src_define_element_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/define-element.dev.js"),_src_OverlayTrigger_dev_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/overlay/src/OverlayTrigger.dev.js");(0,_spectrum_web_components_base_src_define_element_js__WEBPACK_IMPORTED_MODULE_0__.e)("overlay-trigger",_src_OverlayTrigger_dev_js__WEBPACK_IMPORTED_MODULE_1__.N)},"./packages/overlay/sp-overlay.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var _spectrum_web_components_base_src_define_element_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/define-element.dev.js"),_src_Overlay_dev_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/overlay/src/Overlay.dev.js");(0,_spectrum_web_components_base_src_define_element_js__WEBPACK_IMPORTED_MODULE_0__.e)("sp-overlay",_src_Overlay_dev_js__WEBPACK_IMPORTED_MODULE_1__.Overlay)},"./packages/overlay/src/OverlayTrigger.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{N:function(){return OverlayTrigger}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");__webpack_require__("./packages/overlay/sp-overlay.dev.js");var overlay_trigger_css=index_dev.AH`
    slot[name=longpress-describedby-descriptor]{display:none}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class OverlayTrigger extends index_dev.wG{constructor(){super(...arguments),this.offset=6,this.disabled=!1,this.receivesFocus="auto",this.clickContent=[],this.longpressContent=[],this.hoverContent=[],this.targetContent=[]}static get styles(){return[overlay_trigger_css]}getAssignedElementsFromSlot(slot){return slot.assignedElements({flatten:!0})}handleTriggerContent(event){this.targetContent=this.getAssignedElementsFromSlot(event.target)}handleSlotContent(event){switch(event.target.name){case"click-content":this.clickContent=this.getAssignedElementsFromSlot(event.target);break;case"longpress-content":this.longpressContent=this.getAssignedElementsFromSlot(event.target);break;case"hover-content":this.hoverContent=this.getAssignedElementsFromSlot(event.target)}}handleBeforetoggle(event){const{target:target}=event;let type;if(target===this.clickOverlayElement)type="click";else if(target===this.longpressOverlayElement)type="longpress";else{if(target!==this.hoverOverlayElement)return;type="hover"}"open"===event.newState?this.open=type:this.open===type&&(this.open=void 0)}update(changes){var _a,_b,_c,_d,_e,_f;changes.has("clickContent")&&(this.clickPlacement=(null==(_a=this.clickContent[0])?void 0:_a.getAttribute("placement"))||(null==(_b=this.clickContent[0])?void 0:_b.getAttribute("direction"))||void 0),changes.has("hoverContent")&&(this.hoverPlacement=(null==(_c=this.hoverContent[0])?void 0:_c.getAttribute("placement"))||(null==(_d=this.hoverContent[0])?void 0:_d.getAttribute("direction"))||void 0),changes.has("longpressContent")&&(this.longpressPlacement=(null==(_e=this.longpressContent[0])?void 0:_e.getAttribute("placement"))||(null==(_f=this.longpressContent[0])?void 0:_f.getAttribute("direction"))||void 0),super.update(changes)}renderSlot(name){return index_dev.qy`
            <slot name=${name} @slotchange=${this.handleSlotContent}></slot>
        `}renderClickOverlay(){var _a;const slot=this.renderSlot("click-content"),clickOverlay=index_dev.qy`
            <sp-overlay
                id="click-overlay"
                ?disabled=${this.disabled||!this.clickContent.length}
                ?open=${"click"===this.open&&!!this.clickContent.length}
                .offset=${this.offset}
                .placement=${this.clickPlacement||this.placement}
                .triggerElement=${this.targetContent[0]}
                .triggerInteraction=${"click"}
                .type=${this.type||"auto"}
                @beforetoggle=${this.handleBeforetoggle}
                .receivesFocus=${this.receivesFocus}
            >
                ${slot}
            </sp-overlay>
        `;return(null==(_a=this.triggeredBy)?void 0:_a.includes("click"))||this.clickContent.length?clickOverlay:slot}renderHoverOverlay(){var _a;const slot=this.renderSlot("hover-content"),hoverOverlay=index_dev.qy`
            <sp-overlay
                id="hover-overlay"
                ?open=${"hover"===this.open&&!!this.hoverContent.length}
                ?disabled=${this.disabled||!this.hoverContent.length||!!this.open&&"hover"!==this.open}
                .offset=${this.offset}
                .placement=${this.hoverPlacement||this.placement}
                .triggerElement=${this.targetContent[0]}
                .triggerInteraction=${"hover"}
                .type=${"hint"}
                @beforetoggle=${this.handleBeforetoggle}
                .receivesFocus=${this.receivesFocus}
            >
                ${slot}
            </sp-overlay>
        `;return(null==(_a=this.triggeredBy)?void 0:_a.includes("hover"))||this.hoverContent.length?hoverOverlay:slot}renderLongpressOverlay(){var _a;const slot=this.renderSlot("longpress-content"),longpressOverlay=index_dev.qy`
            <sp-overlay
                id="longpress-overlay"
                ?disabled=${this.disabled||!this.longpressContent.length}
                ?open=${"longpress"===this.open&&!!this.longpressContent.length}
                .offset=${this.offset}
                .placement=${this.longpressPlacement||this.placement}
                .triggerElement=${this.targetContent[0]}
                .triggerInteraction=${"longpress"}
                .type=${"auto"}
                @beforetoggle=${this.handleBeforetoggle}
                .receivesFocus=${this.receivesFocus}
            >
                ${slot}
            </sp-overlay>
            <slot name="longpress-describedby-descriptor"></slot>
        `;return(null==(_a=this.triggeredBy)?void 0:_a.includes("longpress"))||this.longpressContent.length?longpressOverlay:slot}render(){return index_dev.qy`
            <slot
                id="trigger"
                name="trigger"
                @slotchange=${this.handleTriggerContent}
            ></slot>
            ${[this.renderClickOverlay(),this.renderHoverOverlay(),this.renderLongpressOverlay()]}
        `}updated(changedProperties){if(super.updated(changedProperties),!this.triggeredBy){const issues=["You have not specified the `triggeredBy` property. For optimal performance, consider explicitly declaring which overlay types you plan to use.",'Example: triggered-by="click hover"',"This helps avoid unnecessary DOM operations and potential race conditions."];window.__swc.warn(this,"Performance optimization available for <overlay-trigger>:","https://opensource.adobe.com/spectrum-web-components/components/overlay-trigger/#performance-optimization",{issues:issues})}this.disabled&&changedProperties.has("disabled")&&(this.open=void 0)}async getUpdateComplete(){return await super.getUpdateComplete()}}__decorateClass([(0,decorators_dev.MZ)({attribute:"triggered-by"})],OverlayTrigger.prototype,"triggeredBy",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],OverlayTrigger.prototype,"placement",2),__decorateClass([(0,decorators_dev.MZ)()],OverlayTrigger.prototype,"type",2),__decorateClass([(0,decorators_dev.MZ)({type:Number})],OverlayTrigger.prototype,"offset",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],OverlayTrigger.prototype,"open",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],OverlayTrigger.prototype,"disabled",2),__decorateClass([(0,decorators_dev.MZ)({attribute:"receives-focus"})],OverlayTrigger.prototype,"receivesFocus",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"clickContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"longpressContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"hoverContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"targetContent",2),__decorateClass([(0,decorators_dev.P)("#click-overlay",!0)],OverlayTrigger.prototype,"clickOverlayElement",2),__decorateClass([(0,decorators_dev.P)("#longpress-overlay",!0)],OverlayTrigger.prototype,"longpressOverlayElement",2),__decorateClass([(0,decorators_dev.P)("#hover-overlay",!0)],OverlayTrigger.prototype,"hoverOverlayElement",2)},"./packages/overlay/stories/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Q:function(){return areIconsPresent},Z:function(){return isOverlayOpen}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js");function nextFrame(){return new Promise(res=>requestAnimationFrame(()=>res()))}class IsOverlayOpen extends HTMLElement{constructor(){super(),this.sendFocus=async()=>{var _a;const selectedItem=null==(_a=document.querySelector("[focusable]"))?void 0:_a.querySelector("[selected]");selectedItem&&(selectedItem.focus(),selectedItem.focused=!0,await nextFrame(),selectedItem.scrollIntoView({block:"start"}),await nextFrame())},this.handleOpened=async event=>{const overlay=event.target,actions=[nextFrame(),overlay.updateComplete,this.sendFocus()];await Promise.all(actions),await nextFrame(),await nextFrame(),await nextFrame(),await nextFrame(),this.ready(!0)},this.readyPromise=Promise.resolve(!1),this.readyPromise=new Promise(res=>{this.ready=res,this.setup()})}async setup(){await nextFrame(),document.addEventListener("sp-opened",this.handleOpened)}get updateComplete(){return this.readyPromise}disconnectedCallback(){document.removeEventListener("sp-opened",this.handleOpened)}}customElements.define("is-overlay-open",IsOverlayOpen);const isOverlayOpen=story=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        ${story()}
        <is-overlay-open></is-overlay-open>
    `;class AreIconsPresent extends HTMLElement{constructor(){super(),this.overlayTimeout=null,this.sendFocus=async()=>{var _a;const selectedItem=null==(_a=document.querySelector("[focusable]"))?void 0:_a.querySelector("[selected]");selectedItem&&(selectedItem.focus(),selectedItem.focused=!0,await nextFrame(),selectedItem.scrollIntoView({block:"start"}),await nextFrame())},this.handleOpened=async event=>{this.overlayTimeout&&(clearTimeout(this.overlayTimeout),this.overlayTimeout=null);const overlay=event.target,actions=[nextFrame(),overlay.updateComplete,this.sendFocus()];await Promise.all(actions),await nextFrame(),await nextFrame(),await nextFrame(),await nextFrame(),this.checkIcons()},this.checkIcons=async()=>{const icons=[...document.querySelectorAll("sp-icon")],picker=document.querySelector("sp-picker");if(picker){const pickerIcon=picker.querySelector("sp-icon");pickerIcon&&icons.push(pickerIcon)}const iconLoadPromises=Array.from(icons).map(icon=>new Promise(resolve=>{var _a;if("updateComplete"in icon&&"function"==typeof(null==(_a=icon.updateComplete)?void 0:_a.then))return void icon.updateComplete.then(()=>{resolve()});const src=icon.getAttribute("src");if(!src){const imgElement2=icon.querySelector("img");return imgElement2?void(imgElement2.complete?resolve():(imgElement2.addEventListener("load",()=>{resolve()},{once:!0}),imgElement2.addEventListener("error",()=>{console.warn("Failed to load icon image"),resolve()},{once:!0}))):void resolve()}const imgElement=icon.querySelector("img");if(imgElement)return void(imgElement.complete?resolve():(imgElement.addEventListener("load",()=>{resolve()},{once:!0}),imgElement.addEventListener("error",()=>{console.warn(`Failed to load icon image: ${src}`),resolve()},{once:!0})));const img=new Image;img.onload=()=>resolve(),img.onerror=()=>{console.warn(`Failed to load icon: ${src}`),resolve()},img.src=src}));await Promise.all(iconLoadPromises),await nextFrame(),this.ready(!0)},this.readyPromise=Promise.resolve(!1),this.readyPromise=new Promise(res=>{this.ready=res,this.setup()})}async setup(){await nextFrame(),document.addEventListener("sp-opened",this.handleOpened)}get updateComplete(){return this.readyPromise}disconnectedCallback(){document.removeEventListener("sp-opened",this.handleOpened)}}customElements.define("are-icons-present",AreIconsPresent);const areIconsPresent=story=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        ${story()}
        <are-icons-present></are-icons-present>
    `},"./packages/textfield/sp-textfield.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _src_Textfield_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/textfield/src/Textfield.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-textfield",_src_Textfield_dev_js__WEBPACK_IMPORTED_MODULE_0__.q)}}]);
//# sourceMappingURL=dialog-stories-dialog-wrapper-stories.29699fc3.iframe.bundle.js.map