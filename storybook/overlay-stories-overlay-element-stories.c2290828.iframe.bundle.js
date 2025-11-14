"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[1335,9685],{"./packages/action-menu/sp-action-menu.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),Picker_dev=__webpack_require__("./packages/picker/src/Picker.dev.js"),observe_slot_presence_dev=(__webpack_require__("./packages/action-button/sp-action-button.dev.js"),__webpack_require__("./tools/shared/src/observe-slot-presence.dev.js")),observe_slot_text_dev=__webpack_require__("./tools/shared/src/observe-slot-text.dev.js");__webpack_require__("./packages/icons-workflow/icons/sp-icon-more.js");var action_menu_css=index_dev.AH`
    :host{display:inline-flex}:host([quiet]){min-width:0}:host>sp-menu{display:none}::slotted([slot=icon]),.icon{flex-shrink:0}#popover{max-width:none}:host([dir=ltr]) ::slotted([slot=icon]),:host([dir=ltr]) .icon{margin-left:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted)))}:host([dir=rtl]) ::slotted([slot=icon]),:host([dir=rtl]) .icon{margin-right:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted)))}:host([dir]) slot[icon-only]::slotted([slot=icon]),:host([dir]) slot[icon-only] .icon{margin-inline:calc((var(--custom-actionbutton-edge-to-text,var(--spectrum-actionbutton-edge-to-text)) - var(--custom-actionbutton-edge-to-visual-only,var(--spectrum-actionbutton-edge-to-visual-only)))*-1)}sp-overlay:not(:defined){display:none}
`,slottable_request_event_dev=__webpack_require__("./packages/overlay/src/slottable-request-event.dev.js"),__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class ActionMenu extends((0,observe_slot_presence_dev.e)((0,observe_slot_text_dev.O)(Picker_dev.C$,"label"),'[slot="label-only"]')){constructor(){super(...arguments),this.selects=void 0,this.listRole="menu",this.itemRole="menuitem",this.handleSlottableRequest=event=>{this.dispatchEvent(new slottable_request_event_dev.W(event.name,event.data))}}static get styles(){return[action_menu_css]}get hasLabel(){return this.slotHasContent}get labelOnly(){return this.slotContentIsPresent}get buttonContent(){return[index_dev.qy`
                ${this.labelOnly?index_dev.qy``:index_dev.qy`
                          <slot
                              name="icon"
                              slot="icon"
                              ?icon-only=${!this.hasLabel}
                              ?hidden=${this.labelOnly}
                          >
                              <sp-icon-more
                                  class="icon"
                                  size=${this.size}
                              ></sp-icon-more>
                          </slot>
                      `}
                <slot name="label" ?hidden=${!this.hasLabel}></slot>
                <slot name="label-only"></slot>
            `]}render(){return this.tooltipEl&&(this.tooltipEl.disabled=this.open),index_dev.qy`
            <sp-action-button
                aria-describedby=${Picker_dev.h5}
                ?quiet=${this.quiet}
                ?selected=${this.open}
                static-color=${(0,directives_dev.JR)(this.staticColor)}
                aria-haspopup="true"
                aria-controls=${(0,directives_dev.JR)(this.open?"menu":void 0)}
                aria-expanded=${this.open?"true":"false"}
                aria-label=${(0,directives_dev.JR)(this.label||void 0)}
                id="button"
                class="button"
                size=${this.size}
                @blur=${this.handleButtonBlur}
                @focus=${this.handleButtonFocus}
                @keydown=${{handleEvent:this.handleEnterKeydown,capture:!0}}
                ?disabled=${this.disabled}
            >
                ${this.buttonContent}
            </sp-action-button>
            <slot
                name="tooltip"
                @slotchange=${this.handleTooltipSlotchange}
            ></slot>
            ${this.renderMenu} ${this.renderDescriptionSlot}
        `}update(changedProperties){changedProperties.has("invalid")&&(this.invalid=!1),super.update(changedProperties)}hasAccessibleLabel(){return!!this.label||!!this.getAttribute("aria-label")||!!this.getAttribute("aria-labelledby")||!!this.appliedLabel||this.hasLabel||this.labelOnly}warnNoLabel(){window.__swc.warn(this,`<${this.localName}> needs one of the following to be accessible:`,"https://opensource.adobe.com/spectrum-web-components/components/action-menu/#accessibility",{type:"accessibility",issues:[`an <sp-field-label> element with a \`for\` attribute referencing the \`id\` of the \`<${this.localName}>\`, or`,'value supplied to the "label" attribute, which will be displayed visually as placeholder text','text content supplied in a <span> with slot="label", or, text content supplied in a <span> with slot="label-only"',"which will also be displayed visually as placeholder text."]})}}__decorateClass([(0,decorators_dev.MZ)({type:String})],ActionMenu.prototype,"selects",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0,attribute:"static-color"})],ActionMenu.prototype,"staticColor",2),__decorateClass([(0,decorators_dev.wk)()],ActionMenu.prototype,"labelOnly",1),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-action-menu",ActionMenu)},"./packages/dialog/sp-dialog-base.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var _src_DialogBase_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/dialog/src/DialogBase.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-dialog-base",_src_DialogBase_dev_js__WEBPACK_IMPORTED_MODULE_0__.u)},"./packages/dialog/stories/dialog-base.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return dialog_base_stories},disabledButton:function(){return disabledButton},fullyCustom:function(){return fullyCustom},lazyLoaded:function(){return lazyLoaded},moreCustom:function(){return moreCustom},notAgain:function(){return notAgain},slotted:function(){return slotted}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=(__webpack_require__("./packages/button/sp-button.dev.js"),__webpack_require__("./packages/checkbox/sp-checkbox.dev.js"),__webpack_require__("./packages/dialog/sp-dialog-base.dev.js"),__webpack_require__("./packages/dialog/sp-dialog.dev.js"),__webpack_require__("./packages/overlay/src/index.dev.js")),dialog_stories=__webpack_require__("./packages/dialog/stories/dialog.stories.js"),stories_images=__webpack_require__("./packages/dialog/stories/images.js");__webpack_require__("./packages/overlay/sp-overlay.dev.js");class CountdownWatcher extends HTMLElement{constructor(){super(...arguments),this.readyPromise=Promise.resolve(!1)}connectedCallback(){this.previousElementSibling.addEventListener("countdown-complete",()=>{this.ready(!0)}),this.readyPromise=new Promise(res=>{this.ready=res})}get updateComplete(){return this.readyPromise}}customElements.define("countdown-complete-watcher",CountdownWatcher);const withOverlayDecorator=story=>index_dev.qy`
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
    `;lazyLoaded.swc_vrt={skip:!0};const __namedExportsOrder=["slotted","disabledButton","notAgain","moreCustom","fullyCustom","lazyLoaded"];slotted.parameters={...slotted.parameters,docs:{...slotted.parameters?.docs,source:{originalSource:'() => html`\n    <sp-dialog-base\n        underlay\n        @click=${event => {\n  if (event.target.localName === "sp-button") {\n    event.target.dispatchEvent(new Event("close", {\n      bubbles: true,\n      composed: true\n    }));\n  }\n}}\n    >\n        ${alertDestructive()}\n    </sp-dialog-base>\n`',...slotted.parameters?.docs?.source}}},disabledButton.parameters={...disabledButton.parameters,docs:{...disabledButton.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-dialog-base\n            underlay\n            @click=${event => {\n    if (event.target.localName === "sp-button") {\n      event.target.dispatchEvent(new Event("close", {\n        bubbles: true,\n        composed: true\n      }));\n    }\n  }}\n            @sp-opened=${({\n    target\n  }) => {\n    let count = 5;\n    const timer = setInterval(() => {\n      count -= 1;\n      if (!count) {\n        document.querySelector("#changing-header").textContent = "The button in this dialog is now enabled";\n        document.querySelector("#changing-button").disabled = false;\n        clearInterval(timer);\n        target.dispatchEvent(new Event("countdown-complete"));\n      }\n      document.querySelector(".time").textContent = count.toString();\n    }, 1e3);\n  }}\n            @close=${() => {\n    document.querySelector("#changing-header").textContent = "The button in this dialog is disabled";\n    document.querySelector("#changing-button").disabled = true;\n    document.querySelector(".time").textContent = "5";\n  }}\n        >\n            <sp-dialog size="s">\n                <h2 slot="heading" id="changing-header">\n                    The button in this dialog is disabled\n                </h2>\n                <p>\n                    After about\n                    <span class="time">5</span>\n                    seconds the button with be enabled.\n                </p>\n                <sp-button disabled slot="button" id="changing-button">\n                    Ok\n                </sp-button>\n            </sp-dialog>\n        </sp-dialog-base>\n    `;\n}',...disabledButton.parameters?.docs?.source}}},notAgain.parameters={...notAgain.parameters,docs:{...notAgain.parameters?.docs,source:{originalSource:'() => html`\n    <sp-dialog-base\n        underlay\n        @click=${event => {\n  if (event.target.localName === "sp-button") {\n    event.target.dispatchEvent(new Event("close", {\n      bubbles: true,\n      composed: true\n    }));\n  }\n}}\n    >\n        <sp-dialog size="s">\n            <h2 slot="heading">A thing is about to happen</h2>\n            <p>Something that might happen a lot is about to happen.</p>\n            <p>\n                The click events for the "OK" button are bound to the story not\n                to the components in specific.\n            </p>\n            <sp-button variant="secondary" treatment="fill" slot="button">\n                Ok\n            </sp-button>\n            <sp-checkbox slot="footer">Don\'t show me this again</sp-checkbox>\n        </sp-dialog>\n    </sp-dialog-base>\n`',...notAgain.parameters?.docs?.source}}},moreCustom.parameters={...moreCustom.parameters,docs:{...moreCustom.parameters?.docs,source:{originalSource:'() => html`\n    <sp-dialog-base\n        underlay\n        @click=${event => {\n  if (event.target.localName === "sp-button") {\n    event.target.dispatchEvent(new Event("close", {\n      bubbles: true,\n      composed: true\n    }));\n  }\n}}\n    >\n        <div style="display: flex;">\n            <div\n                style="\n                display: grid;\n                place-content: center;\n                grid-template-columns: calc(100% - 40px);\n                grid-template-rows: calc(100% - 40px);\n            "\n            >\n                <img\n                    src=${portrait}\n                    alt=""\n                    style="\n                        width: 100%;\n                        height: 100%;\n                        object-fit: contain;\n                        object-placement: center;\n                    "\n                />\n            </div>\n            <sp-dialog size="s">\n                <h2 slot="heading">Look at that image</h2>\n                <p>\n                    Its position has been customized beyond the language of\n                    Spectrum. Be careful with all this power. There\'s no\n                    "mobile" default for delivering content like this.\n                </p>\n                <sp-button variant="accent" treatment="outline" slot="button">\n                    Ok\n                </sp-button>\n            </sp-dialog>\n        </div>\n    </sp-dialog-base>\n`',...moreCustom.parameters?.docs?.source}}},fullyCustom.parameters={...fullyCustom.parameters,docs:{...fullyCustom.parameters?.docs,source:{originalSource:'() => html`\n    <sp-dialog-base\n        underlay\n        @click=${event => {\n  if (event.target.localName === "button") {\n    event.target.dispatchEvent(new Event("close", {\n      bubbles: true,\n      composed: true\n    }));\n  }\n}}\n    >\n        <div id="fully-custom-dialog">\n            <style>\n                #fully-custom-dialog {\n                    margin: 1em;\n                }\n            </style>\n            <h2>Custom headline</h2>\n            <p>\n                The click events for the "Done" button are bound to the story\n                not to the components in specific.\n            </p>\n            <p>\n                This is a demonstration of what is possible with\n                &lt;sp-dialog-base&gt;, only, and should not be seen as an\n                endorsement for fully custom dialog UIs.\n            </p>\n            <p>Fully open content area, for whatever DOM you would like.</p>\n            <button>Done</button>\n        </div>\n    </sp-dialog-base>\n`',...fullyCustom.parameters?.docs?.source}}},lazyLoaded.parameters={...lazyLoaded.parameters,docs:{...lazyLoaded.parameters?.docs,source:{originalSource:'() => {\n  const template = () => html`\n        <sp-dialog-base\n            underlay\n            @click=${event => {\n    if (event.target.localName === "sp-button") {\n      event.target.dispatchEvent(new Event("close", {\n        bubbles: true,\n        composed: true\n      }));\n    }\n  }}\n        >\n            <sp-dialog size="m">\n                <h2 slot="heading">This is a heading</h2>\n                <p>\n                    The click on the "OK" button should close the overlay with\n                    the correct animation (duration).\n                </p>\n                <sp-button variant="secondary" treatment="fill" slot="button">\n                    Ok\n                </sp-button>\n            </sp-dialog>\n        </sp-dialog-base>\n    `;\n  return html`\n        <sp-button\n            variant="primary"\n            ${trigger(template, {\n    open: false,\n    triggerInteraction: "click"\n  })}\n        >\n            Open dialog\n        </sp-button>\n    `;\n}',...lazyLoaded.parameters?.docs?.source}}}},"./packages/icons-workflow/icons/sp-icon-anchor-select.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js"),AnchorSelect=__webpack_require__("./packages/icons-workflow/src/icons/AnchorSelect.js"),DirectSelect=__webpack_require__("./packages/icons-workflow/src/icons-s2/DirectSelect.js");class IconAnchorSelect extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),1===this.spectrumVersion?(0,AnchorSelect.j)({hidden:!this.label,title:this.label}):(0,DirectSelect.j)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-anchor-select",IconAnchorSelect)},"./packages/icons-workflow/icons/sp-icon-more.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var More=__webpack_require__("./packages/icons-workflow/src/icons/More.js");class IconMore extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:r=24,height:l=24,hidden:e=!1,title:c="More"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${l}"
    viewBox="0 0 20 20"
    aria-hidden=${e?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${c}"
  >
    <circle cx="10" cy="10.02114" r="1.5" fill="currentColor" />
    <path
      d="m10,8.5c-.82843,0-1.5.67157-1.5,1.5s.67157,1.5,1.5,1.5,1.5-.67157,1.5-1.5-.67157-1.5-1.5-1.5Z"
      fill="currentColor"
    />
    <circle cx="4" cy="10.02114" r="1.5" fill="currentColor" />
    <circle cx="4" cy="10" r="1.5" fill="currentColor" />
    <circle cx="16" cy="10.02114" r="1.5" fill="currentColor" />
    <circle cx="16" cy="10" r="1.5" fill="currentColor" />
  </svg>`)({hidden:!this.label,title:this.label}):(0,More.Z)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-more",IconMore)},"./packages/icons-workflow/icons/sp-icon-polygon-select.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js"),PolygonSelect=__webpack_require__("./packages/icons-workflow/src/icons/PolygonSelect.js"),DefaultIcon=__webpack_require__("./packages/icons-workflow/src/DefaultIcon.js");class IconPolygonSelect extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),1===this.spectrumVersion?(0,PolygonSelect.y)({hidden:!this.label,title:this.label}):(0,DefaultIcon.$)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-polygon-select",IconPolygonSelect)},"./packages/icons-workflow/icons/sp-icon-rect-select.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js"),RectSelect=__webpack_require__("./packages/icons-workflow/src/icons/RectSelect.js"),SelectRectangle=__webpack_require__("./packages/icons-workflow/src/icons-s2/SelectRectangle.js");class IconRectSelect extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),1===this.spectrumVersion?(0,RectSelect.k)({hidden:!this.label,title:this.label}):(0,SelectRectangle.V)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-rect-select",IconRectSelect)},"./packages/icons-workflow/src/DefaultIcon.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{$:function(){return DefaultIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const DefaultIcon=({width:e=24,height:l=24,hidden:t=!1,title:r="Default"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            role="img"
            fill="currentColor"
            width=${e}
            height=${l}
            aria-hidden=${t?"true":"false"}
            aria-label=${t?void 0:r}
        >
            <path
                d="m10,18.75c-4.82471,0-8.75-3.9248-8.75-8.75S5.17529,1.25,10,1.25s8.75,3.9248,8.75,8.75-3.92529,8.75-8.75,8.75Zm0-16c-3.99756,0-7.25,3.25195-7.25,7.25s3.25244,7.25,7.25,7.25,7.25-3.25195,7.25-7.25-3.25244-7.25-7.25-7.25Z"
                fill="currentColor"
                stroke-width="0"
            ></path>
        </svg>
    `},"./packages/icons-workflow/src/icons-s2/DirectSelect.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{j:function(){return DirectSelectIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const DirectSelectIcon=({width:l=24,height:e=24,hidden:t=!1,title:r="Direct Select"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${l}"
    height="${e}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="m8.75,9.48926c0-1.31616.89508-2.41663,2.10577-2.75696-.01202-.38879-.09631-.76794-.25568-1.11511l3.03748-2.56873c.0141.005.02606.01318.04041.01794.78754.25708,1.63434-.1731,1.89142-.96057s-.17297-1.6344-.96051-1.89148c-.15629-.05099-.3149-.07493-.47079-.07439-.62962.00219-1.21457.40376-1.42063,1.03496-.07922.2428-.0863.48962-.04462.72461l-3.03973,2.57068c-.22217-.15405-.46094-.28906-.73108-.3772-1.49628-.48828-3.10516.32861-3.59357,1.82495-.23456.71851-.16168,1.46021.13654,2.09399l-3.23639,2.73706c-.00464-.00159-.00848-.00427-.01312-.00586-.78754-.25708-1.63434.1731-1.89142.96057-.05551.17003-.07898.34282-.07374.51185.01903.61385.41675,1.17805,1.03425,1.37962.78754.25696,1.63434-.1731,1.89142-.96057.0827-.2533.08759-.51111.03906-.75513l3.22845-2.73022c.21661.14709.44836.27673.70978.36194.54419.17773,1.10211.17847,1.6167.04077v-.06274Z"
      fill="currentColor"
    />
    <path
      d="m11.62598,18.95518c-.2085,0-.41895-.04004-.62012-.12305-.61084-.25146-1.00586-.84131-1.00586-1.50195v-7.68018c0-.65869.39307-1.24756,1.00146-1.5.6084-.25293,1.30176-.11572,1.76953.34961l5.25,5.23486c.4668.46582.60596,1.16064.354,1.77051s-.84082,1.00391-1.50098,1.00391h-2.09766l-1.99854,1.96436c-.31201.31494-.72754.48193-1.15186.48193Zm.00342-9.43164c-.01514,0-.03271.00342-.05273.01172-.07666.03174-.07666.09229-.07666.11475v7.68018c0,.02295,0,.08301.07666.11475.07861.03271.12061-.01123.13574-.02734l1.91016-1.92773c.30273-.30566.72363-.48985,1.15381-.48985h2.09766c.02295,0,.08301.00889.11475-.06777s-.01074-.11914-.02686-.13525l-5.25049-5.23486c-.01172-.01221-.03809-.03857-.08203-.03857Z"
      fill="currentColor"
    />
  </svg>`},"./packages/icons-workflow/src/icons-s2/SelectRectangle.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{V:function(){return SelectRectangleIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const SelectRectangleIcon=({width:l=24,height:r=24,hidden:t=!1,title:c="Select Rectangle"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${l}"
    height="${r}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${c}"
  >
    <path
      d="m4.25,2c-1.24072,0-2.25,1.00928-2.25,2.25,0,.41406.33594.75.75.75s.75-.33594.75-.75c0-.41357.33643-.75.75-.75.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
      fill="currentColor"
    />
    <path
      d="m8.5,16.5h-1.25c-.41406,0-.75.33594-.75.75s.33594.75.75.75h1.25c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
      fill="currentColor"
    />
    <path
      d="m15.75,3.5c.41357,0,.75.33643.75.75,0,.41406.33594.75.75.75s.75-.33594.75-.75c0-1.24072-1.00928-2.25-2.25-2.25-.41406,0-.75.33594-.75.75s.33594.75.75.75Z"
      fill="currentColor"
    />
    <path
      d="m2.75,13.5c.41406,0,.75-.33594.75-.75v-1.25c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v1.25c0,.41406.33594.75.75.75Z"
      fill="currentColor"
    />
    <path
      d="m2.75,9.25c.41406,0,.75-.33594.75-.75v-1.25c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v1.25c0,.41406.33594.75.75.75Z"
      fill="currentColor"
    />
    <path
      d="m4.25,16.5c-.41357,0-.75-.33643-.75-.75,0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75c0,1.24072,1.00928,2.25,2.25,2.25.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
      fill="currentColor"
    />
    <path
      d="m8.5,2h-1.25c-.41406,0-.75.33594-.75.75s.33594.75.75.75h1.25c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
      fill="currentColor"
    />
    <path
      d="m17.25,15c-.41406,0-.75.33594-.75.75,0,.41357-.33643.75-.75.75-.41406,0-.75.33594-.75.75s.33594.75.75.75c1.24072,0,2.25-1.00928,2.25-2.25,0-.41406-.33594-.75-.75-.75Z"
      fill="currentColor"
    />
    <path
      d="m17.25,6.5c-.41406,0-.75.33594-.75.75v1.25c0,.41406.33594.75.75.75s.75-.33594.75-.75v-1.25c0-.41406-.33594-.75-.75-.75Z"
      fill="currentColor"
    />
    <path
      d="m17.25,10.75c-.41406,0-.75.33594-.75.75v1.25c0,.41406.33594.75.75.75s.75-.33594.75-.75v-1.25c0-.41406-.33594-.75-.75-.75Z"
      fill="currentColor"
    />
    <path
      d="m12.75,2h-1.25c-.41406,0-.75.33594-.75.75s.33594.75.75.75h1.25c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
      fill="currentColor"
    />
    <path
      d="m12.75,16.5h-1.25c-.41406,0-.75.33594-.75.75s.33594.75.75.75h1.25c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
      fill="currentColor"
    />
  </svg>`},"./packages/icons-workflow/src/icons/AnchorSelect.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{j:function(){return AnchorSelectIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const AnchorSelectIcon=({width:e=24,height:t=24,hidden:a=!1,title:l="Anchor Select"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${t}"
    viewBox="0 0 36 36"
    width="${e}"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path
      d="m10 6 18 18H18l-8 8ZM8.5 2.054a.5.5 0 0 0-.5.5v32.78a.5.5 0 0 0 .5.5.49.49 0 0 0 .35-.147L18.524 26h13a.5.5 0 0 0 .354-.854L8.854 2.2a.49.49 0 0 0-.354-.146Z"
    />
  </svg>`},"./packages/icons-workflow/src/icons/More.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return MoreIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const MoreIcon=({width:e=24,height:r=24,hidden:t=!1,title:l="More"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${e}"
    height="${r}"
    viewBox="0 0 36 36"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <circle cx="17.8" cy="18.2" r="3.4" />
    <circle cx="29.5" cy="18.2" r="3.4" />
    <circle cx="6.1" cy="18.2" r="3.4" />
  </svg>`},"./packages/icons-workflow/src/icons/PolygonSelect.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{y:function(){return PolygonSelectIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const PolygonSelectIcon=({width:a=24,height:e=24,hidden:l=!1,title:t="Polygon Select"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${a}"
    aria-hidden=${l?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${t}"
  >
    <path
      d="m30.455 1.829-10.174 6.62L2.665 5.513a1 1 0 0 0-1.073 1.405l6.683 14.507a5.406 5.406 0 0 0-.475 1.944c0 2.737 2.731 4.956 6.1 4.956a7.238 7.238 0 0 0 .915-.075A6.578 6.578 0 0 1 16.1 30.1a2.427 2.427 0 0 1-.237 2.115 5.312 5.312 0 0 1-3.224 1.666.5.5 0 0 0-.413.541l.1 1a.5.5 0 0 0 .579.445c1.055-.186 3.409-.782 4.6-2.505a4.367 4.367 0 0 0 .527-3.779 5.812 5.812 0 0 0-1.117-1.928c.85-.372 3.021-2.093 3.021-3.7l11.319-2.987A1 1 0 0 0 32 20V2.667a1 1 0 0 0-1.545-.838ZM9.8 23.369a2.953 2.953 0 0 1 1.972-2.5 6.41 6.41 0 0 0-.142 3.063 6.544 6.544 0 0 0 1.444 2.331c-1.842-.286-3.274-1.495-3.274-2.894Zm5.751 2.691-.007-.008a10.672 10.672 0 0 1-1.975-2.608 5.8 5.8 0 0 1 .449-3.024c2.17.048 3.984 1.374 3.984 2.949a3.146 3.146 0 0 1-2.451 2.691ZM30 19.229l-10.259 2.708a6.079 6.079 0 0 0-5.84-3.525 6.8 6.8 0 0 0-4.178 1.377L4.2 7.8l16.137 2.69a1 1 0 0 0 .71-.149L30 4.511Z"
    />
  </svg>`},"./packages/icons-workflow/src/icons/RectSelect.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{k:function(){return RectSelectIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const RectSelectIcon=({width:e=24,height:h=24,hidden:t=!1,title:v="Rect Select"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${h}"
    viewBox="0 0 36 36"
    width="${e}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${v}"
  >
    <path
      d="M10 4h6v2h-6zM20 4h6v2h-6zM3 4a1 1 0 0 0-1 1v3h2V6h2V4ZM2 12h2v4H2zM2 20h2v4H2zM4 30v-2H2v3a1 1 0 0 0 1 1h3v-2ZM10 30h6v2h-6zM20 30h6v2h-6zM30 4v2h2v2h2V5a1 1 0 0 0-1-1ZM32 12h2v4h-2zM32 20h2v4h-2zM32 28v2h-2v2h3a1 1 0 0 0 1-1v-3Z"
    />
  </svg>`},"./packages/link/sp-link.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),like_anchor_dev=__webpack_require__("./tools/shared/src/like-anchor.dev.js"),focusable_dev=__webpack_require__("./tools/shared/src/focusable.dev.js");var link_css=__webpack_require__("./tools/base/src/index.dev.js").AH`
            /*!
 * Copyright 2025 Adobe. All rights reserved. This file is licensed to you under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License./
 * 
 *  Override divider background color when used inside alert-dialog/
 * .divider {
 *     --spectrum-divider-background-color: var(--system-alert-dialog-divider-background-color);
 *     --spectrum-divider-background-color-static-white: var(--spectrum-alert-dialog-divider-background-color-static-white);
 *     --spectrum-divider-background-color-static-black: var(--spectrum-alert-dialog-divider-background-color-static-black);
 * }
 */
