"use strict";(self.webpackChunk_adobe_spectrum_web_components=self.webpackChunk_adobe_spectrum_web_components||[]).push([[1082,8444,8701],{"./node_modules/lit/async-directive.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Kq:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.Kq},u$:function(){return lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__.u$}});var lit_html_async_directive_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit-html/development/async-directive.js")},"./node_modules/lit/html.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{s6:function(){return lit_html__WEBPACK_IMPORTED_MODULE_0__.s6}});var lit_html__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit-html/development/lit-html.js")},"./packages/action-group/stories/action-group.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},HasActionMenuAsChild:function(){return HasActionMenuAsChild},__namedExportsOrder:function(){return __namedExportsOrder},compact:function(){return compact},compactIconsOnly:function(){return compactIconsOnly},compactJustifiedIconsOnly:function(){return compactJustifiedIconsOnly},compactQuietIconsOnly:function(){return compactQuietIconsOnly},compactQuietVerticalIconsOnly:function(){return compactQuietVerticalIconsOnly},compactVertical:function(){return compactVertical},compactVerticalIconsOnly:function(){return compactVerticalIconsOnly},iconsOnly:function(){return iconsOnly},justified:function(){return justified},justifiedIconsOnly:function(){return justifiedIconsOnly},quietIconsOnly:function(){return quietIconsOnly},selectsMultiple:function(){return selectsMultiple},selectsMultipleControlled:function(){return selectsMultipleControlled},selectsMultipleWithTooltips:function(){return selectsMultipleWithTooltips},selectsSingle:function(){return selectsSingle},vertical:function(){return vertical},verticalIconsOnly:function(){return verticalIconsOnly},verticalQuietIconsOnly:function(){return verticalQuietIconsOnly}});var _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/index.dev.js"),_test_lit_helpers_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./test/lit-helpers.js");__webpack_require__("./packages/action-group/sp-action-group.dev.js"),__webpack_require__("./packages/action-button/sp-action-button.dev.js"),__webpack_require__("./packages/overlay/overlay-trigger.dev.js"),__webpack_require__("./packages/tooltip/sp-tooltip.dev.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-properties.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-info.js"),__webpack_require__("./packages/icons-workflow/icons/sp-icon-view-all-tags.js"),__webpack_require__("./packages/action-menu/sp-action-menu.dev.js"),__webpack_require__("./packages/menu/sp-menu.dev.js"),__webpack_require__("./packages/menu/sp-menu-item.dev.js");function renderIconButtons(args){return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-action-group ${(0,_test_lit_helpers_js__WEBPACK_IMPORTED_MODULE_1__.i)(args)}>
            <sp-action-button label="Properties">
                <sp-icon-properties slot="icon"></sp-icon-properties>
            </sp-action-button>
            <sp-action-button label="Info">
                <sp-icon-info slot="icon"></sp-icon-info>
            </sp-action-button>
            <sp-action-button label="View All Tags">
                <sp-icon-view-all-tags slot="icon"></sp-icon-view-all-tags>
            </sp-action-button>
        </sp-action-group>
    `}function renderButtons(args){return _spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-action-group ${(0,_test_lit_helpers_js__WEBPACK_IMPORTED_MODULE_1__.i)(args)}>
            <sp-action-button>Button 1</sp-action-button>
            <sp-action-button>Longer Button 2</sp-action-button>
            <sp-action-button>Short 3</sp-action-button>
        </sp-action-group>
    `}function displaySelectionState(){const group=document.querySelector("sp-action-group"),selectedDiv=group.nextElementSibling;selectedDiv&&(selectedDiv.textContent=`Selected: ${JSON.stringify(group.selected)}`)}__webpack_exports__.default={title:"Action Group",component:"sp-action-group",args:{compact:!1,emphasized:!1,justified:!1,quiet:!1,vertical:!1,size:"m"},argTypes:{compact:{name:"compact",description:"Visually joins the buttons together to clarify their relationship to one another.",type:{name:"boolean",required:!1},table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},emphasized:{name:"emphasized",type:{name:"boolean",required:!1},table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},justified:{name:"justified",description:"Aligns the action group items to use all the available space on that line.",type:{name:"boolean",required:!1},table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},quiet:{name:"quiet",type:{name:"boolean",required:!1},table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},vertical:{name:"vertical",description:"Changes the orientation of the action group.",type:{name:"boolean",required:!1},table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},size:{name:"size",description:"The size at which to display the action group.",type:{name:"string",required:!0},table:{type:{summary:'"s" | "m" | "l" | "xl"'},defaultValue:{summary:"m"}},control:{type:"select",options:["s","m","l","xl"]}}}};const Default=args=>renderButtons(args),HasActionMenuAsChild=args=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-action-group ${(0,_test_lit_helpers_js__WEBPACK_IMPORTED_MODULE_1__.i)(args)}>
            <sp-action-button id="first">Button 1</sp-action-button>
            <sp-action-button id="second">Longer Button 2</sp-action-button>
            <sp-action-button id="third">Short 3</sp-action-button>
            <sp-action-menu label="More Actions" id="action-menu">
                <sp-menu-item id="first-menu-item">One</sp-menu-item>
                <sp-menu-item id="second-menu-item">Two</sp-menu-item>
                <sp-menu-item id="third-menu-item">Three</sp-menu-item>
                <sp-menu-item id="fourth-menu-item">
                    Select some items
                    <sp-menu slot="submenu" selects="multiple">
                        <sp-menu-item id="first-sub-menu-item">A</sp-menu-item>
                        <sp-menu-item selected id="second-sub-menu-item">
                            B
                        </sp-menu-item>
                        <sp-menu-item id="third-sub-menu-item">C</sp-menu-item>
                    </sp-menu>
                </sp-menu-item>
            </sp-action-menu>
        </sp-action-group>
    `,selectsSingle=args=>(requestAnimationFrame(displaySelectionState),_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-action-group
            ?compact=${args.compact}
            ?emphasized=${args.emphasized}
            ?quiet=${args.quiet}
            ?justified=${args.justified}
            ?vertical=${args.vertical}
            size=${args.size}
            label="Favorite Color"
            selects="single"
            @change=${({target:target})=>{target.nextElementSibling.textContent=`Selected: ${JSON.stringify(target.selected)}`}}
        >
            <sp-action-button>Red</sp-action-button>
            <sp-action-button>Green</sp-action-button>
            <sp-action-button>Blue</sp-action-button>
            <sp-action-button selected>Yellow</sp-action-button>
        </sp-action-group>
        <div>Selected:</div>
    `),selectsMultiple=args=>(requestAnimationFrame(displaySelectionState),_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-action-group
            ${(0,_test_lit_helpers_js__WEBPACK_IMPORTED_MODULE_1__.i)(args)}
            label="Favorite Colors"
            selects="multiple"
            size=${args.size}
            @change=${({target:target})=>{target.nextElementSibling.textContent=`Selected: ${JSON.stringify(target.selected)}`}}
        >
            <sp-action-button>Red</sp-action-button>
            <sp-action-button selected>Green</sp-action-button>
            <sp-action-button selected>Blue</sp-action-button>
            <sp-action-button>Yellow</sp-action-button>
        </sp-action-group>
        <div>Selected:</div>
    `),selectsMultipleWithTooltips=args=>_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-action-group
            ${(0,_test_lit_helpers_js__WEBPACK_IMPORTED_MODULE_1__.i)(args)}
            label="Favorite Color"
            selects="multiple"
            size=${args.size}
            @change=${({target:target})=>{target.nextElementSibling.textContent=`Selected: ${JSON.stringify(target.selected)}`}}
        >
            <overlay-trigger>
                <sp-action-button slot="trigger">Red</sp-action-button>
                <sp-tooltip slot="hover-content">
                    This is a cool color.
                </sp-tooltip>
            </overlay-trigger>
            <overlay-trigger>
                <sp-action-button slot="trigger">Green</sp-action-button>
                <sp-tooltip slot="hover-content">
                    You wouldn't be wrong.
                </sp-tooltip>
            </overlay-trigger>
            <overlay-trigger>
                <sp-action-button slot="trigger">Blue</sp-action-button>
                <sp-tooltip slot="hover-content">The sky in spring.</sp-tooltip>
            </overlay-trigger>
            <overlay-trigger>
                <sp-action-button slot="trigger">Yellow</sp-action-button>
                <sp-tooltip slot="hover-content">The sun at noon.</sp-tooltip>
            </overlay-trigger>
        </sp-action-group>
        <div>Selected:</div>
    `,selectsMultipleControlled=args=>(requestAnimationFrame(displaySelectionState),_spectrum_web_components_base__WEBPACK_IMPORTED_MODULE_0__.qy`
        <sp-action-group
            ${(0,_test_lit_helpers_js__WEBPACK_IMPORTED_MODULE_1__.i)(args)}
            selects="multiple"
            .selected=${["donuts","crepecakes"]}
            label="Favorite Dessert"
            size=${args.size}
            @change=${({target:target})=>{target.nextElementSibling.textContent=`Selected: ${JSON.stringify(target.selected)}`}}
        >
            <sp-action-button value="lavacakes">Lava Cakes</sp-action-button>
            <sp-action-button value="donuts">Donuts</sp-action-button>
            <sp-action-button value="crepecakes">Crepe Cake</sp-action-button>
            <sp-action-button value="fruittarts">Fruit Tarts</sp-action-button>
        </sp-action-group>
        <div>Selected:</div>
    `),iconsOnly=args=>renderIconButtons(args),quietIconsOnly=args=>renderIconButtons(args);quietIconsOnly.args={quiet:!0};const compact=args=>renderButtons(args);compact.args={compact:!0};const compactIconsOnly=args=>renderIconButtons(args);compactIconsOnly.args={compact:!0};const compactQuietIconsOnly=args=>renderIconButtons(args);compactQuietIconsOnly.args={compact:!0,quiet:!0};const vertical=args=>renderButtons(args);vertical.args={vertical:!0};const verticalIconsOnly=args=>renderIconButtons(args);verticalIconsOnly.args={vertical:!0};const verticalQuietIconsOnly=args=>renderIconButtons(args);verticalQuietIconsOnly.args={quiet:!0,vertical:!0};const compactVertical=args=>renderButtons(args);compactVertical.args={compact:!0,vertical:!0};const compactVerticalIconsOnly=args=>renderIconButtons(args);compactVerticalIconsOnly.args={compact:!0,vertical:!0};const compactQuietVerticalIconsOnly=args=>renderIconButtons(args);compactQuietVerticalIconsOnly.args={compact:!0,quiet:!0,vertical:!0};const justified=args=>renderButtons(args);justified.args={justified:!0};const justifiedIconsOnly=args=>renderIconButtons(args);justifiedIconsOnly.args={justified:!0};const compactJustifiedIconsOnly=args=>renderIconButtons(args);compactJustifiedIconsOnly.args={compact:!0,justified:!0};const __namedExportsOrder=["Default","HasActionMenuAsChild","selectsSingle","selectsMultiple","selectsMultipleWithTooltips","selectsMultipleControlled","iconsOnly","quietIconsOnly","compact","compactIconsOnly","compactQuietIconsOnly","vertical","verticalIconsOnly","verticalQuietIconsOnly","compactVertical","compactVerticalIconsOnly","compactQuietVerticalIconsOnly","justified","justifiedIconsOnly","compactJustifiedIconsOnly"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => renderButtons(args)",...Default.parameters?.docs?.source}}},HasActionMenuAsChild.parameters={...HasActionMenuAsChild.parameters,docs:{...HasActionMenuAsChild.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-action-group ${spreadProps(args)}>\n            <sp-action-button id="first">Button 1</sp-action-button>\n            <sp-action-button id="second">Longer Button 2</sp-action-button>\n            <sp-action-button id="third">Short 3</sp-action-button>\n            <sp-action-menu label="More Actions" id="action-menu">\n                <sp-menu-item id="first-menu-item">One</sp-menu-item>\n                <sp-menu-item id="second-menu-item">Two</sp-menu-item>\n                <sp-menu-item id="third-menu-item">Three</sp-menu-item>\n                <sp-menu-item id="fourth-menu-item">\n                    Select some items\n                    <sp-menu slot="submenu" selects="multiple">\n                        <sp-menu-item id="first-sub-menu-item">A</sp-menu-item>\n                        <sp-menu-item selected id="second-sub-menu-item">\n                            B\n                        </sp-menu-item>\n                        <sp-menu-item id="third-sub-menu-item">C</sp-menu-item>\n                    </sp-menu>\n                </sp-menu-item>\n            </sp-action-menu>\n        </sp-action-group>\n    `;\n}',...HasActionMenuAsChild.parameters?.docs?.source}}},selectsSingle.parameters={...selectsSingle.parameters,docs:{...selectsSingle.parameters?.docs,source:{originalSource:'args => {\n  requestAnimationFrame(displaySelectionState);\n  return html`\n        <sp-action-group\n            ?compact=${args.compact}\n            ?emphasized=${args.emphasized}\n            ?quiet=${args.quiet}\n            ?justified=${args.justified}\n            ?vertical=${args.vertical}\n            size=${args.size}\n            label="Favorite Color"\n            selects="single"\n            @change=${({\n    target\n  }) => {\n    const next = target.nextElementSibling;\n    next.textContent = `Selected: ${JSON.stringify(target.selected)}`;\n  }}\n        >\n            <sp-action-button>Red</sp-action-button>\n            <sp-action-button>Green</sp-action-button>\n            <sp-action-button>Blue</sp-action-button>\n            <sp-action-button selected>Yellow</sp-action-button>\n        </sp-action-group>\n        <div>Selected:</div>\n    `;\n}',...selectsSingle.parameters?.docs?.source}}},selectsMultiple.parameters={...selectsMultiple.parameters,docs:{...selectsMultiple.parameters?.docs,source:{originalSource:'args => {\n  requestAnimationFrame(displaySelectionState);\n  return html`\n        <sp-action-group\n            ${spreadProps(args)}\n            label="Favorite Colors"\n            selects="multiple"\n            size=${args.size}\n            @change=${({\n    target\n  }) => {\n    const next = target.nextElementSibling;\n    next.textContent = `Selected: ${JSON.stringify(target.selected)}`;\n  }}\n        >\n            <sp-action-button>Red</sp-action-button>\n            <sp-action-button selected>Green</sp-action-button>\n            <sp-action-button selected>Blue</sp-action-button>\n            <sp-action-button>Yellow</sp-action-button>\n        </sp-action-group>\n        <div>Selected:</div>\n    `;\n}',...selectsMultiple.parameters?.docs?.source}}},selectsMultipleWithTooltips.parameters={...selectsMultipleWithTooltips.parameters,docs:{...selectsMultipleWithTooltips.parameters?.docs,source:{originalSource:'args => {\n  return html`\n        <sp-action-group\n            ${spreadProps(args)}\n            label="Favorite Color"\n            selects="multiple"\n            size=${args.size}\n            @change=${({\n    target\n  }) => {\n    const next = target.nextElementSibling;\n    next.textContent = `Selected: ${JSON.stringify(target.selected)}`;\n  }}\n        >\n            <overlay-trigger>\n                <sp-action-button slot="trigger">Red</sp-action-button>\n                <sp-tooltip slot="hover-content">\n                    This is a cool color.\n                </sp-tooltip>\n            </overlay-trigger>\n            <overlay-trigger>\n                <sp-action-button slot="trigger">Green</sp-action-button>\n                <sp-tooltip slot="hover-content">\n                    You wouldn\'t be wrong.\n                </sp-tooltip>\n            </overlay-trigger>\n            <overlay-trigger>\n                <sp-action-button slot="trigger">Blue</sp-action-button>\n                <sp-tooltip slot="hover-content">The sky in spring.</sp-tooltip>\n            </overlay-trigger>\n            <overlay-trigger>\n                <sp-action-button slot="trigger">Yellow</sp-action-button>\n                <sp-tooltip slot="hover-content">The sun at noon.</sp-tooltip>\n            </overlay-trigger>\n        </sp-action-group>\n        <div>Selected:</div>\n    `;\n}',...selectsMultipleWithTooltips.parameters?.docs?.source}}},selectsMultipleControlled.parameters={...selectsMultipleControlled.parameters,docs:{...selectsMultipleControlled.parameters?.docs,source:{originalSource:'args => {\n  requestAnimationFrame(displaySelectionState);\n  return html`\n        <sp-action-group\n            ${spreadProps(args)}\n            selects="multiple"\n            .selected=${["donuts", "crepecakes"]}\n            label="Favorite Dessert"\n            size=${args.size}\n            @change=${({\n    target\n  }) => {\n    const next = target.nextElementSibling;\n    next.textContent = `Selected: ${JSON.stringify(target.selected)}`;\n  }}\n        >\n            <sp-action-button value="lavacakes">Lava Cakes</sp-action-button>\n            <sp-action-button value="donuts">Donuts</sp-action-button>\n            <sp-action-button value="crepecakes">Crepe Cake</sp-action-button>\n            <sp-action-button value="fruittarts">Fruit Tarts</sp-action-button>\n        </sp-action-group>\n        <div>Selected:</div>\n    `;\n}',...selectsMultipleControlled.parameters?.docs?.source}}},iconsOnly.parameters={...iconsOnly.parameters,docs:{...iconsOnly.parameters?.docs,source:{originalSource:"args => renderIconButtons(args)",...iconsOnly.parameters?.docs?.source}}},quietIconsOnly.parameters={...quietIconsOnly.parameters,docs:{...quietIconsOnly.parameters?.docs,source:{originalSource:"args => renderIconButtons(args)",...quietIconsOnly.parameters?.docs?.source}}},compact.parameters={...compact.parameters,docs:{...compact.parameters?.docs,source:{originalSource:"args => renderButtons(args)",...compact.parameters?.docs?.source}}},compactIconsOnly.parameters={...compactIconsOnly.parameters,docs:{...compactIconsOnly.parameters?.docs,source:{originalSource:"args => renderIconButtons(args)",...compactIconsOnly.parameters?.docs?.source}}},compactQuietIconsOnly.parameters={...compactQuietIconsOnly.parameters,docs:{...compactQuietIconsOnly.parameters?.docs,source:{originalSource:"args => renderIconButtons(args)",...compactQuietIconsOnly.parameters?.docs?.source}}},vertical.parameters={...vertical.parameters,docs:{...vertical.parameters?.docs,source:{originalSource:"args => renderButtons(args)",...vertical.parameters?.docs?.source}}},verticalIconsOnly.parameters={...verticalIconsOnly.parameters,docs:{...verticalIconsOnly.parameters?.docs,source:{originalSource:"args => renderIconButtons(args)",...verticalIconsOnly.parameters?.docs?.source}}},verticalQuietIconsOnly.parameters={...verticalQuietIconsOnly.parameters,docs:{...verticalQuietIconsOnly.parameters?.docs,source:{originalSource:"args => renderIconButtons(args)",...verticalQuietIconsOnly.parameters?.docs?.source}}},compactVertical.parameters={...compactVertical.parameters,docs:{...compactVertical.parameters?.docs,source:{originalSource:"args => renderButtons(args)",...compactVertical.parameters?.docs?.source}}},compactVerticalIconsOnly.parameters={...compactVerticalIconsOnly.parameters,docs:{...compactVerticalIconsOnly.parameters?.docs,source:{originalSource:"args => renderIconButtons(args)",...compactVerticalIconsOnly.parameters?.docs?.source}}},compactQuietVerticalIconsOnly.parameters={...compactQuietVerticalIconsOnly.parameters,docs:{...compactQuietVerticalIconsOnly.parameters?.docs,source:{originalSource:"args => renderIconButtons(args)",...compactQuietVerticalIconsOnly.parameters?.docs?.source}}},justified.parameters={...justified.parameters,docs:{...justified.parameters?.docs,source:{originalSource:"args => renderButtons(args)",...justified.parameters?.docs?.source}}},justifiedIconsOnly.parameters={...justifiedIconsOnly.parameters,docs:{...justifiedIconsOnly.parameters?.docs,source:{originalSource:"args => renderIconButtons(args)",...justifiedIconsOnly.parameters?.docs?.source}}},compactJustifiedIconsOnly.parameters={...compactJustifiedIconsOnly.parameters,docs:{...compactJustifiedIconsOnly.parameters?.docs,source:{originalSource:"args => renderIconButtons(args)",...compactJustifiedIconsOnly.parameters?.docs?.source}}}},"./packages/action-menu/sp-action-menu.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),Picker_dev=__webpack_require__("./packages/picker/src/Picker.dev.js"),observe_slot_presence_dev=(__webpack_require__("./packages/action-button/sp-action-button.dev.js"),__webpack_require__("./tools/shared/src/observe-slot-presence.dev.js")),observe_slot_text_dev=__webpack_require__("./tools/shared/src/observe-slot-text.dev.js");__webpack_require__("./packages/icons-workflow/icons/sp-icon-more.js");var action_menu_css=index_dev.AH`
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
        `}update(changedProperties){changedProperties.has("invalid")&&(this.invalid=!1),super.update(changedProperties)}hasAccessibleLabel(){return!!this.label||!!this.getAttribute("aria-label")||!!this.getAttribute("aria-labelledby")||!!this.appliedLabel||this.hasLabel||this.labelOnly}warnNoLabel(){window.__swc.warn(this,`<${this.localName}> needs one of the following to be accessible:`,"https://opensource.adobe.com/spectrum-web-components/components/action-menu/#accessibility",{type:"accessibility",issues:[`an <sp-field-label> element with a \`for\` attribute referencing the \`id\` of the \`<${this.localName}>\`, or`,'value supplied to the "label" attribute, which will be displayed visually as placeholder text','text content supplied in a <span> with slot="label", or, text content supplied in a <span> with slot="label-only"',"which will also be displayed visually as placeholder text."]})}}__decorateClass([(0,decorators_dev.MZ)({type:String})],ActionMenu.prototype,"selects",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0,attribute:"static-color"})],ActionMenu.prototype,"staticColor",2),__decorateClass([(0,decorators_dev.wk)()],ActionMenu.prototype,"labelOnly",1),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-action-menu",ActionMenu)},"./packages/icons-workflow/icons/sp-icon-info.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js"),Info=__webpack_require__("./packages/icons-workflow/src/icons/Info.js"),InfoCircle=__webpack_require__("./packages/icons-workflow/src/icons-s2/InfoCircle.js");class IconInfo extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),1===this.spectrumVersion?(0,Info.m)({hidden:!this.label,title:this.label}):(0,InfoCircle.e)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-info",IconInfo)},"./packages/icons-workflow/icons/sp-icon-more.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var More=__webpack_require__("./packages/icons-workflow/src/icons/More.js");class IconMore extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:r=24,height:l=24,hidden:e=!1,title:c="More"}={})=>custom_tag.T`<svg
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
  </svg>`)({hidden:!this.label,title:this.label}):(0,More.Z)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-more",IconMore)},"./packages/icons-workflow/icons/sp-icon-properties.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var Properties=__webpack_require__("./packages/icons-workflow/src/icons/Properties.js");class IconProperties extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:e=24,height:t=24,hidden:r=!1,title:s="Properties"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${e}"
    height="${t}"
    viewBox="0 0 20 20"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${s}"
  >
    <path
      d="m1.75,6.77148h2.6687c.34064,1.43018,1.62128,2.5,3.15405,2.5s2.81342-1.06982,3.15405-2.5h7.52319c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75h-7.52319c-.34064-1.43018-1.62128-2.5-3.15405-2.5s-2.81342,1.06982-3.15405,2.5H1.75c-.41406,0-.75.33594-.75.75s.33594.75.75.75Zm5.82275-2.5c.96484,0,1.75.78516,1.75,1.75s-.78516,1.75-1.75,1.75-1.75-.78516-1.75-1.75.78516-1.75,1.75-1.75Z"
      fill="currentColor"
    />
    <path
      d="m18.25,13.27148h-2.52319c-.34064-1.43018-1.62128-2.5-3.15405-2.5s-2.81342,1.06982-3.15405,2.5H1.75c-.41406,0-.75.33594-.75.75s.33594.75.75.75h7.6687c.34064,1.43018,1.62128,2.5,3.15405,2.5s2.81342-1.06982,3.15405-2.5h2.52319c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Zm-5.67725,2.5c-.96484,0-1.75-.78516-1.75-1.75s.78516-1.75,1.75-1.75,1.75.78516,1.75,1.75-.78516,1.75-1.75,1.75Z"
      fill="currentColor"
    />
  </svg>`)({hidden:!this.label,title:this.label}):(0,Properties.h)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-properties",IconProperties)},"./packages/icons-workflow/icons/sp-icon-view-all-tags.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js"),ViewAllTags=__webpack_require__("./packages/icons-workflow/src/icons/ViewAllTags.js"),DefaultIcon=__webpack_require__("./packages/icons-workflow/src/DefaultIcon.js");class IconViewAllTags extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),1===this.spectrumVersion?(0,ViewAllTags.b)({hidden:!this.label,title:this.label}):(0,DefaultIcon.$)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-view-all-tags",IconViewAllTags)},"./packages/icons-workflow/src/DefaultIcon.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{$:function(){return DefaultIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const DefaultIcon=({width:e=24,height:l=24,hidden:t=!1,title:r="Default"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`
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
    `},"./packages/icons-workflow/src/icons-s2/InfoCircle.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{e:function(){return InfoCircleIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const InfoCircleIcon=({width:r=24,height:t=24,hidden:e=!1,title:l="Info Circle"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${r}"
    height="${t}"
    viewBox="0 0 20 20"
    aria-hidden=${e?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path
      d="m10,18.75c-4.8252,0-8.75-3.9248-8.75-8.75S5.1748,1.25,10,1.25s8.75,3.9248,8.75,8.75-3.9248,8.75-8.75,8.75Zm0-16c-3.99805,0-7.25,3.25195-7.25,7.25s3.25195,7.25,7.25,7.25,7.25-3.25195,7.25-7.25-3.25195-7.25-7.25-7.25Z"
      fill="currentColor"
    />
    <path
      d="m10.00064,5.26036c.23065-.00813.45538.07387.62661.22862.33033.36505.33033.92102,0,1.28607-.16935.15851-.39483.24308-.62664.23504-.23635.00948-.46589-.08035-.63302-.24775-.16207-.1679-.24916-.39432-.24137-.62755-.01238-.23497.06959-.46515.2277-.6394.17358-.16474.40786-.24988.64671-.23503Z"
      fill="currentColor"
    />
    <path
      d="m10,15.0625c-.41406,0-.75-.33594-.75-.75v-4.83496c0-.41406.33594-.75.75-.75s.75.33594.75.75v4.83496c0,.41406-.33594.75-.75.75Z"
      fill="currentColor"
    />
  </svg>`},"./packages/icons-workflow/src/icons/Info.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{m:function(){return InfoIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const InfoIcon=({width:a=24,height:t=24,hidden:e=!1,title:r="Info"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${t}"
    viewBox="0 0 36 36"
    width="${a}"
    aria-hidden=${e?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${r}"
  >
    <path
      d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2Zm-.3 4.3a2.718 2.718 0 0 1 2.864 2.824 2.664 2.664 0 0 1-2.864 2.863 2.705 2.705 0 0 1-2.864-2.864A2.717 2.717 0 0 1 17.7 6.3ZM22 27a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1v-6h-1a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v9h1a1 1 0 0 1 1 1Z"
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
  </svg>`},"./packages/icons-workflow/src/icons/Properties.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{h:function(){return PropertiesIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const PropertiesIcon=({width:a=24,height:e=24,hidden:t=!1,title:r="Properties"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
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
      d="M33.5 6H15.9a5 5 0 0 0-9.8 0H2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3.6a5 5 0 0 0 9.8 0h17.6a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5ZM11 10a3 3 0 1 1 3-3 3 3 0 0 1-3 3ZM33.5 26H19.9a5 5 0 0 0-9.8 0H2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h7.6a5 5 0 0 0 9.8 0h13.6a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5ZM15 30a3 3 0 1 1 3-3 3 3 0 0 1-3 3ZM2 16.5v1a.5.5 0 0 0 .5.5h17.6a5 5 0 0 0 9.8 0h3.6a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-3.6a5 5 0 0 0-9.8 0H2.5a.5.5 0 0 0-.5.5Zm20 .5a3 3 0 1 1 3 3 3 3 0 0 1-3-3Z"
    />
  </svg>`},"./packages/icons-workflow/src/icons/ViewAllTags.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{b:function(){return ViewAllTagsIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const ViewAllTagsIcon=({width:t=24,height:e=24,hidden:r=!1,title:h="View All Tags"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${e}"
    viewBox="0 0 36 36"
    width="${t}"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${h}"
  >
    <rect height="4" rx="1" ry="1" width="4" x="2" y="2" />
    <rect height="4" rx="1" ry="1" width="22" x="10" y="2" />
    <rect height="4" rx="1" ry="1" width="4" x="2" y="10" />
    <rect height="4" rx="1" ry="1" width="22" x="10" y="10" />
    <rect height="4" rx="1" ry="1" width="4" x="2" y="18" />
    <rect height="4" rx="1" ry="1" width="4" x="2" y="26" />
    <path
      d="m35.668 26.106-9.88-9.879a.772.772 0 0 0-.546-.227h-8.47a.772.772 0 0 0-.772.772v8.471a.772.772 0 0 0 .226.546l9.879 9.88a.772.772 0 0 0 1.092 0l8.471-8.469a.772.772 0 0 0 0-1.094ZM20.4 22.948a2.548 2.548 0 1 1 2.548-2.548 2.548 2.548 0 0 1-2.548 2.548ZM14.294 27.2c-.332-.332-.223-.756-.353-1.2H11a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6.091ZM14 18h-3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h3Z"
    />
  </svg>`},"./packages/overlay/overlay-trigger.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var _spectrum_web_components_base_src_define_element_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/define-element.dev.js"),_src_OverlayTrigger_dev_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/overlay/src/OverlayTrigger.dev.js");(0,_spectrum_web_components_base_src_define_element_js__WEBPACK_IMPORTED_MODULE_0__.e)("overlay-trigger",_src_OverlayTrigger_dev_js__WEBPACK_IMPORTED_MODULE_1__.N)},"./packages/overlay/sp-overlay.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var _spectrum_web_components_base_src_define_element_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./tools/base/src/define-element.dev.js"),_src_Overlay_dev_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/overlay/src/Overlay.dev.js");(0,_spectrum_web_components_base_src_define_element_js__WEBPACK_IMPORTED_MODULE_0__.e)("sp-overlay",_src_Overlay_dev_js__WEBPACK_IMPORTED_MODULE_1__.Overlay)},"./packages/overlay/src/OverlayTrigger.dev.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{N:function(){return OverlayTrigger}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");__webpack_require__("./packages/overlay/sp-overlay.dev.js");var overlay_trigger_css=index_dev.AH`
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
        `}updated(changedProperties){if(super.updated(changedProperties),!this.triggeredBy){const issues=["You have not specified the `triggeredBy` property. For optimal performance, consider explicitly declaring which overlay types you plan to use.",'Example: triggered-by="click hover"',"This helps avoid unnecessary DOM operations and potential race conditions."];window.__swc.warn(this,"Performance optimization available for <overlay-trigger>:","https://opensource.adobe.com/spectrum-web-components/components/overlay-trigger/#performance-optimization",{issues:issues})}this.disabled&&changedProperties.has("disabled")&&(this.open=void 0)}async getUpdateComplete(){return await super.getUpdateComplete()}}__decorateClass([(0,decorators_dev.MZ)({attribute:"triggered-by"})],OverlayTrigger.prototype,"triggeredBy",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],OverlayTrigger.prototype,"placement",2),__decorateClass([(0,decorators_dev.MZ)()],OverlayTrigger.prototype,"type",2),__decorateClass([(0,decorators_dev.MZ)({type:Number})],OverlayTrigger.prototype,"offset",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],OverlayTrigger.prototype,"open",2),__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],OverlayTrigger.prototype,"disabled",2),__decorateClass([(0,decorators_dev.MZ)({attribute:"receives-focus"})],OverlayTrigger.prototype,"receivesFocus",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"clickContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"longpressContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"hoverContent",2),__decorateClass([(0,decorators_dev.wk)()],OverlayTrigger.prototype,"targetContent",2),__decorateClass([(0,decorators_dev.P)("#click-overlay",!0)],OverlayTrigger.prototype,"clickOverlayElement",2),__decorateClass([(0,decorators_dev.P)("#longpress-overlay",!0)],OverlayTrigger.prototype,"longpressOverlayElement",2),__decorateClass([(0,decorators_dev.P)("#hover-overlay",!0)],OverlayTrigger.prototype,"hoverOverlayElement",2)},"./test/lit-helpers.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{i:function(){return spreadProps}});var lit_html_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/html.js"),lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/lit/async-directive.js");class SpreadDirective extends lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.Kq{constructor(){super(...arguments),this.prevData={}}render(_spreadData){return lit_html_js__WEBPACK_IMPORTED_MODULE_0__.s6}update(part,[spreadData]){var _a;this.element!==part.element&&(this.element=part.element),this.host=(null==(_a=part.options)?void 0:_a.host)||this.element,this.apply(spreadData),this.groom(spreadData),this.prevData=spreadData}apply(data){if(!data)return;const{prevData:prevData,element:element}=this;for(const key in data){const value=data[key];if(value===prevData[key])continue;const name=key.slice(1);switch(key[0]){case"@":prevData[key]&&element.removeEventListener(name,this,value),element.addEventListener(name,this,value);break;case".":element[name]=value;break;case"?":value?element.setAttribute(name,""):element.removeAttribute(name);break;default:null!=value?element.setAttribute(key,String(value)):element.removeAttribute(key)}}}groom(data){const{prevData:prevData,element:element}=this;if(prevData)for(const key in prevData)if(!data||!(key in data))switch(key[0]){case"@":const value=prevData[key];element.removeEventListener(key.slice(1),this,value);break;case".":element[key.slice(1)]=void 0;break;case"?":element.removeAttribute(key.slice(1));break;default:element.removeAttribute(key)}}handleEvent(event){const value=this.prevData[`@${event.type}`];"function"==typeof value?value.call(this.host,event):value.handleEvent(event)}disconnected(){const{prevData:prevData,element:element}=this;for(const key in prevData){if("@"!==key[0])continue;const value=prevData[key];element.removeEventListener(key.slice(1),this,value)}}reconnected(){const{prevData:prevData,element:element}=this;for(const key in prevData){if("@"!==key[0])continue;const value=prevData[key];element.addEventListener(key.slice(1),this,value)}}}(0,lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.u$)(SpreadDirective);class SpreadPropsDirective extends lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.Kq{constructor(){super(...arguments),this.prevData={}}render(_spreadData){return lit_html_js__WEBPACK_IMPORTED_MODULE_0__.s6}update(part,[spreadData]){var _a;this.element!==part.element&&(this.element=part.element),this.host=(null==(_a=part.options)?void 0:_a.host)||this.element,this.apply(spreadData),this.groom(spreadData),this.prevData=spreadData}apply(data){if(!data)return;const{prevData:prevData,element:element}=this;for(const key in data){const value=data[key];value!==prevData[key]&&(element[key]=value)}}groom(data){const{prevData:prevData,element:element}=this;if(prevData)for(const key in prevData)data&&key in data||(element[key]=void 0)}}const spreadProps=(0,lit_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.u$)(SpreadPropsDirective)}}]);
//# sourceMappingURL=action-group-stories-action-group-stories.31d19661.iframe.bundle.js.map