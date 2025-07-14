"use strict";var n=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var i=(e,t,c,r)=>{for(var l=r>1?void 0:r?d(t,c):t,a=e.length-1,s;a>=0;a--)(s=e[a])&&(l=(r?s(t,c,l):s(l))||l);return r&&l&&n(t,c,l),l};import{html as o,SpectrumElement as h}from"@spectrum-web-components/base";import{property as p}from"@spectrum-web-components/base/src/decorators.js";import u from"./asset.css.js";const f=e=>o`
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
`,m=e=>o`
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
`;export class Asset extends h{constructor(){super(...arguments);this.label=""}static get styles(){return[u]}render(){return this.variant==="file"?f(this.label):this.variant==="folder"?m(this.label):o`
            <slot></slot>
        `}}i([p({type:String,reflect:!0})],Asset.prototype,"variant",2),i([p()],Asset.prototype,"label",2);
//# sourceMappingURL=Asset.js.map
