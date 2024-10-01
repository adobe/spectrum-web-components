import { i as i$1 } from './lit-element-BulMEkr1.js';
import { S as SpectrumElement, n as n$1, d as defineElement } from './define-element-C_3bgzm7.js';
import { x } from './lit-html-COgVUehj.js';

const r=i$1`
    :host{inline-size:100%;block-size:100%;justify-content:center;align-items:center;display:flex}::slotted(*){max-inline-size:100%;max-block-size:100%;object-fit:contain;transition:opacity var(--spectrum-animation-duration-100)}.file,.folder{inline-size:max(var(--mod-asset-icon-min-width,48px),min(100%,var(--mod-asset-icon-max-width,80px)));block-size:100%;margin:var(--mod-asset-icon-margin,20px)}.folderBackground{fill:var(--highcontrast-asset-folder-background-color,var(--mod-asset-folder-background-color,var(--spectrum-gray-300)))}.fileBackground{fill:var(--highcontrast-asset-file-background-color,var(--mod-asset-file-background-color,var(--spectrum-gray-50)))}.fileOutline,.folderOutline{fill:var(--mod-asset-icon-outline-color,var(--spectrum-gray-500))}@media (forced-colors:active){:host{--highcontrast-asset-folder-background-color:currentColor;--highcontrast-asset-file-background-color:currentColor}}
`;

var n=Object.defineProperty;var i=(e,t,c,r)=>{for(var l=void 0,a=e.length-1,s;a>=0;a--)(s=e[a])&&(l=(s(t,c,l))||l);return l&&n(t,c,l),l};const f=e=>x`
    <svg
        class="file"
        role="img"
        viewBox="0 0 128 128"
        aria-label=${e||"File"}
    >
        <path
            class="fileBackground"
            d="M24,126c-5.5,0-10-4.5-10-10V12c0-5.5,4.5-10,10-10h61.5c2.1,0,4.1,0.8,5.6,2.3l20.5,20.4c1.5,1.5,2.4,3.5,2.4,5.7V116c0,5.5-4.5,10-10,10H24z"
        ></path>
        <path
            class="fileOutline"
            d="M113.1,23.3L92.6,2.9C90.7,1,88.2,0,85.5,0H24c-6.6,0-12,5.4-12,12v104c0,6.6,5.4,12,12,12h80c6.6,0,12-5.4,12-12V30.4C116,27.8,114.9,25.2,113.1,23.3z M90,6l20.1,20H92c-1.1,0-2-0.9-2-2V6z M112,116c0,4.4-3.6,8-8,8H24c-4.4,0-8-3.6-8-8V12c0-4.4,3.6-8,8-8h61.5c0.2,0,0.3,0,0.5,0v20c0,3.3,2.7,6,6,6h20c0,0.1,0,0.3,0,0.4V116z"
        ></path>
    </svg>
`,m=e=>x`
    <svg
        class="folder"
        role="img"
        viewBox="0 0 32 32"
        aria-label=${e||"Folder"}
    >
        <path
            class="folderBackground"
            d="M3,29.5c-1.4,0-2.5-1.1-2.5-2.5V5c0-1.4,1.1-2.5,2.5-2.5h10.1c0.5,0,1,0.2,1.4,0.6l3.1,3.1c0.2,0.2,0.4,0.3,0.7,0.3H29c1.4,0,2.5,1.1,2.5,2.5v18c0,1.4-1.1,2.5-2.5,2.5H3z"
        ></path>
        <path
            class="folderOutline"
            d="M29,6H18.3c-0.1,0-0.2,0-0.4-0.2l-3.1-3.1C14.4,2.3,13.8,2,13.1,2H3C1.3,2,0,3.3,0,5v22c0,1.6,1.3,3,3,3h26c1.7,0,3-1.4,3-3V9C32,7.3,30.7,6,29,6z M31,27c0,1.1-0.9,2-2,2H3c-1.1,0-2-0.9-2-2V7h28c1.1,0,2,0.9,2,2V27z"
        ></path>
    </svg>
`;class Asset extends SpectrumElement{constructor(){super(...arguments);this.label="";}static get styles(){return [r]}render(){return this.variant==="file"?f(this.label):this.variant==="folder"?m(this.label):x`
            <slot></slot>
        `}}i([n$1({type:String,reflect:!0})],Asset.prototype,"variant"),i([n$1()],Asset.prototype,"label");

defineElement("sp-asset",Asset);