@media (forced-colors:active){:host{--highcontrast-link-text-color:LinkText}}:host([variant=secondary]) a{--mod-link-text-color:var(--mod-link-text-color-secondary-default,var(--spectrum-neutral-content-color-default));--mod-link-text-color-hover:var(--mod-link-text-color-secondary-hover,var(--spectrum-neutral-content-color-hover));--mod-link-text-color-active:var(--mod-link-text-color-secondary-active,var(--spectrum-neutral-content-color-down));--mod-link-text-color-focus:var(--mod-link-text-color-secondary-focus,var(--spectrum-neutral-content-color-key-focus))}a{background-color:initial;text-decoration-skip:objects;transition:color var(--mod-link-animation-duration,var(--spectrum-animation-duration-100))ease-in-out;cursor:pointer;color:var(--highcontrast-link-text-color,var(--mod-link-text-color,var(--mod-link-text-color-primary-default,var(--spectrum-accent-content-color-default))));outline:none;text-decoration:underline}a:active{--mod-link-text-color:var(--mod-link-text-color-active,var(--mod-link-text-color-primary-active,var(--spectrum-accent-content-color-down)))}:host([quiet]) a{text-decoration:none}a:focus-visible,:host([quiet]) a:focus-visible{--mod-link-text-color:var(--mod-link-text-color-focus,var(--mod-link-text-color-primary-focus,var(--spectrum-accent-content-color-key-focus)));text-decoration:underline double;text-decoration-color:inherit}@media (hover:hover){a:hover{--mod-link-text-color:var(--mod-link-text-color-hover,var(--mod-link-text-color-primary-hover,var(--spectrum-accent-content-color-hover)))}:host([quiet]) a:hover{text-decoration:underline}}:host([static-color=white]) a{--mod-link-text-color:var(--mod-link-text-color-white,var(--spectrum-white));--mod-link-text-color-hover:var(--mod-link-text-color-white,var(--spectrum-white));--mod-link-text-color-active:var(--mod-link-text-color-white,var(--spectrum-white));--mod-link-text-color-focus:var(--mod-link-text-color-white,var(--spectrum-white))}:host([static-color=black]) a{--mod-link-text-color:var(--mod-link-text-color-black,var(--spectrum-black));--mod-link-text-color-hover:var(--mod-link-text-color-black,var(--spectrum-black));--mod-link-text-color-active:var(--mod-link-text-color-black,var(--spectrum-black));--mod-link-text-color-focus:var(--mod-link-text-color-black,var(--spectrum-black))}:host{display:inline}:host(:focus){outline:none}:host([href]) a:focus-visible{text-decoration:underline double}:host([disabled]){pointer-events:none}
        `,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class Link extends((0,like_anchor_dev.$)(focusable_dev.z)){constructor(){super(...arguments),this.quiet=!1}static get styles(){return[link_css]}get focusElement(){return this.anchorElement}render(){return this.renderAnchor({id:"anchor"})}}__decorateClass([(0,decorators_dev.P)("#anchor")],Link.prototype,"anchorElement",2),__decorateClass([(0,decorators_dev.MZ)({type:String,reflect:!0})],Link.prototype,"variant",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0,attribute:"static-color"})],Link.prototype,"staticColor",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0,attribute:"quiet"})],Link.prototype,"quiet",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-link",Link)},"./packages/menu/sp-menu-group.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),random_id_dev=__webpack_require__("./tools/shared/src/random-id.dev.js"),Menu_dev=__webpack_require__("./packages/menu/src/Menu.dev.js");__webpack_require__("./packages/menu/sp-menu.dev.js");var menu_group_css=index_dev.AH`
    .spectrum-Menu-back:focus-visible{box-shadow:var(--spectrum-menu-item-focus-indicator-shadow)var(--spectrum-menu-item-focus-indicator-border-width)0 0 0 var(--spectrum-menu-item-focus-indicator-color-default);outline:var(--spectrum-menu-item-focus-indicator-width)var(--spectrum-menu-item-focus-indicator-outline-style)var(--spectrum-menu-item-focus-indicator-color-default);outline-offset:var(--spectrum-menu-item-focus-indicator-offset);border-radius:var(--spectrum-menu-item-corner-radius)}.header{color:var(--highcontrast-menu-item-color-default,var(--mod-menu-section-header-color,var(--spectrum-menu-section-header-color)));font-size:var(--mod-menu-section-header-font-size,var(--spectrum-menu-section-header-font-size));font-weight:var(--mod-menu-section-header-font-weight,var(--spectrum-menu-section-header-font-weight));line-height:var(--mod-menu-section-header-line-height,var(--spectrum-menu-section-header-line-height));min-inline-size:var(--mod-menu-section-header-min-width,var(--spectrum-menu-section-header-min-width));padding-block-start:var(--mod-menu-section-header-top-edge-to-text,var(--mod-menu-item-top-edge-to-text,var(--spectrum-menu-item-top-edge-to-text)));padding-block-end:var(--mod-menu-section-header-bottom-edge-to-text,var(--mod-menu-item-bottom-edge-to-text,var(--spectrum-menu-item-bottom-edge-to-text)));padding-inline:var(--mod-menu-item-label-inline-edge-to-content,var(--spectrum-menu-item-label-inline-edge-to-content));grid-area:sectionHeadingArea/1/sectionHeadingArea/-1;display:block}.spectrum-Menu-back{padding-inline:var(--mod-menu-back-padding-inline-start,0)var(--mod-menu-back-padding-inline-end,var(--spectrum-menu-item-label-inline-edge-to-content));padding-block:var(--mod-menu-back-padding-block-start,0)var(--mod-menu-back-padding-block-end,0);flex-flow:wrap;align-items:center;display:flex}.spectrum-Menu-back .header{padding:0}.spectrum-Menu-backButton{cursor:pointer;background:0 0;border:0;margin:0;padding:0;display:inline-flex}.spectrum-Menu-backButton:focus-visible{outline:var(--spectrum-focus-indicator-thickness)solid var(--spectrum-focus-indicator-color);outline-offset:calc((var(--spectrum-focus-indicator-thickness) + 1px)*-1)}.spectrum-Menu-backHeading{color:var(--highcontrast-menu-item-color-default,var(--mod-menu-back-heading-color,var(--spectrum-menu-section-header-color)));font-size:var(--mod-menu-section-header-font-size,var(--spectrum-menu-section-header-font-size));font-weight:var(--mod-menu-section-header-font-weight,var(--spectrum-menu-section-header-font-weight));line-height:var(--mod-menu-section-header-line-height,var(--spectrum-menu-section-header-line-height));display:block}:host{flex-direction:column;margin:0;display:flex;overflow:visible}[hidden]{display:none!important}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class MenuGroup extends Menu_dev.W{constructor(){super(...arguments),this.headerId=""}static get styles(){return[...super.styles,menu_group_css]}get ownRole(){return"group"}get controlsRovingTabindex(){return!1}updateLabel(){const headerElement=this.headerElements.length?this.headerElements[0]:void 0;if(headerElement!==this.headerElement)if(this.headerElement&&this.headerElement.id===this.headerId&&this.headerElement.removeAttribute("id"),headerElement){this.headerId=this.headerId||`sp-menu-group-label-${(0,random_id_dev.l)()}`;const headerId=headerElement.id||this.headerId;headerElement.id||(headerElement.id=headerId),this.setAttribute("aria-labelledby",headerId)}else this.removeAttribute("aria-labelledby");this.headerElement=headerElement}render(){return index_dev.qy`
            <span class="header" ?hidden=${!this.headerElement}>
                <slot name="header" @slotchange=${this.updateLabel}></slot>
            </span>
            ${this.renderMenuItemSlot()}
        `}}__decorateClass([(0,decorators_dev.gZ)({slot:"header",flatten:!0})],MenuGroup.prototype,"headerElements",2),__decorateClass([(0,decorators_dev.wk)()],MenuGroup.prototype,"headerElement",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-menu-group",MenuGroup)},"./packages/overlay/stories/overlay-element.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:function(){return __namedExportsOrder},actionGroup:function(){return actionGroup},actionGroupWithFilters:function(){return actionGroupWithFilters},all:function(){return overlay_element_stories_all},click:function(){return click},complexSlowPage:function(){return complexSlowPage},contained:function(){return contained},default:function(){return overlay_element_stories},hover:function(){return hover},hoverTooltip:function(){return hoverTooltip},lazyElements:function(){return lazyElements},longpress:function(){return longpress},modal:function(){return modal},nestedModalOverlays:function(){return nestedModalOverlays},page:function(){return page},receivesFocus:function(){return receivesFocus},transformed:function(){return transformed},transientHover:function(){return transientHover},withSlider:function(){return withSlider}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),dialog_base_stories=(__webpack_require__("./packages/dialog/sp-dialog.dev.js"),__webpack_require__("./packages/dialog/sp-dialog-wrapper.dev.js"),__webpack_require__("./packages/overlay/sp-overlay.dev.js"),__webpack_require__("./packages/action-button/sp-action-button.dev.js"),__webpack_require__("./packages/action-menu/sp-action-menu.dev.js"),__webpack_require__("./packages/action-group/sp-action-group.dev.js"),__webpack_require__("./packages/popover/sp-popover.dev.js"),__webpack_require__("./packages/menu/sp-menu-group.dev.js"),__webpack_require__("./packages/menu/sp-menu-item.dev.js"),__webpack_require__("./packages/menu/sp-menu-divider.dev.js"),__webpack_require__("./packages/link/sp-link.dev.js"),__webpack_require__("./packages/tooltip/sp-tooltip.dev.js"),__webpack_require__("./packages/slider/sp-slider.dev.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-anchor-select.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-polygon-select.js"),__webpack_require__("./packages/textfield/sp-textfield.dev.js"),__webpack_require__("./packages/field-label/sp-field-label.dev.js"),__webpack_require__("./packages/table/sp-table.dev.js"),__webpack_require__("./packages/table/sp-table-checkbox-cell.dev.js"),__webpack_require__("./packages/table/sp-table-head.dev.js"),__webpack_require__("./packages/table/sp-table-head-cell.dev.js"),__webpack_require__("./packages/table/sp-table-body.dev.js"),__webpack_require__("./packages/table/sp-table-row.dev.js"),__webpack_require__("./packages/table/sp-table-cell.dev.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-rect-select.js"),__webpack_require__("./packages/dialog/stories/dialog-base.stories.js"));__webpack_require__("./packages/overlay/stories/overlay-story-components.js");Event;const removeSlottableRequest=Symbol("remove-slottable-request");var overlay_element_stories={title:"Overlay Element",component:"sp-overlay",args:{open:!0,delayed:!1},argTypes:{open:{name:"open",type:{name:"boolean",required:!1},description:"Whether the second accordion item is open.",table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},delayed:{name:"delayed",type:{name:"boolean",required:!1},description:"Whether the tooltips are delayed.",table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}}}};const Template=({interaction:interaction,open:open,placement:placement,type:type,delayed:delayed,style:style})=>index_dev.qy`
    ${"will-change"===style?index_dev.qy`
              <style>
                  .wrapper {
                      will-change: transform;
                  }
              </style>
          `:index_dev.qy`
              <style>
                  .wrapper {
                      container-type: size;
                  }
              </style>
          `}
    <div class="wrapper">
        <sp-action-button id="trigger">Open the overlay</sp-action-button>
        <sp-overlay
            ?open=${open}
            trigger="trigger@${interaction}"
            type=${(0,directives_dev.JR)(type)}
            placement=${(0,directives_dev.JR)(placement)}
            offset="-10"
        >
            <sp-popover ?delayed=${delayed}>
                <sp-dialog size="s" no-divider>
                    <p>
                        Content goes here.
                        ${"modal"===type||"page"===type?index_dev.qy`
                                  Or, a link,
                                  <sp-link
                                      href="https://opensource.adobe.com/spectrum-web-components"
                                  >
                                      Spectrum Web Components
                                  </sp-link>
                                  .
                              `:""}
                    </p>
                </sp-dialog>
            </sp-popover>
        </sp-overlay>
    </div>
`,modal=args=>Template(args);modal.args={interaction:"click",placement:"right",style:"will-change",type:"modal"};const page=({interaction:interaction,open:open,placement:placement,type:type})=>index_dev.qy`
    <sp-action-button id="trigger">Open the overlay</sp-action-button>
    <sp-overlay
        ?open=${open}
        trigger="trigger@${interaction}"
        type=${(0,directives_dev.JR)(type)}
        placement=${(0,directives_dev.JR)(placement)}
    >
        ${(0,dialog_base_stories.notAgain)()}
    </sp-overlay>
`;page.args={interaction:"click",placement:"right",type:"page"};const complexSlowPage=()=>index_dev.qy`
    <div style="padding: 20px;">

            <p>
                This is a complex slow page. It has a lot of content. Even with a lot of content on the page,
                the overlay should still be able to open and close without extreme delay.
            </p>

            <div
                style="display: flex; flex-direction: column; align-items: center; justify-content: center;"
            >
                <sp-button style="margin: 20px;" id="trigger">
                    open modal
                </sp-button>
                <sp-overlay trigger="trigger@click" type="modal">
                    <sp-dialog-wrapper headline="Signin form" dismissable underlay>
                        <p>I am a modal type overlay.</p>
                        <sp-field-label>Enter your email</sp-field-label>
                        <sp-textfield placeholder="test@gmail.com"></sp-textfield>
                        <sp-action-button
                            onClick="
                                this.dispatchEvent(
                                    new Event('close', {
                                        bubbles: true,
                                        composed: true,
                                    })
                                );
                            "
                        >
                            Sign in
                        </sp-action-button>
                    </sp-dialog-wrapper>
                </sp-overlay>

                <sp-button id="pageTrigger" style="margin: 20px;">open page</sp-button>
                <sp-overlay trigger="pageTrigger@click" type="page">
                    <sp-dialog-wrapper
                        headline="Full screen menu"
                        mode="fullscreenTakeover"
                        cancel-label="Close"
                    >
                        <p>I am a page type overlay.</p>
                    </sp-dialog-wrapper>
                </sp-overlay>
                <style>
                    .chat-container {
                        position: fixed;
                        bottom: 1em;
                        left: 1em;
                    }
                </style>

                <sp-button id="manualTrigger" style="margin: 20px;">open manual</sp-button>
                <sp-overlay trigger="manualTrigger@click" type="manual">
                    <sp-popover class="chat-container">
                        <sp-dialog dismissable>
                            <span slot="heading">Chat Window</span>
                            <sp-textfield
                                placeholder="Enter your message"
                            ></sp-textfield>
                            <sp-action-button>Send</sp-action-button>
                        </sp-dialog>
                    </sp-popover>
                </sp-overlay>

            </div>
        </span>

        ${Array(30).fill(0).map(()=>index_dev.qy`
                    <div style="margin-bottom: 20px;">
                        <sp-table>
                            <sp-table-head>
                                <sp-table-head-cell>
                                    Column Title
                                </sp-table-head-cell>
                                <sp-table-head-cell>
                                    Column Title
                                </sp-table-head-cell>
                                <sp-table-head-cell>
                                    Column Title
                                </sp-table-head-cell>
                            </sp-table-head>
                            <sp-table-body style="height: 200px">
                                <sp-table-row value="row1" class="row1">
                                    <sp-table-cell>
                                        Row Item Alpha
                                    </sp-table-cell>
                                    <sp-table-cell>
                                        Row Item Alpha
                                    </sp-table-cell>
                                    <sp-table-cell>
                                        Row Item Alpha
                                    </sp-table-cell>
                                </sp-table-row>
                                <sp-table-row value="row2" class="row2">
                                    <sp-table-cell>
                                        Row Item Bravo
                                    </sp-table-cell>
                                    <sp-table-cell>
                                        Row Item Bravo
                                    </sp-table-cell>
                                    <sp-table-cell>
                                        Row Item Bravo
                                    </sp-table-cell>
                                </sp-table-row>
                                <sp-table-row value="row3" class="row3">
                                    <sp-table-cell>
                                        Row Item Charlie
                                    </sp-table-cell>
                                    <sp-table-cell>
                                        Row Item Charlie
                                    </sp-table-cell>
                                    <sp-table-cell>
                                        Row Item Charlie
                                    </sp-table-cell>
                                </sp-table-row>
                                <sp-table-row value="row4" class="row4">
                                    <sp-table-cell>
                                        Row Item Delta
                                    </sp-table-cell>
                                    <sp-table-cell>
                                        Row Item Delta
                                    </sp-table-cell>
                                    <sp-table-cell>
                                        Row Item Delta
                                    </sp-table-cell>
                                </sp-table-row>
                                <sp-table-row value="row5" class="row5">
                                    <sp-table-cell>Row Item Echo</sp-table-cell>
                                    <sp-table-cell>Row Item Echo</sp-table-cell>
                                    <sp-table-cell>Row Item Echo</sp-table-cell>
                                </sp-table-row>
                            </sp-table-body>
                        </sp-table>
                        <sp-action-group>
                            <sp-action-button>
                                <sp-icon-anchor-select
                                    slot="icon"
                                ></sp-icon-anchor-select>
                            </sp-action-button>
                            <sp-action-button>
                                <sp-icon-polygon-select
                                    slot="icon"
                                ></sp-icon-polygon-select>
                            </sp-action-button>
                            <sp-slider
                                value="5"
                                step="0.5"
                                min="0"
                                max="20"
                                label="Control"
                            ></sp-slider>
                        </sp-action-group>
                        <sp-menu-group>
                            <span slot="header">Menu Group</span>
                            <sp-menu-item>Option 1</sp-menu-item>
                            <sp-menu-item>Option 2</sp-menu-item>
                            <sp-menu-divider></sp-menu-divider>
                            <sp-menu-item>Option 3</sp-menu-item>
                        </sp-menu-group>
                    </div>
                `)}
    </div>
`;complexSlowPage.swc_vrt={skip:!0},complexSlowPage.parameters={chromatic:{disableSnapshot:!0}};const click=args=>Template(args);click.args={interaction:"click",placement:"right",style:"container-type",type:"auto"};const withSlider=()=>index_dev.qy`
    <sp-button id="triggerEl" variant="primary">Button popover</sp-button>
    <sp-overlay trigger="triggerEl@click" placement="bottom">
        <sp-popover tip>
            <sp-dialog no-divider class="options-popover-content">
                <p>Try clicking the slider after popover opens</p>
                <p>It shouldn't close the popover</p>
                <sp-slider
                    value="5"
                    step="0.5"
                    min="0"
                    max="20"
                    label="Awesomeness"
                ></sp-slider>
                <sp-button>Press me</sp-button>
            </sp-dialog>
        </sp-popover>
    </sp-overlay>
`;withSlider.swc_vrt={skip:!0},withSlider.parameters={chromatic:{disableSnapshot:!0}};const hover=args=>Template(args);hover.args={interaction:"hover",placement:"right",style:"will-change"};const hoverTooltip=({interaction:interaction,open:open,placement:placement,type:type})=>index_dev.qy`
    <style>
        .wrapper {
            will-change: transform;
        }
    </style>
    <div class="wrapper">
        <sp-action-button id="trigger">Open the overlay</sp-action-button>
        <sp-overlay
            ?open=${open}
            trigger="trigger@${interaction}"
            type=${(0,directives_dev.JR)(type)}
            placement=${(0,directives_dev.JR)(placement)}
            offset="-10"
        >
            <sp-tooltip>Tooltip goes here.</sp-tooltip>
        </sp-overlay>
    </div>
`;hoverTooltip.args={interaction:"hover",placement:"right"};const longpress=args=>Template(args);longpress.args={interaction:"longpress",placement:"right",style:"container-type",type:"auto"};const receivesFocus=({interaction:interaction,open:open,placement:placement,receivesFocus:receivesFocus2,type:type})=>index_dev.qy`
    <sp-action-button id="trigger">
        Open the overlay (with focus)
    </sp-action-button>
    <sp-overlay
        ?open=${open}
        trigger="trigger@${interaction}"
        type=${(0,directives_dev.JR)(type)}
        placement=${(0,directives_dev.JR)(placement)}
        .receivesFocus=${receivesFocus2}
    >
        <sp-popover>
            <sp-dialog size="s" no-divider>
                <a href="https://example.com">Click Content</a>
            </sp-dialog>
        </sp-popover>
    </sp-overlay>
`;receivesFocus.args={interaction:"click",placement:"bottom-start",type:"auto",receivesFocus:"true"};const transformed=args=>index_dev.qy`
    <style>
        .transformed {
            transform: translateX(-50%);
            position: absolute;
            inset: auto;
            inset-inline-start: 200px;
            inset-block-start: 200px;
            inline-size: 100px;
            block-size: 50px;
        }
    </style>
    <div class="transformed">${Template(args)}</div>
`;transformed.args={interaction:"click",placement:"right",type:"auto"};const contained=args=>index_dev.qy`
    <style>
        .contained {
            contain: strict;
            position: absolute;
            inset: auto;
            inset-inline-start: 200px;
            inset-block-start: 200px;
            inline-size: 200px;
            block-size: 50px;
            padding-block: 75px;
            padding-inline-start: 300px;
        }
    </style>
    <div class="contained">${Template(args)}</div>
`;contained.args={interaction:"click",placement:"right",type:"auto"};const overlay_element_stories_all=({delayed:delayed})=>index_dev.qy`
    <sp-action-button id="trigger" hold-affordance>
        Open the overlay
    </sp-action-button>
    <sp-overlay trigger="trigger@click" type="auto" placement="right">
        <sp-popover>
            <sp-dialog size="s" no-divider>Click content</sp-dialog>
        </sp-popover>
    </sp-overlay>
    <sp-overlay ?delayed=${delayed} trigger="trigger@hover" type="hint">
        <sp-tooltip>Hover content</sp-tooltip>
    </sp-overlay>
    <sp-overlay trigger="trigger@longpress" type="auto" placement="right">
        <sp-popover>
            <sp-dialog size="s" no-divider>Longpress content</sp-dialog>
        </sp-popover>
    </sp-overlay>
`,actionGroup=({delayed:delayed})=>{const popoverOffset=[6,-13];return index_dev.qy`
        <style>
            sp-popover sp-action-group {
                padding: calc(
                        var(--spectrum-actiongroup-vertical-spacing-regular) *
                            0.75
                    )
                    calc(
                        var(--spectrum-actiongroup-vertical-spacing-regular) / 2
                    );
            }
            .root {
                inset-inline-end: 0em;
                inset-block-start: 3em;
                padding-block-end: 3em;
            }
            .root > sp-action-group > sp-action-button,
            .root > sp-action-group > sp-action-menu {
                top: 3em;
                position: relative;
            }
        </style>
        <sp-popover open class="root">
            <sp-action-group vertical quiet emphasized selects="single">
                <sp-action-button id="trigger-1" hold-affordance>
                    <sp-icon-anchor-select slot="icon"></sp-icon-anchor-select>
                </sp-action-button>
                <sp-action-button id="trigger-2" hold-affordance>
                    <sp-icon-polygon-select
                        slot="icon"
                    ></sp-icon-polygon-select>
                </sp-action-button>
                <sp-action-button id="trigger-3" hold-affordance>
                    <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                </sp-action-button>
                <sp-action-menu label="More Actions" placement="left">
                    <sp-menu-group id="cms">
                        <span slot="header">cms</span>
                        <sp-menu-item value="updateAllSiteContent">
                            Update All Content
                        </sp-menu-item>
                        <sp-menu-item value="refreshAllXDs">
                            Refresh All XDs
                        </sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-group id="ssg">
                        <span slot="header">ssg</span>
                        <sp-menu-item value="clearCache">
                            Clear Cache
                        </sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-group id="vrt">
                        <span slot="header">vrt</span>
                        <sp-menu-item value="vrt-contributions">
                            Contributions
                        </sp-menu-item>
                        <sp-menu-item value="vrt-internal">
                            Internal
                        </sp-menu-item>
                        <sp-menu-item value="vrt-public">Public</sp-menu-item>
                        <sp-menu-item value="vrt-patterns">
                            Patterns
                        </sp-menu-item>
                        <sp-menu-item value="vrt">All</sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-group id="misc">
                        <sp-menu-item value="logout">Logout</sp-menu-item>
                    </sp-menu-group>
                </sp-action-menu>
            </sp-action-group>
        </sp-popover>
        <sp-overlay ?delayed=${delayed} trigger="trigger-1@hover" type="hint">
            <sp-tooltip>Hover</sp-tooltip>
        </sp-overlay>
        <sp-overlay
            trigger="trigger-1@longpress"
            type="auto"
            placement="right-start"
            .offset=${popoverOffset}
        >
            <sp-popover tip>
                <sp-action-group vertical quiet>
                    <sp-action-button>
                        <sp-icon-anchor-select
                            slot="icon"
                        ></sp-icon-anchor-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-polygon-select
                            slot="icon"
                        ></sp-icon-polygon-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                    </sp-action-button>
                </sp-action-group>
            </sp-popover>
        </sp-overlay>
        <sp-overlay ?delayed=${delayed} trigger="trigger-2@hover" type="hint">
            <sp-tooltip>Hover</sp-tooltip>
        </sp-overlay>
        <sp-overlay
            trigger="trigger-2@longpress"
            type="auto"
            placement="right-start"
            .offset=${popoverOffset}
        >
            <sp-popover tip>
                <sp-action-group vertical quiet>
                    <sp-action-button>
                        <sp-icon-anchor-select
                            slot="icon"
                        ></sp-icon-anchor-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-polygon-select
                            slot="icon"
                        ></sp-icon-polygon-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                    </sp-action-button>
                </sp-action-group>
            </sp-popover>
        </sp-overlay>
        <sp-overlay
            ?delayed=${delayed}
            trigger="trigger-3@hover"
            type="hint"
            open
        >
            <sp-tooltip>Hover</sp-tooltip>
        </sp-overlay>
        <sp-overlay
            trigger="trigger-3@longpress"
            type="auto"
            placement="right-start"
            .offset=${popoverOffset}
        >
            <sp-popover tip>
                <sp-action-group vertical quiet>
                    <sp-action-button>
                        <sp-icon-anchor-select
                            slot="icon"
                        ></sp-icon-anchor-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-polygon-select
                            slot="icon"
                        ></sp-icon-polygon-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                    </sp-action-button>
                </sp-action-group>
            </sp-popover>
        </sp-overlay>
    `},actionGroupWithFilters=({delayed:delayed})=>{const popoverOffset=[6,-13];return index_dev.qy`
        <style>
            sp-popover sp-action-group {
                padding: calc(
                        var(--spectrum-actiongroup-vertical-spacing-regular) *
                            0.75
                    )
                    calc(
                        var(--spectrum-actiongroup-vertical-spacing-regular) / 2
                    );
            }
            .root {
                inset-inline-end: 0em;
                inset-block-start: 3em;
                padding-block-end: 3em;
                overflow: hidden;
            }
            .root > sp-action-group > sp-action-button,
            .root > sp-action-group > sp-action-menu {
                top: 3em;
                position: relative;
            }
            sp-action-button,
            sp-action-menu {
                background-image: linear-gradient(
                    rgba(125, 125, 125, 0.2),
                    rgba(125, 125, 125, 0.2)
                );
                background-blend-mode: multiply;
                filter: brightness(1) saturate(1);
            }
        </style>
        <p>
            This story outlines some CSS usage that is not yet covered by the
            placement calculations within the Overlay API.
        </p>
        <sp-popover open class="root">
            <sp-action-group vertical quiet emphasized selects="single">
                <sp-action-button id="trigger-1" hold-affordance>
                    <sp-icon-anchor-select slot="icon"></sp-icon-anchor-select>
                    <sp-tooltip ?delayed=${delayed} self-managed>
                        Hover
                    </sp-tooltip>
                    <sp-overlay
                        trigger="trigger-1@longpress"
                        type="auto"
                        placement="right-start"
                        .offset=${popoverOffset}
                    >
                        <sp-popover tip>
                            <sp-action-group vertical quiet>
                                <sp-action-button>
                                    <sp-icon-anchor-select
                                        slot="icon"
                                    ></sp-icon-anchor-select>
                                </sp-action-button>
                                <sp-action-button>
                                    <sp-icon-polygon-select
                                        slot="icon"
                                    ></sp-icon-polygon-select>
                                </sp-action-button>
                                <sp-action-button>
                                    <sp-icon-rect-select
                                        slot="icon"
                                    ></sp-icon-rect-select>
                                </sp-action-button>
                            </sp-action-group>
                        </sp-popover>
                    </sp-overlay>
                </sp-action-button>
                <sp-action-button id="trigger-2" hold-affordance>
                    <sp-icon-polygon-select
                        slot="icon"
                    ></sp-icon-polygon-select>
                </sp-action-button>
                <sp-action-button id="trigger-3" hold-affordance>
                    <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                    <sp-tooltip ?delayed=${delayed} self-managed>
                        Hover
                    </sp-tooltip>
                </sp-action-button>
                <sp-action-menu label="More Actions">
                    <sp-menu-group id="cms">
                        <span slot="header">cms</span>
                        <sp-menu-item value="updateAllSiteContent">
                            Update All Content
                        </sp-menu-item>
                        <sp-menu-item value="refreshAllXDs">
                            Refresh All XDs
                        </sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-group id="ssg">
                        <span slot="header">ssg</span>
                        <sp-menu-item value="clearCache">
                            Clear Cache
                        </sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-group id="vrt">
                        <span slot="header">vrt</span>
                        <sp-menu-item value="vrt-contributions">
                            Contributions
                        </sp-menu-item>
                        <sp-menu-item value="vrt-internal">
                            Internal
                        </sp-menu-item>
                        <sp-menu-item value="vrt-public">Public</sp-menu-item>
                        <sp-menu-item value="vrt-patterns">
                            Patterns
                        </sp-menu-item>
                        <sp-menu-item value="vrt">All</sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-group id="misc">
                        <sp-menu-item value="logout">Logout</sp-menu-item>
                    </sp-menu-group>
                </sp-action-menu>
            </sp-action-group>
        </sp-popover>
        <sp-overlay ?delayed=${delayed} trigger="trigger-2@hover" type="hint">
            <sp-tooltip>Hover</sp-tooltip>
        </sp-overlay>
        <sp-overlay
            trigger="trigger-2@longpress"
            type="auto"
            placement="right-start"
            .offset=${popoverOffset}
        >
            <sp-popover tip>
                <sp-action-group vertical quiet>
                    <sp-action-button>
                        <sp-icon-anchor-select
                            slot="icon"
                        ></sp-icon-anchor-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-polygon-select
                            slot="icon"
                        ></sp-icon-polygon-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                    </sp-action-button>
                </sp-action-group>
            </sp-popover>
        </sp-overlay>
        <sp-overlay
            trigger="trigger-3@longpress"
            type="auto"
            placement="right-start"
            .offset=${popoverOffset}
        >
            <sp-popover tip>
                <sp-action-group vertical quiet>
                    <sp-action-button>
                        <sp-icon-anchor-select
                            slot="icon"
                        ></sp-icon-anchor-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-polygon-select
                            slot="icon"
                        ></sp-icon-polygon-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                    </sp-action-button>
                </sp-action-group>
            </sp-popover>
        </sp-overlay>
    `},transientHover=()=>index_dev.qy`
    <transient-hover></transient-hover>
`;transientHover.swc_vrt={skip:!0},transientHover.parameters={chromatic:{disableSnapshot:!0}};const lazyElements=()=>index_dev.qy`
        <sp-button id="button">Trigger</sp-button>
        <sp-overlay
            placement="bottom"
            type="auto"
            trigger="button@click"
            @slottable-request=${event=>{const template=event.data===removeSlottableRequest?void 0:index_dev.qy`
                      <sp-popover>
                          <sp-dialog no-divider>
                              <sp-slider
                                  value="5"
                                  step="0.5"
                                  min="0"
                                  max="20"
                                  label="Awesomeness"
                              ></sp-slider>
                              <div id="styled-div">
                                  The background of this div should be blue
                              </div>
                              <sp-button>
                                  Press Me
                                  <sp-tooltip self-managed delayed>
                                      Click to open another popover.
                                  </sp-tooltip>
                              </sp-button>
                          </sp-dialog>
                      </sp-popover>
                  `;(0,index_dev.XX)(template,event.target)}}
        ></sp-overlay>
    `;lazyElements.swc_vrt={skip:!0},lazyElements.parameters={chromatic:{disableSnapshot:!0}};const nestedModalOverlays=()=>index_dev.qy`
    <div style="padding: 20px;">
        <sp-button id="outerTrigger" variant="primary">
            Open Outer Modal
        </sp-button>

        <sp-overlay
            id="outerOverlay"
            type="auto"
            .triggerInteraction=${"click"}
            trigger="outerTrigger@click"
        >
            <sp-popover>
                <sp-dialog>
                    <p>
                        This is the outer modal content. Press ESC to close it.
                    </p>
                    <sp-button id="innerTrigger" variant="primary">
                        Open Inner Modal
                    </sp-button>
                    <sp-overlay
                        id="innerOverlay"
                        type="auto"
                        .triggerInteraction=${"click"}
                        trigger="innerTrigger@click"
                    >
                        <sp-popover>
                            <sp-dialog>
                                <p>
                                    This is the inner modal content. Press ESC
                                    to close this first, then the outer modal.
                                </p>
                            </sp-dialog>
                        </sp-popover>
                    </sp-overlay>
                </sp-dialog>
            </sp-popover>
        </sp-overlay>
    </div>
`;nestedModalOverlays.swc_vrt={skip:!0},nestedModalOverlays.parameters={chromatic:{disableSnapshot:!0}};const __namedExportsOrder=["modal","page","complexSlowPage","click","withSlider","hover","hoverTooltip","longpress","receivesFocus","transformed","contained","all","actionGroup","actionGroupWithFilters","transientHover","lazyElements","nestedModalOverlays"];modal.parameters={...modal.parameters,docs:{...modal.parameters?.docs,source:{originalSource:"args => Template(args)",...modal.parameters?.docs?.source}}},page.parameters={...page.parameters,docs:{...page.parameters?.docs,source:{originalSource:'({\n  interaction,\n  open,\n  placement,\n  type\n}) => html`\n    <sp-action-button id="trigger">Open the overlay</sp-action-button>\n    <sp-overlay\n        ?open=${open}\n        trigger="trigger@${interaction}"\n        type=${ifDefined(type)}\n        placement=${ifDefined(placement)}\n    >\n        ${notAgain()}\n    </sp-overlay>\n`',...page.parameters?.docs?.source}}},complexSlowPage.parameters={...complexSlowPage.parameters,docs:{...complexSlowPage.parameters?.docs,source:{originalSource:'() => html`\n    <div style="padding: 20px;">\n\n            <p>\n                This is a complex slow page. It has a lot of content. Even with a lot of content on the page,\n                the overlay should still be able to open and close without extreme delay.\n            </p>\n\n            <div\n                style="display: flex; flex-direction: column; align-items: center; justify-content: center;"\n            >\n                <sp-button style="margin: 20px;" id="trigger">\n                    open modal\n                </sp-button>\n                <sp-overlay trigger="trigger@click" type="modal">\n                    <sp-dialog-wrapper headline="Signin form" dismissable underlay>\n                        <p>I am a modal type overlay.</p>\n                        <sp-field-label>Enter your email</sp-field-label>\n                        <sp-textfield placeholder="test@gmail.com"></sp-textfield>\n                        <sp-action-button\n                            onClick="\n                                this.dispatchEvent(\n                                    new Event(\'close\', {\n                                        bubbles: true,\n                                        composed: true,\n                                    })\n                                );\n                            "\n                        >\n                            Sign in\n                        </sp-action-button>\n                    </sp-dialog-wrapper>\n                </sp-overlay>\n\n                <sp-button id="pageTrigger" style="margin: 20px;">open page</sp-button>\n                <sp-overlay trigger="pageTrigger@click" type="page">\n                    <sp-dialog-wrapper\n                        headline="Full screen menu"\n                        mode="fullscreenTakeover"\n                        cancel-label="Close"\n                    >\n                        <p>I am a page type overlay.</p>\n                    </sp-dialog-wrapper>\n                </sp-overlay>\n                <style>\n                    .chat-container {\n                        position: fixed;\n                        bottom: 1em;\n                        left: 1em;\n                    }\n                </style>\n\n                <sp-button id="manualTrigger" style="margin: 20px;">open manual</sp-button>\n                <sp-overlay trigger="manualTrigger@click" type="manual">\n                    <sp-popover class="chat-container">\n                        <sp-dialog dismissable>\n                            <span slot="heading">Chat Window</span>\n                            <sp-textfield\n                                placeholder="Enter your message"\n                            ></sp-textfield>\n                            <sp-action-button>Send</sp-action-button>\n                        </sp-dialog>\n                    </sp-popover>\n                </sp-overlay>\n\n            </div>\n        </span>\n\n        ${Array(30).fill(0).map(() => html`\n                    <div style="margin-bottom: 20px;">\n                        <sp-table>\n                            <sp-table-head>\n                                <sp-table-head-cell>\n                                    Column Title\n                                </sp-table-head-cell>\n                                <sp-table-head-cell>\n                                    Column Title\n                                </sp-table-head-cell>\n                                <sp-table-head-cell>\n                                    Column Title\n                                </sp-table-head-cell>\n                            </sp-table-head>\n                            <sp-table-body style="height: 200px">\n                                <sp-table-row value="row1" class="row1">\n                                    <sp-table-cell>\n                                        Row Item Alpha\n                                    </sp-table-cell>\n                                    <sp-table-cell>\n                                        Row Item Alpha\n                                    </sp-table-cell>\n                                    <sp-table-cell>\n                                        Row Item Alpha\n                                    </sp-table-cell>\n                                </sp-table-row>\n                                <sp-table-row value="row2" class="row2">\n                                    <sp-table-cell>\n                                        Row Item Bravo\n                                    </sp-table-cell>\n                                    <sp-table-cell>\n                                        Row Item Bravo\n                                    </sp-table-cell>\n                                    <sp-table-cell>\n                                        Row Item Bravo\n                                    </sp-table-cell>\n                                </sp-table-row>\n                                <sp-table-row value="row3" class="row3">\n                                    <sp-table-cell>\n                                        Row Item Charlie\n                                    </sp-table-cell>\n                                    <sp-table-cell>\n                                        Row Item Charlie\n                                    </sp-table-cell>\n                                    <sp-table-cell>\n                                        Row Item Charlie\n                                    </sp-table-cell>\n                                </sp-table-row>\n                                <sp-table-row value="row4" class="row4">\n                                    <sp-table-cell>\n                                        Row Item Delta\n                                    </sp-table-cell>\n                                    <sp-table-cell>\n                                        Row Item Delta\n                                    </sp-table-cell>\n                                    <sp-table-cell>\n                                        Row Item Delta\n                                    </sp-table-cell>\n                                </sp-table-row>\n                                <sp-table-row value="row5" class="row5">\n                                    <sp-table-cell>Row Item Echo</sp-table-cell>\n                                    <sp-table-cell>Row Item Echo</sp-table-cell>\n                                    <sp-table-cell>Row Item Echo</sp-table-cell>\n                                </sp-table-row>\n                            </sp-table-body>\n                        </sp-table>\n                        <sp-action-group>\n                            <sp-action-button>\n                                <sp-icon-anchor-select\n                                    slot="icon"\n                                ></sp-icon-anchor-select>\n                            </sp-action-button>\n                            <sp-action-button>\n                                <sp-icon-polygon-select\n                                    slot="icon"\n                                ></sp-icon-polygon-select>\n                            </sp-action-button>\n                            <sp-slider\n                                value="5"\n                                step="0.5"\n                                min="0"\n                                max="20"\n                                label="Control"\n                            ></sp-slider>\n                        </sp-action-group>\n                        <sp-menu-group>\n                            <span slot="header">Menu Group</span>\n                            <sp-menu-item>Option 1</sp-menu-item>\n                            <sp-menu-item>Option 2</sp-menu-item>\n                            <sp-menu-divider></sp-menu-divider>\n                            <sp-menu-item>Option 3</sp-menu-item>\n                        </sp-menu-group>\n                    </div>\n                `)}\n    </div>\n`',...complexSlowPage.parameters?.docs?.source}}},click.parameters={...click.parameters,docs:{...click.parameters?.docs,source:{originalSource:"args => Template(args)",...click.parameters?.docs?.source}}},withSlider.parameters={...withSlider.parameters,docs:{...withSlider.parameters?.docs,source:{originalSource:'() => html`\n    <sp-button id="triggerEl" variant="primary">Button popover</sp-button>\n    <sp-overlay trigger="triggerEl@click" placement="bottom">\n        <sp-popover tip>\n            <sp-dialog no-divider class="options-popover-content">\n                <p>Try clicking the slider after popover opens</p>\n                <p>It shouldn\'t close the popover</p>\n                <sp-slider\n                    value="5"\n                    step="0.5"\n                    min="0"\n                    max="20"\n                    label="Awesomeness"\n                ></sp-slider>\n                <sp-button>Press me</sp-button>\n            </sp-dialog>\n        </sp-popover>\n    </sp-overlay>\n`',...withSlider.parameters?.docs?.source}}},hover.parameters={...hover.parameters,docs:{...hover.parameters?.docs,source:{originalSource:"args => Template(args)",...hover.parameters?.docs?.source}}},hoverTooltip.parameters={...hoverTooltip.parameters,docs:{...hoverTooltip.parameters?.docs,source:{originalSource:'({\n  interaction,\n  open,\n  placement,\n  type\n}) => html`\n    <style>\n        .wrapper {\n            will-change: transform;\n        }\n    </style>\n    <div class="wrapper">\n        <sp-action-button id="trigger">Open the overlay</sp-action-button>\n        <sp-overlay\n            ?open=${open}\n            trigger="trigger@${interaction}"\n            type=${ifDefined(type)}\n            placement=${ifDefined(placement)}\n            offset="-10"\n        >\n            <sp-tooltip>Tooltip goes here.</sp-tooltip>\n        </sp-overlay>\n    </div>\n`',...hoverTooltip.parameters?.docs?.source}}},longpress.parameters={...longpress.parameters,docs:{...longpress.parameters?.docs,source:{originalSource:"args => Template(args)",...longpress.parameters?.docs?.source}}},receivesFocus.parameters={...receivesFocus.parameters,docs:{...receivesFocus.parameters?.docs,source:{originalSource:'({\n  interaction,\n  open,\n  placement,\n  receivesFocus: receivesFocus2,\n  type\n}) => html`\n    <sp-action-button id="trigger">\n        Open the overlay (with focus)\n    </sp-action-button>\n    <sp-overlay\n        ?open=${open}\n        trigger="trigger@${interaction}"\n        type=${ifDefined(type)}\n        placement=${ifDefined(placement)}\n        .receivesFocus=${receivesFocus2}\n    >\n        <sp-popover>\n            <sp-dialog size="s" no-divider>\n                <a href="https://example.com">Click Content</a>\n            </sp-dialog>\n        </sp-popover>\n    </sp-overlay>\n`',...receivesFocus.parameters?.docs?.source}}},transformed.parameters={...transformed.parameters,docs:{...transformed.parameters?.docs,source:{originalSource:'args => html`\n    <style>\n        .transformed {\n            transform: translateX(-50%);\n            position: absolute;\n            inset: auto;\n            inset-inline-start: 200px;\n            inset-block-start: 200px;\n            inline-size: 100px;\n            block-size: 50px;\n        }\n    </style>\n    <div class="transformed">${Template(args)}</div>\n`',...transformed.parameters?.docs?.source}}},contained.parameters={...contained.parameters,docs:{...contained.parameters?.docs,source:{originalSource:'args => html`\n    <style>\n        .contained {\n            contain: strict;\n            position: absolute;\n            inset: auto;\n            inset-inline-start: 200px;\n            inset-block-start: 200px;\n            inline-size: 200px;\n            block-size: 50px;\n            padding-block: 75px;\n            padding-inline-start: 300px;\n        }\n    </style>\n    <div class="contained">${Template(args)}</div>\n`',...contained.parameters?.docs?.source}}},overlay_element_stories_all.parameters={...overlay_element_stories_all.parameters,docs:{...overlay_element_stories_all.parameters?.docs,source:{originalSource:'({\n  delayed\n}) => html`\n    <sp-action-button id="trigger" hold-affordance>\n        Open the overlay\n    </sp-action-button>\n    <sp-overlay trigger="trigger@click" type="auto" placement="right">\n        <sp-popover>\n            <sp-dialog size="s" no-divider>Click content</sp-dialog>\n        </sp-popover>\n    </sp-overlay>\n    <sp-overlay ?delayed=${delayed} trigger="trigger@hover" type="hint">\n        <sp-tooltip>Hover content</sp-tooltip>\n    </sp-overlay>\n    <sp-overlay trigger="trigger@longpress" type="auto" placement="right">\n        <sp-popover>\n            <sp-dialog size="s" no-divider>Longpress content</sp-dialog>\n        </sp-popover>\n    </sp-overlay>\n`',...overlay_element_stories_all.parameters?.docs?.source}}},actionGroup.parameters={...actionGroup.parameters,docs:{...actionGroup.parameters?.docs,source:{originalSource:'({\n  delayed\n}) => {\n  const popoverOffset = [6, -13];\n  return html`\n        <style>\n            sp-popover sp-action-group {\n                padding: calc(\n                        var(--spectrum-actiongroup-vertical-spacing-regular) *\n                            0.75\n                    )\n                    calc(\n                        var(--spectrum-actiongroup-vertical-spacing-regular) / 2\n                    );\n            }\n            .root {\n                inset-inline-end: 0em;\n                inset-block-start: 3em;\n                padding-block-end: 3em;\n            }\n            .root > sp-action-group > sp-action-button,\n            .root > sp-action-group > sp-action-menu {\n                top: 3em;\n                position: relative;\n            }\n        </style>\n        <sp-popover open class="root">\n            <sp-action-group vertical quiet emphasized selects="single">\n                <sp-action-button id="trigger-1" hold-affordance>\n                    <sp-icon-anchor-select slot="icon"></sp-icon-anchor-select>\n                </sp-action-button>\n                <sp-action-button id="trigger-2" hold-affordance>\n                    <sp-icon-polygon-select\n                        slot="icon"\n                    ></sp-icon-polygon-select>\n                </sp-action-button>\n                <sp-action-button id="trigger-3" hold-affordance>\n                    <sp-icon-rect-select slot="icon"></sp-icon-rect-select>\n                </sp-action-button>\n                <sp-action-menu label="More Actions" placement="left">\n                    <sp-menu-group id="cms">\n                        <span slot="header">cms</span>\n                        <sp-menu-item value="updateAllSiteContent">\n                            Update All Content\n                        </sp-menu-item>\n                        <sp-menu-item value="refreshAllXDs">\n                            Refresh All XDs\n                        </sp-menu-item>\n                    </sp-menu-group>\n                    <sp-menu-group id="ssg">\n                        <span slot="header">ssg</span>\n                        <sp-menu-item value="clearCache">\n                            Clear Cache\n                        </sp-menu-item>\n                    </sp-menu-group>\n                    <sp-menu-group id="vrt">\n                        <span slot="header">vrt</span>\n                        <sp-menu-item value="vrt-contributions">\n                            Contributions\n                        </sp-menu-item>\n                        <sp-menu-item value="vrt-internal">\n                            Internal\n                        </sp-menu-item>\n                        <sp-menu-item value="vrt-public">Public</sp-menu-item>\n                        <sp-menu-item value="vrt-patterns">\n                            Patterns\n                        </sp-menu-item>\n                        <sp-menu-item value="vrt">All</sp-menu-item>\n                    </sp-menu-group>\n                    <sp-menu-divider></sp-menu-divider>\n                    <sp-menu-group id="misc">\n                        <sp-menu-item value="logout">Logout</sp-menu-item>\n                    </sp-menu-group>\n                </sp-action-menu>\n            </sp-action-group>\n        </sp-popover>\n        <sp-overlay ?delayed=${delayed} trigger="trigger-1@hover" type="hint">\n            <sp-tooltip>Hover</sp-tooltip>\n        </sp-overlay>\n        <sp-overlay\n            trigger="trigger-1@longpress"\n            type="auto"\n            placement="right-start"\n            .offset=${popoverOffset}\n        >\n            <sp-popover tip>\n                <sp-action-group vertical quiet>\n                    <sp-action-button>\n                        <sp-icon-anchor-select\n                            slot="icon"\n                        ></sp-icon-anchor-select>\n                    </sp-action-button>\n                    <sp-action-button>\n                        <sp-icon-polygon-select\n                            slot="icon"\n                        ></sp-icon-polygon-select>\n                    </sp-action-button>\n                    <sp-action-button>\n                        <sp-icon-rect-select slot="icon"></sp-icon-rect-select>\n                    </sp-action-button>\n                </sp-action-group>\n            </sp-popover>\n        </sp-overlay>\n        <sp-overlay ?delayed=${delayed} trigger="trigger-2@hover" type="hint">\n            <sp-tooltip>Hover</sp-tooltip>\n        </sp-overlay>\n        <sp-overlay\n            trigger="trigger-2@longpress"\n            type="auto"\n            placement="right-start"\n            .offset=${popoverOffset}\n        >\n            <sp-popover tip>\n                <sp-action-group vertical quiet>\n                    <sp-action-button>\n                        <sp-icon-anchor-select\n                            slot="icon"\n                        ></sp-icon-anchor-select>\n                    </sp-action-button>\n                    <sp-action-button>\n                        <sp-icon-polygon-select\n                            slot="icon"\n                        ></sp-icon-polygon-select>\n                    </sp-action-button>\n                    <sp-action-button>\n                        <sp-icon-rect-select slot="icon"></sp-icon-rect-select>\n                    </sp-action-button>\n                </sp-action-group>\n            </sp-popover>\n        </sp-overlay>\n        <sp-overlay\n            ?delayed=${delayed}\n            trigger="trigger-3@hover"\n            type="hint"\n            open\n        >\n            <sp-tooltip>Hover</sp-tooltip>\n        </sp-overlay>\n        <sp-overlay\n            trigger="trigger-3@longpress"\n            type="auto"\n            placement="right-start"\n            .offset=${popoverOffset}\n        >\n            <sp-popover tip>\n                <sp-action-group vertical quiet>\n                    <sp-action-button>\n                        <sp-icon-anchor-select\n                            slot="icon"\n                        ></sp-icon-anchor-select>\n                    </sp-action-button>\n                    <sp-action-button>\n                        <sp-icon-polygon-select\n                            slot="icon"\n                        ></sp-icon-polygon-select>\n                    </sp-action-button>\n                    <sp-action-button>\n                        <sp-icon-rect-select slot="icon"></sp-icon-rect-select>\n                    </sp-action-button>\n                </sp-action-group>\n            </sp-popover>\n        </sp-overlay>\n    `;\n}',...actionGroup.parameters?.docs?.source}}},actionGroupWithFilters.parameters={...actionGroupWithFilters.parameters,docs:{...actionGroupWithFilters.parameters?.docs,source:{originalSource:'({\n  delayed\n}) => {\n  const popoverOffset = [6, -13];\n  return html`\n        <style>\n            sp-popover sp-action-group {\n                padding: calc(\n                        var(--spectrum-actiongroup-vertical-spacing-regular) *\n                            0.75\n                    )\n                    calc(\n                        var(--spectrum-actiongroup-vertical-spacing-regular) / 2\n                    );\n            }\n            .root {\n                inset-inline-end: 0em;\n                inset-block-start: 3em;\n                padding-block-end: 3em;\n                overflow: hidden;\n            }\n            .root > sp-action-group > sp-action-button,\n            .root > sp-action-group > sp-action-menu {\n                top: 3em;\n                position: relative;\n            }\n            sp-action-button,\n            sp-action-menu {\n                background-image: linear-gradient(\n                    rgba(125, 125, 125, 0.2),\n                    rgba(125, 125, 125, 0.2)\n                );\n                background-blend-mode: multiply;\n                filter: brightness(1) saturate(1);\n            }\n        </style>\n        <p>\n            This story outlines some CSS usage that is not yet covered by the\n            placement calculations within the Overlay API.\n        </p>\n        <sp-popover open class="root">\n            <sp-action-group vertical quiet emphasized selects="single">\n                <sp-action-button id="trigger-1" hold-affordance>\n                    <sp-icon-anchor-select slot="icon"></sp-icon-anchor-select>\n                    <sp-tooltip ?delayed=${delayed} self-managed>\n                        Hover\n                    </sp-tooltip>\n                    <sp-overlay\n                        trigger="trigger-1@longpress"\n                        type="auto"\n                        placement="right-start"\n                        .offset=${popoverOffset}\n                    >\n                        <sp-popover tip>\n                            <sp-action-group vertical quiet>\n                                <sp-action-button>\n                                    <sp-icon-anchor-select\n                                        slot="icon"\n                                    ></sp-icon-anchor-select>\n                                </sp-action-button>\n                                <sp-action-button>\n                                    <sp-icon-polygon-select\n                                        slot="icon"\n                                    ></sp-icon-polygon-select>\n                                </sp-action-button>\n                                <sp-action-button>\n                                    <sp-icon-rect-select\n                                        slot="icon"\n                                    ></sp-icon-rect-select>\n                                </sp-action-button>\n                            </sp-action-group>\n                        </sp-popover>\n                    </sp-overlay>\n                </sp-action-button>\n                <sp-action-button id="trigger-2" hold-affordance>\n                    <sp-icon-polygon-select\n                        slot="icon"\n                    ></sp-icon-polygon-select>\n                </sp-action-button>\n                <sp-action-button id="trigger-3" hold-affordance>\n                    <sp-icon-rect-select slot="icon"></sp-icon-rect-select>\n                    <sp-tooltip ?delayed=${delayed} self-managed>\n                        Hover\n                    </sp-tooltip>\n                </sp-action-button>\n                <sp-action-menu label="More Actions">\n                    <sp-menu-group id="cms">\n                        <span slot="header">cms</span>\n                        <sp-menu-item value="updateAllSiteContent">\n                            Update All Content\n                        </sp-menu-item>\n                        <sp-menu-item value="refreshAllXDs">\n                            Refresh All XDs\n                        </sp-menu-item>\n                    </sp-menu-group>\n                    <sp-menu-group id="ssg">\n                        <span slot="header">ssg</span>\n                        <sp-menu-item value="clearCache">\n                            Clear Cache\n                        </sp-menu-item>\n                    </sp-menu-group>\n                    <sp-menu-group id="vrt">\n                        <span slot="header">vrt</span>\n                        <sp-menu-item value="vrt-contributions">\n                            Contributions\n                        </sp-menu-item>\n                        <sp-menu-item value="vrt-internal">\n                            Internal\n                        </sp-menu-item>\n                        <sp-menu-item value="vrt-public">Public</sp-menu-item>\n                        <sp-menu-item value="vrt-patterns">\n                            Patterns\n                        </sp-menu-item>\n                        <sp-menu-item value="vrt">All</sp-menu-item>\n                    </sp-menu-group>\n                    <sp-menu-divider></sp-menu-divider>\n                    <sp-menu-group id="misc">\n                        <sp-menu-item value="logout">Logout</sp-menu-item>\n                    </sp-menu-group>\n                </sp-action-menu>\n            </sp-action-group>\n        </sp-popover>\n        <sp-overlay ?delayed=${delayed} trigger="trigger-2@hover" type="hint">\n            <sp-tooltip>Hover</sp-tooltip>\n        </sp-overlay>\n        <sp-overlay\n            trigger="trigger-2@longpress"\n            type="auto"\n            placement="right-start"\n            .offset=${popoverOffset}\n        >\n            <sp-popover tip>\n                <sp-action-group vertical quiet>\n                    <sp-action-button>\n                        <sp-icon-anchor-select\n                            slot="icon"\n                        ></sp-icon-anchor-select>\n                    </sp-action-button>\n                    <sp-action-button>\n                        <sp-icon-polygon-select\n                            slot="icon"\n                        ></sp-icon-polygon-select>\n                    </sp-action-button>\n                    <sp-action-button>\n                        <sp-icon-rect-select slot="icon"></sp-icon-rect-select>\n                    </sp-action-button>\n                </sp-action-group>\n            </sp-popover>\n        </sp-overlay>\n        <sp-overlay\n            trigger="trigger-3@longpress"\n            type="auto"\n            placement="right-start"\n            .offset=${popoverOffset}\n        >\n            <sp-popover tip>\n                <sp-action-group vertical quiet>\n                    <sp-action-button>\n                        <sp-icon-anchor-select\n                            slot="icon"\n                        ></sp-icon-anchor-select>\n                    </sp-action-button>\n                    <sp-action-button>\n                        <sp-icon-polygon-select\n                            slot="icon"\n                        ></sp-icon-polygon-select>\n                    </sp-action-button>\n                    <sp-action-button>\n                        <sp-icon-rect-select slot="icon"></sp-icon-rect-select>\n                    </sp-action-button>\n                </sp-action-group>\n            </sp-popover>\n        </sp-overlay>\n    `;\n}',...actionGroupWithFilters.parameters?.docs?.source}}},transientHover.parameters={...transientHover.parameters,docs:{...transientHover.parameters?.docs,source:{originalSource:"() => html`\n    <transient-hover></transient-hover>\n`",...transientHover.parameters?.docs?.source}}},lazyElements.parameters={...lazyElements.parameters,docs:{...lazyElements.parameters?.docs,source:{originalSource:'() => {\n  const handleSlottableRequest = event => {\n    const template = event.data === removeSlottableRequest ? void 0 : html`\n                      <sp-popover>\n                          <sp-dialog no-divider>\n                              <sp-slider\n                                  value="5"\n                                  step="0.5"\n                                  min="0"\n                                  max="20"\n                                  label="Awesomeness"\n                              ></sp-slider>\n                              <div id="styled-div">\n                                  The background of this div should be blue\n                              </div>\n                              <sp-button>\n                                  Press Me\n                                  <sp-tooltip self-managed delayed>\n                                      Click to open another popover.\n                                  </sp-tooltip>\n                              </sp-button>\n                          </sp-dialog>\n                      </sp-popover>\n                  `;\n    render(template, event.target);\n  };\n  return html`\n        <sp-button id="button">Trigger</sp-button>\n        <sp-overlay\n            placement="bottom"\n            type="auto"\n            trigger="button@click"\n            @slottable-request=${handleSlottableRequest}\n        ></sp-overlay>\n    `;\n}',...lazyElements.parameters?.docs?.source}}},nestedModalOverlays.parameters={...nestedModalOverlays.parameters,docs:{...nestedModalOverlays.parameters?.docs,source:{originalSource:'() => html`\n    <div style="padding: 20px;">\n        <sp-button id="outerTrigger" variant="primary">\n            Open Outer Modal\n        </sp-button>\n\n        <sp-overlay\n            id="outerOverlay"\n            type="auto"\n            .triggerInteraction=${"click"}\n            trigger="outerTrigger@click"\n        >\n            <sp-popover>\n                <sp-dialog>\n                    <p>\n                        This is the outer modal content. Press ESC to close it.\n                    </p>\n                    <sp-button id="innerTrigger" variant="primary">\n                        Open Inner Modal\n                    </sp-button>\n                    <sp-overlay\n                        id="innerOverlay"\n                        type="auto"\n                        .triggerInteraction=${"click"}\n                        trigger="innerTrigger@click"\n                    >\n                        <sp-popover>\n                            <sp-dialog>\n                                <p>\n                                    This is the inner modal content. Press ESC\n                                    to close this first, then the outer modal.\n                                </p>\n                            </sp-dialog>\n                        </sp-popover>\n                    </sp-overlay>\n                </sp-dialog>\n            </sp-popover>\n        </sp-overlay>\n    </div>\n`',...nestedModalOverlays.parameters?.docs?.source}}}},"./packages/textfield/sp-textfield.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _src_Textfield_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/textfield/src/Textfield.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-textfield",_src_Textfield_dev_js__WEBPACK_IMPORTED_MODULE_0__.q)}}]);
//# sourceMappingURL=overlay-stories-overlay-element-stories.c2290828.iframe.bundle.js.map