"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[318,1335],{"../node_modules/lit/async-directive.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Kq:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.Kq},u$:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.u$}});var lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../node_modules/lit-html/development/async-directive.js")},"./packages/dialog/sp-dialog-base.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var _src_DialogBase_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/dialog/src/DialogBase.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-dialog-base",_src_DialogBase_dev_js__WEBPACK_IMPORTED_MODULE_0__.u)},"./packages/dialog/stories/dialog-base.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return dialog_base_stories},disabledButton:function(){return disabledButton},fullyCustom:function(){return fullyCustom},lazyLoaded:function(){return lazyLoaded},moreCustom:function(){return moreCustom},notAgain:function(){return notAgain},slotted:function(){return slotted}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=(__webpack_require__("./packages/button/sp-button.dev.js"),__webpack_require__("./packages/checkbox/sp-checkbox.dev.js"),__webpack_require__("./packages/dialog/sp-dialog-base.dev.js"),__webpack_require__("./packages/dialog/sp-dialog.dev.js"),__webpack_require__("./packages/overlay/src/index.dev.js")),dialog_stories=__webpack_require__("./packages/dialog/stories/dialog.stories.js"),stories_images=__webpack_require__("./packages/dialog/stories/images.js");__webpack_require__("./packages/overlay/sp-overlay.dev.js");class CountdownWatcher extends HTMLElement{constructor(){super(...arguments),this.readyPromise=Promise.resolve(!1)}connectedCallback(){this.previousElementSibling.addEventListener("countdown-complete",()=>{this.ready(!0)}),this.readyPromise=new Promise(res=>{this.ready=res})}get updateComplete(){return this.readyPromise}}customElements.define("countdown-complete-watcher",CountdownWatcher);const withOverlayDecorator=story=>index_dev.qy`
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
            @sp-opened=${({target:target})=>{let count=5;const timer=setInterval(()=>{count-=1,count||(document.querySelector("#changing-header").textContent="The button in this dialog is now enabled",document.querySelector("#changing-button").disabled=!1,clearInterval(timer),target.dispatchEvent(new Event("countdown-complete"))),document.querySelector(".time").textContent=count.toString()},1e3)}}
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
    `;disabledButton.decorators=[story=>withOverlayDecorator(()=>(story=>index_dev.qy`
        ${story()}
        <countdown-complete-watcher></countdown-complete-watcher>
    `)(story))];const notAgain=()=>index_dev.qy`
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
            ${(0,src_index_dev.hZ)(()=>index_dev.qy`
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
    `,{open:!1,triggerInteraction:"click"})}
        >
            Open dialog
        </sp-button>
    `;lazyLoaded.swc_vrt={skip:!0};const __namedExportsOrder=["slotted","disabledButton","notAgain","moreCustom","fullyCustom","lazyLoaded"];slotted.parameters={...slotted.parameters,docs:{...slotted.parameters?.docs,source:{originalSource:'() => html`\n    <sp-dialog-base\n        underlay\n        @click=${event => {\n  if (event.target.localName === "sp-button") {\n    event.target.dispatchEvent(new Event("close", {\n      bubbles: true,\n      composed: true\n    }));\n  }\n}}\n    >\n        ${alertDestructive()}\n    </sp-dialog-base>\n`',...slotted.parameters?.docs?.source}}},disabledButton.parameters={...disabledButton.parameters,docs:{...disabledButton.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-dialog-base\n            underlay\n            @click=${event => {\n    if (event.target.localName === "sp-button") {\n      event.target.dispatchEvent(new Event("close", {\n        bubbles: true,\n        composed: true\n      }));\n    }\n  }}\n            @sp-opened=${({\n    target\n  }) => {\n    let count = 5;\n    const timer = setInterval(() => {\n      count -= 1;\n      if (!count) {\n        document.querySelector("#changing-header").textContent = "The button in this dialog is now enabled";\n        document.querySelector("#changing-button").disabled = false;\n        clearInterval(timer);\n        target.dispatchEvent(new Event("countdown-complete"));\n      }\n      document.querySelector(".time").textContent = count.toString();\n    }, 1e3);\n  }}\n            @close=${() => {\n    document.querySelector("#changing-header").textContent = "The button in this dialog is disabled";\n    document.querySelector("#changing-button").disabled = true;\n    document.querySelector(".time").textContent = "5";\n  }}\n        >\n            <sp-dialog size="s">\n                <h2 slot="heading" id="changing-header">\n                    The button in this dialog is disabled\n                </h2>\n                <p>\n                    After about\n                    <span class="time">5</span>\n                    seconds the button with be enabled.\n                </p>\n                <sp-button disabled slot="button" id="changing-button">\n                    Ok\n                </sp-button>\n            </sp-dialog>\n        </sp-dialog-base>\n    `;\n}',...disabledButton.parameters?.docs?.source}}},notAgain.parameters={...notAgain.parameters,docs:{...notAgain.parameters?.docs,source:{originalSource:'() => html`\n    <sp-dialog-base\n        underlay\n        @click=${event => {\n  if (event.target.localName === "sp-button") {\n    event.target.dispatchEvent(new Event("close", {\n      bubbles: true,\n      composed: true\n    }));\n  }\n}}\n    >\n        <sp-dialog size="s">\n            <h2 slot="heading">A thing is about to happen</h2>\n            <p>Something that might happen a lot is about to happen.</p>\n            <p>\n                The click events for the "OK" button are bound to the story not\n                to the components in specific.\n            </p>\n            <sp-button variant="secondary" treatment="fill" slot="button">\n                Ok\n            </sp-button>\n            <sp-checkbox slot="footer">Don\'t show me this again</sp-checkbox>\n        </sp-dialog>\n    </sp-dialog-base>\n`',...notAgain.parameters?.docs?.source}}},moreCustom.parameters={...moreCustom.parameters,docs:{...moreCustom.parameters?.docs,source:{originalSource:'() => html`\n    <sp-dialog-base\n        underlay\n        @click=${event => {\n  if (event.target.localName === "sp-button") {\n    event.target.dispatchEvent(new Event("close", {\n      bubbles: true,\n      composed: true\n    }));\n  }\n}}\n    >\n        <div style="display: flex;">\n            <div\n                style="\n                display: grid;\n                place-content: center;\n                grid-template-columns: calc(100% - 40px);\n                grid-template-rows: calc(100% - 40px);\n            "\n            >\n                <img\n                    src=${portrait}\n                    alt=""\n                    style="\n                        width: 100%;\n                        height: 100%;\n                        object-fit: contain;\n                        object-placement: center;\n                    "\n                />\n            </div>\n            <sp-dialog size="s">\n                <h2 slot="heading">Look at that image</h2>\n                <p>\n                    Its position has been customized beyond the language of\n                    Spectrum. Be careful with all this power. There\'s no\n                    "mobile" default for delivering content like this.\n                </p>\n                <sp-button variant="accent" treatment="outline" slot="button">\n                    Ok\n                </sp-button>\n            </sp-dialog>\n        </div>\n    </sp-dialog-base>\n`',...moreCustom.parameters?.docs?.source}}},fullyCustom.parameters={...fullyCustom.parameters,docs:{...fullyCustom.parameters?.docs,source:{originalSource:'() => html`\n    <sp-dialog-base\n        underlay\n        @click=${event => {\n  if (event.target.localName === "button") {\n    event.target.dispatchEvent(new Event("close", {\n      bubbles: true,\n      composed: true\n    }));\n  }\n}}\n    >\n        <div id="fully-custom-dialog">\n            <style>\n                #fully-custom-dialog {\n                    margin: 1em;\n                }\n            </style>\n            <h2>Custom headline</h2>\n            <p>\n                The click events for the "Done" button are bound to the story\n                not to the components in specific.\n            </p>\n            <p>\n                This is a demonstration of what is possible with\n                &lt;sp-dialog-base&gt;, only, and should not be seen as an\n                endorsement for fully custom dialog UIs.\n            </p>\n            <p>Fully open content area, for whatever DOM you would like.</p>\n            <button>Done</button>\n        </div>\n    </sp-dialog-base>\n`',...fullyCustom.parameters?.docs?.source}}},lazyLoaded.parameters={...lazyLoaded.parameters,docs:{...lazyLoaded.parameters?.docs,source:{originalSource:'() => {\n  const template = () => html`\n        <sp-dialog-base\n            underlay\n            @click=${event => {\n    if (event.target.localName === "sp-button") {\n      event.target.dispatchEvent(new Event("close", {\n        bubbles: true,\n        composed: true\n      }));\n    }\n  }}\n        >\n            <sp-dialog size="m">\n                <h2 slot="heading">This is a heading</h2>\n                <p>\n                    The click on the "OK" button should close the overlay with\n                    the correct animation (duration).\n                </p>\n                <sp-button variant="secondary" treatment="fill" slot="button">\n                    Ok\n                </sp-button>\n            </sp-dialog>\n        </sp-dialog-base>\n    `;\n  return html`\n        <sp-button\n            variant="primary"\n            ${trigger(template, {\n    open: false,\n    triggerInteraction: "click"\n  })}\n        >\n            Open dialog\n        </sp-button>\n    `;\n}',...lazyLoaded.parameters?.docs?.source}}}},"./packages/overlay/src/OverlayTrigger.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{N:function(){return OverlayTrigger}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");__webpack_require__("./packages/overlay/sp-overlay.dev.js");var overlay_trigger_css=index_dev.AH`
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
        `}updated(changedProperties){if(super.updated(changedProperties),!this.triggeredBy){const issues=["You have not specified the `triggeredBy` property. For optimal performance, consider explicitly declaring which overlay types you plan to use.",'Example: triggered-by="click hover"',"This helps avoid unnecessary DOM operations and potential race conditions."];window.__swc.warn(this,"Performance optimization available for <overlay-trigger>:","https://opensource.adobe.com/spectrum-web-components/components/overlay-trigger/#performance-optimization",{issues:issues})}this.disabled&&changedProperties.has("disabled")&&(this.open=void 0)}async getUpdateComplete(){return await super.getUpdateComplete()}}__decorateClass([(0,decorators_dev.MZ)({attribute:"triggered-by"})],OverlayTrigger.prototype,"triggeredBy",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],OverlayTrigger.prototype,"placement",2),__decorateClass([(0,decorators_dev.MZ)()],OverlayTrigger.prototype,"type",2),__decorateClass([(0,decorators_dev.MZ)({type:Number})],OverlayTrigger.prototype,"offset",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],OverlayTrigger.prototype,"open",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],OverlayTrigger.prototype,"disabled",2),__decorateClass([(0,decorators_dev.MZ)({attribute:"receives-focus"})],OverlayTrigger.prototype,"receivesFocus",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"clickContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"longpressContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"hoverContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"targetContent",2),__decorateClass([(0,decorators_dev.P)("#click-overlay",!0)],OverlayTrigger.prototype,"clickOverlayElement",2),__decorateClass([(0,decorators_dev.P)("#longpress-overlay",!0)],OverlayTrigger.prototype,"longpressOverlayElement",2),__decorateClass([(0,decorators_dev.P)("#hover-overlay",!0)],OverlayTrigger.prototype,"hoverOverlayElement",2)},"./packages/overlay/src/index.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{hJ:function(){return Overlay_dev.Overlay},ec:function(){return VirtualTrigger_dev.e},F9:function(){return openOverlay},hZ:function(){return overlay_trigger_directive_dev.h}});var Overlay_dev=__webpack_require__("./packages/overlay/src/Overlay.dev.js");__webpack_require__("./packages/overlay/src/OverlayTrigger.dev.js");var VirtualTrigger_dev=__webpack_require__("./packages/overlay/src/VirtualTrigger.dev.js");async function openOverlay(triggerOrContent,interactionOrOptions,content,optionsV1){return Overlay_dev.Overlay.open(triggerOrContent,interactionOrOptions,content,optionsV1)}var overlay_trigger_directive_dev=__webpack_require__("./packages/overlay/src/overlay-trigger-directive.dev.js")},"./packages/overlay/src/overlay-trigger-directive.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{h:function(){return trigger}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_spectrum_web_components_base_src_async_directive_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./tools/base/src/async-directive.dev.js"),_strategies_dev_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/overlay/src/strategies.dev.js"),_slottable_request_event_dev_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/overlay/src/slottable-request-event.dev.js"),_slottable_request_directive_dev_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/overlay/src/slottable-request-directive.dev.js"),_AbstractOverlay_dev_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./packages/overlay/src/AbstractOverlay.dev.js"),_InteractionController_dev_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./packages/overlay/src/InteractionController.dev.js");class OverlayTriggerDirective extends _slottable_request_directive_dev_js__WEBPACK_IMPORTED_MODULE_4__.V{constructor(){super(...arguments),this.defaultOptions={triggerInteraction:"click",overlayOptions:{type:"auto",offset:0}},this.options={...this.defaultOptions.overlayOptions}}render(_template,_options){return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.s6}update(part,[template,options]){var _a,_b,_c,_d;this.options={...this.defaultOptions.overlayOptions,...null==options?void 0:options.overlayOptions},this.insertionOptions=null==options?void 0:options.insertionOptions,this.template=template,this.host=null==(_a=part.options)?void 0:_a.host;let newTarget=!1;const triggerInteraction=(null==options?void 0:options.triggerInteraction)||this.defaultOptions.triggerInteraction,newStrategy=_InteractionController_dev_js__WEBPACK_IMPORTED_MODULE_6__.G4[null==(_b=this.strategy)?void 0:_b.type]!==triggerInteraction;this.target!==part.element&&(this.target=part.element,newTarget=!0),(newTarget||newStrategy)&&(null==(_c=this.strategy)||_c.abort(),this.strategy=new _strategies_dev_js__WEBPACK_IMPORTED_MODULE_2__.W[triggerInteraction](this.target,{isPersistent:!0,handleOverlayReady:overlay=>{this.listenerHost=this.overlay=overlay,this.init()}})),this.strategy.open=null!=(_d=null==options?void 0:options.open)&&_d}handleSlottableRequest(event){var _a,_b;if(event.target!==event.currentTarget)return;const willRemoveSlottable=event.data===_slottable_request_event_dev_js__WEBPACK_IMPORTED_MODULE_3__.g,options={};if(this.host&&(options.host=this.host),(0,_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.XX)(willRemoveSlottable?void 0:this.template(),this.overlay,options),willRemoveSlottable)this.overlay.remove();else{_AbstractOverlay_dev_js__WEBPACK_IMPORTED_MODULE_5__.HR.applyOptions(this.overlay,{...this.options,trigger:this.target});const insertionEl="function"==typeof(null==(_a=this.insertionOptions)?void 0:_a.el)?this.insertionOptions.el():(null==(_b=this.insertionOptions)?void 0:_b.el)||this.target,{where:where="afterend"}=this.insertionOptions||{};insertionEl.insertAdjacentElement(where,this.overlay)}}disconnected(){var _a;this.overlay&&(this.overlay.open=!1,this.overlay.remove()),null==(_a=this.strategy)||_a.clearOverlay(),super.disconnected()}reconnected(){}}const trigger=(0,_spectrum_web_components_base_src_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.u$)(OverlayTriggerDirective)},"./packages/overlay/src/slottable-request-directive.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{V:function(){return SlottableRequestDirective},i:function(){return slottableRequest}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_spectrum_web_components_base_src_async_directive_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./tools/base/src/async-directive.dev.js"),_slottable_request_event_dev_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/overlay/src/slottable-request-event.dev.js");class SlottableRequestDirective extends _spectrum_web_components_base_src_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.Kq{render(_template){return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.s6}update(part,[template]){this.template=template,this.target!==part.element&&(this.target=part.element,this.renderBefore=this.target.children[0]),this.listenerHost=this.target,this.init()}handleSlottableRequest(event){if(event.target!==event.currentTarget)return;const willRemoveSlottable=event.data===_slottable_request_event_dev_js__WEBPACK_IMPORTED_MODULE_2__.g;(0,_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.XX)(willRemoveSlottable?void 0:this.template(),this.target,{renderBefore:this.renderBefore})}init(){var _a,_b;null==(_a=this.listeners)||_a.abort(),this.listeners=new AbortController;const{signal:signal}=this.listeners;this.listenerHost.addEventListener("slottable-request",event=>this.handleSlottableRequest(event),{signal:signal}),(null==(_b=window.__swc)?void 0:_b.warn)&&window.__swc.warn(void 0,'⚠️  WARNING ⚠️ : The Overlay Trigger Directive is experimental and there is no guarantees behind its usage in an application!! Its API and presence within the library could be changed at anytime. See "sp-overlay" or "Overlay.open()" for a stable API for overlaying content on your application.',"https://opensource.adobe.com/spectrum-web-components/components/overlay",{level:"high",type:"api"})}disconnected(){var _a;null==(_a=this.listeners)||_a.abort()}reconnected(){this.init()}}const slottableRequest=(0,_spectrum_web_components_base_src_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.u$)(SlottableRequestDirective)},"./tools/base/src/async-directive.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Kq:function(){return lit_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.Kq},u$:function(){return lit_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.u$}});var lit_async_directive_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../node_modules/lit/async-directive.js")}}]);
//# sourceMappingURL=dialog-stories-dialog-base-stories.0a1922a1.iframe.bundle.js.map