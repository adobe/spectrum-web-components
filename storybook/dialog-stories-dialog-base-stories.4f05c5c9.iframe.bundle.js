"use strict";(self.webpackChunk_adobe_spectrum_web_components=self.webpackChunk_adobe_spectrum_web_components||[]).push([[318,1082,1335,8701],{"./node_modules/lit/async-directive.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Kq:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.Kq},u$:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.u$}});var lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit-html/development/async-directive.js")},"./packages/dialog/sp-dialog-base.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var _src_DialogBase_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/dialog/src/DialogBase.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-dialog-base",_src_DialogBase_dev_js__WEBPACK_IMPORTED_MODULE_0__.u)},"./packages/dialog/src/DialogBase.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{u:function(){return DialogBase}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");__webpack_require__("./packages/underlay/sp-underlay.dev.js"),__webpack_require__("./packages/button/sp-button.dev.js"),__webpack_require__("./packages/dialog/sp-dialog.dev.js");var modal_wrapper_css=index_dev.AH`
    :host{box-sizing:border-box;inline-size:100vw;block-size:100vh;block-size:-webkit-fill-available;block-size:stretch;visibility:hidden;pointer-events:none;z-index:1;transition:visibility 0s linear var(--mod-modal-transition-animation-duration,var(--spectrum-animation-duration-100));justify-content:center;align-items:center;display:flex;position:fixed;inset-block-start:0;inset-inline-start:0}:host([open]){visibility:visible}@media only screen and (device-height<=350px),only screen and (device-width<=400px){:host([responsive]){inline-size:100%;block-size:100%;max-inline-size:100%;max-block-size:100%;border-radius:0}:host([responsive]){margin-block-start:0}}
`,modal_css=__webpack_require__("./packages/modal/src/modal.css.js"),src_index_dev=__webpack_require__("./tools/shared/src/index.dev.js"),first_focusable_in_dev=__webpack_require__("./tools/shared/src/first-focusable-in.dev.js"),__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class DialogBase extends((0,src_index_dev.p6)(index_dev.wG)){constructor(){super(...arguments),this.dismissable=!1,this.open=!1,this.responsive=!1,this.transitionPromise=Promise.resolve(),this.resolveTransitionPromise=()=>{},this.underlay=!1,this.animating=!1}static get styles(){return[modal_wrapper_css,modal_css.A]}get dialog(){const dialog=this.shadowRoot.querySelector("slot").assignedElements()[0];return dialog||window.__swc.warn(this,`<${this.localName}> expects to be provided dialog content via its default slot.`,"https://opensource.adobe.com/spectrum-web-components/components/dialog-base/#dialog"),dialog||this}async focus(){if(this.shadowRoot){const firstFocusable=(0,first_focusable_in_dev.I)(this.dialog);firstFocusable?(firstFocusable.updateComplete&&await firstFocusable.updateComplete,firstFocusable.focus()):this.dialog.focus()}else super.focus()}overlayWillCloseCallback(){return this.open?(this.close(),!0):this.animating}dismiss(){this.dismissable&&this.close()}handleClose(event){event.stopPropagation(),this.close()}close(){this.open=!1}dispatchClosed(){this.dispatchEvent(new Event("close",{bubbles:!0}))}handleTransitionEvent(event){this.dispatchEvent(new TransitionEvent(event.type,{bubbles:!0,composed:!0,propertyName:event.propertyName}))}handleUnderlayTransitionend(event){this.open||"visibility"!==event.propertyName||this.resolveTransitionPromise(),this.handleTransitionEvent(event)}handleModalTransitionend(event){!this.open&&this.underlay||this.resolveTransitionPromise(),this.handleTransitionEvent(event)}get hasTransitionDuration(){const modal=this.shadowRoot.querySelector(".modal"),modalTransitionDurations=window.getComputedStyle(modal).transitionDuration;for(const duration of modalTransitionDurations.split(","))if(parseFloat(duration)>0)return!0;const underlay=this.shadowRoot.querySelector("sp-underlay");if(underlay){const underlayTransitionDurations=window.getComputedStyle(underlay).transitionDuration;for(const duration of underlayTransitionDurations.split(","))if(parseFloat(duration)>0)return!0}return!1}update(changes){if(changes.has("open")&&void 0!==changes.get("open")){const hasTransitionDuration=this.hasTransitionDuration;this.animating=!0,this.transitionPromise=new Promise((res=>{this.resolveTransitionPromise=()=>{this.animating=!1,!this.open&&hasTransitionDuration&&this.dispatchClosed(),res()}})),this.open||hasTransitionDuration||this.dispatchClosed()}super.update(changes)}renderDialog(){return index_dev.qy`
            <slot></slot>
        `}render(){return index_dev.qy`
            ${this.underlay?index_dev.qy`
                      <sp-underlay
                          ?open=${this.open}
                          @close=${this.dismiss}
                          @transitionrun=${this.handleTransitionEvent}
                          @transitionend=${this.handleUnderlayTransitionend}
                          @transitioncancel=${this.handleTransitionEvent}
                      ></sp-underlay>
                  `:index_dev.s6}
            <div
                class="modal ${this.mode}"
                @transitionrun=${this.handleTransitionEvent}
                @transitionend=${this.handleModalTransitionend}
                @transitioncancel=${this.handleTransitionEvent}
                @close=${this.handleClose}
            >
                ${this.renderDialog()}
            </div>
        `}updated(changes){changes.has("open")&&this.open&&"updateComplete"in this.dialog&&"shouldManageTabOrderForScrolling"in this.dialog&&this.dialog.updateComplete.then((()=>{this.dialog.shouldManageTabOrderForScrolling()}))}async getUpdateComplete(){const complete=await super.getUpdateComplete();return await this.transitionPromise,complete}}__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],DialogBase.prototype,"dismissable",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],DialogBase.prototype,"open",2),__decorateClass([(0,decorators_dev.MZ)({type:String,reflect:!0})],DialogBase.prototype,"mode",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean})],DialogBase.prototype,"responsive",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean})],DialogBase.prototype,"underlay",2)},"./packages/dialog/stories/dialog-base.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return dialog_base_stories},disabledButton:function(){return disabledButton},fullyCustom:function(){return fullyCustom},lazyLoaded:function(){return lazyLoaded},moreCustom:function(){return moreCustom},notAgain:function(){return notAgain},slotted:function(){return slotted}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=(__webpack_require__("./packages/button/sp-button.dev.js"),__webpack_require__("./packages/checkbox/sp-checkbox.dev.js"),__webpack_require__("./packages/dialog/sp-dialog-base.dev.js"),__webpack_require__("./packages/dialog/sp-dialog.dev.js"),__webpack_require__("./packages/overlay/src/index.dev.js")),dialog_stories=__webpack_require__("./packages/dialog/stories/dialog.stories.js"),stories_images=__webpack_require__("./packages/dialog/stories/images.js");__webpack_require__("./packages/overlay/sp-overlay.dev.js");class CountdownWatcher extends HTMLElement{constructor(){super(...arguments),this.readyPromise=Promise.resolve(!1)}connectedCallback(){this.previousElementSibling.addEventListener("countdown-complete",(()=>{this.ready(!0)})),this.readyPromise=new Promise((res=>{this.ready=res}))}get updateComplete(){return this.readyPromise}}customElements.define("countdown-complete-watcher",CountdownWatcher);const withOverlayDecorator=story=>index_dev.qy`
        <sp-button variant="primary" id="trigger">Toggle Dialog</sp-button>
        <sp-overlay type="modal" trigger="trigger@click" open>
            ${story()}
        </sp-overlay>
    `;var dialog_base_stories={title:"Dialog Base",component:"sp-dialog-base"};const slotted=()=>index_dev.qy`
    <sp-dialog-base
        underlay
        @click=${event=>{"sp-button"===event.target.localName&&event.target.dispatchEvent(new Event("close",{bubbles:!0,composed:!0}))}}
    >
        ${(0,dialog_stories.alertDestructive)()}
    </sp-dialog-base>
