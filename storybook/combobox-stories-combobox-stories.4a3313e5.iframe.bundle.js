"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[5542],{"./packages/combobox/stories/combobox.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},__namedExportsOrder:function(){return __namedExportsOrder},controlled:function(){return controlled},default:function(){return combobox_stories},disabled:function(){return disabled},hasDisabledItems:function(){return hasDisabledItems},invalid:function(){return invalid},lightDOM:function(){return lightDOM},listAutocomplete:function(){return listAutocomplete},noAutocomplete:function(){return noAutocomplete},pending:function(){return pending},quiet:function(){return quiet},readonly:function(){return readonly},withFieldLabel:function(){return withFieldLabel},withHelpText:function(){return withHelpText},withLabelAttribute:function(){return withLabelAttribute},withTooltip:function(){return withTooltip}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),define_element_dev=(__webpack_require__("./packages/combobox/sp-combobox.dev.js"),__webpack_require__("./packages/field-label/sp-field-label.dev.js"),__webpack_require__("./packages/help-text/sp-help-text.dev.js"),__webpack_require__("./packages/tooltip/sp-tooltip.dev.js"),__webpack_require__("./packages/menu/sp-menu-item.dev.js"),__webpack_require__("./tools/base/src/define-element.dev.js")),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),directives_dev=__webpack_require__("./tools/base/src/directives.dev.js"),stories=__webpack_require__("./packages/combobox/stories/index.js"),template=__webpack_require__("./packages/combobox/stories/template.js");var __defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result},combobox_stories={title:"Combobox",component:"sp-combobox",args:{open:!1,disabled:!1,invalid:!1,pending:!1,readonly:!1,quiet:!1},argTypes:{size:{name:"size",type:{name:"string",required:!1},table:{defaultValue:{summary:"m"}},control:{labels:{s:"Small",m:"Medium",l:"Large",xl:"Extra large"},type:"select"},options:["s","m","l","xl"]},quiet:{name:"quiet",type:{name:"boolean",required:!1},table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},disabled:{name:"disabled",type:{name:"boolean",required:!1},description:"Disable this control. It will not receive focus or events.",table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},invalid:{name:"invalid",type:{name:"boolean",required:!1},table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},pending:{name:"pending",type:{name:"boolean",required:!1},table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}},readonly:{name:"readonly",type:{name:"boolean",required:!1},table:{type:{summary:"boolean"},defaultValue:{summary:!1}},control:{type:"boolean"}}}};const Default=args=>(0,template.B)(args),disabled=args=>(0,template.B)(args);disabled.args={disabled:!0,value:"Azerbaijan"};const invalid=args=>(0,template.B)(args);invalid.args={invalid:!0};const pending=args=>(0,template.B)(args);pending.args={pending:!0};const quiet=args=>(0,template.B)(args);quiet.args={quiet:!0};const readonly=args=>(0,template.B)(args);readonly.args={readonly:!0,value:"Solomon Islands"};const hasDisabledItems=args=>{const countriesWithDisabledItems=stories.Xr.map(country=>{var _a;return{...country,disabled:null==(_a=args.disabledItems)?void 0:_a.includes(country.itemText)}});return index_dev.qy`
        <sp-field-label side-aligned="start" for="combobox-disabled-items">
            Some fruits are disabled (light DOM)
        </sp-field-label>
        <sp-combobox
            id="combobox-disabled-items"
            style="min-width: 80px;--spectrum-textfield-m-min-width:0; width:160px;"
        >
            ${stories.g6.map(fruit=>{var _a;return index_dev.qy`
                    <sp-menu-item
                        id=${fruit.value}
                        value=${fruit.value}
                        ?disabled=${null==(_a=args.disabledItems)?void 0:_a.includes(fruit.value)}
                    >
                        ${fruit.itemText}
                    </sp-menu-item>
                `})}
        </sp-combobox>
        <sp-field-label side-aligned="start" for="combobox-disabled-countries">
            Some countries are disabled (shadow DOM)
        </sp-field-label>
        <sp-combobox
            id="combobox-disabled-countries"
            .options=${countriesWithDisabledItems}
            .value=${args.value||""}
        ></sp-combobox>
    `};hasDisabledItems.args={disabledItems:["banana","lemon","pear","Albania","Azerbaijan","Solomon Islands"]},hasDisabledItems.swc_vrt={skip:!0};const listAutocomplete=args=>(0,template.B)(args);listAutocomplete.args={autocomplete:"list"};const noAutocomplete=()=>index_dev.qy`
        <sp-field-label side-aligned="start" for="combobox-3">
            Fruit
        </sp-field-label>
        <sp-combobox
            id="combobox-3"
            .options=${stories.g6}
            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"
        ></sp-combobox>
        <sp-field-label side-aligned="start" for="combobox-4">
            Countries
        </sp-field-label>
        <sp-combobox
            id="combobox-4"
            .options=${stories.Xr}
            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"
        ></sp-combobox>
    `,lightDOM=()=>index_dev.qy`
        <sp-field-label side-aligned="start" for="combobox-5">
            Fruit
        </sp-field-label>
        <sp-combobox
            id="combobox-5"
            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"
        >
            ${stories.g6.map(fruit=>index_dev.qy`
                    <sp-menu-item id=${fruit.value} value=${fruit.value}>
                        ${fruit.itemText}
                    </sp-menu-item>
                `)}
        </sp-combobox>
        <sp-field-label side-aligned="start" for="combobox-6">
            Countries
        </sp-field-label>
        <sp-combobox
            id="combobox-6"
            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"
        >
            ${stories.Xr.map(country=>index_dev.qy`
                    <sp-menu-item id=${country.value} value=${country.value}>
                        ${country.itemText}
                    </sp-menu-item>
                `)}
        </sp-combobox>
    `,withTooltip=()=>index_dev.qy`
        <sp-combobox
            id="combobox-6"
            label="Combobox with tooltip"
            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"
        >
            ${stories.Xr.map(option=>index_dev.qy`
                    <sp-menu-item id=${option.value} value=${option.value}>
                        ${option.itemText}
                    </sp-menu-item>
                `)}
            <sp-tooltip slot="tooltip" self-managed placement="right" open>
                This combobox has a tooltip.
            </sp-tooltip>
        </sp-combobox>
    `,withFieldLabel=()=>index_dev.qy`
        <sp-field-label for="combobox-7">Pick something</sp-field-label>
        <sp-combobox id="combobox-7" .options=${stories.g6}></sp-combobox>
    `,withLabelAttribute=()=>index_dev.qy`
        <sp-combobox
            id="combobox-7"
            label="Pick something"
            .options=${stories.g6}
        ></sp-combobox>
    `,withHelpText=()=>index_dev.qy`
        <sp-combobox id="combobox-7" label="Pick something" .options=${stories.g6}>
            <sp-help-text slot="help-text">
                These are fruits found in the game "Animal Crossing: New Leaf".
            </sp-help-text>
        </sp-combobox>
    `,_ControlledCombo=class _ControlledCombo extends index_dev.WF{constructor(){super(...arguments),this.value={raw:"",validated:`${_ControlledCombo.ages[0].itemText}`}}render(){return index_dev.qy`
            <sp-field-label for="age">
                Retirement age (try entering a non-number)
            </sp-field-label>
            <sp-combobox
                id="age"
                .options=${_ControlledCombo.ages}
                .value=${(0,directives_dev.VD)(this.value.validated)}
                @change=${this.onChange}
            ></sp-combobox>
        `}onChange(){this.value={raw:this.combobox.value,validated:this.combobox.value.replace(/\D/g,"")||"55"}}};_ControlledCombo.ages=Array.from({length:21},(_,n)=>{const age=`${n+55}`;return{value:age,itemText:age}}),__decorateClass([(0,decorators_dev.wk)()],_ControlledCombo.prototype,"value",2),__decorateClass([(0,decorators_dev.P)("#age")],_ControlledCombo.prototype,"combobox",2);let ControlledCombo=_ControlledCombo;(0,define_element_dev.e)("controlled-combo",ControlledCombo);const controlled=()=>index_dev.qy`
        <controlled-combo></controlled-combo>
    `;controlled.swc_vrt={skip:!0},controlled.parameters={chromatic:{disableSnapshot:!0}};const __namedExportsOrder=["Default","disabled","invalid","pending","quiet","readonly","hasDisabledItems","listAutocomplete","noAutocomplete","lightDOM","withTooltip","withFieldLabel","withLabelAttribute","withHelpText","controlled"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => Template(args)",...Default.parameters?.docs?.source}}},disabled.parameters={...disabled.parameters,docs:{...disabled.parameters?.docs,source:{originalSource:"args => Template(args)",...disabled.parameters?.docs?.source}}},invalid.parameters={...invalid.parameters,docs:{...invalid.parameters?.docs,source:{originalSource:"args => Template(args)",...invalid.parameters?.docs?.source}}},pending.parameters={...pending.parameters,docs:{...pending.parameters?.docs,source:{originalSource:"args => Template(args)",...pending.parameters?.docs?.source}}},quiet.parameters={...quiet.parameters,docs:{...quiet.parameters?.docs,source:{originalSource:"args => Template(args)",...quiet.parameters?.docs?.source}}},readonly.parameters={...readonly.parameters,docs:{...readonly.parameters?.docs,source:{originalSource:"args => Template(args)",...readonly.parameters?.docs?.source}}},hasDisabledItems.parameters={...hasDisabledItems.parameters,docs:{...hasDisabledItems.parameters?.docs,source:{originalSource:'args => {\n  const countriesWithDisabledItems = countries.map(country => {\n    var _a;\n    return {\n      ...country,\n      disabled: (_a = args.disabledItems) == null ? void 0 : _a.includes(country.itemText)\n    };\n  });\n  return html`\n        <sp-field-label side-aligned="start" for="combobox-disabled-items">\n            Some fruits are disabled (light DOM)\n        </sp-field-label>\n        <sp-combobox\n            id="combobox-disabled-items"\n            style="min-width: 80px;--spectrum-textfield-m-min-width:0; width:160px;"\n        >\n            ${fruits.map(fruit => {\n    var _a;\n    return html`\n                    <sp-menu-item\n                        id=${fruit.value}\n                        value=${fruit.value}\n                        ?disabled=${(_a = args.disabledItems) == null ? void 0 : _a.includes(fruit.value)}\n                    >\n                        ${fruit.itemText}\n                    </sp-menu-item>\n                `;\n  })}\n        </sp-combobox>\n        <sp-field-label side-aligned="start" for="combobox-disabled-countries">\n            Some countries are disabled (shadow DOM)\n        </sp-field-label>\n        <sp-combobox\n            id="combobox-disabled-countries"\n            .options=${countriesWithDisabledItems}\n            .value=${args.value || ""}\n        ></sp-combobox>\n    `;\n}',...hasDisabledItems.parameters?.docs?.source}}},listAutocomplete.parameters={...listAutocomplete.parameters,docs:{...listAutocomplete.parameters?.docs,source:{originalSource:"args => Template(args)",...listAutocomplete.parameters?.docs?.source}}},noAutocomplete.parameters={...noAutocomplete.parameters,docs:{...noAutocomplete.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-field-label side-aligned="start" for="combobox-3">\n            Fruit\n        </sp-field-label>\n        <sp-combobox\n            id="combobox-3"\n            .options=${fruits}\n            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"\n        ></sp-combobox>\n        <sp-field-label side-aligned="start" for="combobox-4">\n            Countries\n        </sp-field-label>\n        <sp-combobox\n            id="combobox-4"\n            .options=${countries}\n            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"\n        ></sp-combobox>\n    `;\n}',...noAutocomplete.parameters?.docs?.source}}},lightDOM.parameters={...lightDOM.parameters,docs:{...lightDOM.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-field-label side-aligned="start" for="combobox-5">\n            Fruit\n        </sp-field-label>\n        <sp-combobox\n            id="combobox-5"\n            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"\n        >\n            ${fruits.map(fruit => html`\n                    <sp-menu-item id=${fruit.value} value=${fruit.value}>\n                        ${fruit.itemText}\n                    </sp-menu-item>\n                `)}\n        </sp-combobox>\n        <sp-field-label side-aligned="start" for="combobox-6">\n            Countries\n        </sp-field-label>\n        <sp-combobox\n            id="combobox-6"\n            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"\n        >\n            ${countries.map(country => html`\n                    <sp-menu-item id=${country.value} value=${country.value}>\n                        ${country.itemText}\n                    </sp-menu-item>\n                `)}\n        </sp-combobox>\n    `;\n}',...lightDOM.parameters?.docs?.source}}},withTooltip.parameters={...withTooltip.parameters,docs:{...withTooltip.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-combobox\n            id="combobox-6"\n            label="Combobox with tooltip"\n            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"\n        >\n            ${countries.map(option => html`\n                    <sp-menu-item id=${option.value} value=${option.value}>\n                        ${option.itemText}\n                    </sp-menu-item>\n                `)}\n            <sp-tooltip slot="tooltip" self-managed placement="right" open>\n                This combobox has a tooltip.\n            </sp-tooltip>\n        </sp-combobox>\n    `;\n}',...withTooltip.parameters?.docs?.source}}},withFieldLabel.parameters={...withFieldLabel.parameters,docs:{...withFieldLabel.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-field-label for="combobox-7">Pick something</sp-field-label>\n        <sp-combobox id="combobox-7" .options=${fruits}></sp-combobox>\n    `;\n}',...withFieldLabel.parameters?.docs?.source}}},withLabelAttribute.parameters={...withLabelAttribute.parameters,docs:{...withLabelAttribute.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-combobox\n            id="combobox-7"\n            label="Pick something"\n            .options=${fruits}\n        ></sp-combobox>\n    `;\n}',...withLabelAttribute.parameters?.docs?.source}}},withHelpText.parameters={...withHelpText.parameters,docs:{...withHelpText.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-combobox id="combobox-7" label="Pick something" .options=${fruits}>\n            <sp-help-text slot="help-text">\n                These are fruits found in the game "Animal Crossing: New Leaf".\n            </sp-help-text>\n        </sp-combobox>\n    `;\n}',...withHelpText.parameters?.docs?.source}}},controlled.parameters={...controlled.parameters,docs:{...controlled.parameters?.docs,source:{originalSource:"() => {\n  return html`\n        <controlled-combo></controlled-combo>\n    `;\n}",...controlled.parameters?.docs?.source}}}},"./packages/help-text/sp-help-text.dev.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js");__webpack_require__("./packages/icons-workflow/icons/sp-icon-alert.js");var help_text_css=index_dev.AH`
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
@media (forced-colors:active){:host{--highcontrast-helptext-content-color-default:CanvasText;--highcontrast-helptext-icon-color-default:CanvasText}:host,.text,.icon{forced-color-adjust:none}}:host{--spectrum-helptext-content-color-default:var(--spectrum-neutral-subdued-content-color-default);--spectrum-helptext-icon-color-default:var(--spectrum-neutral-subdued-content-color-default);color:var(--highcontrast-helptext-content-color-default,var(--mod-helptext-content-color-default,var(--spectrum-helptext-content-color-default)));font-size:var(--mod-helptext-font-size,var(--spectrum-helptext-font-size));min-block-size:var(--mod-helptext-min-height,var(--spectrum-helptext-min-height));display:flex}:host([size=s]){--spectrum-helptext-min-height:var(--spectrum-component-height-75);--spectrum-helptext-icon-size:var(--spectrum-workflow-icon-size-75);--spectrum-helptext-font-size:var(--spectrum-font-size-75);--spectrum-helptext-text-to-visual:var(--spectrum-text-to-visual-75);--spectrum-helptext-top-to-workflow-icon:var(--spectrum-help-text-top-to-workflow-icon-small);--spectrum-helptext-bottom-to-workflow-icon:var(--spectrum-helptext-top-to-workflow-icon)}:host,:host{--spectrum-helptext-min-height:var(--spectrum-component-height-75);--spectrum-helptext-icon-size:var(--spectrum-workflow-icon-size-100);--spectrum-helptext-font-size:var(--spectrum-font-size-75);--spectrum-helptext-text-to-visual:var(--spectrum-text-to-visual-75);--spectrum-helptext-top-to-workflow-icon:var(--spectrum-help-text-top-to-workflow-icon-medium);--spectrum-helptext-bottom-to-workflow-icon:var(--spectrum-helptext-top-to-workflow-icon)}:host([size=l]){--spectrum-helptext-min-height:var(--spectrum-component-height-100);--spectrum-helptext-icon-size:var(--spectrum-workflow-icon-size-200);--spectrum-helptext-font-size:var(--spectrum-font-size-100);--spectrum-helptext-text-to-visual:var(--spectrum-text-to-visual-100);--spectrum-helptext-top-to-workflow-icon:var(--spectrum-help-text-top-to-workflow-icon-large);--spectrum-helptext-bottom-to-workflow-icon:var(--spectrum-helptext-top-to-workflow-icon)}:host([size=xl]){--spectrum-helptext-min-height:var(--spectrum-component-height-200);--spectrum-helptext-icon-size:var(--spectrum-workflow-icon-size-300);--spectrum-helptext-font-size:var(--spectrum-font-size-200);--spectrum-helptext-text-to-visual:var(--spectrum-text-to-visual-200);--spectrum-helptext-top-to-workflow-icon:var(--spectrum-help-text-top-to-workflow-icon-extra-large);--spectrum-helptext-bottom-to-workflow-icon:var(--spectrum-helptext-top-to-workflow-icon)}:host([variant=neutral]){--spectrum-helptext-content-color-default:var(--spectrum-neutral-subdued-content-color-default);--spectrum-helptext-icon-color-default:var(--spectrum-neutral-subdued-content-color-default)}:host([variant=negative]){--spectrum-helptext-content-color-default:var(--spectrum-negative-color-900);--spectrum-helptext-icon-color-default:var(--spectrum-negative-color-900)}:host([disabled]){--spectrum-helptext-content-color-default:var(--spectrum-disabled-content-color);--spectrum-helptext-icon-color-default:var(--spectrum-disabled-content-color)}:host(:lang(ja)),:host(:lang(ko)),:host(:lang(zh)){--mod-helptext-line-height:var(--mod-helptext-line-height-cjk,var(--spectrum-cjk-line-height-100))}.icon{block-size:var(--mod-helptext-icon-size,var(--spectrum-helptext-icon-size));inline-size:var(--mod-helptext-icon-size,var(--spectrum-helptext-icon-size));flex-shrink:0;margin-inline-end:var(--mod-helptext-text-to-visual,var(--spectrum-helptext-text-to-visual));padding-block-start:var(--mod-helptext-top-to-workflow-icon,var(--spectrum-helptext-top-to-workflow-icon));padding-block-end:var(--mod-helptext-bottom-to-workflow-icon,var(--spectrum-helptext-bottom-to-workflow-icon))}.text{line-height:var(--mod-helptext-line-height,var(--spectrum-line-height-100));padding-block-start:var(--mod-helptext-top-to-text,var(--spectrum-helptext-top-to-text));padding-block-end:var(--mod-helptext-bottom-to-text,var(--spectrum-helptext-bottom-to-text))}:host([variant=neutral]) .text{color:var(--highcontrast-helptext-content-color-default,var(--mod-helptext-content-color-default,var(--spectrum-helptext-content-color-default)))}:host([variant=neutral]) .icon{color:var(--highcontrast-helptext-icon-color-default,var(--mod-helptext-icon-color-default,var(--spectrum-helptext-icon-color-default)))}:host([variant=negative]) .text{color:var(--highcontrast-helptext-content-color-default,var(--mod-helptext-content-color-default,var(--spectrum-helptext-content-color-default)))}:host([variant=negative]) .icon{color:var(--highcontrast-helptext-icon-color-default,var(--mod-helptext-icon-color-default,var(--spectrum-helptext-icon-color-default)))}:host([disabled]) .text{color:var(--highcontrast-helptext-content-color-default,var(--mod-helptext-content-color-default,var(--spectrum-helptext-content-color-default)))}:host([disabled]) .icon{color:var(--highcontrast-helptext-icon-color-default,var(--mod-helptext-icon-color-default,var(--spectrum-helptext-icon-color-default)))}:host{--spectrum-helptext-top-to-text:var(--system-helptext-top-to-text);--spectrum-helptext-bottom-to-text:var(--system-helptext-bottom-to-text)}:host([size=s]){--spectrum-helptext-top-to-text:var(--system-helptext-top-to-text-small);--spectrum-helptext-bottom-to-text:var(--system-helptext-bottom-to-text-small)}:host([size=l]){--spectrum-helptext-top-to-text:var(--system-helptext-top-to-text-large);--spectrum-helptext-bottom-to-text:var(--system-helptext-bottom-to-text-large)}:host([size=xl]){--spectrum-helptext-top-to-text:var(--system-helptext-top-to-text-extra-large);--spectrum-helptext-bottom-to-text:var(--system-helptext-bottom-to-text-extra-large)}
        `,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);return kind&&result&&__defProp(target,key,result),result};class HelpText extends((0,index_dev.ZG)(index_dev.wG,{noDefaultSize:!0})){constructor(){super(...arguments),this.icon=!1,this.variant="neutral"}static get styles(){return[help_text_css]}render(){return index_dev.qy`
            ${"negative"===this.variant&&this.icon?index_dev.qy`
                      <sp-icon-alert class="icon"></sp-icon-alert>
                  `:index_dev.s6}
            <div class="text"><slot></slot></div>
        `}}__decorateClass([(0,decorators_dev.MZ)({type:Boolean,reflect:!0})],HelpText.prototype,"icon",2),__decorateClass([(0,decorators_dev.MZ)({reflect:!0})],HelpText.prototype,"variant",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-help-text",HelpText)}}]);
//# sourceMappingURL=combobox-stories-combobox-stories.4a3313e5.iframe.bundle.js.map