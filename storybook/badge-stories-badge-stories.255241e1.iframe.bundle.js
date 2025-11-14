"use strict";(self.webpackChunk_spectrum_web_components_1st_gen=self.webpackChunk_spectrum_web_components_1st_gen||[]).push([[6098],{"../2nd-gen/packages/core/dist/shared/base/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{ZG:function(){return _sizedMixin_js__WEBPACK_IMPORTED_MODULE_1__.Z},wG:function(){return _Base_js__WEBPACK_IMPORTED_MODULE_0__.w}});var _Base_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../2nd-gen/packages/core/dist/shared/base/Base.js"),_sizedMixin_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../2nd-gen/packages/core/dist/shared/base/sizedMixin.js")},"./packages/badge/stories/badge.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},Fixed:function(){return Fixed},Icons:function(){return Icons},Inline:function(){return Inline},NonSemantic:function(){return NonSemantic},Semantic:function(){return Semantic},Sizes:function(){return Sizes},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return badge_stories}});var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),decorators_dev=__webpack_require__("./tools/base/src/decorators.dev.js"),decorators=__webpack_require__("../node_modules/lit/decorators.js"),base=__webpack_require__("../2nd-gen/packages/core/dist/shared/base/index.js"),observe_slot_presence=__webpack_require__("../2nd-gen/packages/core/dist/shared/observe-slot-presence.js"),observe_slot_text=__webpack_require__("../2nd-gen/packages/core/dist/shared/observe-slot-text.js");const o=["inline-start","inline-end","block-start","block-end"],e=["accent","neutral","informative","positive","negative","notice"],n=["fuchsia","indigo","magenta","purple","seafoam","yellow","gray","red","orange","chartreuse","celery","green","cyan","blue"],t=[...n,"pink","turquoise","brown","cinnamon","silver"],i=[...e,...n];var Badge_base_A=Object.defineProperty,_=Object.getOwnPropertyDescriptor,c=(r,t,e,i)=>{for(var n,s=i>1?void 0:i?_(t,e):t,o=r.length-1;o>=0;o--)(n=r[o])&&(s=(i?n(t,e,s):n(s))||s);return i&&s&&Badge_base_A(t,e,s),s};class p extends((0,base.ZG)((0,observe_slot_text.O)((0,observe_slot_presence.e)(base.wG,'[slot="icon"]'),""),{noDefaultSize:!0})){constructor(){super(...arguments),this.variant="informative"}static{this.FIXED_VALUES=o}static{this.VARIANTS_SEMANTIC=e}get fixed(){return this._fixed}set fixed(t){if(t===this.fixed)return;const e=this.fixed;this._fixed=t,t?this.setAttribute("fixed",t):this.removeAttribute("fixed"),this.requestUpdate("fixed",e)}get hasIcon(){return this.slotContentIsPresent}update(t){if(super.update(t),window.__swc?.DEBUG){const e=this.constructor;e.VARIANTS.includes(this.variant)||window.__swc.warn(this,`<${this.localName}> element expect the "variant" attribute to be one of the following:`,"https://opensource.adobe.com/spectrum-web-components/components/badge/#variants",{issues:[...e.VARIANTS]}),"outline"in this&&!0===this.outline&&!e.VARIANTS_SEMANTIC.includes(this.variant)&&window.__swc.warn(this,`<${this.localName}> element only supports the outline styling if the variant is a semantic color variant.`,"https://opensource.adobe.com/spectrum-web-components/components/badge/#variants",{issues:[...e.VARIANTS_SEMANTIC]})}}}c([(0,decorators.MZ)({type:String,reflect:!0})],p.prototype,"variant",2),c([(0,decorators.MZ)({reflect:!0})],p.prototype,"fixed",1);var badge_css=index_dev.AH`
    :host{--spectrum-badge-corner-radius:var(--spectrum-corner-radius-100);--spectrum-badge-line-height:var(--spectrum-line-height-100);--spectrum-badge-line-height-cjk:var(--spectrum-cjk-line-height-100);--spectrum-badge-label-icon-color:var(--spectrum-white);--spectrum-badge-background-color-default:var(--spectrum-neutral-subdued-background-color-default);--spectrum-badge-background-color-accent:var(--spectrum-accent-background-color-default);--spectrum-badge-background-color-informative:var(--spectrum-informative-background-color-default);--spectrum-badge-background-color-negative:var(--spectrum-negative-background-color-default);--spectrum-badge-background-color-positive:var(--spectrum-positive-background-color-default);--spectrum-badge-background-color-notice:var(--spectrum-notice-background-color-default);--spectrum-badge-background-color-gray:var(--spectrum-gray-background-color-default);--spectrum-badge-background-color-red:var(--spectrum-red-background-color-default);--spectrum-badge-background-color-orange:var(--spectrum-orange-background-color-default);--spectrum-badge-background-color-yellow:var(--spectrum-yellow-background-color-default);--spectrum-badge-background-color-chartreuse:var(--spectrum-chartreuse-background-color-default);--spectrum-badge-background-color-celery:var(--spectrum-celery-background-color-default);--spectrum-badge-background-color-green:var(--spectrum-green-background-color-default);--spectrum-badge-background-color-seafoam:var(--spectrum-seafoam-background-color-default);--spectrum-badge-background-color-cyan:var(--spectrum-cyan-background-color-default);--spectrum-badge-background-color-blue:var(--spectrum-blue-background-color-default);--spectrum-badge-background-color-indigo:var(--spectrum-indigo-background-color-default);--spectrum-badge-background-color-purple:var(--spectrum-purple-background-color-default);--spectrum-badge-background-color-fuchsia:var(--spectrum-fuchsia-background-color-default);--spectrum-badge-background-color-magenta:var(--spectrum-magenta-background-color-default);--spectrum-badge-height:var(--spectrum-component-height-100);--spectrum-badge-font-size:var(--spectrum-font-size-100);--spectrum-badge-label-spacing-vertical-top:var(--spectrum-component-top-to-text-100);--spectrum-badge-label-spacing-vertical-bottom:var(--spectrum-component-bottom-to-text-100);--spectrum-badge-label-spacing-horizontal:var(--spectrum-component-edge-to-text-100);--spectrum-badge-workflow-icon-size:var(--spectrum-workflow-icon-size-100);--spectrum-badge-icon-text-spacing:var(--spectrum-text-to-visual-100);--spectrum-badge-icon-spacing-horizontal:var(--spectrum-component-edge-to-visual-100);--spectrum-badge-icon-spacing-vertical-top:var(--spectrum-component-top-to-workflow-icon-100);--spectrum-badge-icon-only-spacing-horizontal:var(--spectrum-component-edge-to-visual-only-100);--highcontrast-badge-border-color:CanvasText}:host([variant=celery]),:host([variant=chartreuse]),:host([variant=orange]),:host([variant=yellow]){--spectrum-badge-label-icon-color:var(--spectrum-black)}:host([variant=blue]),:host([variant=cyan]),:host([variant=fuchsia]),:host([variant=gray]),:host([variant=green]),:host([variant=indigo]),:host([variant=magenta]),:host([variant=purple]),:host([variant=red]),:host([variant=seafoam]){--spectrum-badge-label-icon-color:var(--spectrum-badge-label-icon-color-primary)}:host([size=s]){--spectrum-badge-height:var(--spectrum-component-height-75);--spectrum-badge-font-size:var(--spectrum-font-size-75);--spectrum-badge-label-spacing-vertical-top:var(--spectrum-component-top-to-text-75);--spectrum-badge-label-spacing-vertical-bottom:var(--spectrum-component-bottom-to-text-75);--spectrum-badge-label-spacing-horizontal:var(--spectrum-component-edge-to-text-75);--spectrum-badge-workflow-icon-size:var(--spectrum-workflow-icon-size-75);--spectrum-badge-icon-text-spacing:var(--spectrum-text-to-visual-75);--spectrum-badge-icon-spacing-horizontal:var(--spectrum-component-edge-to-visual-75);--spectrum-badge-icon-spacing-vertical-top:var(--spectrum-component-top-to-workflow-icon-75);--spectrum-badge-icon-only-spacing-horizontal:var(--spectrum-component-edge-to-visual-only-75)}:host([size=l]){--spectrum-badge-height:var(--spectrum-component-height-100);--spectrum-badge-font-size:var(--spectrum-font-size-200);--spectrum-badge-label-spacing-vertical-top:var(--spectrum-component-top-to-text-200);--spectrum-badge-label-spacing-vertical-bottom:var(--spectrum-component-bottom-to-text-200);--spectrum-badge-label-spacing-horizontal:var(--spectrum-component-edge-to-text-200);--spectrum-badge-workflow-icon-size:var(--spectrum-workflow-icon-size-200);--spectrum-badge-icon-text-spacing:var(--spectrum-text-to-visual-200);--spectrum-badge-icon-spacing-horizontal:var(--spectrum-component-edge-to-visual-200);--spectrum-badge-icon-spacing-vertical-top:var(--spectrum-component-top-to-workflow-icon-200);--spectrum-badge-icon-only-spacing-horizontal:var(--spectrum-component-edge-to-visual-only-200)}:host([size=xl]){--spectrum-badge-height:var(--spectrum-component-height-100);--spectrum-badge-font-size:var(--spectrum-font-size-300);--spectrum-badge-label-spacing-vertical-top:var(--spectrum-component-top-to-text-300);--spectrum-badge-label-spacing-vertical-bottom:var(--spectrum-component-bottom-to-text-300);--spectrum-badge-label-spacing-horizontal:var(--spectrum-component-edge-to-text-300);--spectrum-badge-workflow-icon-size:var(--spectrum-workflow-icon-size-300);--spectrum-badge-icon-text-spacing:var(--spectrum-text-to-visual-300);--spectrum-badge-icon-spacing-horizontal:var(--spectrum-component-edge-to-visual-300);--spectrum-badge-icon-spacing-vertical-top:var(--spectrum-component-top-to-workflow-icon-300);--spectrum-badge-icon-only-spacing-horizontal:var(--spectrum-component-edge-to-visual-only-300)}@media (forced-colors:active){:host{border-color:var(--highcontrast-badge-border-color)}}:host{min-block-size:var(--mod-badge-height,var(--spectrum-badge-height));vertical-align:middle;cursor:default;-webkit-font-smoothing:subpixel-antialiased;-moz-osx-font-smoothing:auto;border-radius:var(--mod-badge-corner-radius,var(--spectrum-badge-corner-radius));inline-size:auto;color:var(--mod-badge-label-icon-color,var(--spectrum-badge-label-icon-color));border:1px solid #0000;display:inline-flex;position:relative}:host,:host([variant=neutral]){background:var(--mod-badge-background-color-default,var(--spectrum-badge-background-color-default))}:host([variant=accent]){background:var(--mod-badge-background-color-accent,var(--spectrum-badge-background-color-accent))}:host([variant=informative]){background:var(--mod-badge-background-color-informative,var(--spectrum-badge-background-color-informative))}:host([variant=negative]){background:var(--mod-badge-background-color-negative,var(--spectrum-badge-background-color-negative))}:host([variant=positive]){background:var(--mod-badge-background-color-positive,var(--spectrum-badge-background-color-positive))}:host([variant=notice]){background:var(--mod-badge-background-color-notice,var(--spectrum-badge-background-color-notice))}:host([variant=gray]){background:var(--mod-badge-background-color-gray,var(--spectrum-badge-background-color-gray))}:host([variant=red]){background:var(--mod-badge-background-color-red,var(--spectrum-badge-background-color-red))}:host([variant=orange]){background:var(--mod-badge-background-color-orange,var(--spectrum-badge-background-color-orange))}:host([variant=yellow]){background:var(--mod-badge-background-color-yellow,var(--spectrum-badge-background-color-yellow))}:host([variant=chartreuse]){background:var(--mod-badge-background-color-chartreuse,var(--spectrum-badge-background-color-chartreuse))}:host([variant=celery]){background:var(--mod-badge-background-color-celery,var(--spectrum-badge-background-color-celery))}:host([variant=green]){background:var(--mod-badge-background-color-green,var(--spectrum-badge-background-color-green))}:host([variant=seafoam]){background:var(--mod-badge-background-color-seafoam,var(--spectrum-badge-background-color-seafoam))}:host([variant=cyan]){background:var(--mod-badge-background-color-cyan,var(--spectrum-badge-background-color-cyan))}:host([variant=blue]){background:var(--mod-badge-background-color-blue,var(--spectrum-badge-background-color-blue))}:host([variant=indigo]){background:var(--mod-badge-background-color-indigo,var(--spectrum-badge-background-color-indigo))}:host([variant=purple]){background:var(--mod-badge-background-color-purple,var(--spectrum-badge-background-color-purple))}:host([variant=fuchsia]){background:var(--mod-badge-background-color-fuchsia,var(--spectrum-badge-background-color-fuchsia))}:host([variant=magenta]){background:var(--mod-badge-background-color-magenta,var(--spectrum-badge-background-color-magenta))}:host([fixed=inline-start]){border-start-start-radius:0;border-end-start-radius:0}:host([fixed=inline-end]){border-start-end-radius:0;border-end-end-radius:0}:host([fixed=block-start]){border-start-start-radius:0;border-start-end-radius:0}:host([fixed=block-end]){border-end-end-radius:0;border-end-start-radius:0}.label{font-size:var(--mod-badge-font-size,var(--spectrum-badge-font-size));line-height:var(--mod-badge-line-height,var(--spectrum-badge-line-height));color:var(--mod-badge-label-icon-color,var(--spectrum-badge-label-icon-color));padding-block-start:var(--mod-badge-label-spacing-vertical-top,var(--spectrum-badge-label-spacing-vertical-top));padding-block-end:var(--mod-badge-label-spacing-vertical-bottom,var(--spectrum-badge-label-spacing-vertical-bottom));padding-inline-start:var(--mod-badge-label-spacing-horizontal,var(--spectrum-badge-label-spacing-horizontal));padding-inline-end:var(--mod-badge-label-spacing-horizontal,var(--spectrum-badge-label-spacing-horizontal))}.label:lang(ja),.label:lang(ko),.label:lang(zh){line-height:var(--mod-badge-line-height-cjk,var(--spectrum-badge-line-height-cjk))}[name=icon]+.label{padding-inline-start:0}::slotted([slot=icon]){block-size:var(--mod-badge-workflow-icon-size,var(--spectrum-badge-workflow-icon-size));inline-size:var(--mod-badge-workflow-icon-size,var(--spectrum-badge-workflow-icon-size));flex:0 0 var(--mod-badge-workflow-icon-size,var(--spectrum-badge-workflow-icon-size));color:var(--mod-badge-label-icon-color,var(--spectrum-badge-label-icon-color));padding-block-start:var(--mod-badge-icon-spacing-vertical-top,var(--spectrum-badge-icon-spacing-vertical-top));padding-block-end:var(--mod-badge-icon-spacing-vertical-top,var(--spectrum-badge-icon-spacing-vertical-top));padding-inline-start:var(--mod-badge-icon-spacing-horizontal,var(--spectrum-badge-icon-spacing-horizontal));padding-inline-end:var(--mod-badge-icon-text-spacing,var(--spectrum-badge-icon-text-spacing))}[icon-only]::slotted(*){padding-inline-start:var(--mod-badge-icon-only-spacing-horizontal,var(--spectrum-badge-icon-only-spacing-horizontal));padding-inline-end:var(--mod-badge-icon-only-spacing-horizontal,var(--spectrum-badge-icon-only-spacing-horizontal))}:host{align-items:center}:host([size=xs]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-50)}:host([size=s]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-75)}:host([size=m]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-100)}:host([size=l]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-200)}:host([size=xl]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-300)}:host([size=xxl]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-400)}::slotted([slot=icon]){flex-shrink:0}.label slot{max-height:calc(var(--spectrum-badge-line-height)*var(--spectrum-badge-font-size)*2);display:block;overflow:hidden}[icon-only]+.label{display:none}
`,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor;class Badge extends p{constructor(){super(...arguments),this.variant="informative"}static get styles(){return[badge_css]}render(){return index_dev.qy`
            ${this.hasIcon?index_dev.qy`
                      <slot
                          name="icon"
                          ?icon-only=${!this.slotHasContent}
                      ></slot>
                  `:index_dev.s6}
            <div class="label">
                <slot></slot>
            </div>
        `}}Badge.VARIANTS_COLOR=n,Badge.VARIANTS=i,((decorators,target,key,kind)=>{for(var decorator,result=kind>1?void 0:kind?__getOwnPropDesc(target,key):target,i=decorators.length-1;i>=0;i--)(decorator=decorators[i])&&(result=(kind?decorator(target,key,result):decorator(result))||result);kind&&result&&__defProp(target,key,result)})([(0,decorators_dev.MZ)({type:String,reflect:!0})],Badge.prototype,"variant",2),(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-badge",Badge);__webpack_require__("./packages/icons-workflow/icons/sp-icon-checkmark-circle.js");var badge_stories={title:"Badge",component:"sp-badge"};const Default=()=>index_dev.qy`
        <sp-badge>Badge</sp-badge>
    `,Icons=()=>index_dev.qy`
        <sp-badge>No icon</sp-badge>

        <sp-badge>
            <sp-icon-checkmark-circle slot="icon"></sp-icon-checkmark-circle>
            Icon and label
        </sp-badge>

        <sp-badge>
            <sp-icon-checkmark-circle slot="icon"></sp-icon-checkmark-circle>
        </sp-badge>
    `,Sizes=()=>index_dev.qy`
        <div style="display: flex; align-items: center; gap: 8px;">
            <sp-badge size="s">
                <sp-icon-checkmark-circle
                    slot="icon"
                ></sp-icon-checkmark-circle>
                Small
            </sp-badge>
            <sp-badge size="m">
                <sp-icon-checkmark-circle
                    slot="icon"
                ></sp-icon-checkmark-circle>
                Medium
            </sp-badge>
            <sp-badge size="l">
                <sp-icon-checkmark-circle
                    slot="icon"
                ></sp-icon-checkmark-circle>
                Large
            </sp-badge>
            <sp-badge size="xl">
                <sp-icon-checkmark-circle
                    slot="icon"
                ></sp-icon-checkmark-circle>
                Extra-large
            </sp-badge>
            <sp-badge style="max-width: 180px">
                <sp-icon-checkmark-circle
                    slot="icon"
                ></sp-icon-checkmark-circle>
                This long content automatically wraps, but shows no more than
                two lines
            </sp-badge>
        </div>
    `,Semantic=()=>index_dev.qy`
        <sp-badge variant="accent">Accent</sp-badge>
        <sp-badge variant="positive">Positive</sp-badge>
        <sp-badge variant="informative">Informative</sp-badge>
        <sp-badge variant="negative">Negative</sp-badge>
        <sp-badge variant="neutral">Neutral</sp-badge>
        <sp-badge variant="notice">Notice</sp-badge>
    `,NonSemantic=()=>index_dev.qy`
        <sp-badge variant="seafoam">Seafoam</sp-badge>
        <sp-badge variant="indigo">Indigo</sp-badge>
        <sp-badge variant="purple">Purple</sp-badge>
        <sp-badge variant="fuchsia">Fuchsia</sp-badge>
        <sp-badge variant="magenta">Magenta</sp-badge>
        <sp-badge variant="yellow">Yellow</sp-badge>
        <sp-badge variant="gray">Gray</sp-badge>
        <sp-badge variant="red">Red</sp-badge>
        <sp-badge variant="orange">Orange</sp-badge>
        <sp-badge variant="chartreuse">Chartreuse</sp-badge>
        <sp-badge variant="celery">Celery</sp-badge>
        <sp-badge variant="green">Green</sp-badge>
        <sp-badge variant="cyan">Cyan</sp-badge>
        <sp-badge variant="blue">Blue</sp-badge>
    `,Inline=()=>index_dev.qy`
        Badge is a simple
        <sp-badge variant="positive" size="s">inline</sp-badge>
        element that should
        <sp-badge variant="neutral" size="s">flow</sp-badge>
        with the rest of the page:
        <sp-badge variant="negative">Missing</sp-badge>
        <sp-badge variant="positive">Successful</sp-badge>
        <sp-badge variant="accent">Accent</sp-badge>
    `,Fixed=()=>index_dev.qy`
        <div
            style="position: relative; width: 400px; height: 200px; background: #eee"
        >
            <sp-badge>None</sp-badge>
            <sp-badge
                fixed="block-start"
                style="position: absolute; top: 0; left: 200px;"
            >
                block-start
            </sp-badge>
            <sp-badge
                fixed="inline-end"
                style="position: absolute; right: 0; top: 100px;"
            >
                inline-end
            </sp-badge>
            <sp-badge
                fixed="block-end"
                style="position: absolute; bottom: 0; left: 200px;"
            >
                block-end
            </sp-badge>
            <sp-badge
                fixed="inline-start"
                style="position: absolute; left: 0; top: 100px;"
            >
                inline-start
            </sp-badge>
        </div>
    `,__namedExportsOrder=["Default","Icons","Sizes","Semantic","NonSemantic","Inline","Fixed"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"() => {\n  return html`\n        <sp-badge>Badge</sp-badge>\n    `;\n}",...Default.parameters?.docs?.source}}},Icons.parameters={...Icons.parameters,docs:{...Icons.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-badge>No icon</sp-badge>\n\n        <sp-badge>\n            <sp-icon-checkmark-circle slot="icon"></sp-icon-checkmark-circle>\n            Icon and label\n        </sp-badge>\n\n        <sp-badge>\n            <sp-icon-checkmark-circle slot="icon"></sp-icon-checkmark-circle>\n        </sp-badge>\n    `;\n}',...Icons.parameters?.docs?.source}}},Sizes.parameters={...Sizes.parameters,docs:{...Sizes.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <div style="display: flex; align-items: center; gap: 8px;">\n            <sp-badge size="s">\n                <sp-icon-checkmark-circle\n                    slot="icon"\n                ></sp-icon-checkmark-circle>\n                Small\n            </sp-badge>\n            <sp-badge size="m">\n                <sp-icon-checkmark-circle\n                    slot="icon"\n                ></sp-icon-checkmark-circle>\n                Medium\n            </sp-badge>\n            <sp-badge size="l">\n                <sp-icon-checkmark-circle\n                    slot="icon"\n                ></sp-icon-checkmark-circle>\n                Large\n            </sp-badge>\n            <sp-badge size="xl">\n                <sp-icon-checkmark-circle\n                    slot="icon"\n                ></sp-icon-checkmark-circle>\n                Extra-large\n            </sp-badge>\n            <sp-badge style="max-width: 180px">\n                <sp-icon-checkmark-circle\n                    slot="icon"\n                ></sp-icon-checkmark-circle>\n                This long content automatically wraps, but shows no more than\n                two lines\n            </sp-badge>\n        </div>\n    `;\n}',...Sizes.parameters?.docs?.source}}},Semantic.parameters={...Semantic.parameters,docs:{...Semantic.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-badge variant="accent">Accent</sp-badge>\n        <sp-badge variant="positive">Positive</sp-badge>\n        <sp-badge variant="informative">Informative</sp-badge>\n        <sp-badge variant="negative">Negative</sp-badge>\n        <sp-badge variant="neutral">Neutral</sp-badge>\n        <sp-badge variant="notice">Notice</sp-badge>\n    `;\n}',...Semantic.parameters?.docs?.source}}},NonSemantic.parameters={...NonSemantic.parameters,docs:{...NonSemantic.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <sp-badge variant="seafoam">Seafoam</sp-badge>\n        <sp-badge variant="indigo">Indigo</sp-badge>\n        <sp-badge variant="purple">Purple</sp-badge>\n        <sp-badge variant="fuchsia">Fuchsia</sp-badge>\n        <sp-badge variant="magenta">Magenta</sp-badge>\n        <sp-badge variant="yellow">Yellow</sp-badge>\n        <sp-badge variant="gray">Gray</sp-badge>\n        <sp-badge variant="red">Red</sp-badge>\n        <sp-badge variant="orange">Orange</sp-badge>\n        <sp-badge variant="chartreuse">Chartreuse</sp-badge>\n        <sp-badge variant="celery">Celery</sp-badge>\n        <sp-badge variant="green">Green</sp-badge>\n        <sp-badge variant="cyan">Cyan</sp-badge>\n        <sp-badge variant="blue">Blue</sp-badge>\n    `;\n}',...NonSemantic.parameters?.docs?.source}}},Inline.parameters={...Inline.parameters,docs:{...Inline.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        Badge is a simple\n        <sp-badge variant="positive" size="s">inline</sp-badge>\n        element that should\n        <sp-badge variant="neutral" size="s">flow</sp-badge>\n        with the rest of the page:\n        <sp-badge variant="negative">Missing</sp-badge>\n        <sp-badge variant="positive">Successful</sp-badge>\n        <sp-badge variant="accent">Accent</sp-badge>\n    `;\n}',...Inline.parameters?.docs?.source}}},Fixed.parameters={...Fixed.parameters,docs:{...Fixed.parameters?.docs,source:{originalSource:'() => {\n  return html`\n        <div\n            style="position: relative; width: 400px; height: 200px; background: #eee"\n        >\n            <sp-badge>None</sp-badge>\n            <sp-badge\n                fixed="block-start"\n                style="position: absolute; top: 0; left: 200px;"\n            >\n                block-start\n            </sp-badge>\n            <sp-badge\n                fixed="inline-end"\n                style="position: absolute; right: 0; top: 100px;"\n            >\n                inline-end\n            </sp-badge>\n            <sp-badge\n                fixed="block-end"\n                style="position: absolute; bottom: 0; left: 200px;"\n            >\n                block-end\n            </sp-badge>\n            <sp-badge\n                fixed="inline-start"\n                style="position: absolute; left: 0; top: 100px;"\n            >\n                inline-start\n            </sp-badge>\n        </div>\n    `;\n}',...Fixed.parameters?.docs?.source}}}},"./packages/icons-workflow/icons/sp-icon-checkmark-circle.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){var index_dev=__webpack_require__("./tools/base/src/index.dev.js"),src_index_dev=__webpack_require__("./packages/icon/src/index.dev.js"),custom_tag=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");var CheckmarkCircle=__webpack_require__("./packages/icons-workflow/src/icons/CheckmarkCircle.js");class IconCheckmarkCircle extends src_index_dev.z{render(){return(0,custom_tag.L)(index_dev.qy),2===this.spectrumVersion?(({width:e=24,height:l=24,hidden:r=!1,title:t="Checkmark Circle"}={})=>custom_tag.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${e}"
    height="${l}"
    viewBox="0 0 20 20"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${t}"
  >
    <path
      d="M10,18.75c-4.8252,0-8.75-3.9248-8.75-8.75S5.1748,1.25,10,1.25s8.75,3.9248,8.75,8.75-3.9248,8.75-8.75,8.75ZM10,2.75c-3.99805,0-7.25,3.25195-7.25,7.25s3.25195,7.25,7.25,7.25,7.25-3.25195,7.25-7.25-3.25195-7.25-7.25-7.25Z"
      fill="currentColor"
    />
    <path
      d="M9.22266,13.5c-.21191,0-.41504-.08984-.55762-.24805l-2.51074-2.79199c-.27734-.30859-.25195-.78223.05566-1.05957s.78125-.25195,1.05957.05566l1.89355,2.10645,3.4873-4.75586c.24316-.33398.71094-.40918,1.04785-.16113.33398.24414.40625.71387.16113,1.04785l-4.03223,5.5c-.13281.18262-.3418.29492-.56738.30566-.01172.00098-.02441.00098-.03711.00098Z"
      fill="currentColor"
    />
  </svg>`)({hidden:!this.label,title:this.label}):(0,CheckmarkCircle.D)({hidden:!this.label,title:this.label})}}(0,__webpack_require__("./tools/base/src/define-element.dev.js").e)("sp-icon-checkmark-circle",IconCheckmarkCircle)},"./packages/icons-workflow/src/icons/CheckmarkCircle.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{D:function(){return CheckmarkCircleIcon}});var _custom_tag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/icons-workflow/src/custom-tag.js");const CheckmarkCircleIcon=({width:e=24,height:a=24,hidden:t=!1,title:l="Checkmark Circle"}={})=>_custom_tag_js__WEBPACK_IMPORTED_MODULE_0__.T`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${e}"
    height="${a}"
    viewBox="0 0 36 36"
    aria-hidden=${t?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
  >
    <path
      d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2Zm10.666 9.08L16.018 27.341a1.208 1.208 0 0 1-.875.461c-.024.002-.05.002-.073.002a1.2 1.2 0 0 1-.85-.351l-7.784-7.795a1.2 1.2 0 0 1 0-1.698l1.326-1.325a1.201 1.201 0 0 1 1.695 0l5.346 5.347L25.314 8.473A1.203 1.203 0 0 1 27 8.263l1.455 1.133a1.205 1.205 0 0 1 .211 1.684Z"
    />
  </svg>`}}]);
//# sourceMappingURL=badge-stories-badge-stories.255241e1.iframe.bundle.js.map