`;slotted.decorators=[withOverlayDecorator];const disabledButton=()=>index_dev.qy`
        <sp-dialog-base
            underlay
            @click=${event=>{"sp-button"===event.target.localName&&event.target.dispatchEvent(new Event("close",{bubbles:!0,composed:!0}))}}
            @sp-opened=${({target:target})=>{let count=5;const timer=setInterval((()=>{count-=1,count||(document.querySelector("#changing-header").textContent="The button in this dialog is now enabled",document.querySelector("#changing-button").disabled=!1,clearInterval(timer),target.dispatchEvent(new Event("countdown-complete"))),document.querySelector(".time").textContent=count.toString()}),1e3)}}
            @close=${()=>{document.querySelector("#changing-header").textContent="The button in this dialog is disabled",document.querySelector("#changing-button").disabled=!0,document.querySelector(".time").textContent="5"}}
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
    `;disabledButton.decorators=[story=>withOverlayDecorator((()=>(story=>index_dev.qy`
        ${story()}
        <countdown-complete-watcher></countdown-complete-watcher>
    `)(story)))];const notAgain=()=>index_dev.qy`
    <sp-dialog-base
        underlay
        @click=${event=>{"sp-button"===event.target.localName&&event.target.dispatchEvent(new Event("close",{bubbles:!0,composed:!0}))}}
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
`;notAgain.decorators=[withOverlayDecorator];const moreCustom=()=>index_dev.qy`
    <sp-dialog-base
        underlay
        @click=${event=>{"sp-button"===event.target.localName&&event.target.dispatchEvent(new Event("close",{bubbles:!0,composed:!0}))}}
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
                    src=${stories_images.o}
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
`;moreCustom.decorators=[withOverlayDecorator];const fullyCustom=()=>index_dev.qy`
    <sp-dialog-base
        underlay
        @click=${event=>{"button"===event.target.localName&&event.target.dispatchEvent(new Event("close",{bubbles:!0,composed:!0}))}}
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
`;fullyCustom.decorators=[withOverlayDecorator];const lazyLoaded=()=>index_dev.qy`
        <sp-button
            variant="primary"
            ${(0,src_index_dev.hZ)((()=>index_dev.qy`
        <sp-dialog-base
            underlay
            @click=${event=>{"sp-button"===event.target.localName&&event.target.dispatchEvent(new Event("close",{bubbles:!0,composed:!0}))}}
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
    `),{open:!1,triggerInteraction:"click"})}
        >
            Open dialog
        </sp-button>
    `;lazyLoaded.swc_vrt={skip:!0};const __namedExportsOrder=["slotted","disabledButton","notAgain","moreCustom","fullyCustom","lazyLoaded"];slotted.parameters={...slotted.parameters,docs:{...slotted.parameters?.docs,source:{originalSource:'() => html`\n    <sp-dialog-base\n        underlay\n        @click=${event => {\n  if (event.target.localName === "sp-button") {\n    event.target.dispatchEvent(new Event("close", {\n      bubbles: true,\n      composed: true\n    }));\n  }\n}}\n    >\n        ${alertDestructive()}\n    </sp-dialog-base>\n`',...slotted.parameters?.docs?.source}}},disabledButton.parameters={...disabledButton.parameters,docs:{...disabledButton.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-dialog-base\n            underlay\n            @click=${event => {\n    if (event.target.localName === "sp-button") {\n      event.target.dispatchEvent(new Event("close", {\n        bubbles: true,\n        composed: true\n      }));\n    }\n  }}\n            @sp-opened=${({\n    target\n  }) => {\n    let count = 5;\n    const timer = setInterval(() => {\n      count -= 1;\n      if (!count) {\n        document.querySelector("#changing-header").textContent = "The button in this dialog is now enabled";\n        document.querySelector("#changing-button").disabled = false;\n        clearInterval(timer);\n        target.dispatchEvent(new Event("countdown-complete"));\n      }\n      document.querySelector(".time").textContent = count.toString();\n    }, 1e3);\n  }}\n            @close=${() => {\n    document.querySelector("#changing-header").textContent = "The button in this dialog is disabled";\n    document.querySelector("#changing-button").disabled = true;\n    document.querySelector(".time").textContent = "5";\n  }}\n        >\n            <sp-dialog size="s">\n                <h2 slot="heading" id="changing-header">\n                    The button in this dialog is disabled\n                </h2>\n                <p>\n                    After about\n                    <span class="time">5</span>\n                    seconds the button with be enabled.\n                </p>\n                <sp-button disabled slot="button" id="changing-button">\n                    Ok\n                </sp-button>\n            </sp-dialog>\n        </sp-dialog-base>\n    `;\n}',...disabledButton.parameters?.docs?.source}}},notAgain.parameters={...notAgain.parameters,docs:{...notAgain.parameters?.docs,source:{originalSource:'() => html`\n    <sp-dialog-base\n        underlay\n        @click=${event => {\n  if (event.target.localName === "sp-button") {\n    event.target.dispatchEvent(new Event("close", {\n      bubbles: true,\n      composed: true\n    }));\n  }\n}}\n    >\n        <sp-dialog size="s">\n            <h2 slot="heading">A thing is about to happen</h2>\n            <p>Something that might happen a lot is about to happen.</p>\n            <p>\n                The click events for the "OK" button are bound to the story not\n                to the components in specific.\n            </p>\n            <sp-button variant="secondary" treatment="fill" slot="button">\n                Ok\n            </sp-button>\n            <sp-checkbox slot="footer">Don\'t show me this again</sp-checkbox>\n        </sp-dialog>\n    </sp-dialog-base>\n`',...notAgain.parameters?.docs?.source}}},moreCustom.parameters={...moreCustom.parameters,docs:{...moreCustom.parameters?.docs,source:{originalSource:'() => html`\n    <sp-dialog-base\n        underlay\n        @click=${event => {\n  if (event.target.localName === "sp-button") {\n    event.target.dispatchEvent(new Event("close", {\n      bubbles: true,\n      composed: true\n    }));\n  }\n}}\n    >\n        <div style="display: flex;">\n            <div\n                style="\n                display: grid;\n                place-content: center;\n                grid-template-columns: calc(100% - 40px);\n                grid-template-rows: calc(100% - 40px);\n            "\n            >\n                <img\n                    src=${portrait}\n                    alt=""\n                    style="\n                        width: 100%;\n                        height: 100%;\n                        object-fit: contain;\n                        object-placement: center;\n                    "\n                />\n            </div>\n            <sp-dialog size="s">\n                <h2 slot="heading">Look at that image</h2>\n                <p>\n                    Its position has been customized beyond the language of\n                    Spectrum. Be careful with all this power. There\'s no\n                    "mobile" default for delivering content like this.\n                </p>\n                <sp-button variant="accent" treatment="outline" slot="button">\n                    Ok\n                </sp-button>\n            </sp-dialog>\n        </div>\n    </sp-dialog-base>\n`',...moreCustom.parameters?.docs?.source}}},fullyCustom.parameters={...fullyCustom.parameters,docs:{...fullyCustom.parameters?.docs,source:{originalSource:'() => html`\n    <sp-dialog-base\n        underlay\n        @click=${event => {\n  if (event.target.localName === "button") {\n    event.target.dispatchEvent(new Event("close", {\n      bubbles: true,\n      composed: true\n    }));\n  }\n}}\n    >\n        <div id="fully-custom-dialog">\n            <style>\n                #fully-custom-dialog {\n                    margin: 1em;\n                }\n            </style>\n            <h2>Custom headline</h2>\n            <p>\n                The click events for the "Done" button are bound to the story\n                not to the components in specific.\n            </p>\n            <p>\n                This is a demonstration of what is possible with\n                &lt;sp-dialog-base&gt;, only, and should not be seen as an\n                endorsement for fully custom dialog UIs.\n            </p>\n            <p>Fully open content area, for whatever DOM you would like.</p>\n            <button>Done</button>\n        </div>\n    </sp-dialog-base>\n`',...fullyCustom.parameters?.docs?.source}}},lazyLoaded.parameters={...lazyLoaded.parameters,docs:{...lazyLoaded.parameters?.docs,source:{originalSource:'() => {\n  const template = () => html`\n        <sp-dialog-base\n            underlay\n            @click=${event => {\n    if (event.target.localName === "sp-button") {\n      event.target.dispatchEvent(new Event("close", {\n        bubbles: true,\n        composed: true\n      }));\n    }\n  }}\n        >\n            <sp-dialog size="m">\n                <h2 slot="heading">This is a heading</h2>\n                <p>\n                    The click on the "OK" button should close the overlay with\n                    the correct animation (duration).\n                </p>\n                <sp-button variant="secondary" treatment="fill" slot="button">\n                    Ok\n                </sp-button>\n            </sp-dialog>\n        </sp-dialog-base>\n    `;\n  return html`\n        <sp-button\n            variant="primary"\n            ${trigger(template, {\n    open: false,\n    triggerInteraction: "click"\n  })}\n        >\n            Open dialog\n        </sp-button>\n    `;\n}',...lazyLoaded.parameters?.docs?.source}}}},"./packages/modal/src/modal.css.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){const i=__webpack_require__("./tools/base/src/index.dev.js").AH`
    :host{--spectrum-modal-confirm-entry-animation-duration:var(--mod-modal-confirm-entry-animation-duration,var(--spectrum-animation-duration-500));--spectrum-modal-confirm-entry-animation-delay:var(--mod-overlay-animation-duration-opened,var(--mod-modal-confirm-entry-animation-delay,var(--spectrum-animation-duration-200)));--spectrum-modal-confirm-exit-animation-duration:var(--mod-overlay-animation-duration,var(--mod-modal-confirm-exit-animation-duration,var(--spectrum-animation-duration-100)));--spectrum-modal-confirm-exit-animation-delay:var(--mod-modal-confirm-exit-animation-delay,var(--spectrum-animation-duration-0));--spectrum-modal-fullscreen-margin:var(--mod-modal-fullscreen-margin,32px)}.modal{visibility:hidden;opacity:0;transform:translateY(var(--mod-modal-confirm-entry-animation-distance,var(--spectrum-dialog-confirm-entry-animation-distance)));z-index:1;max-block-size:90vh;max-block-size:var(--mod-modal-max-height,90vh);max-inline-size:90%;max-inline-size:var(--mod-modal-max-width,90%);background:var(--mod-modal-background-color,var(--spectrum-modal-background-color));border-radius:var(--mod-modal-confirm-border-radius,var(--spectrum-corner-radius-100));pointer-events:auto;transition:opacity var(--spectrum-modal-confirm-exit-animation-duration)var(--spectrum-animation-ease-in)var(--spectrum-modal-confirm-exit-animation-delay),visibility var(--spectrum-animation-duration-0)var(--spectrum-animation-linear)calc(var(--spectrum-modal-confirm-exit-animation-delay) + var(--spectrum-modal-confirm-exit-animation-duration)),transform var(--spectrum-animation-duration-0)var(--spectrum-animation-linear)calc(var(--spectrum-modal-confirm-exit-animation-delay) + var(--spectrum-modal-confirm-exit-animation-duration));outline:none;overflow:hidden}:host([open]) .modal{pointer-events:auto;visibility:visible;opacity:1;transition:transform var(--spectrum-modal-confirm-entry-animation-duration)var(--spectrum-animation-ease-out)var(--spectrum-modal-confirm-entry-animation-delay),opacity var(--spectrum-modal-confirm-entry-animation-duration)var(--spectrum-animation-ease-out)var(--spectrum-modal-confirm-entry-animation-delay);transform:translateY(0)}@media only screen and (device-height<=350px),only screen and (device-width<=400px){:host([responsive]) .modal{inline-size:100%;block-size:100%;max-inline-size:100%;max-block-size:100%;border-radius:0}}.fullscreen{max-inline-size:none;max-block-size:none;position:fixed;inset-block-start:var(--spectrum-modal-fullscreen-margin);inset-block-end:var(--spectrum-modal-fullscreen-margin);inset-inline-start:var(--spectrum-modal-fullscreen-margin);inset-inline-end:var(--spectrum-modal-fullscreen-margin)}.fullscreenTakeover{max-inline-size:none;max-block-size:none;box-sizing:border-box;border:none;border-radius:0;position:fixed;inset:0}.fullscreenTakeover,:host([open]) .fullscreenTakeover{transform:none}:host{--spectrum-modal-background-color:var(--system-modal-background-color)}:host{--spectrum-dialog-confirm-exit-animation-duration:var(--swc-test-duration);--spectrum-dialog-confirm-entry-animation-duration:var(--swc-test-duration);--spectrum-modal-confirm-entry-animation-distance:var(--spectrum-dialog-confirm-entry-animation-distance);height:100dvh}.modal{overflow:visible}
