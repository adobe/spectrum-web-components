"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[7471],{"./packages/checkbox/sp-checkbox.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),CheckboxMixin_dev=__webpack_require__("./packages/checkbox/src/CheckboxMixin.dev.js");var checkbox_css=index_dev.AH`
    :host{--spectrum-checkbox-content-color-default:var(--spectrum-neutral-content-color-default);--spectrum-checkbox-content-color-hover:var(--spectrum-neutral-content-color-hover);--spectrum-checkbox-content-color-down:var(--spectrum-neutral-content-color-down);--spectrum-checkbox-content-color-focus:var(--spectrum-neutral-content-color-key-focus);--spectrum-checkbox-focus-indicator-color:var(--spectrum-focus-indicator-color);--spectrum-checkbox-content-color-disabled:var(--spectrum-disabled-content-color);--spectrum-checkbox-control-color-disabled:var(--spectrum-disabled-content-color);--spectrum-checkbox-invalid-color-default:var(--spectrum-negative-color-900);--spectrum-checkbox-invalid-color-hover:var(--spectrum-negative-color-1000);--spectrum-checkbox-invalid-color-down:var(--spectrum-negative-color-1100);--spectrum-checkbox-invalid-color-focus:var(--spectrum-negative-color-1000);--spectrum-checkbox-emphasized-color-default:var(--spectrum-accent-color-900);--spectrum-checkbox-emphasized-color-hover:var(--spectrum-accent-color-1000);--spectrum-checkbox-emphasized-color-down:var(--spectrum-accent-color-1100);--spectrum-checkbox-emphasized-color-focus:var(--spectrum-accent-color-1000);--spectrum-checkbox-control-selected-color-default:var(--spectrum-neutral-background-color-selected-default);--spectrum-checkbox-control-selected-color-hover:var(--spectrum-neutral-background-color-selected-hover);--spectrum-checkbox-control-selected-color-down:var(--spectrum-neutral-background-color-selected-down);--spectrum-checkbox-control-selected-color-focus:var(--spectrum-neutral-background-color-selected-key-focus);--spectrum-checkbox-line-height:var(--spectrum-line-height-100);--spectrum-checkbox-line-height-cjk:var(--spectrum-cjk-line-height-100);--spectrum-checkbox-focus-indicator-gap:var(--spectrum-focus-indicator-gap);--spectrum-checkbox-focus-indicator-thickness:var(--spectrum-focus-indicator-thickness);--spectrum-checkbox-border-width:var(--spectrum-border-width-200);--spectrum-checkbox-selected-border-width:calc(var(--spectrum-checkbox-control-size)/2);--spectrum-checkbox-animation-duration:var(--spectrum-animation-duration-100)}:host,:host{--spectrum-checkbox-font-size:var(--spectrum-font-size-100);--spectrum-checkbox-height:var(--spectrum-component-height-100);--spectrum-checkbox-control-size:var(--spectrum-checkbox-control-size-medium);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-100);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-100)}:host([size=s]){--spectrum-checkbox-font-size:var(--spectrum-font-size-75);--spectrum-checkbox-height:var(--spectrum-component-height-75);--spectrum-checkbox-control-size:var(--spectrum-checkbox-control-size-small);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-75);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-75)}:host([size=l]){--spectrum-checkbox-font-size:var(--spectrum-font-size-200);--spectrum-checkbox-height:var(--spectrum-component-height-200);--spectrum-checkbox-control-size:var(--spectrum-checkbox-control-size-large);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-200);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-200)}:host([size=xl]){--spectrum-checkbox-font-size:var(--spectrum-font-size-300);--spectrum-checkbox-height:var(--spectrum-component-height-300);--spectrum-checkbox-control-size:var(--spectrum-checkbox-control-size-extra-large);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-300);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-300)}:host{color:var(--highcontrast-checkbox-content-color-default,var(--mod-checkbox-content-color-default,var(--spectrum-checkbox-content-color-default)));min-block-size:var(--mod-checkbox-height,var(--spectrum-checkbox-height));vertical-align:top;align-items:flex-start;max-inline-size:100%;display:inline-flex;position:relative}:host(:is(:active,[active])) #box:before{border-color:var(--highcontrast-checkbox-highlight-color-down,var(--mod-checkbox-control-color-down,var(--spectrum-checkbox-control-color-down)))}:host(:is(:active,[active])) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-highlight-color-down,var(--mod-checkbox-control-selected-color-down,var(--spectrum-checkbox-control-selected-color-down)))}:host(:is(:active,[active])) #label{color:var(--highcontrast-checkbox-content-color-down,var(--mod-checkbox-content-color-down,var(--spectrum-checkbox-content-color-down)))}:host([invalid][invalid]) #box:before,:host([invalid][invalid]) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-color-default,var(--mod-checkbox-invalid-color-default,var(--spectrum-checkbox-invalid-color-default)))}:host([invalid][invalid]) #input:focus-visible+#box:before,:host([invalid][invalid][indeterminate]) #input:focus-visible+#box:before{border-color:var(--highcontrast-checkbox-color-hover,var(--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)))}:host([readonly]) #input{cursor:default}:host([readonly]) #input:checked:disabled+#box:before,:host([readonly]) #input:disabled+#box:before{border-color:var(--highcontrast-checkbox-color-default,var(--mod-checkbox-control-selected-color-default,var(--spectrum-checkbox-control-selected-color-default)));background-color:var(--highcontrast-checkbox-background-color-default,var(--mod-checkbox-checkmark-color,var(--spectrum-checkbox-checkmark-color)))}:host([readonly]) #input:checked:disabled~#label,:host([readonly]) #input:disabled~#label{color:var(--highcontrast-checkbox-color-default,var(--mod-checkbox-content-color-default,var(--spectrum-checkbox-content-color-default)))}:host([indeterminate]) #box:before,:host([indeterminate]) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-highlight-color-default,var(--mod-checkbox-control-selected-color-default,var(--spectrum-checkbox-control-selected-color-default)));border-width:var(--mod-checkbox-selected-border-width,var(--spectrum-checkbox-selected-border-width))}:host([indeterminate]) #box #checkmark,:host([indeterminate]) #input:checked+#box #checkmark{display:none}:host([indeterminate]) #box #partialCheckmark,:host([indeterminate]) #input:checked+#box #partialCheckmark{opacity:1;display:block;transform:scale(1)}:host([indeterminate]) #input:focus-visible+#box:before{border-color:var(--highcontrast-checkbox-highlight-color-focus,var(--mod-checkbox-control-selected-color-focus,var(--spectrum-checkbox-control-selected-color-focus)))}:host([invalid][invalid][indeterminate]) #box:before,:host([invalid][invalid][indeterminate]) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-color-default,var(--mod-checkbox-invalid-color-default,var(--spectrum-checkbox-invalid-color-default)));border-width:var(--mod-checkbox-selected-border-width,var(--spectrum-checkbox-selected-border-width))}:host([emphasized]) #input:checked+#box:before,:host([emphasized][indeterminate]) #box:before,:host([emphasized][indeterminate]) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-highlight-color-default,var(--mod-checkbox-emphasized-color-default,var(--spectrum-checkbox-emphasized-color-default)))}:host([emphasized]) #input:focus-visible:checked+#box:before,:host([emphasized][indeterminate]) #input:focus-visible+#box:before{border-color:var(--highcontrast-checkbox-highlight-color-focus,var(--mod-checkbox-emphasized-color-focus,var(--spectrum-checkbox-emphasized-color-focus)))}:host([emphasized][invalid][invalid]) #input:focus-visible:checked+#box:before{border-color:var(--highcontrast-checkbox-color-default,var(--mod-checkbox-invalid-color-focus,var(--spectrum-checkbox-invalid-color-focus)))}@media (hover:hover){:host(:hover) #box:before{border-color:var(--highcontrast-checkbox-highlight-color-hover,var(--mod-checkbox-control-color-hover,var(--spectrum-checkbox-control-color-hover)))}:host(:hover) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-highlight-color-hover,var(--mod-checkbox-control-selected-color-hover,var(--spectrum-checkbox-control-selected-color-hover)))}:host(:hover) #label{color:var(--highcontrast-checkbox-content-color-hover,var(--mod-checkbox-content-color-hover,var(--spectrum-checkbox-content-color-hover)))}:host([invalid][invalid]:hover) #box:before,:host([invalid][invalid]:hover) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-color-hover,var(--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)))}:host([indeterminate]:hover) #box:before,:host([indeterminate]:hover) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-highlight-color-hover,var(--mod-checkbox-control-selected-color-hover,var(--spectrum-checkbox-control-selected-color-hover)))}:host([invalid][invalid][indeterminate]:hover) #box:before,:host([invalid][invalid][indeterminate]:hover) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-color-default,var(--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)))}:host([invalid][invalid][indeterminate]:hover) #label{color:var(--highcontrast-checkbox-content-color-hover,var(--mod-checkbox-content-color-hover,var(--spectrum-checkbox-content-color-hover)))}:host([emphasized][invalid][invalid][indeterminate]:hover) #box:before,:host([emphasized][invalid][invalid][indeterminate]:hover) #input:checked+#box:before,:host([emphasized][invalid][invalid]:hover) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-color-hover,var(--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)))}:host([emphasized][indeterminate]:hover) #box:before,:host([emphasized][indeterminate]:hover) #input:checked+#box:before,:host([emphasized]:hover) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-highlight-color-hover,var(--mod-checkbox-emphasized-color-hover,var(--spectrum-checkbox-emphasized-color-hover)))}}:host([emphasized][indeterminate]:is(:active,[active])) #box:before,:host([emphasized][indeterminate]:is(:active,[active])) #input:checked+#box:before,:host([emphasized]:is(:active,[active])) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-highlight-color-default,var(--mod-checkbox-emphasized-color-down,var(--spectrum-checkbox-emphasized-color-down)))}:host([emphasized][invalid][invalid]:is(:active,[active])) #box:before,:host([emphasized][invalid][invalid]:is(:active,[active])) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-highlight-color-default,var(--mod-checkbox-control-invalid-color-down,var(--spectrum-checkbox-invalid-color-down)))}:host([emphasized]:focus-visible) #box:before,:host([emphasized]:focus-visible) #input:checked+#box:before{border-color:var(--highcontrast-checkbox-color-focus,var(--mod-checkbox-control-color-focus,var(--spectrum-checkbox-control-color-focus)))}#label{text-align:start;font-size:var(--mod-checkbox-font-size,var(--spectrum-checkbox-font-size));transition:color var(--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration))ease-in-out;line-height:var(--mod-checkbox-line-height,var(--spectrum-checkbox-line-height));margin-block-start:var(--mod-checkbox-top-to-text,var(--spectrum-checkbox-top-to-text));margin-inline-start:var(--mod-checkbox-text-to-control,var(--spectrum-checkbox-text-to-control))}#label:lang(ja),#label:lang(ko),#label:lang(zh){line-height:var(--mod-checkbox-line-height-cjk,var(--spectrum-checkbox-line-height-cjk))}#input{color:var(--mod-checkbox-control-color-default,var(--spectrum-checkbox-control-color-default));box-sizing:border-box;opacity:0;z-index:1;cursor:pointer;block-size:100%;inline-size:100%;margin:0;padding:0;font-family:inherit;font-size:100%;line-height:1.15;position:absolute;overflow:visible}#input:disabled{cursor:default}#input:checked+#box:before{border-color:var(--highcontrast-checkbox-highlight-color-default,var(--mod-checkbox-control-selected-color-default,var(--spectrum-checkbox-control-selected-color-default)));background-color:var(--mod-checkbox-checkmark-color,var(--spectrum-checkbox-checkmark-color));border-width:var(--mod-checkbox-selected-border-width,var(--spectrum-checkbox-selected-border-width))}#input:checked+#box #checkmark{opacity:1;transform:scale(1)}#input:focus-visible+#box:before{border-color:var(--highcontrast-checkbox-color-focus,var(--mod-checkbox-control-color-focus,var(--spectrum-checkbox-control-color-focus)))}#input:focus-visible+#box:after{forced-color-adjust:none;box-shadow:0 0 0 var(--mod-checkbox-focus-indicator-thinkness,var(--spectrum-checkbox-focus-indicator-thickness))var(--highcontrast-checkbox-focus-indicator-color,var(--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)));margin:calc(var(--mod-checkbox-focus-indicator-gap,var(--spectrum-checkbox-focus-indicator-gap))*-1)}#input:focus-visible+#label{color:var(--highcontrast-checkbox-content-color-focus,var(--mod-checkbox-content-color-focus,var(--spectrum-checkbox-content-color-focus)))}#input:focus-visible:checked+#box:before{border-color:var(--highcontrast-checkbox-highlight-color-focus,var(--mod-checkbox-control-selected-color-focus,var(--spectrum-checkbox-control-selected-color-focus)))}#box{--spectrum-checkbox-spacing:calc(var(--mod-checkbox-height,var(--spectrum-checkbox-height)) - var(--mod-checkbox-control-size,var(--spectrum-checkbox-control-size)));margin:calc(var(--mod-checkbox-spacing,var(--spectrum-checkbox-spacing))/2)0;flex-grow:0;flex-shrink:0;justify-content:center;align-items:center;display:flex;position:relative}#box,#box:before{box-sizing:border-box;inline-size:var(--mod-checkbox-control-size,var(--spectrum-checkbox-control-size));block-size:var(--mod-checkbox-control-size,var(--spectrum-checkbox-control-size))}#box:before{forced-color-adjust:none;border-color:var(--highcontrast-checkbox-color-default,var(--mod-checkbox-control-color-default,var(--spectrum-checkbox-control-color-default)));z-index:0;content:"";border-radius:var(--mod-checkbox-control-corner-radius,var(--spectrum-checkbox-control-corner-radius));border-width:var(--mod-checkbox-border-width,var(--spectrum-checkbox-border-width));transition:border var(--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration))ease-in-out,box-shadow var(--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration))ease-in-out;border-style:solid;display:block;position:absolute}#box:after{border-radius:calc(var(--mod-checkbox-control-corner-radius,var(--spectrum-checkbox-control-corner-radius)) + var(--mod-checkbox-focus-indicator-gap,var(--spectrum-checkbox-focus-indicator-gap)));content:"";margin:var(--mod-checkbox-focus-indicator-gap,var(--spectrum-checkbox-focus-indicator-gap));transition:box-shadow var(--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration))ease-out,margin var(--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration))ease-out;display:block;position:absolute;inset-block:0;inset-inline:0;transform:translate(0)}#checkmark,#partialCheckmark{color:var(--highcontrast-checkbox-background-color-default,var(--mod-checkbox-checkmark-color,var(--spectrum-checkbox-checkmark-color)));opacity:0;transition:opacity var(--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration))ease-in-out,transform var(--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration))ease-in-out;transform:scale(0)}#partialCheckmark{display:none}#input:checked:disabled+#box:before,#input:disabled+#box:before{border-color:var(--highcontrast-checkbox-disabled-color-default,var(--mod-checkbox-control-color-disabled,var(--spectrum-checkbox-control-color-disabled)));background-color:var(--highcontrast-checkbox-background-color-default,var(--mod-checkbox-checkmark-color,var(--spectrum-checkbox-checkmark-color)))}#input:checked:disabled~#label,#input:disabled~#label{forced-color-adjust:none;color:var(--highcontrast-checkbox-disabled-color-default,var(--mod-checkbox-content-color-disabled,var(--spectrum-checkbox-content-color-disabled)))}@media (forced-colors:active){#input:focus-visible+#box{forced-color-adjust:none;outline-color:var(--highcontrast-checkbox-focus-indicator-color,var(--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)));outline-offset:var(--mod-checkbox-focus-indicator-gap,var(--spectrum-checkbox-focus-indicator-gap));outline-style:auto;outline-width:var(--mod-focus-indicator-thickness,var(--spectrum-focus-indicator-thickness))}#input:focus-visible+#box:after{box-shadow:0 0 0 0 var(--highcontrast-checkbox-focus-indicator-color,var(--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)))}:host{--highcontrast-checkbox-content-color-default:CanvasText;--highcontrast-checkbox-content-color-hover:CanvasText;--highcontrast-checkbox-content-color-down:CanvasText;--highcontrast-checkbox-content-color-focus:CanvasText;--highcontrast-checkbox-background-color-default:Canvas;--highcontrast-checkbox-color-default:ButtonText;--highcontrast-checkbox-color-hover:ButtonText;--highcontrast-checkbox-color-focus:Highlight;--highcontrast-checkbox-highlight-color-default:Highlight;--highcontrast-checkbox-highlight-color-hover:Highlight;--highcontrast-checkbox-highlight-color-down:Highlight;--highcontrast-checkbox-highlight-color-focus:Highlight;--highcontrast-checkbox-disabled-color-default:GrayText;--highcontrast-checkbox-focus-indicator-color:CanvasText}}:host{--spectrum-checkbox-control-color-default:var(--system-checkbox-control-color-default);--spectrum-checkbox-control-color-hover:var(--system-checkbox-control-color-hover);--spectrum-checkbox-control-color-down:var(--system-checkbox-control-color-down);--spectrum-checkbox-control-color-focus:var(--system-checkbox-control-color-focus);--spectrum-checkbox-checkmark-color:var(--system-checkbox-checkmark-color);--spectrum-checkbox-control-corner-radius:var(--system-checkbox-control-corner-radius)}:host{vertical-align:top;display:inline-flex}:host(:focus){outline:none}:host([disabled]){pointer-events:none}:host(:empty) label{display:none}
`,spectrum_icon_checkmark_css=(__webpack_require__("./packages/icons-ui/icons/sp-icon-checkmark75.js"),__webpack_require__("./packages/icons-ui/icons/sp-icon-checkmark100.js"),__webpack_require__("./packages/icons-ui/icons/sp-icon-checkmark200.js"),__webpack_require__("./packages/icons-ui/icons/sp-icon-checkmark300.js"),__webpack_require__("./packages/icons-ui/icons/sp-icon-dash75.js"),__webpack_require__("./packages/icons-ui/icons/sp-icon-dash100.js"),__webpack_require__("./packages/icons-ui/icons/sp-icon-dash200.js"),__webpack_require__("./packages/icons-ui/icons/sp-icon-dash300.js"),__webpack_require__("./packages/icon/src/spectrum-icon-checkmark.css.js")),spectrum_icon_dash_css=__webpack_require__("./packages/icon/src/spectrum-icon-dash.css.js"),__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};const checkmarkIcon={s:()=>index_dev.qy`
            <sp-icon-checkmark75
                id="checkmark"
                class="spectrum-Icon spectrum-UIIcon-Checkmark75"
            ></sp-icon-checkmark75>
        `,m:()=>index_dev.qy`
            <sp-icon-checkmark100
                id="checkmark"
                class="spectrum-Icon spectrum-UIIcon-Checkmark100"
            ></sp-icon-checkmark100>
        `,l:()=>index_dev.qy`
            <sp-icon-checkmark200
                id="checkmark"
                class="spectrum-Icon spectrum-UIIcon-Checkmark200"
            ></sp-icon-checkmark200>
        `,xl:()=>index_dev.qy`
            <sp-icon-checkmark300
                id="checkmark"
                class="spectrum-Icon spectrum-UIIcon-Checkmark300"
            ></sp-icon-checkmark300>
        `},dashIcon={s:()=>index_dev.qy`
            <sp-icon-dash75
                id="partialCheckmark"
                class="spectrum-Icon spectrum-UIIcon-Dash75"
            ></sp-icon-dash75>
        `,m:()=>index_dev.qy`
            <sp-icon-dash100
                id="partialCheckmark"
                class="spectrum-Icon spectrum-UIIcon-Dash100"
            ></sp-icon-dash100>
        `,l:()=>index_dev.qy`
            <sp-icon-dash200
                id="partialCheckmark"
                class="spectrum-Icon spectrum-UIIcon-Dash200"
            ></sp-icon-dash200>
        `,xl:()=>index_dev.qy`
            <sp-icon-dash300
                id="partialCheckmark"
                class="spectrum-Icon spectrum-UIIcon-Dash300"
            ></sp-icon-dash300>
        `};class Checkbox extends((0,index_dev.ZG)((0,CheckboxMixin_dev.F)(index_dev.wG),{noDefaultSize:!0})){constructor(){super(...arguments),this.disabled=!1,this.indeterminate=!1,this.invalid=!1,this.emphasized=!1,this.tabIndex=0}connectedCallback(){super.connectedCallback(),this.hasAttribute("autofocus")&&this.updateComplete.then(()=>{this.focus()})}static get styles(){return[checkbox_css,spectrum_icon_checkmark_css.A,spectrum_icon_dash_css.A]}click(){var _a;this.disabled||null==(_a=this.inputElement)||_a.click()}handleChange(){this.indeterminate=!1,super.handleChange()}render(){return index_dev.qy`
            ${super.render()}
            <span id="box">
                ${this.checked?checkmarkIcon[this.size]():index_dev.qy``}
                ${this.indeterminate?dashIcon[this.size]():index_dev.qy``}
            </span>
            <label id="label" for="input"><slot></slot></label>
        `}updated(changes){super.updated(changes),changes.has("disabled")&&(void 0!==changes.get("disabled")||this.disabled)&&(this.disabled?(this.inputElement.tabIndex=this.tabIndex,this.tabIndex=-1):(this.tabIndex=this.inputElement.tabIndex,this.inputElement.removeAttribute("tabindex")),this.inputElement.disabled=this.disabled),changes.has("indeterminate")&&(this.inputElement.indeterminate=this.indeterminate),changes.has("invalid")&&(this.invalid?this.inputElement.setAttribute("aria-invalid","true"):this.inputElement.removeAttribute("aria-invalid"))}}Checkbox.shadowRootOptions={...index_dev.wG.shadowRootOptions,delegatesFocus:!0},__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Checkbox.prototype,"disabled",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Checkbox.prototype,"indeterminate",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Checkbox.prototype,"invalid",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Checkbox.prototype,"emphasized",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0,type:Number,attribute:"tabindex"})],Checkbox.prototype,"tabIndex",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-checkbox",Checkbox)},"./packages/icon/src/spectrum-icon-dash.css.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){const c=__webpack_require__("./tools/base/src/index.dev.js").AH`
    .spectrum-UIIcon-Dash50{--spectrum-icon-size:var(--spectrum-dash-icon-size-50)}.spectrum-UIIcon-Dash75{--spectrum-icon-size:var(--spectrum-dash-icon-size-75)}.spectrum-UIIcon-Dash100{--spectrum-icon-size:var(--spectrum-dash-icon-size-100)}.spectrum-UIIcon-Dash200{--spectrum-icon-size:var(--spectrum-dash-icon-size-200)}.spectrum-UIIcon-Dash300{--spectrum-icon-size:var(--spectrum-dash-icon-size-300)}.spectrum-UIIcon-Dash400{--spectrum-icon-size:var(--spectrum-dash-icon-size-400)}.spectrum-UIIcon-Dash500{--spectrum-icon-size:var(--spectrum-dash-icon-size-500)}.spectrum-UIIcon-Dash600{--spectrum-icon-size:var(--spectrum-dash-icon-size-600)}
`;__webpack_exports__.A=c},"./packages/icons-ui/icons/sp-icon-checkmark200.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-ui/src/custom-tag.js");var Checkmark200=__webpack_require__("./packages/icons-ui/src/icons/Checkmark200.js");class IconCheckmark200 extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:e=24,height:t=24,hidden:a=!1,title:r="Checkmark200"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
    width="${e}"
    height="${t}"
  >
    <path
      d="M4.313 10.98a1.04 1.04 0 0 1-.8-.375L.647 7.165a1.042 1.042 0 0 1 1.6-1.333l2.042 2.45 5.443-6.928a1.042 1.042 0 0 1 1.64 1.287l-6.24 7.94a1.04 1.04 0 0 1-.804.399z"
    />
  </svg>`)({hidden:!this.label,title:this.label}):(0,Checkmark200.R)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-checkmark200",IconCheckmark200)},"./packages/icons-ui/icons/sp-icon-checkmark300.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-ui/src/custom-tag.js");var Checkmark300=__webpack_require__("./packages/icons-ui/src/icons/Checkmark300.js");class IconCheckmark300 extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:e=24,height:t=24,hidden:a=!1,title:r="Checkmark300"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 14 14"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
    width="${e}"
    height="${t}"
  >
    <path
      d="M5.102 12.514a1.09 1.09 0 0 1-.834-.39L.988 8.19A1.085 1.085 0 0 1 2.656 6.8l2.421 2.906 6.243-7.947a1.085 1.085 0 0 1 1.707 1.34L5.955 12.1a1.09 1.09 0 0 1-.838.415z"
    />
  </svg>`)({hidden:!this.label,title:this.label}):(0,Checkmark300.M)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-checkmark300",IconCheckmark300)},"./packages/icons-ui/icons/sp-icon-checkmark75.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-ui/src/custom-tag.js");var Checkmark75=__webpack_require__("./packages/icons-ui/src/icons/Checkmark75.js");class IconCheckmark75 extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:e=24,height:t=24,hidden:a=!1,title:r="Checkmark75"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
    width="${e}"
    height="${t}"
  >
    <path
      d="M3.667 9.07a.96.96 0 0 1-.737-.344L.753 6.114a.96.96 0 1 1 1.474-1.23l1.418 1.701 4.112-5.233a.96.96 0 0 1 1.51 1.186L4.422 8.704a.96.96 0 0 1-.741.367z"
    />
  </svg>`)({hidden:!this.label,title:this.label}):(0,Checkmark75.n)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-checkmark75",IconCheckmark75)},"./packages/icons-ui/icons/sp-icon-dash100.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-ui/src/custom-tag.js");var Dash100=__webpack_require__("./packages/icons-ui/src/icons/Dash100.js");class IconDash100 extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:t=24,height:e=24,hidden:a=!1,title:r="Dash100"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
    width="${t}"
    height="${e}"
  >
    <path d="M8.5 6h-7a1 1 0 0 1 0-2h7a1 1 0 0 1 0 2" />
  </svg>`)({hidden:!this.label,title:this.label}):(0,Dash100.x)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-dash100",IconDash100)},"./packages/icons-ui/icons/sp-icon-dash200.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-ui/src/custom-tag.js");var Dash200=__webpack_require__("./packages/icons-ui/src/icons/Dash200.js");class IconDash200 extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:t=24,height:e=24,hidden:a=!1,title:r="Dash200"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
    width="${t}"
    height="${e}"
  >
    <path d="M10.021 7.042H1.98a1.042 1.042 0 1 1 0-2.083h8.043a1.042 1.042 0 0 1 0 2.083z" />
  </svg>`)({hidden:!this.label,title:this.label}):(0,Dash200.u)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-dash200",IconDash200)},"./packages/icons-ui/icons/sp-icon-dash300.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-ui/src/custom-tag.js");var Dash300=__webpack_require__("./packages/icons-ui/src/icons/Dash300.js");class IconDash300 extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:t=24,height:e=24,hidden:a=!1,title:r="Dash300"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
    width="${t}"
    height="${e}"
  >
    <path d="M10.61 7.085H1.39a1.085 1.085 0 0 1 0-2.17h9.22a1.085 1.085 0 0 1 0 2.17" />
  </svg>`)({hidden:!this.label,title:this.label}):(0,Dash300.P)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-dash300",IconDash300)},"./packages/icons-ui/icons/sp-icon-dash75.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-ui/src/custom-tag.js");var Dash75=__webpack_require__("./packages/icons-ui/src/icons/Dash75.js");class IconDash75 extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:t=24,height:e=24,hidden:a=!1,title:r="Dash75"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 8 8"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
    width="${t}"
    height="${e}"
  >
    <path d="M6.99 4.96H1.01a.96.96 0 0 1 0-1.92h5.98a.96.96 0 0 1 0 1.92" />
  </svg>`)({hidden:!this.label,title:this.label}):(0,Dash75.E)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-dash75",IconDash75)},"./packages/icons-ui/src/icons/Checkmark200.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{R:function(){return Checkmark200Icon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-ui/src/custom-tag.js");const Checkmark200Icon=({width:e=24,height:t=24,hidden:a=!1,title:r="Checkmark200"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
    width="${e}"
    height="${t}"
  >
    <path
      d="M4.313 10.98a1.04 1.04 0 0 1-.8-.375L.647 7.165a1.042 1.042 0 0 1 1.6-1.333l2.042 2.45 5.443-6.928a1.042 1.042 0 0 1 1.64 1.287l-6.24 7.94a1.04 1.04 0 0 1-.804.399z"
    />
  </svg>`},"./packages/icons-ui/src/icons/Checkmark300.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{M:function(){return Checkmark300Icon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-ui/src/custom-tag.js");const Checkmark300Icon=({width:e=24,height:t=24,hidden:a=!1,title:r="Checkmark300"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 14 14"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
    width="${e}"
    height="${t}"
  >
    <path
      d="M5.102 12.514a1.09 1.09 0 0 1-.834-.39L.988 8.19A1.085 1.085 0 0 1 2.656 6.8l2.421 2.906 6.243-7.947a1.085 1.085 0 0 1 1.707 1.34L5.955 12.1a1.09 1.09 0 0 1-.838.415z"
    />
  </svg>`},"./packages/icons-ui/src/icons/Checkmark75.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{n:function(){return Checkmark75Icon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-ui/src/custom-tag.js");const Checkmark75Icon=({width:e=24,height:t=24,hidden:a=!1,title:r="Checkmark75"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
    width="${e}"
    height="${t}"
  >
    <path
      d="M3.667 9.07a.96.96 0 0 1-.737-.344L.753 6.114a.96.96 0 1 1 1.474-1.23l1.418 1.701 4.112-5.233a.96.96 0 0 1 1.51 1.186L4.422 8.704a.96.96 0 0 1-.741.367z"
    />
  </svg>`},"./packages/icons-ui/src/icons/Dash100.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{x:function(){return Dash100Icon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-ui/src/custom-tag.js");const Dash100Icon=({width:t=24,height:e=24,hidden:a=!1,title:r="Dash100"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
    width="${t}"
    height="${e}"
  >
    <path d="M8.5 6h-7a1 1 0 0 1 0-2h7a1 1 0 0 1 0 2" />
  </svg>`},"./packages/icons-ui/src/icons/Dash200.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{u:function(){return Dash200Icon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-ui/src/custom-tag.js");const Dash200Icon=({width:t=24,height:e=24,hidden:a=!1,title:r="Dash200"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
    width="${t}"
    height="${e}"
  >
    <path d="M10.021 7.042H1.98a1.042 1.042 0 1 1 0-2.083h8.043a1.042 1.042 0 0 1 0 2.083z" />
  </svg>`},"./packages/icons-ui/src/icons/Dash300.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{P:function(){return Dash300Icon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-ui/src/custom-tag.js");const Dash300Icon=({width:t=24,height:e=24,hidden:a=!1,title:r="Dash300"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
    width="${t}"
    height="${e}"
  >
    <path d="M10.61 7.085H1.39a1.085 1.085 0 0 1 0-2.17h9.22a1.085 1.085 0 0 1 0 2.17" />
  </svg>`},"./packages/icons-ui/src/icons/Dash75.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{E:function(){return Dash75Icon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-ui/src/custom-tag.js");const Dash75Icon=({width:t=24,height:e=24,hidden:a=!1,title:r="Dash75"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 8 8"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
    width="${t}"
    height="${e}"
  >
    <path d="M6.99 4.96H1.01a.96.96 0 0 1 0-1.92h5.98a.96.96 0 0 1 0 1.92" />
  </svg>`}}]);
//# sourceMappingURL=7471.0ac2c82e.iframe.bundle.js.map