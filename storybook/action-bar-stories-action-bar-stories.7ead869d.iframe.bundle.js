"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[2096,5287],{"./packages/action-bar/sp-action-bar.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");__webpack_require__("./packages/popover/sp-popover.dev.js"),__webpack_require__("./packages/action-group/sp-action-group.dev.js"),__webpack_require__("./packages/button/sp-close-button.dev.js"),__webpack_require__("./packages/field-label/sp-field-label.dev.js");var action_bar_css=index_dev.AH`
    :host{--spectrum-actionbar-height:var(--spectrum-action-bar-height);--spectrum-actionbar-corner-radius:var(--spectrum-corner-radius-100);--spectrum-actionbar-item-counter-font-size:var(--spectrum-font-size-100);--spectrum-actionbar-item-counter-line-height:var(--spectrum-line-height-100);--spectrum-actionbar-item-counter-color:var(--spectrum-neutral-content-color-default);--spectrum-actionbar-emphasized-background-color:var(--spectrum-informative-background-color-default);--spectrum-actionbar-emphasized-item-counter-color:var(--spectrum-white);--spectrum-actionbar-spacing-outer-edge:var(--spectrum-spacing-300);--spectrum-actionbar-spacing-close-button-top:var(--spectrum-spacing-100);--spectrum-actionbar-spacing-close-button-start:var(--spectrum-spacing-100);--spectrum-actionbar-spacing-close-button-end:var(--spectrum-spacing-75);--spectrum-actionbar-spacing-item-counter-top:var(--spectrum-action-bar-top-to-item-counter);--spectrum-actionbar-spacing-item-counter-end:var(--spectrum-spacing-400);--spectrum-actionbar-spacing-action-group-top:var(--spectrum-spacing-100);--spectrum-actionbar-spacing-action-group-end:var(--spectrum-spacing-100);--spectrum-actionbar-shadow-horizontal:var(--spectrum-drop-shadow-x);--spectrum-actionbar-shadow-vertical:var(--spectrum-drop-shadow-y);--spectrum-actionbar-shadow-blur:var(--spectrum-drop-shadow-blur);--spectrum-actionbar-shadow-color:var(--spectrum-drop-shadow-color)}:host:lang(ja),:host:lang(ko),:host:lang(zh){--spectrum-actionbar-item-counter-line-height-cjk:var(--spectrum-cjk-line-height-100)}@media (forced-colors:active){:host,:host([emphasized]) #popover{--highcontrast-actionbar-popover-border-color:CanvasText}}:host{padding:0 var(--mod-actionbar-spacing-outer-edge,var(--spectrum-actionbar-spacing-outer-edge));z-index:1;box-sizing:border-box;pointer-events:none;opacity:0;block-size:0;inset-block-end:0}:host([open]){block-size:calc(var(--mod-actionbar-spacing-outer-edge,var(--spectrum-actionbar-spacing-outer-edge)) + var(--mod-actionbar-height,var(--spectrum-actionbar-height)));opacity:1}#popover{block-size:var(--mod-actionbar-height,var(--spectrum-actionbar-height));box-sizing:border-box;border-radius:var(--mod-actionbar-corner-radius,var(--spectrum-actionbar-corner-radius));border-color:var(--highcontrast-actionbar-popover-border-color,var(--mod-actionbar-popover-border-color,var(--spectrum-actionbar-popover-border-color)));background-color:var(--mod-actionbar-popover-background-color,var(--spectrum-actionbar-popover-background-color));inline-size:100%;filter:drop-shadow(var(--mod-actionbar-shadow-horizontal,var(--spectrum-actionbar-shadow-horizontal))var(--mod-actionbar-shadow-vertical,var(--spectrum-actionbar-shadow-vertical))var(--mod-actionbar-shadow-blur,var(--spectrum-actionbar-shadow-blur))var(--mod-actionbar-shadow-color,var(--spectrum-actionbar-shadow-color)));pointer-events:auto;flex-direction:row;margin:auto;padding-block:0;display:flex;position:relative}.close-button{flex-shrink:0;margin-block-start:var(--mod-actionbar-spacing-close-button-top,var(--spectrum-actionbar-spacing-close-button-top));margin-inline-start:var(--mod-actionbar-spacing-close-button-start,var(--spectrum-actionbar-spacing-close-button-start));margin-inline-end:var(--mod-actionbar-spacing-close-button-end,var(--spectrum-actionbar-spacing-close-button-end))}.field-label{font-size:var(--mod-actionbar-item-counter-font-size,var(--spectrum-actionbar-item-counter-font-size));color:var(--mod-actionbar-item-counter-color,var(--spectrum-actionbar-item-counter-color));line-height:var(--mod-actionbar-item-counter-line-height,var(--spectrum-actionbar-item-counter-line-height));margin-block-start:var(--mod-actionbar-spacing-item-counter-top,var(--spectrum-actionbar-spacing-item-counter-top));margin-inline-end:var(--mod-actionbar-spacing-item-counter-end,var(--spectrum-actionbar-spacing-item-counter-end));padding:0}.field-label:lang(ja),.field-label:lang(ko),.field-label:lang(zh){line-height:var(--mod-actionbar-item-counter-line-height-cjk,var(--spectrum-actionbar-item-counter-line-height-cjk))}.action-group{margin-block-start:var(--mod-actionbar-spacing-action-group-top,var(--spectrum-actionbar-spacing-action-group-top));margin-inline-start:auto;margin-inline-end:var(--mod-actionbar-spacing-action-group-end,var(--spectrum-actionbar-spacing-action-group-end))}:host([emphasized]) #popover{filter:none;background-color:var(--mod-actionbar-emphasized-background-color,var(--spectrum-actionbar-emphasized-background-color));border-color:#0000}:host([emphasized]) .field-label{color:var(--mod-actionbar-emphasized-item-counter-color,var(--spectrum-actionbar-emphasized-item-counter-color))}:host([variant=sticky]){position:sticky;inset-inline:0}:host([variant=fixed]){position:fixed}:host([flexible]) #popover{inline-size:auto}:host{--spectrum-actionbar-popover-background-color:var(--system-action-bar-popover-background-color);--spectrum-actionbar-popover-border-color:var(--system-action-bar-popover-border-color)}:host{display:block}:host([flexible]){display:inline-block}
`,directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),focus_visible_dev=__webpack_require__("./tools/shared/src/focus-visible.dev.js"),__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};const actionBarVariants=["sticky","fixed"];class ActionBar extends((0,focus_visible_dev.p)(index_dev.wG)){constructor(){super(...arguments),this.emphasized=!1,this.flexible=!1,this.open=!1,this._variant=""}static get styles(){return[action_bar_css]}set variant(variant){if(variant!==this.variant){if(actionBarVariants.includes(variant))return this.setAttribute("variant",variant),void(this._variant=variant);this.removeAttribute("variant"),this._variant=""}}get variant(){return this._variant}handleClick(){this.open=!1;this.dispatchEvent(new Event("close",{bubbles:!0,composed:!0,cancelable:!0}))||(this.open=!0)}render(){return index_dev.qy`
            <sp-popover ?open=${this.open} id="popover">
                <slot name="override">
                    <sp-close-button
                        static-color=${(0,directives_dev.JR)(this.emphasized?"white":void 0)}
                        class="close-button"
                        label="Clear selection"
                        @click=${this.handleClick}
                    ></sp-close-button>
                    <sp-field-label class="field-label">
                        <slot></slot>
                    </sp-field-label>
                    <sp-action-group
                        class="action-group"
                        quiet
                        static-color=${(0,directives_dev.JR)(this.emphasized?"white":void 0)}
                    >
                        <slot name="buttons"></slot>
                    </sp-action-group>
                </slot>
            </sp-popover>
        `}}__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],ActionBar.prototype,"emphasized",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],ActionBar.prototype,"flexible",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],ActionBar.prototype,"open",2),__decorateClass([(0,decorators_dev.MZ)({type:String})],ActionBar.prototype,"variant",1),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-action-bar",ActionBar)},"./packages/action-bar/stories/action-bar.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return action_bar_stories},emphasized:function(){return emphasized},fixed:function(){return fixed},flexible:function(){return flexible},hasActionMenuAsChild:function(){return hasActionMenuAsChild}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js");__webpack_require__("./packages/action-bar/sp-action-bar.dev.js"),__webpack_require__("./packages/field-label/sp-field-label.dev.js"),__webpack_require__("./packages/action-button/sp-action-button.dev.js"),__webpack_require__("./packages/action-group/sp-action-group.dev.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-edit.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-more.js"),__webpack_require__("./packages/action-menu/sp-action-menu.dev.js"),__webpack_require__("./packages/menu/sp-menu.dev.js"),__webpack_require__("./packages/menu/sp-menu-item.dev.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-share.js");var action_bar_stories={title:"Action Bar",component:"sp-action-bar",parameters:{design:{type:"figma",url:"https://www.figma.com/file/MPtRIVRzPp2VHiEplwXL2X/S-%2F-Manual?node-id=465%3A3127&t=xbooxCWItOFgG2xM-1"}}};const Default=()=>(({emphasized:emphasized,open:open,tools:tools=!0})=>index_dev.qy`
        <sp-action-bar ?open=${open} ?emphasized=${emphasized}>
            2 selected
            ${tools?index_dev.qy`
                      <sp-action-button slot="buttons" label="Edit">
                          <sp-icon-edit slot="icon"></sp-icon-edit>
                      </sp-action-button>
                      <sp-action-button slot="buttons" label="Share">
                          <sp-icon-share slot="icon"></sp-icon-share>
                      </sp-action-button>
                  `:index_dev.qy``}
        </sp-action-bar>
    `)({open:!0}),emphasized=()=>index_dev.qy`
        <sp-action-bar open emphasized>
            2 selected
            <sp-action-button slot="buttons" label="Edit">
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
        </sp-action-bar>
    `,fixed=()=>index_dev.qy`
        <style>
            [variant='fixed'] {
                bottom: 2.5em;
                inset-inline-end: 1em;
            }
        </style>
        <sp-action-bar open variant="fixed">
            2 selected
            <sp-action-button slot="buttons" label="Edit">
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
        </sp-action-bar>
    `,flexible=()=>index_dev.qy`
        <sp-action-bar open flexible emphasized>
            2 selected
            <sp-action-button slot="buttons" label="Edit">
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
        </sp-action-bar>
    `,hasActionMenuAsChild=()=>index_dev.qy`
        <sp-action-bar open>
            2 selected
            <sp-action-button slot="buttons" label="Edit">
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-menu label="More Actions" slot="buttons">
                <sp-menu-item>One</sp-menu-item>
                <sp-menu-item>Two</sp-menu-item>
                <sp-menu-item>
                    Select some items
                    <sp-menu slot="submenu" selects="multiple">
                        <sp-menu-item>A</sp-menu-item>
                        <sp-menu-item selected>B</sp-menu-item>
                        <sp-menu-item>C</sp-menu-item>
                    </sp-menu>
                </sp-menu-item>
            </sp-action-menu>
        </sp-action-bar>
    `,__namedExportsOrder=["Default","emphasized","fixed","flexible","hasActionMenuAsChild"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"() => Template({\n  open: true\n})",...Default.parameters?.docs?.source}}},emphasized.parameters={...emphasized.parameters,docs:{...emphasized.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-action-bar open emphasized>\n            2 selected\n            <sp-action-button slot="buttons" label="Edit">\n                <sp-icon-edit slot="icon"></sp-icon-edit>\n            </sp-action-button>\n        </sp-action-bar>\n    `;\n}',...emphasized.parameters?.docs?.source}}},fixed.parameters={...fixed.parameters,docs:{...fixed.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <style>\n            [variant=\'fixed\'] {\n                bottom: 2.5em;\n                inset-inline-end: 1em;\n            }\n        </style>\n        <sp-action-bar open variant="fixed">\n            2 selected\n            <sp-action-button slot="buttons" label="Edit">\n                <sp-icon-edit slot="icon"></sp-icon-edit>\n            </sp-action-button>\n        </sp-action-bar>\n    `;\n}',...fixed.parameters?.docs?.source}}},flexible.parameters={...flexible.parameters,docs:{...flexible.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-action-bar open flexible emphasized>\n            2 selected\n            <sp-action-button slot="buttons" label="Edit">\n                <sp-icon-edit slot="icon"></sp-icon-edit>\n            </sp-action-button>\n        </sp-action-bar>\n    `;\n}',...flexible.parameters?.docs?.source}}},hasActionMenuAsChild.parameters={...hasActionMenuAsChild.parameters,docs:{...hasActionMenuAsChild.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-action-bar open>\n            2 selected\n            <sp-action-button slot="buttons" label="Edit">\n                <sp-icon-edit slot="icon"></sp-icon-edit>\n            </sp-action-button>\n            <sp-action-menu label="More Actions" slot="buttons">\n                <sp-menu-item>One</sp-menu-item>\n                <sp-menu-item>Two</sp-menu-item>\n                <sp-menu-item>\n                    Select some items\n                    <sp-menu slot="submenu" selects="multiple">\n                        <sp-menu-item>A</sp-menu-item>\n                        <sp-menu-item selected>B</sp-menu-item>\n                        <sp-menu-item>C</sp-menu-item>\n                    </sp-menu>\n                </sp-menu-item>\n            </sp-action-menu>\n        </sp-action-bar>\n    `;\n}',...hasActionMenuAsChild.parameters?.docs?.source}}}},"./packages/action-menu/sp-action-menu.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),Picker_dev=__webpack_require__("./packages/picker/src/Picker.dev.js"),observe_slot_presence_dev=(__webpack_require__("./packages/action-button/sp-action-button.dev.js"),__webpack_require__("./tools/shared/src/observe-slot-presence.dev.js")),observe_slot_text_dev=__webpack_require__("./tools/shared/src/observe-slot-text.dev.js");__webpack_require__("./packages/icons-workflow/icons/sp-icon-more.js");var action_menu_css=index_dev.AH`
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
        `}update(changedProperties){changedProperties.has("invalid")&&(this.invalid=!1),super.update(changedProperties)}hasAccessibleLabel(){return!!this.label||!!this.getAttribute("aria-label")||!!this.getAttribute("aria-labelledby")||!!this.appliedLabel||this.hasLabel||this.labelOnly}warnNoLabel(){window.__swc.warn(this,`<${this.localName}> needs one of the following to be accessible:`,"https://opensource.adobe.com/spectrum-web-components/components/action-menu/#accessibility",{type:"accessibility",issues:[`an <sp-field-label> element with a \`for\` attribute referencing the \`id\` of the \`<${this.localName}>\`, or`,'value supplied to the "label" attribute, which will be displayed visually as placeholder text','text content supplied in a <span> with slot="label", or, text content supplied in a <span> with slot="label-only"',"which will also be displayed visually as placeholder text."]})}}__decorateClass([(0,decorators_dev.MZ)({type:String})],ActionMenu.prototype,"selects",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0,attribute:"static-color"})],ActionMenu.prototype,"staticColor",2),__decorateClass([(0,decorators_dev.wk)()],ActionMenu.prototype,"labelOnly",1),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-action-menu",ActionMenu)},"./packages/button/sp-close-button.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _src_CloseButton_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/button/src/CloseButton.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-close-button",_src_CloseButton_dev_js__WEBPACK_IMPORTED_MODULE_0__.J)},"./packages/icons-workflow/icons/sp-icon-edit.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var Edit=__webpack_require__("./packages/icons-workflow/src/icons/Edit.js");class IconEdit extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:t=24,height:l=24,hidden:e=!1,title:r="Edit"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${t}"
    height="${l}"
    viewBox="0 0 20 20"
    aria-hidden=${e?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="m17.78076,1.75684c-1.27197-1.04102-3.22705-.89844-4.4502.32324L3.07764,12.33398c-.32031.31934-.55859.7168-.68896,1.15039l-1.38428,4.58398c-.08008.26465-.00781.55176.1875.74707.14258.14258.33447.21973.53027.21973.07227,0,.14551-.01074.2168-.03223l4.58252-1.38379c.43359-.12988.83154-.36816,1.15088-.68848,0,0,10.16846-10.16797,10.35547-10.35547.64795-.64746.99316-1.54492.94775-2.45996-.0459-.91504-.48145-1.77539-1.19482-2.3584ZM2.84473,17.16309l.97998-3.24609c.02716-.09033.06714-.17578.11377-.25732l2.40869,2.40918c-.08154.04639-.16718.08643-.25781.11377l-3.24463.98047Zm14.12158-11.64746c-.15472.15552-7.09985,7.1001-9.52545,9.52588l-2.47461-2.4751L14.39111,3.14062c.38623-.38672.896-.58594,1.38965-.58594.38086,0,.75244.11914,1.05029.3623.3916.32129.62109.77246.646,1.27246.0249.49316-.16113.97656-.51074,1.32617Z"
      fill="currentColor"
    />
  </svg>`)({hidden:!this.label,title:this.label}):(0,Edit.q)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-edit",IconEdit)},"./packages/icons-workflow/icons/sp-icon-more.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var More=__webpack_require__("./packages/icons-workflow/src/icons/More.js");class IconMore extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:r=24,height:l=24,hidden:e=!1,title:c="More"}={})=>custom_tag.T`<svg
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
  </svg>`)({hidden:!this.label,title:this.label}):(0,More.Z)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-more",IconMore)},"./packages/icons-workflow/icons/sp-icon-share.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var Share=__webpack_require__("./packages/icons-workflow/src/icons/Share.js");class IconShare extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:e=24,height:l=24,hidden:t=!1,title:r="Share"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${e}"
    height="${l}"
    viewBox="0 0 20 20"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="m13.52734,5.49023l-3.00244-2.99756c-.29297-.29199-.76709-.29248-1.06006.00049l-2.99756,2.99756c-.29297.29297-.29297.76758,0,1.06055.14648.14648.33838.21973.53027.21973s.38379-.07324.53027-.21973l1.72217-1.72217v8.18115c0,.41406.33594.75.75.75s.75-.33594.75-.75V4.83667l1.71777,1.71509c.29297.29199.76758.29297,1.06055-.00098.29248-.29297.29248-.76807-.00098-1.06055Z"
      fill="currentColor"
    />
    <path
      d="m15.75,18.021H4.25c-1.24072,0-2.25-1.00928-2.25-2.25v-5.75c0-.41406.33594-.75.75-.75s.75.33594.75.75v5.75c0,.41357.33643.75.75.75h11.5c.41357,0,.75-.33643.75-.75v-5.75c0-.41406.33594-.75.75-.75s.75.33594.75.75v5.75c0,1.24072-1.00928,2.25-2.25,2.25Z"
      fill="currentColor"
    />
  </svg>`)({hidden:!this.label,title:this.label}):(0,Share.l)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-share",IconShare)},"./packages/icons-workflow/src/icons/Edit.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{q:function(){return EditIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const EditIcon=({width:t=24,height:e=24,hidden:a=!1,title:l="Edit"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${t}"
    aria-hidden=${a?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path
      d="M33.567 8.2 27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945ZM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73Z"
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
  </svg>`},"./packages/icons-workflow/src/icons/Share.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{l:function(){return ShareIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const ShareIcon=({width:a=24,height:e=24,hidden:t=!1,title:r="Share"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${a}"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="M33 10h-6a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h3v16H6V14h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v22a1 1 0 0 0 1 1h30a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1Z"
    />
    <path
      d="M10.8 8H16v11a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h5.2a.8.8 0 0 0 .8-.8.787.787 0 0 0-.2-.527L18.351.144a.5.5 0 0 0-.7 0L10.2 6.668a.787.787 0 0 0-.2.532.8.8 0 0 0 .8.8Z"
    />
  </svg>`},"./packages/popover/sp-popover.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var _src_Popover_dev_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/popover/src/Popover.dev.js");(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-popover",_src_Popover_dev_js__WEBPACK_IMPORTED_MODULE_0__.A)},"./packages/popover/src/Popover.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:function(){return Popover}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");var popover_css=index_dev.AH`
    :host{pointer-events:none;visibility:hidden;opacity:0;transition:transform .13s ease-in-out,opacity .13s ease-in-out,visibility 0s linear .13s;transition:transform var(--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s))ease-in-out,opacity var(--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s))ease-in-out,visibility 0s linear var(--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s))}:host([open]){pointer-events:auto;visibility:visible;opacity:1;transition-delay:0s;transition-delay:var(--mod-overlay-animation-duration-opened,var(--spectrum-animation-duration-0,0s))}:host{--spectrum-popover-animation-distance:var(--spectrum-spacing-100);--spectrum-popover-background-color:var(--spectrum-background-layer-2-color);--spectrum-popover-border-color:var(--spectrum-gray-400);--spectrum-popover-content-area-spacing-vertical:var(--spectrum-popover-top-to-content-area);--spectrum-popover-shadow-horizontal:var(--spectrum-drop-shadow-x);--spectrum-popover-shadow-vertical:var(--spectrum-drop-shadow-y);--spectrum-popover-shadow-blur:var(--spectrum-drop-shadow-blur);--spectrum-popover-shadow-color:var(--spectrum-drop-shadow-color);--spectrum-popover-corner-radius:var(--spectrum-corner-radius-100);--spectrum-popover-pointer-width:var(--spectrum-popover-tip-width);--spectrum-popover-pointer-height:var(--spectrum-popover-tip-height);--spectrum-popover-pointer-edge-offset:calc(var(--spectrum-corner-radius-100) + var(--spectrum-popover-tip-width)/2);--spectrum-popover-pointer-edge-spacing:calc(var(--spectrum-popover-pointer-edge-offset) - var(--spectrum-popover-tip-width)/2)}@media (forced-colors:active){:host{--highcontrast-popover-border-color:CanvasText}}:host{--spectrum-popover-filter:drop-shadow(var(--mod-popover-shadow-horizontal,var(--spectrum-popover-shadow-horizontal))var(--mod-popover-shadow-vertical,var(--spectrum-popover-shadow-vertical))var(--mod-popover-shadow-blur,var(--spectrum-popover-shadow-blur))var(--mod-popover-shadow-color,var(--spectrum-popover-shadow-color)));box-sizing:border-box;padding:var(--mod-popover-content-area-spacing-vertical,var(--spectrum-popover-content-area-spacing-vertical))0;border-radius:var(--mod-popover-corner-radius,var(--spectrum-popover-corner-radius));border-style:solid;border-color:var(--highcontrast-popover-border-color,var(--mod-popover-border-color,var(--spectrum-popover-border-color)));border-width:var(--mod-popover-border-width,var(--spectrum-popover-border-width));background-color:var(--mod-popover-background-color,var(--spectrum-popover-background-color));filter:var(--mod-popover-filter,var(--spectrum-popover-filter));outline:none;flex-direction:column;display:inline-flex;position:absolute}:host([tip]){overflow:visible}:host([tip]) #tip .triangle{stroke-linecap:square;stroke-linejoin:miter;fill:var(--mod-popover-background-color,var(--spectrum-popover-background-color));stroke:var(--highcontrast-popover-border-color,var(--mod-popover-border-color,var(--spectrum-popover-border-color)));stroke-width:var(--mod-popover-border-width,var(--spectrum-popover-border-width))}*{--mod-popover-filter:none}:host([tip]) .spectrum-Popover--top-end,:host([tip]) .spectrum-Popover--top-left,:host([tip]) .spectrum-Popover--top-right,:host([tip]) .spectrum-Popover--top-start,:host([placement*=top][tip]){margin-block-end:calc(var(--mod-popover-pointer-height,var(--spectrum-popover-pointer-height)) - var(--mod-popover-border-width,var(--spectrum-popover-border-width)))}:host([open]) .spectrum-Popover--top-end,:host([open]) .spectrum-Popover--top-left,:host([open]) .spectrum-Popover--top-right,:host([open]) .spectrum-Popover--top-start,:host([placement*=top][open]){transform:translateY(calc(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance))*-1))translateZ(0)}:host([tip]) .spectrum-Popover--bottom-end,:host([tip]) .spectrum-Popover--bottom-left,:host([tip]) .spectrum-Popover--bottom-right,:host([tip]) .spectrum-Popover--bottom-start,:host([placement*=bottom][tip]){margin-block-start:calc(var(--mod-popover-pointer-height,var(--spectrum-popover-pointer-height)) - var(--mod-popover-border-width,var(--spectrum-popover-border-width)))}:host([open]) .spectrum-Popover--bottom-end,:host([open]) .spectrum-Popover--bottom-left,:host([open]) .spectrum-Popover--bottom-right,:host([open]) .spectrum-Popover--bottom-start,:host([placement*=bottom][open]){transform:translateY(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance)))translateZ(0)}:host([tip]) .spectrum-Popover--right-bottom,:host([tip]) .spectrum-Popover--right-top,:host([placement*=right][tip]){margin-left:calc(var(--mod-popover-pointer-width,var(--spectrum-popover-pointer-width)) - var(--mod-popover-border-width,var(--spectrum-popover-border-width)))}:host([open]) .spectrum-Popover--right-bottom,:host([open]) .spectrum-Popover--right-top,:host([placement*=right][open]){transform:translateX(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance)))translateZ(0)}:host([tip]) .spectrum-Popover--left-bottom,:host([tip]) .spectrum-Popover--left-top,:host([placement*=left][tip]){margin-right:calc(var(--mod-popover-pointer-width,var(--spectrum-popover-pointer-width)) - var(--mod-popover-border-width,var(--spectrum-popover-border-width)))}:host([open]) .spectrum-Popover--left-bottom,:host([open]) .spectrum-Popover--left-top,:host([placement*=left][open]){transform:translateX(calc(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance))*-1))translateZ(0)}:host([tip]) .spectrum-Popover--start-bottom,:host([tip]) .spectrum-Popover--start-top,:host([tip]) .spectrum-Popover--start{margin-inline-end:calc(var(--mod-popover-pointer-width,var(--spectrum-popover-pointer-width)) - var(--mod-popover-border-width,var(--spectrum-popover-border-width)))}:host([open]) .spectrum-Popover--start-bottom,:host([open]) .spectrum-Popover--start-top,:host([open]) .spectrum-Popover--start{transform:translateX(calc(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance))*-1))translateZ(0)}:host([open]) .spectrum-Popover--start-bottom:dir(rtl),:host([open]) .spectrum-Popover--start-top:dir(rtl),:host([open]) .spectrum-Popover--start:dir(rtl),:host([dir=rtl][open]) .spectrum-Popover--start-bottom,:host([dir=rtl][open]) .spectrum-Popover--start-top,:host([dir=rtl][open]) .spectrum-Popover--start{transform:translateX(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance)))translateZ(0)}:host([tip]) .spectrum-Popover--end-bottom,:host([tip]) .spectrum-Popover--end-top,:host([tip]) .spectrum-Popover--end{margin-inline-start:calc(var(--mod-popover-pointer-width,var(--spectrum-popover-pointer-width)) - var(--mod-popover-border-width,var(--spectrum-popover-border-width)))}:host([open]) .spectrum-Popover--end-bottom,:host([open]) .spectrum-Popover--end-top,:host([open]) .spectrum-Popover--end{transform:translateX(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance)))translateZ(0)}:host([open]) .spectrum-Popover--end-bottom:dir(rtl),:host([open]) .spectrum-Popover--end-top:dir(rtl),:host([open]) .spectrum-Popover--end:dir(rtl),:host([dir=rtl][open]) .spectrum-Popover--end-bottom,:host([dir=rtl][open]) .spectrum-Popover--end-top,:host([dir=rtl][open]) .spectrum-Popover--end{transform:translateX(calc(var(--mod-popover-animation-distance,var(--spectrum-popover-animation-distance))*-1))translateZ(0)}:host([tip]) #tip,:host([tip][placement*=bottom]) #tip,:host([tip]) .spectrum-Popover--bottom-end #tip,:host([tip]) .spectrum-Popover--bottom-left #tip,:host([tip]) .spectrum-Popover--bottom-right #tip,:host([tip]) .spectrum-Popover--bottom-start #tip,:host([tip][placement*=top]) #tip,:host([tip]) .spectrum-Popover--top-end #tip,:host([tip]) .spectrum-Popover--top-left #tip,:host([tip]) .spectrum-Popover--top-right #tip,:host([tip]) .spectrum-Popover--top-start #tip{inline-size:var(--mod-popover-pointer-width,var(--spectrum-popover-pointer-width));block-size:var(--mod-popover-pointer-height,var(--spectrum-popover-pointer-height));margin:auto;position:absolute;inset-block-start:100%;inset-inline:0;transform:translate(0)}:host([tip]) .spectrum-Popover--top-left #tip{inset-inline:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))auto}:host([tip]) .spectrum-Popover--top-right #tip{inset-inline:auto var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip]) .spectrum-Popover--top-start #tip{margin-inline-start:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip]) .spectrum-Popover--top-end #tip{margin-inline-end:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip][placement*=bottom]) #tip,:host([tip]) .spectrum-Popover--bottom-end #tip,:host([tip]) .spectrum-Popover--bottom-left #tip,:host([tip]) .spectrum-Popover--bottom-right #tip,:host([tip]) .spectrum-Popover--bottom-start #tip{inset-block:auto 100%;transform:scaleY(-1)}:host([tip]) .spectrum-Popover--bottom-left #tip{inset-inline:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))auto}:host([tip]) .spectrum-Popover--bottom-right #tip{inset-inline:auto var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip]) .spectrum-Popover--bottom-start #tip{margin-inline-start:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip]) .spectrum-Popover--bottom-end #tip{margin-inline-end:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip]) .spectrum-Popover--end #tip,:host([tip]) .spectrum-Popover--end-bottom #tip,:host([tip]) .spectrum-Popover--end-top #tip,:host([tip][placement*=left]) #tip,:host([tip]) .spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--left-top #tip,:host([tip][placement*=right]) #tip,:host([tip]) .spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--start #tip,:host([tip]) .spectrum-Popover--start-bottom #tip,:host([tip]) .spectrum-Popover--start-top #tip{inline-size:var(--mod-popover-pointer-height,var(--spectrum-popover-pointer-height));block-size:var(--mod-popover-pointer-width,var(--spectrum-popover-pointer-width));inset-block:0}:host([tip][placement*=left]) #tip,:host([tip]) .spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--left-top #tip{left:100%;right:auto}:host([tip][placement*=right]) #tip,:host([tip]) .spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--right-top #tip{left:auto;right:100%;transform:scaleX(-1)}:host([tip]) .spectrum-Popover--end-top #tip,:host([tip]) .spectrum-Popover--left-top #tip,:host([tip]) .spectrum-Popover--right-top #tip,:host([tip]) .spectrum-Popover--start-top #tip{inset-block:var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))auto}:host([tip]) .spectrum-Popover--end-bottom #tip,:host([tip]) .spectrum-Popover--left-bottom #tip,:host([tip]) .spectrum-Popover--right-bottom #tip,:host([tip]) .spectrum-Popover--start-bottom #tip{inset-block:auto var(--mod-popover-pointer-edge-spacing,var(--spectrum-popover-pointer-edge-spacing))}:host([tip]) .spectrum-Popover--start #tip,:host([tip]) .spectrum-Popover--start-bottom #tip,:host([tip]) .spectrum-Popover--start-top #tip{margin-inline-start:100%}:host([tip]) .spectrum-Popover--start #tip:dir(rtl),:host([tip]) .spectrum-Popover--start-bottom #tip:dir(rtl),:host([tip]) .spectrum-Popover--start-top #tip:dir(rtl),:host([dir=rtl][tip]) .spectrum-Popover--start #tip,:host([dir=rtl][tip]) .spectrum-Popover--start-bottom #tip,:host([dir=rtl][tip]) .spectrum-Popover--start-top #tip{transform:none}:host([tip]) .spectrum-Popover--end #tip,:host([tip]) .spectrum-Popover--end-bottom #tip,:host([tip]) .spectrum-Popover--end-top #tip{margin-inline-end:100%;transform:scaleX(-1)}:host([tip]) .spectrum-Popover--end #tip:dir(rtl),:host([tip]) .spectrum-Popover--end-bottom #tip:dir(rtl),:host([tip]) .spectrum-Popover--end-top #tip:dir(rtl),:host([dir=rtl][tip]) .spectrum-Popover--end #tip,:host([dir=rtl][tip]) .spectrum-Popover--end-bottom #tip,:host([dir=rtl][tip]) .spectrum-Popover--end-top #tip{transform:scaleX(1)}:host{--spectrum-popover-border-width:var(--system-popover-border-width)}:host{min-width:min-content;max-width:100%;max-height:100%;inline-size:var(--mod-popover-inline-size);clip-path:none}::slotted(*){overscroll-behavior:contain}:host([placement*=left]) #tip[style],:host([placement*=right]) #tip[style]{inset-block-end:auto}:host([placement*=top]) #tip[style],:host([placement*=bottom]) #tip[style]{inset-inline-end:auto}.block,.inline{width:100%;height:100%;display:block}:host([placement*=left]) .block,:host([placement*=right]) .block,:host([placement*=top]) .inline,:host([placement*=bottom]) .inline{display:none}::slotted(.visually-hidden){clip:rect(0,0,0,0);clip-path:inset(50%);white-space:nowrap;border:0;width:1px;height:1px;margin:0 -1px -1px 0;padding:0;position:absolute;overflow:hidden}::slotted(sp-menu){margin:0}:host([dialog]){min-width:var(--mod-popover-dialog-min-width,var(--spectrum-popover-dialog-min-width,270px));padding:var(--mod-popover-dialog-padding,var(--spectrum-popover-dialog-padding,30px 29px))}:host([tip][placement]) #tip{height:auto}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class Popover extends index_dev.wG{constructor(){super(...arguments),this.open=!1,this.tip=!1}static get styles(){return[popover_css]}renderTip(){return index_dev.qy`
            <div id="tip" aria-hidden="true">
                <svg class="tip block" viewBox="0 -0.5 16 9">
                    <path class="triangle" d="M-1,-1 8,8 17,-1"></path>
                </svg>
                <svg class="tip inline" viewBox="0 -0.5 9 16">
                    <path class="triangle" d="M-1,-1 8,8 -1,17"></path>
                </svg>
            </div>
        `}render(){return index_dev.qy`
            <slot></slot>
            ${this.tip?this.renderTip():index_dev.s6}
        `}}__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Popover.prototype,"open",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],Popover.prototype,"placement",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],Popover.prototype,"tip",2),__decorateClass([(0,decorators_dev.P)("#tip")],Popover.prototype,"tipElement",2)}}]);
//# sourceMappingURL=action-bar-stories-action-bar-stories.7ead869d.iframe.bundle.js.map