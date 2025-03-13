import { S as StyledButton, c } from './spectrum-icon-cross.css-DNcrOn37.js';
import { i } from './lit-element-BulMEkr1.js';
import { t as tag, s as setCustomTemplateLiteralTag } from './custom-tag-B5IH9PTE.js';
import { I as IconBase } from './IconBase-BC0FCRBc.js';
import { x } from './lit-html-COgVUehj.js';
import { d as defineElement, n } from './define-element-2VgsDjbW.js';
import { S as SizedMixin } from './sizedMixin-D4VoaNlz.js';

const r=i`
    :host{block-size:var(--mod-clear-button-height,var(--spectrum-clear-button-height));inline-size:var(--mod-clear-button-width,var(--spectrum-clear-button-width));cursor:pointer;background-color:initial;background-color:var(--mod-clear-button-background-color,transparent);padding:var(--mod-clear-button-padding,var(--spectrum-clear-button-padding));color:var(--mod-clear-button-icon-color,var(--spectrum-clear-button-icon-color));border:none;border-radius:100%;margin:0}.icon{margin-block:0;margin-inline:auto}@media (hover:hover){:host(:hover){color:var(--highcontrast-clear-button-icon-color-hover,var(--mod-clear-button-icon-color-hover,var(--spectrum-clear-button-icon-color-hover)))}:host(:hover) .fill{background-color:var(--mod-clear-button-background-color-hover,var(--spectrum-clear-button-background-color-hover))}}:host(:is(:active,[active])){color:var(--mod-clear-button-icon-color-down,var(--spectrum-clear-button-icon-color-down))}:host(:is(:active,[active])) .fill{background-color:var(--mod-clear-button-background-color-down,var(--spectrum-clear-button-background-color-down))}:host([focus-within]) .js-focus-within,:host(:focus-visible),:host:focus-within,:host([focus-within]) .js-focus-within{color:var(--mod-clear-button-icon-color-key-focus,var(--spectrum-clear-button-icon-color-key-focus))}:host([focus-within]) .js-focus-within .fill,:host(:focus-visible) .fill,:host:focus-within .fill,:host([focus-within]) .js-focus-within .fill{background-color:var(--mod-clear-button-background-color-key-focus,var(--spectrum-clear-button-background-color-key-focus))}:host([disabled]),:host([disabled]){--spectrum-clear-button-icon-color:var(--mod-clear-button-icon-color-disabled,var(--spectrum-disabled-content-color));--spectrum-clear-button-background-color:var(--mod-clear-button-background-color-disabled,transparent)}.fill{background-color:var(--mod-clear-button-background-color,var(--spectrum-clear-button-background-color));inline-size:100%;block-size:100%;border-radius:100%;justify-content:center;align-items:center;display:flex}:host([variant=overBackground]:focus-visible){outline:none}@media (forced-colors:active){:host:not(:disabled){--highcontrast-clear-button-icon-color-hover:Highlight}}:host{--spectrum-clear-button-background-color:var(--system-clear-button-background-color);--spectrum-clear-button-background-color-hover:var(--system-clear-button-background-color-hover);--spectrum-clear-button-background-color-down:var(--system-clear-button-background-color-down);--spectrum-clear-button-background-color-key-focus:var(--system-clear-button-background-color-key-focus);--spectrum-clear-button-height:var(--system-clear-button-height);--spectrum-clear-button-width:var(--system-clear-button-width);--spectrum-clear-button-padding:var(--system-clear-button-padding);--spectrum-clear-button-icon-color:var(--system-clear-button-icon-color);--spectrum-clear-button-icon-color-hover:var(--system-clear-button-icon-color-hover);--spectrum-clear-button-icon-color-down:var(--system-clear-button-icon-color-down);--spectrum-clear-button-icon-color-key-focus:var(--system-clear-button-icon-color-key-focus)}:host([size=s]){--spectrum-clear-button-height:var(--system-clear-button-size-s-height);--spectrum-clear-button-width:var(--system-clear-button-size-s-width)}:host([size=l]){--spectrum-clear-button-height:var(--system-clear-button-size-l-height);--spectrum-clear-button-width:var(--system-clear-button-size-l-width)}:host([size=xl]){--spectrum-clear-button-height:var(--system-clear-button-size-xl-height);--spectrum-clear-button-width:var(--system-clear-button-size-xl-width)}:host .spectrum-ClearButton--quiet{--spectrum-clear-button-background-color:var(--system-clear-button-quiet-background-color);--spectrum-clear-button-background-color-hover:var(--system-clear-button-quiet-background-color-hover);--spectrum-clear-button-background-color-down:var(--system-clear-button-quiet-background-color-down);--spectrum-clear-button-background-color-key-focus:var(--system-clear-button-quiet-background-color-key-focus)}:host([variant=overBackground]){--spectrum-clear-button-icon-color:var(--system-clear-button-over-background-icon-color);--spectrum-clear-button-icon-color-hover:var(--system-clear-button-over-background-icon-color-hover);--spectrum-clear-button-icon-color-down:var(--system-clear-button-over-background-icon-color-down);--spectrum-clear-button-icon-color-key-focus:var(--system-clear-button-over-background-icon-color-key-focus);--spectrum-clear-button-background-color:var(--system-clear-button-over-background-background-color);--spectrum-clear-button-background-color-hover:var(--system-clear-button-over-background-background-color-hover);--spectrum-clear-button-background-color-down:var(--system-clear-button-over-background-background-color-down);--spectrum-clear-button-background-color-key-focus:var(--system-clear-button-over-background-background-color-key-focus)}:host([disabled]),:host([disabled]){--spectrum-clear-button-icon-color:var(--system-clear-button-disabled-icon-color);--spectrum-clear-button-icon-color-hover:var(--system-clear-button-disabled-icon-color-hover);--spectrum-clear-button-icon-color-down:var(--system-clear-button-disabled-icon-color-down);--spectrum-clear-button-background-color:var(--system-clear-button-disabled-background-color)}:host{box-sizing:border-box}
`;

