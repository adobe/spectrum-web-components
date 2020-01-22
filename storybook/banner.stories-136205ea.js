import{c as e,p as r,L as n}from"./lit-element-089a5717.js";import{q as t,v as o,y as a,w as i,k as s}from"./storybook-preview-9aba481c.js";import{_ as c}from"./tslib.es6-d9c764b6.js";var d=e`:host{display:inline-block;border-radius:var(--spectrum-banner-border-radius,var(--spectrum-global-dimension-static-size-100));padding:var(--spectrum-banner-padding-y,var(--spectrum-global-dimension-static-size-50)) var(--spectrum-banner-padding-x,var(--spectrum-global-dimension-static-size-100));font-size:var(--spectrum-banner-text-size,var(--spectrum-global-dimension-font-size-75));line-height:var(--spectrum-banner-text-line-height,var(--spectrum-alias-heading-text-line-height));color:var(--spectrum-banner-text-color,var(--spectrum-global-color-static-white))}#header{font-weight:700}:host([corner]){position:absolute;top:-10px;right:-10px}:host([type=info]){background-color:var(--spectrum-banner-info-background-color,var(--spectrum-semantic-informative-color-default))}:host([type=warning]){background-color:var(--spectrum-banner-warning-background-color,var(--spectrum-semantic-notice-color-default))}:host([type=error]){background-color:var(--spectrum-banner-error-background-color,var(--spectrum-semantic-negative-color-default))}`;class p extends n{constructor(){super(...arguments),this.type="info",this.corner=!1}static get styles(){return[d]}render(){return t` <div id="header"><slot name="header"></slot></div> <div id="content"><slot name="content"></slot></div> `}}c([r({reflect:!0,type:String})],p.prototype,"type",void 0),c([r({reflect:!0,type:Boolean})],p.prototype,"corner",void 0),customElements.get("sp-banner")||customElements.define("sp-banner",p);var l=()=>{var e=o("Header","Header Text"),r=o("Content","Content of the banner!"),n={info:"info",warning:"warning",error:"error"},t=a("Type",n,n.info),c=i("In Corner",!1);return s`
        <div style="margin: -8px 0;">
            <div
                style="width: 300px; height: 200px; background-color: #ccc; position: relative; margin: 20px;"
            >
                <sp-banner type="${t}" ?corner=${c}>
                    <div slot="header">${e}</div>
                    <div slot="content">${r}</div>
                </sp-banner>
            </div>
        </div>
    `},v=()=>s`
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
    `;v.story={name:"Banner Types"};var b=()=>s`
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
    `;b.story={name:"Corner Placement"};var m=["Default","bannerTypes","cornerPlacement"];export default{component:"sp-banner",title:"Banner"};export{l as Default,m as __namedExportsOrder,v as bannerTypes,b as cornerPlacement};
//# sourceMappingURL=banner.stories-136205ea.js.map