`;__webpack_exports__.A=i},"./packages/overlay/sp-overlay.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var _spectrum_web_components_base_src_define_element_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/define-element.dev.js"),_src_Overlay_dev_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/overlay/src/Overlay.dev.js");(0,_spectrum_web_components_base_src_define_element_js__WEBPACK_IMPORTED_MODULE_0__.e)("sp-overlay",_src_Overlay_dev_js__WEBPACK_IMPORTED_MODULE_1__.Overlay)},"./packages/overlay/src/OverlayTrigger.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{N:function(){return OverlayTrigger}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");__webpack_require__("./packages/overlay/sp-overlay.dev.js");var overlay_trigger_css=index_dev.AH`
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
                .type=${"modal"!==this.type?"auto":"modal"}
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
        `}updated(changedProperties){if(super.updated(changedProperties),!this.triggeredBy){const issues=["You have not specified the `triggeredBy` property. For optimal performance, consider explicitly declaring which overlay types you plan to use.",'Example: triggered-by="click hover"',"This helps avoid unnecessary DOM operations and potential race conditions."];window.__swc.warn(this,"Performance optimization available for <overlay-trigger>:","https://opensource.adobe.com/spectrum-web-components/components/overlay-trigger/#performance-optimization",{issues:issues})}this.disabled&&changedProperties.has("disabled")&&(this.open=void 0)}async getUpdateComplete(){return await super.getUpdateComplete()}}__decorateClass([(0,decorators_dev.MZ)({attribute:"triggered-by"})],OverlayTrigger.prototype,"triggeredBy",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],OverlayTrigger.prototype,"placement",2),__decorateClass([(0,decorators_dev.MZ)()],OverlayTrigger.prototype,"type",2),__decorateClass([(0,decorators_dev.MZ)({type:Number})],OverlayTrigger.prototype,"offset",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],OverlayTrigger.prototype,"open",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],OverlayTrigger.prototype,"disabled",2),__decorateClass([(0,decorators_dev.MZ)({attribute:"receives-focus"})],OverlayTrigger.prototype,"receivesFocus",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"clickContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"longpressContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"hoverContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"targetContent",2),__decorateClass([(0,decorators_dev.P)("#click-overlay",!0)],OverlayTrigger.prototype,"clickOverlayElement",2),__decorateClass([(0,decorators_dev.P)("#longpress-overlay",!0)],OverlayTrigger.prototype,"longpressOverlayElement",2),__decorateClass([(0,decorators_dev.P)("#hover-overlay",!0)],OverlayTrigger.prototype,"hoverOverlayElement",2)},"./packages/overlay/src/index.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{hJ:function(){return Overlay_dev.Overlay},ec:function(){return VirtualTrigger_dev.e},F9:function(){return openOverlay},hZ:function(){return overlay_trigger_directive_dev.h}});var Overlay_dev=__webpack_require__("./packages/overlay/src/Overlay.dev.js"),VirtualTrigger_dev=(__webpack_require__("./packages/overlay/src/OverlayTrigger.dev.js"),__webpack_require__("./packages/overlay/src/VirtualTrigger.dev.js"));async function openOverlay(triggerOrContent,interactionOrOptions,content,optionsV1){return Overlay_dev.Overlay.open(triggerOrContent,interactionOrOptions,content,optionsV1)}var overlay_trigger_directive_dev=__webpack_require__("./packages/overlay/src/overlay-trigger-directive.dev.js")},"./packages/overlay/src/overlay-trigger-directive.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{h:function(){return trigger}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_spectrum_web_components_base_src_async_directive_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./tools/base/src/async-directive.dev.js"),_strategies_dev_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/overlay/src/strategies.dev.js"),_slottable_request_event_dev_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/overlay/src/slottable-request-event.dev.js"),_slottable_request_directive_dev_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/overlay/src/slottable-request-directive.dev.js"),_AbstractOverlay_dev_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./packages/overlay/src/AbstractOverlay.dev.js"),_InteractionController_dev_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./packages/overlay/src/InteractionController.dev.js");class OverlayTriggerDirective extends _slottable_request_directive_dev_js__WEBPACK_IMPORTED_MODULE_4__.V{constructor(){super(...arguments),this.defaultOptions={triggerInteraction:"click",overlayOptions:{type:"auto",offset:0}},this.options={...this.defaultOptions.overlayOptions}}render(_template,_options){return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.s6}update(part,[template,options]){var _a,_b,_c,_d;this.options={...this.defaultOptions.overlayOptions,...null==options?void 0:options.overlayOptions},this.insertionOptions=null==options?void 0:options.insertionOptions,this.template=template,this.host=null==(_a=part.options)?void 0:_a.host;let newTarget=!1;const triggerInteraction=(null==options?void 0:options.triggerInteraction)||this.defaultOptions.triggerInteraction,newStrategy=_InteractionController_dev_js__WEBPACK_IMPORTED_MODULE_6__.G4[null==(_b=this.strategy)?void 0:_b.type]!==triggerInteraction;this.target!==part.element&&(this.target=part.element,newTarget=!0),(newTarget||newStrategy)&&(null==(_c=this.strategy)||_c.abort(),this.strategy=new _strategies_dev_js__WEBPACK_IMPORTED_MODULE_2__.W[triggerInteraction](this.target,{isPersistent:!0,handleOverlayReady:overlay=>{this.listenerHost=this.overlay=overlay,this.init()}})),this.strategy.open=null!=(_d=null==options?void 0:options.open)&&_d}handleSlottableRequest(event){var _a,_b;if(event.target!==event.currentTarget)return;const willRemoveSlottable=event.data===_slottable_request_event_dev_js__WEBPACK_IMPORTED_MODULE_3__.g,options={};if(this.host&&(options.host=this.host),(0,_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.XX)(willRemoveSlottable?void 0:this.template(),this.overlay,options),willRemoveSlottable)this.overlay.remove();else{_AbstractOverlay_dev_js__WEBPACK_IMPORTED_MODULE_5__.HR.applyOptions(this.overlay,{...this.options,trigger:this.target});const insertionEl="function"==typeof(null==(_a=this.insertionOptions)?void 0:_a.el)?this.insertionOptions.el():(null==(_b=this.insertionOptions)?void 0:_b.el)||this.target,{where:where="afterend"}=this.insertionOptions||{};insertionEl.insertAdjacentElement(where,this.overlay)}}}const trigger=(0,_spectrum_web_components_base_src_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.u$)(OverlayTriggerDirective)},"./packages/overlay/src/slottable-request-directive.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{V:function(){return SlottableRequestDirective},i:function(){return slottableRequest}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_spectrum_web_components_base_src_async_directive_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./tools/base/src/async-directive.dev.js"),_slottable_request_event_dev_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/overlay/src/slottable-request-event.dev.js");class SlottableRequestDirective extends _spectrum_web_components_base_src_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.Kq{render(_template){return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.s6}update(part,[template]){this.template=template,this.target!==part.element&&(this.target=part.element,this.renderBefore=this.target.children[0]),this.listenerHost=this.target,this.init()}handleSlottableRequest(event){if(event.target!==event.currentTarget)return;const willRemoveSlottable=event.data===_slottable_request_event_dev_js__WEBPACK_IMPORTED_MODULE_2__.g;(0,_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.XX)(willRemoveSlottable?void 0:this.template(),this.target,{renderBefore:this.renderBefore})}init(){var _a;null==(_a=this.listeners)||_a.abort(),this.listeners=new AbortController;const{signal:signal}=this.listeners;this.listenerHost.addEventListener("slottable-request",(event=>this.handleSlottableRequest(event)),{signal:signal}),window.__swc.warn(void 0,'⚠️  WARNING ⚠️ : The Overlay Trigger Directive is experimental and there is no guarantees behind its usage in an application!! Its API and presence within the library could be changed at anytime. See "sp-overlay" or "Overlay.open()" for a stable API for overlaying content on your application.',"https://opensource.adobe.com/spectrum-web-components/components/overlay",{level:"high",type:"api"})}disconnected(){var _a;null==(_a=this.listeners)||_a.abort()}reconnected(){this.init()}}const slottableRequest=(0,_spectrum_web_components_base_src_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.u$)(SlottableRequestDirective)},"./packages/underlay/sp-underlay.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");var underlay_css=index_dev.AH`
    :host{--spectrum-underlay-background-exit-animation-duration:var(--mod-underlay-background-exit-animation-duration,var(--spectrum-animation-duration-300));--spectrum-underlay-background-exit-animation-ease:var(--mod-underlay-background-exit-animation-ease,var(--spectrum-animation-ease-in));--spectrum-underlay-background-exit-animation-delay:var(--mod-underlay-background-exit-animation-delay,var(--spectrum-animation-duration-200));--spectrum-underlay-background-entry-animation-duration:var(--mod-underlay-background-entry-animation-duration,var(--spectrum-animation-duration-600));--spectrum-underlay-background-entry-animation-ease:var(--mod-underlay-background-entry-animation-ease,var(--spectrum-animation-ease-out));--spectrum-underlay-background-entry-animation-delay:var(--mod-underlay-background-entry-animation-delay,var(--mod-overlay-animation-duration-opened,var(--spectrum-animation-duration-0)));--spectrum-underlay-background-color:var(--mod-underlay-background-color,rgba(var(--spectrum-black-rgb),var(--spectrum-overlay-opacity)));pointer-events:none;visibility:hidden;opacity:0;background-color:var(--spectrum-underlay-background-color);z-index:1;transition:opacity var(--spectrum-underlay-background-exit-animation-duration)var(--spectrum-underlay-background-exit-animation-ease)var(--spectrum-underlay-background-exit-animation-delay),visibility 0s linear calc(var(--spectrum-underlay-background-exit-animation-delay) + var(--spectrum-underlay-background-exit-animation-duration));position:fixed;inset-block:0;inset-inline:0;overflow:hidden}:host([open]){pointer-events:auto;visibility:visible;opacity:1;transition:opacity var(--spectrum-underlay-background-entry-animation-duration)var(--spectrum-underlay-background-entry-animation-ease)var(--spectrum-underlay-background-entry-animation-delay);transition-delay:var(--spectrum-underlay-background-entry-animation-delay)}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor;class Underlay extends index_dev.wG{constructor(){super(...arguments),this.canClick=!1,this.open=!1}static get styles(){return[underlay_css]}click(){this.dispatchEvent(new Event("close"))}handlePointerdown(){this.canClick=!0}handlePointerup(){this.canClick&&this.click(),this.canClick=!1}render(){return index_dev.qy``}firstUpdated(){this.addEventListener("pointerdown",this.handlePointerdown),this.addEventListener("pointerup",this.handlePointerup)}}((decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);kind&&result&&__defProp(target,key,result)})([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Underlay.prototype,"open",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-underlay",Underlay)},"./tools/base/src/async-directive.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Kq:function(){return lit_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.Kq},u$:function(){return lit_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.u$}});var lit_async_directive_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/async-directive.js")}}]);
//# sourceMappingURL=dialog-stories-dialog-base-stories.4f05c5c9.iframe.bundle.js.map