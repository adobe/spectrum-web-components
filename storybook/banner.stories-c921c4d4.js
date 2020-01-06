import{h as e}from"./lit-html-6898710b.js";import{h as r,l as t,i as n,e as o}from"./index-2626287a.js";import{c as a,p as i,L as s}from"./lit-element-81619d09.js";import{_ as d}from"./tslib.es6-d9c764b6.js";var c=a`:host{display:inline-block;border-radius:var(--spectrum-banner-border-radius,var(--spectrum-global-dimension-static-size-100));padding:var(--spectrum-banner-padding-y,var(--spectrum-global-dimension-static-size-50)) var(--spectrum-banner-padding-x,var(--spectrum-global-dimension-static-size-100));font-size:var(--spectrum-banner-text-size,var(--spectrum-global-dimension-font-size-75));line-height:var(--spectrum-banner-text-line-height,var(--spectrum-alias-heading-text-line-height));color:var(--spectrum-banner-text-color,var(--spectrum-global-color-static-white))}#header{font-weight:700}:host([corner]){position:absolute;top:-10px;right:-10px}:host([type=info]){background-color:var(--spectrum-banner-info-background-color,var(--spectrum-semantic-informative-color-default))}:host([type=warning]){background-color:var(--spectrum-banner-warning-background-color,var(--spectrum-semantic-notice-color-default))}:host([type=error]){background-color:var(--spectrum-banner-error-background-color,var(--spectrum-semantic-negative-color-default))}`;class p extends s{constructor(){super(...arguments),this.type="info",this.corner=!1}static get styles(){return[c]}render(){return e` <div id="header"><slot name="header"></slot></div> <div id="content"><slot name="content"></slot></div> `}}d([i({reflect:!0,type:String})],p.prototype,"type",void 0),d([i({reflect:!0,type:Boolean})],p.prototype,"corner",void 0),customElements.get("sp-banner")||customElements.define("sp-banner",p);var l=()=>{var e=r("Header","Header Text"),a=r("Content","Content of the banner!"),i={info:"info",warning:"warning",error:"error"},s=t("Type",i,i.info),d=n("In Corner",!1);return o`
        <div style="margin: -8px 0;">
            <div
                style="width: 300px; height: 200px; background-color: #ccc; position: relative; margin: 20px;"
            >
                <sp-banner type="${s}" ?corner=${d}>
                    <div slot="header">${e}</div>
                    <div slot="content">${a}</div>
                </sp-banner>
            </div>
        </div>
    `},v=()=>o`
        <sp-banner type="info">
            <div slot="header">Header Text</div>
            <div slot="content">Content of the banner!</div>
        </sp-banner>
        <sp-banner type="warning">
            <div slot="header">Header Text</div>
            <div slot="content">Content of the banner!</div>
        </sp-banner>
        <sp-banner type="error">
            <div slot="header">Header Text</div>
            <div slot="content">Content of the banner!</div>
        </sp-banner>
    `;v.story={name:"Banner Types"};var m=()=>o`
        <div style="margin: -8px 0;">
            <div
                style="width: 300px; height: 200px; background-color: #ccc; position: relative; margin: 20px;"
            >
                <sp-banner corner>
                    <div slot="header">A corner banner!</div>
                    <div slot="content">Content of the banner!</div>
                </sp-banner>
            </div>
        </div>
    `;m.story={name:"Corner Placement"};export default{component:"sp-banner",title:"Banner"};export{l as Default,v as bannerTypes,m as cornerPlacement};
//# sourceMappingURL=banner.stories-c921c4d4.js.map