const Cross75Icon$1=({width:t=24,height:e=24,hidden:r=!1,title:l="Cross75"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 8 8"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
    width="${t}"
    height="${e}"
  >
    <path
      d="m5.188 4 2.14-2.14A.84.84 0 1 0 6.141.672L4 2.812 1.86.672A.84.84 0 0 0 .672 1.86L2.812 4 .672 6.14A.84.84 0 1 0 1.86 7.328L4 5.188l2.14 2.14A.84.84 0 1 0 7.328 6.14z"
    />
  </svg>`;

const Cross75Icon=({width:t=24,height:e=24,hidden:r=!1,title:l="Cross75"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 8 8"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${l}"
    width="${t}"
    height="${e}"
  >
    <path
      d="m5.188 4 2.14-2.14A.84.84 0 1 0 6.141.672L4 2.812 1.86.672A.84.84 0 0 0 .672 1.86L2.812 4 .672 6.14A.84.84 0 1 0 1.86 7.328L4 5.188l2.14 2.14A.84.84 0 1 0 7.328 6.14z"
    />
  </svg>`;

class IconCross75 extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===2?Cross75Icon$1({hidden:!this.label,title:this.label}):Cross75Icon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-cross75",IconCross75);

const Cross100Icon$1=({width:t=24,height:e=24,hidden:r=!1,title:a="Cross100"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 8 8"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
    width="${t}"
    height="${e}"
  >
    <path
      d="m5.238 4 2.456-2.457A.875.875 0 1 0 6.456.306L4 2.763 1.543.306A.875.875 0 0 0 .306 1.544L2.763 4 .306 6.457a.875.875 0 1 0 1.238 1.237L4 5.237l2.456 2.457a.875.875 0 1 0 1.238-1.237z"
    />
  </svg>`;

const Cross100Icon=({width:t=24,height:e=24,hidden:r=!1,title:a="Cross100"}={})=>tag`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 8 8"
    aria-hidden=${r?"true":"false"}
    role="img"
    fill="currentColor"
    aria-label="${a}"
    width="${t}"
    height="${e}"
  >
    <path
      d="m5.238 4 2.456-2.457A.875.875 0 1 0 6.456.306L4 2.763 1.543.306A.875.875 0 0 0 .306 1.544L2.763 4 .306 6.457a.875.875 0 1 0 1.238 1.237L4 5.237l2.456 2.457a.875.875 0 1 0 1.238-1.237z"
    />
  </svg>`;

class IconCross100 extends IconBase{render(){return setCustomTemplateLiteralTag(x),this.spectrumVersion===2?Cross100Icon$1({hidden:!this.label,title:this.label}):Cross100Icon({hidden:!this.label,title:this.label})}}

defineElement("sp-icon-cross100",IconCross100);

var p=Object.defineProperty;var l=(e,o,c,t)=>{for(var s=void 0,i=e.length-1,n;i>=0;i--)(n=e[i])&&(s=(n(o,c,s))||s);return s&&p(o,c,s),s};const f={s:()=>x`
        <sp-icon-cross75
            slot="icon"
            class="icon spectrum-UIIcon-Cross75"
        ></sp-icon-cross75>
    `,m:()=>x`
        <sp-icon-cross100
            slot="icon"
            class="icon spectrum-UIIcon-Cross100"
        ></sp-icon-cross100>
    `,l:()=>x`
        <sp-icon-cross200
            slot="icon"
            class="icon spectrum-UIIcon-Cross200"
        ></sp-icon-cross200>
    `,xl:()=>x`
        <sp-icon-cross300
            slot="icon"
            class="icon spectrum-UIIcon-Cross300"
        ></sp-icon-cross300>
    `};class ClearButton extends SizedMixin(StyledButton,{noDefaultSize:!0}){constructor(){super(...arguments);this.variant="";}static get styles(){return [...super.styles,r,c]}get buttonContent(){return [f[this.size]()]}render(){return x`
            <div class="fill">${super.render()}</div>
        `}}l([n({reflect:!0})],ClearButton.prototype,"variant");

defineElement("sp-clear-button",ClearButton);

export { Cross100Icon as C, Cross75Icon as a };
