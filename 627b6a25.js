import"./7b3008bb.js";import{i as t}from"./67a87733.js";import{l as e,i as o,S as r}from"./7dd6c208.js";import{I as c,x as n,e as s,A as l,S as p,d as a}from"./cd228091.js";class i{constructor(){this.iconsetMap=new Map}static getInstance(){return i.instance||(i.instance=new i),i.instance}addIconset(t,e){this.iconsetMap.set(t,e);const o=new CustomEvent("sp-iconset-added",{bubbles:!0,composed:!0,detail:{name:t,iconset:e}});setTimeout((()=>window.dispatchEvent(o)),0)}removeIconset(t){this.iconsetMap.delete(t);const e=new CustomEvent("sp-iconset-removed",{bubbles:!0,composed:!0,detail:{name:t}});setTimeout((()=>window.dispatchEvent(e)),0)}getIconset(t){return this.iconsetMap.get(t)}}var h=Object.defineProperty,u=Object.getOwnPropertyDescriptor,m=(t,e,o,r)=>{for(var c,n=r>1?void 0:r?u(e,o):e,s=t.length-1;s>=0;s--)(c=t[s])&&(n=(r?c(e,o,n):c(n))||n);return r&&n&&h(e,o,n),n};class d extends c{constructor(){super(...arguments),this.iconsetListener=t=>{if(!this.name)return;const e=this.parseIcon(this.name);t.detail.name===e.iconset&&(this.updateIconPromise=this.updateIcon())}}connectedCallback(){super.connectedCallback(),window.addEventListener("sp-iconset-added",this.iconsetListener)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("sp-iconset-added",this.iconsetListener)}firstUpdated(){this.updateIconPromise=this.updateIcon()}attributeChangedCallback(t,e,o){super.attributeChangedCallback(t,e,o),this.updateIconPromise=this.updateIcon()}render(){return this.name?n`
                <div id="container"></div>
            `:this.src?n`
                <img src="${this.src}" alt=${e(this.label)} />
            `:super.render()}async updateIcon(){if(this.updateIconPromise&&await this.updateIconPromise,!this.name)return Promise.resolve();const t=this.parseIcon(this.name),e=i.getInstance().getIconset(t.iconset);return e&&this.iconContainer?(this.iconContainer.innerHTML="",e.applyIconToElement(this.iconContainer,t.icon,this.size||"",this.label?this.label:"")):Promise.resolve()}parseIcon(t){const e=t.split(":");let o="default",r=t;return e.length>1&&(o=e[0],r=e[1]),{iconset:o,icon:r}}async getUpdateComplete(){const t=await super.getUpdateComplete();return await this.updateIconPromise,t}}m([s()],d.prototype,"src",2),m([s()],d.prototype,"name",2),m([o("#container")],d.prototype,"iconContainer",2);var x=t`
:host{--spectrum-helptext-line-height:var(--spectrum-line-height-100);--spectrum-helptext-content-color-default:var(
--spectrum-neutral-subdued-content-color-default
);--spectrum-helptext-icon-color-default:var(
--spectrum-neutral-subdued-content-color-default
);--spectrum-helptext-disabled-content-color:var(
--spectrum-disabled-content-color
)}:host([variant=neutral]){--spectrum-helptext-content-color-default:var(
--spectrum-neutral-subdued-content-color-default
);--spectrum-helptext-icon-color-default:var(
--spectrum-neutral-subdued-content-color-default
)}:host([variant=negative]){--spectrum-helptext-content-color-default:var(
--spectrum-negative-color-900
);--spectrum-helptext-icon-color-default:var(--spectrum-negative-color-900)}:host([disabled]){--spectrum-helptext-content-color-default:var(
--spectrum-helptext-disabled-content-color
);--spectrum-helptext-icon-color-default:var(
--spectrum-helptext-disabled-content-color
)}:host(:lang(ja)),:host(:lang(ko)),:host(:lang(zh)){--spectrum-helptext-line-height-cjk:var(--spectrum-cjk-line-height-100)}:host([size=s]){--spectrum-helptext-min-height:var(--spectrum-component-height-75);--spectrum-helptext-icon-size:var(--spectrum-workflow-icon-size-75);--spectrum-helptext-font-size:var(--spectrum-font-size-75);--spectrum-helptext-text-to-visual:var(--spectrum-text-to-visual-75);--spectrum-helptext-top-to-workflow-icon:var(
--spectrum-help-text-top-to-workflow-icon-small
);--spectrum-helptext-bottom-to-workflow-icon:var(
--spectrum-helptext-top-to-workflow-icon
);--spectrum-helptext-top-to-text:var(--spectrum-component-top-to-text-75);--spectrum-helptext-bottom-to-text:var(
--spectrum-component-bottom-to-text-75
)}:host([size=m]){--spectrum-helptext-min-height:var(--spectrum-component-height-75);--spectrum-helptext-icon-size:var(--spectrum-workflow-icon-size-100);--spectrum-helptext-font-size:var(--spectrum-font-size-75);--spectrum-helptext-text-to-visual:var(--spectrum-text-to-visual-75);--spectrum-helptext-top-to-workflow-icon:var(
--spectrum-help-text-top-to-workflow-icon-medium
);--spectrum-helptext-bottom-to-workflow-icon:var(
--spectrum-helptext-top-to-workflow-icon
);--spectrum-helptext-top-to-text:var(--spectrum-component-top-to-text-75);--spectrum-helptext-bottom-to-text:var(
--spectrum-component-bottom-to-text-75
)}:host([size=l]){--spectrum-helptext-min-height:var(--spectrum-component-height-100);--spectrum-helptext-icon-size:var(--spectrum-workflow-icon-size-200);--spectrum-helptext-font-size:var(--spectrum-font-size-100);--spectrum-helptext-text-to-visual:var(--spectrum-text-to-visual-100);--spectrum-helptext-top-to-workflow-icon:var(
--spectrum-help-text-top-to-workflow-icon-large
);--spectrum-helptext-bottom-to-workflow-icon:var(
--spectrum-helptext-top-to-workflow-icon
);--spectrum-helptext-top-to-text:var(--spectrum-component-top-to-text-100);--spectrum-helptext-bottom-to-text:var(
--spectrum-component-bottom-to-text-100
)}:host([size=xl]){--spectrum-helptext-min-height:var(--spectrum-component-height-200);--spectrum-helptext-icon-size:var(--spectrum-workflow-icon-size-300);--spectrum-helptext-font-size:var(--spectrum-font-size-200);--spectrum-helptext-text-to-visual:var(--spectrum-text-to-visual-200);--spectrum-helptext-top-to-workflow-icon:var(
--spectrum-help-text-top-to-workflow-icon-extra-large
);--spectrum-helptext-bottom-to-workflow-icon:var(
--spectrum-helptext-top-to-workflow-icon
);--spectrum-helptext-top-to-text:var(--spectrum-component-top-to-text-200);--spectrum-helptext-bottom-to-text:var(
--spectrum-component-bottom-to-text-200
)}@media (forced-colors:active){:host{--highcontrast-helptext-content-color-default:CanvasText;--highcontrast-helptext-icon-color-default:CanvasText;forced-color-adjust:none}.icon,.text{forced-color-adjust:none}}:host{color:var(
--highcontrast-helptext-content-color-default,var(
--mod-helptext-content-color-default,var(--spectrum-helptext-content-color-default)
)
);display:flex;font-size:var(
--mod-helptext-font-size,var(--spectrum-helptext-font-size)
);min-height:var(
--mod-helptext-min-height,var(--spectrum-helptext-min-height)
)}.icon{flex-shrink:0;height:var(--mod-helptext-icon-size,var(--spectrum-helptext-icon-size));margin-inline-end:var(
--mod-helptext-text-to-visual,var(--spectrum-helptext-text-to-visual)
);padding-block-end:var(
--mod-helptext-bottom-to-workflow-icon,var(--spectrum-helptext-bottom-to-workflow-icon)
);padding-block-start:var(
--mod-helptext-top-to-workflow-icon,var(--spectrum-helptext-top-to-workflow-icon)
);width:var(--mod-helptext-icon-size,var(--spectrum-helptext-icon-size))}.text{line-height:var(
--mod-helptext-line-height,var(--spectrum-helptext-line-height)
);padding-block-end:var(
--mod-helptext-bottom-to-text,var(--spectrum-helptext-bottom-to-text)
);padding-block-start:var(
--mod-helptext-top-to-text,var(--spectrum-helptext-top-to-text)
)}:host(:lang(ja)) .text,:host(:lang(ko)) .text,:host(:lang(zh)) .text{line-height:var(
--mod-helptext-line-height-cjk,var(--spectrum-helptext-line-height-cjk)
)}:host([variant=neutral]) .text{color:var(
--highcontrast-helptext-content-color-default,var(
--mod-helptext-content-color-default,var(--spectrum-helptext-content-color-default)
)
)}:host([variant=neutral]) .icon{color:var(
--highcontrast-helptext-icon-color-default,var(
--mod-helptext-icon-color-default,var(--spectrum-helptext-icon-color-default)
)
)}:host([variant=negative]) .text{color:var(
--highcontrast-helptext-content-color-default,var(
--mod-helptext-content-color-default,var(--spectrum-helptext-content-color-default)
)
)}:host([variant=negative]) .icon{color:var(
--highcontrast-helptext-icon-color-default,var(
--mod-helptext-icon-color-default,var(--spectrum-helptext-icon-color-default)
)
)}:host([disabled]) .text{color:var(
--highcontrast-helptext-content-color-default,var(
--mod-helptext-content-color-default,var(--spectrum-helptext-content-color-default)
)
)}:host([disabled]) .icon{color:var(
--highcontrast-helptext-icon-color-default,var(
--mod-helptext-icon-color-default,var(--spectrum-helptext-icon-color-default)
)
)}
`,v=Object.defineProperty,f=Object.getOwnPropertyDescriptor,g=(t,e,o,r)=>{for(var c,n=r>1?void 0:r?f(e,o):e,s=t.length-1;s>=0;s--)(c=t[s])&&(n=(r?c(e,o,n):c(n))||n);return r&&n&&v(e,o,n),n};class w extends(r(p)){constructor(){super(...arguments),this.icon=!1,this.variant="neutral"}static get styles(){return[x]}render(){return n`
            ${"negative"===this.variant&&this.icon?n`
                      <sp-icon-alert class="icon"></sp-icon-alert>
                  `:l}
            <div class="text"><slot></slot></div>
        `}}g([s({type:Boolean,reflect:!0})],w.prototype,"icon",2),g([s({reflect:!0})],w.prototype,"variant",2),a("sp-help-text",w),a("sp-icon",d);export{i as I};
//# sourceMappingURL=627b6a25.js.map
